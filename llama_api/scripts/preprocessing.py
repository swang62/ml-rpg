import argparse
import json
import os
import random
import urllib.error
import urllib.request
from collections import defaultdict
from pathlib import Path

from .prompts import SYSTEM_PROMPT
from .utils import FORMATTERS, get_project_root

MODEL_NAME_BY_FAMILY = {
    "gemma": "google/gemma-3-4b-it",
    "llama": "unsloth/Llama-3.2-3B-Instruct",
    "chatml": None,
}

RESPONSE_MARKERS = {
    "gemma": "<start_of_turn>model\n",
    "llama": "<|start_header_id|>assistant<|end_header_id|>\n\n",
    "chatml": "<|im_start|>assistant\n",
}


def build_loss_mask(text: str, marker: str, tokenizer) -> list[int]:
    """Build a per-token loss mask: 0 for instruction/context, 1 for response."""
    encoding = tokenizer(text, return_offsets_mapping=True)
    input_ids = encoding["input_ids"]
    offsets = encoding["offset_mapping"]

    # Find character offset of the response marker (last occurrence to be safe)
    response_pos = text.rfind(marker)
    if response_pos == -1:
        return [1] * len(input_ids)

    # Find which token starts at or contains the response marker position
    # The marker's first token starts at `response_pos`
    response_token_start = None
    for i, (start, end) in enumerate(offsets):
        if start == response_pos:
            response_token_start = i
            break
        # If the marker starts inside a multi-byte token, use the first
        # token that contains the position
        if start <= response_pos < end:
            response_token_start = i
            break

    if response_token_start is None:
        return [1] * len(input_ids)

    return [0] * response_token_start + [1] * (len(input_ids) - response_token_start)


def load_tokenizer(model_name: str):
    os.environ["TOKENIZERS_PARALLELISM"] = "false"
    from transformers import AutoTokenizer

    tok = AutoTokenizer.from_pretrained(model_name)
    return tok


def chunks_to_text(chunks: list[dict]) -> str:
    if not chunks:
        return ""
    return "\n\n".join(
        f"[{c.get('title', 'Untitled')}]: {c.get('text', '')}" for c in chunks
    )


def fetch_contexts_batch(questions: list[str], rag_url: str) -> list[str]:
    if not questions:
        return []

    body = json.dumps({"queries": questions}).encode()
    req = urllib.request.Request(
        f"{rag_url}/retrieve_chunks",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read())
    except (urllib.error.URLError, json.JSONDecodeError, TimeoutError):
        return [""] * len(questions)

    results = data.get("results", [])
    if not results:
        return [""] * len(questions)

    return [chunks_to_text(r.get("chunks", [])) for r in results]


def write_markdown(split_data: list[dict], path: Path, split_name: str) -> None:
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
        "--rag-api-url",
        default="http://localhost:8000",
        help="RAG API base URL for context retrieval",
    )
    parser.add_argument(
        "--val-pct",
        type=float,
        default=0.1,
        help="Fraction of each category to reserve for validation (default: 0.1)",
    )
    parser.add_argument(
        "--model-family",
        default="llama",
        choices=list(FORMATTERS.keys()),
        help="Chat template format",
    )
    parser.add_argument(
        "--model-name",
        default=None,
        help="HF model name for tokenizer (defaults from model family)",
    )
    args = parser.parse_args()

    # Determine model name and load tokenizer for loss masking
    model_name = args.model_name or MODEL_NAME_BY_FAMILY.get(args.model_family)
    response_marker = RESPONSE_MARKERS.get(args.model_family)
    tokenizer = None
    if response_marker and model_name:
        print(f"Loading tokenizer {model_name} for loss masking ...")
        try:
            tokenizer = load_tokenizer(model_name)
        except Exception as e:
            print(f"  Warning: tokenizer load failed ({e}) — loss masking disabled")
    else:
        print(
            f"  No response marker for family '{args.model_family}' — loss masking disabled"
        )

    # Read input
    examples = []
    with open(args.input, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                examples.append(json.loads(line))

    questions = [
        next((m["content"] for m in ex["messages"] if m["role"] == "user"), "")
        for ex in examples
    ]

    print(f"Fetching context for {len(examples)} questions...")
    contexts = fetch_contexts_batch(questions, args.rag_api_url)
    for ex, ctx in zip(examples, contexts):
        ex["context"] = ctx

    with_context = sum(1 for c in contexts if c)
    if with_context:
        print(f"  {with_context}/{len(examples)} examples have context chunks")

    # Stratified random split by category
    random.seed(42)
    by_category = defaultdict(list)
    for ex in examples:
        by_category[ex.get("category", "unknown")].append(ex)

    valid_examples = []
    train_examples = []
    for cat, group in by_category.items():
        n_valid = max(1, round(len(group) * args.val_pct))
        random.shuffle(group)
        valid_examples.extend(group[:n_valid])
        train_examples.extend(group[n_valid:])

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
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT.format(
                            context=example.get("context", "")
                        ),
                    },
                    *example["messages"],
                ]
                text = FORMATTERS[args.model_family](messages)
                item = {"text": text, "mask": []}
                if tokenizer and response_marker:
                    mask = build_loss_mask(text, response_marker, tokenizer)
                    item["mask"] = mask
                f.write(json.dumps(item, ensure_ascii=False) + "\n")
        print(f"Wrote {len(split_data)} examples to {jsonl_path}")

        md_path = args.output_dir / "raw" / f"{split_name}.md"
        write_markdown(split_data, md_path, split_name)
        print(f"Wrote {len(split_data)} examples to {md_path}")


if __name__ == "__main__":
    main()
