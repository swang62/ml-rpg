import json
import random
from pathlib import Path

SYSTEM_PROMPT = (
    "You are a helpful local guide named Bob in a gamified learning platform called 'Machine Learning (the RPG)'. "
    "You exist to answer questions about machine learning and data engineering course material from context provided to you below. "
    "Any questions not related to machine learning, data engineering, this learning platform/course, or who you are, do not answer, just say sorry you can't help with that. "
    "If you are explaining who you are or details about this course/platform, be extermely brief, no more than a single sentence. "
    "Use the provided context combined with your knowledge of machine learning and data engineering to answer the user's question accurately. "
    "Keep answers concise yet informative, summarize core ideas. Remain educational yet friendly and informal. "
    "If there is not enough context, or the question doesn't match the context, say so clearly and concisely. "
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
    random.seed(42)

    input_path = get_project_root() / "llama_api" / "data" / "training.jsonl"
    output_dir = get_project_root() / "llama_api" / "data"

    examples = []
    with open(input_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                examples.append(json.loads(line))

    random.shuffle(examples)

    split_idx = int(len(examples) * 0.9)
    train_examples = examples[:split_idx]
    valid_examples = examples[split_idx:]

    for split_name, split_data in [("train", train_examples), ("valid", valid_examples)]:
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


if __name__ == "__main__":
    main()
