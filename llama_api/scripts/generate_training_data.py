import argparse
import json
import logging
from pathlib import Path

from openai import OpenAI
from openai.types.shared_params.response_format_json_schema import (
    ResponseFormatJSONSchema,
)
from tqdm import tqdm
from tqdm.contrib.logging import logging_redirect_tqdm

from .prompts import (
    BOB_PERSONA,
    build_category_targets,
    CATEGORY_PROMPTS,
    PLATFORM_FACTS,
)
from .utils import (
    clean_text,
    extract_openai_message_text,
    get_project_root,
    is_acceptable_generated_pair,
    parse_pairs,
    QAPairs,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

MAX_RETRIES = 3
MAX_COMPLETION_TOKENS = 5000
MAX_RECENT_QUESTIONS_IN_PROMPT = 100
GENERATION_TEMPERATURE = 1.0
GENERATION_FREQUENCY_PENALTY = 0.2
GENERATION_PRESENCE_PENALTY = 0.2


def build_prompt(
    category: str, count: int, previous_questions: list[str] | None = None
) -> str:
    return f"""
{BOB_PERSONA}

## Platform Facts
{PLATFORM_FACTS}

## Task
{build_user_prompt(category, count, previous_questions)}

## Output Format
Return ONLY valid JSON. Use this exact structure:
{{"pairs": [{{"question": "Example question here?", "answer": "Example answer here."}}]}}

Use "question" and "answer" as the field names (not "q", "a", "Q", or anything else). Wrap all pairs in a single array under the "pairs" key.

Use plain ASCII punctuation only. Do not use unicode ellipses, unusual whitespace, decorative characters, or corrupted symbols.
"""


def build_user_prompt(
    category: str, count: int, previous_questions: list[str] | None = None
) -> str:
    prompt = CATEGORY_PROMPTS[category].format(count=count)

    existing_section = ""
    if previous_questions:
        lines = "\n".join(f"  - {question}" for question in previous_questions)
        existing_section = f"""
## Previously Generated Questions
The following {len(previous_questions)} questions already exist. Do NOT repeat the exact same question wording again. Rephrasings are allowed if they ask from a meaningfully different angle.

{lines}
"""

    return f"""
## Task
{prompt}{existing_section}

Return exactly {count} question-answer pairs and no more. Do not return extra pairs.
Never return more than {count} pairs.
If you cannot produce all {count} pairs cleanly, return fewer valid pairs instead of malformed text.
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


def normalize_question(question: str) -> str:
    cleaned_question = clean_text(question).strip()
    return "".join(
        character
        for character in cleaned_question
        if character.isalnum() or character.isspace()
    ).rstrip()


QA_SCHEMA: ResponseFormatJSONSchema = {
    "type": "json_schema",
    "json_schema": {
        "name": "qa_pairs",
        "strict": True,
        "schema": {
            "type": "object",
            "properties": {
                "pairs": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "question": {"type": "string"},
                            "answer": {"type": "string"},
                        },
                        "required": ["question", "answer"],
                        "additionalProperties": False,
                    },
                }
            },
            "required": ["pairs"],
            "additionalProperties": False,
        },
    },
}


def generate_batch(
    category: str, count: int, existing_pairs: list[dict], model: str, base_url: str
) -> tuple[list[dict], int]:
    recent_questions = [
        pair["question"] for pair in existing_pairs[-MAX_RECENT_QUESTIONS_IN_PROMPT:]
    ]
    prompt = build_prompt(category, count, recent_questions)

    try:
        client = OpenAI(base_url=base_url, api_key="lm-studio")
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            response_format=QA_SCHEMA,
            max_completion_tokens=MAX_COMPLETION_TOKENS,
            temperature=GENERATION_TEMPERATURE,
            frequency_penalty=GENERATION_FREQUENCY_PENALTY,
            presence_penalty=GENERATION_PRESENCE_PENALTY,
        )

        raw = extract_openai_message_text(response.choices[0].message)
        if not raw:
            return [], 0
    except Exception:
        log.exception("API call failed for %s (batch %d)", category, count)
        return [], 0

    try:
        pairs = parse_pairs(raw)
        pairs = [pair for pair in pairs if is_acceptable_generated_pair(pair)]
        QAPairs.model_validate({"pairs": pairs})
    except Exception:
        log.exception("Failed to parse response for %s (batch %d)", category, count)
        return [], 0

    existing_questions = {
        normalize_question(pair["question"]) for pair in existing_pairs
    }
    new_pairs = []
    seen_questions = set(existing_questions)
    for pair in pairs:
        normalized_question = normalize_question(pair["question"])
        if normalized_question in seen_questions:
            continue
        seen_questions.add(normalized_question)
        new_pairs.append(pair)

    duplicates = len(pairs) - len(new_pairs)

    return new_pairs, duplicates


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
        default="http://localhost:1234/v1",
        help="LMSTUDIO API base URL (default: http://localhost:1234/v1)",
    )
    parser.add_argument(
        "--total-examples",
        type=int,
        default=500,
        help="Total number of Q/A pairs across all categories after percentage weighting (default: 500)",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=50,
        help="Number of pairs per generation batch (default: 50)",
    )
    parser.add_argument(
        "--raw-dir",
        type=Path,
        default=get_project_root() / "llama_api" / "data" / "raw",
        help="Directory to save raw LLM responses and per-category JSONL",
    )
    args = parser.parse_args()

    category_targets = build_category_targets(args.total_examples)
    categories = sorted(category_targets)
    batch_size = min(args.batch_size, max(category_targets.values()))
    log.info(
        "Generating weighted category targets from total count %d in batches of %d for: %s",
        args.total_examples,
        batch_size,
        ", ".join(categories),
    )

    raw_dir = args.raw_dir
    raw_dir.mkdir(parents=True, exist_ok=True)

    with logging_redirect_tqdm():
        for category in categories:
            category_file = raw_dir / f"{category}.jsonl"
            existing_pairs = load_category_pairs(category_file)
            target = category_targets[category]
            n = len(existing_pairs)

            if n >= target:
                tqdm.write(f"{category}: {n}/{target} - skipping")
                continue

            tqdm.write(f"{category}: {n}/{target} existing — continuing")
            bar = tqdm(
                total=target,
                initial=n,
                desc=category,
                unit="pairs",
                ncols=80,
            )

            failed_retry_count = 0
            while len(existing_pairs) < target:
                remaining = target - len(existing_pairs)
                batch_request = min(batch_size, remaining) + 5

                new_pairs, duplicates = generate_batch(
                    category, batch_request, existing_pairs, args.model, args.base_url
                )

                log.info(f"[new_pairs: {len(new_pairs)} | duplicates: {duplicates}]")

                if not new_pairs:
                    failed_retry_count += 1
                    if failed_retry_count > MAX_RETRIES:
                        break
                    log.warning(f"({failed_retry_count}/{MAX_RETRIES}) Retrying...")
                    continue

                failed_retry_count = 0

                append_pairs(category_file, new_pairs)
                existing_pairs.extend(new_pairs)
                bar.update(len(new_pairs))

            bar.close()
    tqdm.write(f"\nDone! Total of {len(existing_pairs)} examples")


if __name__ == "__main__":
    main()
