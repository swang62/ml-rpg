import argparse
import json
import random
from pathlib import Path

from .prompts import build_category_targets, CATEGORY_PROMPTS
from .utils import get_project_root, is_acceptable_generated_pair, normalize_pair

MAX_ANSWER_CHARS = 400
MIN_QUESTION_CHARS = 10


def normalize_question(question: str) -> str:
    return question.lower().strip()


def sanitize_category_file(path: Path, category: str = "") -> tuple[list[dict], dict[str, int]]:
    seen_questions: set[str] = set()
    cleaned_pairs: list[dict] = []
    summary = {
        "invalid_json": 0,
        "invalid_pair": 0,
        "garbled": 0,
        "duplicates": 0,
        "too_short": 0,
    }

    if not path.exists():
        return cleaned_pairs, summary

    with path.open(encoding="utf-8") as file_handle:
        for raw_line in file_handle:
            stripped_line = raw_line.strip()
            if not stripped_line:
                continue

            try:
                parsed_line = json.loads(stripped_line)
            except json.JSONDecodeError:
                summary["invalid_json"] += 1
                continue

            normalized_pair = normalize_pair(parsed_line)
            if normalized_pair is None:
                summary["invalid_pair"] += 1
                continue

            if not is_acceptable_generated_pair(normalized_pair):
                summary["garbled"] += 1
                continue

            if len(normalized_pair["answer"]) > MAX_ANSWER_CHARS:
                summary["garbled"] += 1
                continue

            if category != "greetings" and len(normalized_pair["question"].strip()) < MIN_QUESTION_CHARS:
                summary["too_short"] += 1
                continue

            normalized_question = normalize_question(normalized_pair["question"])
            if normalized_question in seen_questions:
                summary["duplicates"] += 1
                continue

            seen_questions.add(normalized_question)
            cleaned_pairs.append(normalized_pair)

    path.write_text(
        "".join(json.dumps(pair, ensure_ascii=False) + "\n" for pair in cleaned_pairs),
        encoding="utf-8",
    )
    return cleaned_pairs, summary


def validate_counts(
    category_pairs: dict[str, list[dict]], expected_counts: dict[str, int]
) -> None:
    mismatched_categories: list[str] = []
    for category, pairs in category_pairs.items():
        actual_count = len(pairs)
        expected_count = expected_counts[category]
        if actual_count != expected_count:
            mismatched_categories.append(
                f"{category}: expected {expected_count}, found {actual_count}"
            )

    if mismatched_categories:
        mismatch_summary = "\n".join(mismatched_categories)
        print("")
        raise SystemExit(
            f"Not enough training examples, exiting...\n{mismatch_summary}"
        )


def write_training_raw(
    output_path: Path, category_pairs: dict[str, list[dict]]
) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as file_handle:
        for category, pairs in category_pairs.items():
            for pair in pairs:
                example = {
                    "messages": [
                        {"role": "user", "content": pair["question"]},
                        {"role": "assistant", "content": pair["answer"]},
                    ],
                    "category": category,
                }
                file_handle.write(json.dumps(example, ensure_ascii=False) + "\n")


def main():
    parser = argparse.ArgumentParser(description="Clean raw generated JSONL pairs")
    parser.add_argument(
        "--total-examples",
        type=int,
        required=True,
        help="Total number of Q/A pairs across all categories after percentage weighting",
    )
    parser.add_argument(
        "--raw-dir",
        type=Path,
        default=get_project_root() / "llama_api" / "data" / "raw",
        help="Directory containing per-category raw JSONL files",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=get_project_root() / "llama_api" / "data" / "training_raw.jsonl",
        help="Output path for cleaned consolidated training_raw.jsonl",
    )
    args = parser.parse_args()

    category_pairs: dict[str, list[dict]] = {}
    categories = sorted(CATEGORY_PROMPTS.keys())
    expected_counts = build_category_targets(args.total_examples)

    for category in categories:
        pairs, summary = sanitize_category_file(args.raw_dir / f"{category}.jsonl", category)
        target = expected_counts[category]
        downsampled_count = 0
        if len(pairs) > target:
            downsampled_count = len(pairs) - target
            pairs = random.sample(pairs, target)
            (args.raw_dir / f"{category}.jsonl").write_text(
                "".join(json.dumps(pair, ensure_ascii=False) + "\n" for pair in pairs),
                encoding="utf-8",
            )
        summary["duplicates"] += downsampled_count
        removed_invalid = summary["garbled"] + summary["invalid_json"] + summary["invalid_pair"] + summary["too_short"]
        remove_breakdown_parts = []
        for k in ("invalid_json", "invalid_pair", "garbled", "too_short"):
            if summary[k]:
                remove_breakdown_parts.append(f"{k}={summary[k]}")
        breakdown = f" ({', '.join(remove_breakdown_parts)})" if remove_breakdown_parts else ""
        print(
            f"{category}: removed {sum(summary.values())}"
            f"{breakdown}"
            f", duplicates={summary['duplicates']}"
        )
        category_pairs[category] = pairs

    validate_counts(category_pairs, expected_counts)
    write_training_raw(args.output, category_pairs)


if __name__ == "__main__":
    main()
