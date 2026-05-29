import json
from collections import defaultdict
from pathlib import Path

# Percentage of each category to reserve for validation
VAL_PCT = 0.2

SYSTEM_PROMPT = (
    "You are a helpful local guide named Bob in a gamified learning platform called 'Machine Learning (the RPG)'. "
    "You exist to answer questions about machine learning and data engineering course material from context provided to you below. "
    "Any questions not related to machine learning, data engineering, this learning platform/course, or who you are; just say sorry you can't help with that. "
    "Use the provided context combined with your internal knowledge of machine learning and data engineering to answer the user's question. "
    "Keep answers concise yet informative, summarize core ideas. Remain educational, yet friendly and informal. "
    "If the question is about machine learning or data engineering, and there isn't any context, say so clearly and ask for additional clarification. "
    "Do not mention the context or sources in your answer. "
    "Answer in plain text without markdown formatting."
)


def get_project_root() -> Path:
    return Path(__file__).parent.parent.parent


def format_chatml(messages: list[dict]) -> str:
    parts = []
    for msg in messages:
        role = msg["role"]
        content = msg["content"]
        parts.append(f"<|im_start|>{role}\n{content}<|im_end|>")
    parts.append("<|im_start|>assistant\n")
    return "\n".join(parts)


def main():
    input_path = get_project_root() / "llama_api" / "data" / "training_raw.jsonl"
    output_dir = get_project_root() / "llama_api" / "data"

    examples = []
    with open(input_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                examples.append(json.loads(line))

    # Stratified split: take ~12% total (3% per category) for validation.
    # Data is already grouped by category (from generation order).
    by_category = defaultdict(list)
    for ex in examples:
        by_category[ex.get("category", "unknown")].append(ex)

    valid_examples = []
    train_examples = []
    for cat, group in by_category.items():
        n_valid = max(1, round(len(group) * VAL_PCT))
        # Take the last N from each category (order within is effectively random)
        valid_examples.extend(group[-n_valid:])
        train_examples.extend(group[:-n_valid])

    # Log the split
    total_valid = len(valid_examples)
    total_train = len(train_examples)
    pct = 100 * total_valid / len(examples)
    print(f"Read {len(examples)} examples across {len(by_category)} categories:")
    for cat, group in sorted(by_category.items()):
        n_v = max(1, round(len(group) * VAL_PCT))
        print(f"  {cat}: {len(group)} total ({n_v} valid, {len(group) - n_v} train)")
    print(f"Split: {total_train} train + {total_valid} valid ({pct:.1f}% validation)")

    for split_name, split_data in [
        ("train", train_examples),
        ("valid", valid_examples),
    ]:
        output_path = output_dir / f"{split_name}.jsonl"
        with open(output_path, "w", encoding="utf-8") as f:
            for example in split_data:
                messages = [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    *example["messages"],
                ]
                text = format_chatml(messages)
                f.write(json.dumps({"text": text}, ensure_ascii=False) + "\n")

        print(f"Wrote {len(split_data)} examples to {output_path}")

        # Also write a human-readable markdown file
        md_path = output_dir / f"{split_name}.md"
        by_cat = defaultdict(list)
        for ex in split_data:
            by_cat[ex.get("category", "unknown")].append(ex)
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(f"# {split_name.title()} Set\n\n")
            for cat in sorted(by_cat):
                f.write(f"## {cat}\n\n")
                for ex in by_cat[cat]:
                    msgs = ex["messages"]
                    user_msg = next(
                        (m["content"] for m in msgs if m["role"] == "user"), ""
                    )
                    asst_msg = next(
                        (m["content"] for m in msgs if m["role"] == "assistant"), ""
                    )
                    f.write(f"Q: {user_msg}\n")
                    f.write(f"A: {asst_msg}\n\n")
        print(f"Wrote {len(split_data)} examples to {md_path}")


if __name__ == "__main__":
    main()
