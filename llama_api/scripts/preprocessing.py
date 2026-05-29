import argparse
import json
from collections import defaultdict
from pathlib import Path

from .prompts import SYSTEM_PROMPT
from .utils import FORMATTERS, get_project_root


def write_markdown(split_data: list[dict], path: Path, split_name: str) -> None:
    """Write a human-readable markdown summary of the split."""
    by_cat = defaultdict(list)
    for ex in split_data:
        by_cat[ex.get("category", "unknown")].append(ex)

    with open(path, "w", encoding="utf-8") as f:
        f.write(f"# {split_name.title()} Set\n\n")
        for cat in sorted(by_cat):
            f.write(f"## {cat}\n\n")
            for ex in by_cat[cat]:
                msgs = ex["messages"]
                user_msg = next((m["content"] for m in msgs if m["role"] == "user"), "")
                asst_msg = next(
                    (m["content"] for m in msgs if m["role"] == "assistant"), ""
                )
                f.write(f"```\nQ: {user_msg}\n")
                f.write(f"A: {asst_msg}\n```\n\n")


def main():
    parser = argparse.ArgumentParser(
        description="Split training_raw.jsonl into train/valid sets"
    )
    parser.add_argument(
        "--input",
        type=Path,
        default=get_project_root() / "llama_api" / "data" / "training_raw.jsonl",
        help="Path to training_raw.jsonl",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=get_project_root() / "llama_api" / "data",
        help="Output directory for train/valid JSONL and MD files",
    )
    parser.add_argument(
        "--val-pct",
        type=float,
        default=0.2,
        help="Fraction of each category to reserve for validation (default: 0.2)",
    )
    parser.add_argument(
        "--model-family",
        default="chatml",
        choices=list(FORMATTERS.keys()),
        help="Chat template format (default: chatml, use 'llama' for Llama 3.x)",
    )
    args = parser.parse_args()

    # Read input
    examples = []
    with open(args.input, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                examples.append(json.loads(line))

    # Stratified split by category
    by_category = defaultdict(list)
    for ex in examples:
        by_category[ex.get("category", "unknown")].append(ex)

    valid_examples = []
    train_examples = []
    for cat, group in by_category.items():
        n_valid = max(1, round(len(group) * args.val_pct))
        valid_examples.extend(group[-n_valid:])
        train_examples.extend(group[:-n_valid])

    # Report split
    total_valid = len(valid_examples)
    total_train = len(train_examples)
    pct = 100 * total_valid / len(examples)
    print(f"Read {len(examples)} examples across {len(by_category)} categories:")
    for cat, group in sorted(by_category.items()):
        n_v = max(1, round(len(group) * args.val_pct))
        print(f"  {cat}: {len(group)} total ({n_v} valid, {len(group) - n_v} train)")
    print(f"Split: {total_train} train + {total_valid} valid ({pct:.1f}% validation)")

    # Write JSONL + MD for each split
    for split_name, split_data in [
        ("train", train_examples),
        ("valid", valid_examples),
    ]:
        jsonl_path = args.output_dir / f"{split_name}.jsonl"
        with open(jsonl_path, "w", encoding="utf-8") as f:
            for example in split_data:
                messages = [
                    {"role": "system", "content": SYSTEM_PROMPT.format(context="")},
                    *example["messages"],
                ]
                text = FORMATTERS[args.model_family](messages)
                f.write(json.dumps({"text": text}, ensure_ascii=False) + "\n")
        print(f"Wrote {len(split_data)} examples to {jsonl_path}")

        md_path = args.output_dir / "raw" / f"{split_name}.md"
        write_markdown(split_data, md_path, split_name)
        print(f"Wrote {len(split_data)} examples to {md_path}")


if __name__ == "__main__":
    main()
