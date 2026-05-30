# Suppress noisy warnings from pydantic/instructor BEFORE importing them
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module="pydantic")
warnings.filterwarnings("ignore", category=UserWarning, module="instructor")

# ruff: isort: off
import argparse
import json
import logging
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

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)


def build_prompt(category: str, count: int) -> str:
    prompt = CATEGORY_PROMPTS[category].format(count=count)
    return f"""
{BOB_PERSONA}

## Platform Facts
{PLATFORM_FACTS}

## Task
{prompt}

## Output Format
Return ONLY valid JSON. Use this exact structure:
{{"pairs": [{{"question": "Example question here?", "answer": "Example answer here."}}]}}

Replace the example with {count} actual question-answer pairs. Use "question" and "answer" as the field names (not "q", "a", "Q", or anything else). Wrap all pairs in a single array under the "pairs" key.
"""


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
        default=30,
        help="Number of Q/A pairs to generate per category (default: 30)",
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
        help="Directory to save raw LLM responses",
    )
    args = parser.parse_args()

    categories = sorted(CATEGORY_PROMPTS.keys())
    log.info(
        "Generating %d examples per category for: %s",
        args.examples_per_category,
        ", ".join(categories),
    )

    raw_dir = args.raw_dir
    raw_dir.mkdir(parents=True, exist_ok=True)
    all_examples: list[dict] = []

    logging.getLogger("distilabel").setLevel(logging.WARNING)

    with logging_redirect_tqdm():
        bar = tqdm(categories, desc="Generating", unit="category", ncols=80)
        for category in bar:
            bar.set_postfix_str(category)
            prompt = build_prompt(category, args.examples_per_category)
            data = [{"category": category, "prompt": prompt}]

            with Pipeline(name="generate-bob-data") as pipeline:
                text_generation = TextGeneration(
                    name="generate",
                    llm=OpenAILLM(
                        base_url=args.base_url,
                        model=args.model,
                        api_key="ollama",  # type: ignore
                    ),
                )
                LoadDataFromDicts(
                    data=data, output_mappings={"prompt": "instruction"}
                ).connect(text_generation)

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
                bar.write(f"  {category}: LLM returned no output, skipping")
                continue

            raw_path = raw_dir / f"{category}.txt"
            raw_path.write_text(clean_text(generation), encoding="utf-8")
            bar.write(f"  Saved raw -> {raw_path.name}")

            try:
                pairs = parse_pairs(generation)
            except Exception as e:
                bar.write(f"  Parse failed: {e}")
                continue

            for pair in pairs:
                all_examples.append(
                    {
                        "messages": [
                            {"role": "user", "content": pair["question"]},
                            {"role": "assistant", "content": pair["answer"]},
                        ],
                        "category": category,
                    }
                )
            bar.write(f"  Got {len(pairs)}/{args.examples_per_category} valid pairs")
            print()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as f:
        for example in all_examples:
            f.write(json.dumps(example) + "\n")

    total = len(all_examples)
    tqdm.write(f"\nDone! {total} total examples -> {args.output}")
    for cat in categories:
        actual = sum(1 for e in all_examples if e["category"] == cat)
        expected = args.examples_per_category
        tqdm.write(f"  {cat}: {actual}/{expected}")


if __name__ == "__main__":
    main()
