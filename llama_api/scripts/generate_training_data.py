# Suppress noisy warnings from pydantic/instructor BEFORE importing them
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module="pydantic")
warnings.filterwarnings("ignore", category=UserWarning, module="instructor")

# ruff: isort: off
import argparse
import json
import logging
from collections import defaultdict
from tqdm import tqdm
from tqdm.contrib.logging import logging_redirect_tqdm
from pathlib import Path
from distilabel.models import OpenAILLM
from distilabel.pipeline import Pipeline
from distilabel.steps import LoadDataFromDicts
from distilabel.steps.tasks import TextGeneration

from .prompts import BOB_PERSONA, CATEGORY_PROMPTS, PLATFORM_FACTS
from .utils import clean_text, get_project_root, parse_pairs
# ruff: isort: on


def suppress_distilabel():
    for name in list(logging.root.manager.loggerDict):
        if name.startswith("distilabel"):
            logging.getLogger(name).setLevel(logging.WARNING)
            logging.getLogger(name).propagate = False


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

suppress_distilabel()

MAX_BATCH_ATTEMPTS = 3


def build_prompt(
    category: str, count: int, existing_pairs: list[dict] | None = None
) -> str:
    prompt = CATEGORY_PROMPTS[category].format(count=count)

    existing_section = ""
    if existing_pairs:
        lines = "\n".join(
            f'  - Q: {p["question"]}\n    A: {p["answer"]}' for p in existing_pairs
        )
        existing_section = f"""
## Already Generated Pairs
The following {len(existing_pairs)} pairs have already been created. Do NOT repeat any of these questions or answers — generate completely new ones.

{lines}
"""

    return f"""
{BOB_PERSONA}

## Platform Facts
{PLATFORM_FACTS}

## Task
{prompt}{existing_section}

## Output Format
Return ONLY valid JSON. Use this exact structure:
{{"pairs": [{{"question": "Example question here?", "answer": "Example answer here."}}]}}

Replace the example with {count} actual question-answer pairs. Use "question" and "answer" as the field names (not "q", "a", "Q", or anything else). Wrap all pairs in a single array under the "pairs" key.
"""


def load_category_pairs(path: Path) -> list[dict]:
    if not path.exists():
        return []
    lines, pairs = [], []
    with open(path, encoding="utf-8") as f:
        for i, line in enumerate(f, 1):
            stripped = line.strip()
            if not stripped:
                continue
            try:
                pair = json.loads(stripped)
            except json.JSONDecodeError as e:
                tqdm.write(f"  Removing invalid JSON at {path.name} line {i}: {e}")
                continue
            if (
                not isinstance(pair, dict)
                or "question" not in pair
                or "answer" not in pair
            ):
                tqdm.write(
                    f"  Removing bad entry at {path.name} line {i}: missing question/answer"
                )
                continue
            lines.append(line)
            pairs.append(pair)
    # Rewrite file without bad lines
    if len(lines) != len(pairs):
        path.write_text("".join(lines), encoding="utf-8")
    return pairs


def append_pairs(path: Path, pairs: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "a", encoding="utf-8") as f:
        for pair in pairs:
            f.write(json.dumps(pair, ensure_ascii=False) + "\n")


def generate_batch(
    category: str, count: int, existing_pairs: list[dict], model: str, base_url: str
) -> tuple[list[dict], int]:
    prompt = build_prompt(category, count, existing_pairs)
    data = [{"category": category, "prompt": prompt}]

    with Pipeline(name="generate-bob-data") as pipeline:
        text_generation = TextGeneration(
            name="generate",
            llm=OpenAILLM(
                base_url=base_url,
                model=model,
                api_key="ollama",  # type: ignore
            ),
        )
        LoadDataFromDicts(
            data=data, output_mappings={"prompt": "instruction"}
        ).connect(text_generation)

    suppress_distilabel()
    distiset = pipeline.run(
        parameters={
            "generate": {
                "llm": {
                    "generation_kwargs": {
                        "temperature": 0.8,
                        "max_new_tokens": 8192,
                        "response_format": {"type": "json_object"},
                    }
                }
            }
        },
        use_cache=False,
    )

    row = list(distiset["default"]["train"])[0]
    generation = row["generation"]
    if generation is None:
        return [], 0

    pairs = parse_pairs(generation)

    existing_questions = {
        clean_text(p["question"]).lower().strip() for p in existing_pairs
    }
    new_pairs = [
        p
        for p in pairs
        if clean_text(p["question"]).lower().strip() not in existing_questions
    ]
    duplicates = len(pairs) - len(new_pairs)

    return new_pairs, duplicates


def write_markdown(per_category: dict[str, list[dict]], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write("# Generated Pairs\n\n")
        for cat in sorted(per_category):
            f.write(f"## {cat}\n\n")
            for pair in per_category[cat]:
                f.write(f"Q: {pair['question']}\nA: {pair['answer']}\n\n")


def main():
    parser = argparse.ArgumentParser(
        description="Generate Bob training data via Ollama"
    )
    parser.add_argument(
        "--model",
        default="gpt-oss:20b",
        help="Ollama model name (default: gpt-oss:20b)",
    )
    parser.add_argument(
        "--base-url",
        default="http://localhost:11434/v1",
        help="Ollama API base URL (default: http://localhost:11434/v1)",
    )
    parser.add_argument(
        "--examples-per-category",
        type=int,
        default=100,
        help="Number of Q/A pairs to generate per category (default: 100)",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=50,
        help="Number of pairs per generation batch (default: 50)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=get_project_root() / "llama_api" / "data" / "training_raw.jsonl",
        help="Output path for training_raw.jsonl",
    )
    parser.add_argument(
        "--raw-dir",
        type=Path,
        default=get_project_root() / "llama_api" / "data" / "raw",
        help="Directory to save raw LLM responses and per-category JSONL",
    )
    args = parser.parse_args()

    categories = sorted(CATEGORY_PROMPTS.keys())
    batch_size = min(args.batch_size, args.examples_per_category)
    num_batches = (args.examples_per_category + batch_size - 1) // batch_size
    log.info(
        "Generating %d examples per category in batches of %d for: %s",
        args.examples_per_category,
        batch_size,
        ", ".join(categories),
    )

    raw_dir = args.raw_dir
    raw_dir.mkdir(parents=True, exist_ok=True)

    with logging_redirect_tqdm():
        suppress_distilabel()
        for category in categories:
            category_file = raw_dir / f"{category}.jsonl"
            existing_pairs = load_category_pairs(category_file)
            n = len(existing_pairs)
            target = args.examples_per_category

            if n >= target:
                tqdm.write(f"{category}: {n}/{target} — skipping")
                continue

            tqdm.write(f"{category}: {n}/{target} existing — continuing")
            bar = tqdm(
                total=target,
                initial=n,
                desc=category,
                unit="pairs",
                ncols=80,
            )

            batch_num = 0
            while (
                len(existing_pairs) < args.examples_per_category
                and batch_num < num_batches + MAX_BATCH_ATTEMPTS
            ):
                batch_num += 1
                remaining = args.examples_per_category - len(existing_pairs)
                batch_request = min(batch_size, remaining)

                bar.write(f"  Batch {batch_num}: requesting {batch_request} pairs")
                print("\n")
                new_pairs, duplicates = generate_batch(
                    category, batch_request, existing_pairs, args.model, args.base_url
                )

                if duplicates:
                    bar.write(f"  Removed {duplicates} duplicates")

                if not new_pairs:
                    bar.write("  Batch returned 0 new pairs — stopping early")
                    break

                append_pairs(category_file, new_pairs)
                existing_pairs.extend(new_pairs)
                bar.update(len(new_pairs))

                if (
                    len(existing_pairs) < args.examples_per_category
                    and len(new_pairs) < batch_request
                ):
                    bar.write(
                        f"  Model returned fewer than requested ({len(new_pairs)} < {batch_request}) — will retry"
                    )

            bar.close()

    # Concatenate all per-category JSONL files into training_raw.jsonl
    all_examples: list[dict] = []
    per_category: dict[str, list[dict]] = defaultdict(list)
    for category in categories:
        cat_file = raw_dir / f"{category}.jsonl"
        if not cat_file.exists():
            continue
        with open(cat_file, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                pair = json.loads(line)
                example = {
                    "messages": [
                        {"role": "user", "content": pair["question"]},
                        {"role": "assistant", "content": pair["answer"]},
                    ],
                    "category": category,
                }
                all_examples.append(example)
                per_category[category].append(pair)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as f:
        for example in all_examples:
            f.write(json.dumps(example, ensure_ascii=False) + "\n")

    # Write markdown
    md_path = raw_dir / "formatted.md"
    write_markdown(per_category, md_path)
    tqdm.write(f"Wrote markdown -> {md_path}")

    total = len(all_examples)
    tqdm.write(f"\nDone! {total} total examples -> {args.output}")
    for cat in categories:
        actual = sum(1 for e in all_examples if e["category"] == cat)
        expected = args.examples_per_category
        tqdm.write(f"  {cat}: {actual}/{expected}")


if __name__ == "__main__":
    main()
