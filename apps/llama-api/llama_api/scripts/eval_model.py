"""Test a fine-tuned GGUF model by asking random questions from training data.

Reads train.jsonl (pre-formatted Llama chat template), samples random entries,
sends each to the llama.cpp server via the raw /completion endpoint, and
prints the model's answer alongside the expected one for manual evaluation.
"""

import json
import random
import signal
import subprocess
import sys
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

# Delimiters used in the Llama chat template (matching preprocessing.py)
HEADER_SYSTEM = "<|start_header_id|>system<|end_header_id|>\n\n"
HEADER_USER = "<|start_header_id|>user<|end_header_id|>\n\n"
HEADER_ASSISTANT = "<|start_header_id|>assistant<|end_header_id|>\n\n"
SEP = "<|eot_id|>"


def parse_train_entry(text: str) -> tuple[str, str, str]:
    """Parse a train.jsonl formatted text into (system, user, assistant)."""
    *parts, last = text.split(SEP)
    if not parts:
        return ("", "", last.strip())

    # The last part is the assistant response
    assistant = ""
    for p in reversed(parts):
        if HEADER_ASSISTANT in p or p.strip().startswith("assistant"):
            assistant = p.split(HEADER_ASSISTANT, 1)[-1].strip()
            break

    # Find user part
    user = ""
    for p in parts:
        if HEADER_USER in p or p.strip().startswith("user"):
            user = p.split(HEADER_USER, 1)[-1].strip()
            break

    # Find system part (first message)
    system = ""
    for p in parts:
        if HEADER_SYSTEM in p:
            system = p.split(HEADER_SYSTEM, 1)[-1].strip()
            break

    return system, user, assistant


def main() -> None:
    model_path = Path(sys.argv[1])
    data_path = Path(sys.argv[2])
    port = int(sys.argv[3])
    llama_server = sys.argv[4]
    n_samples = int(sys.argv[5]) if len(sys.argv) > 5 else 10

    # Read training data
    entries: list[dict] = []
    with open(data_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                entries.append(json.loads(line))

    if not entries:
        print("ERROR: No entries found in training data", file=sys.stderr)
        sys.exit(1)

    # Random sample
    random.seed(42)
    n = min(n_samples, len(entries))
    samples = random.sample(entries, n)

    # Start llama-server
    proc = subprocess.Popen(
        [
            llama_server,
            "-m",
            str(model_path),
            "--host",
            "127.0.0.1",
            "--port",
            str(port),
            "-ngl",
            "99",
            "-c",
            "4096",
            "-lv",
            "0",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    def cleanup(*_args: object) -> None:
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait()

    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)

    base_url = f"http://127.0.0.1:{port}"

    try:
        # Wait for server
        print("Waiting for llama-server...", file=sys.stderr)
        for _ in range(45):
            try:
                req = Request(f"{base_url}/health")
                urlopen(req, timeout=2)
                print("Server ready!", file=sys.stderr)
                break
            except URLError:
                pass
            except OSError:
                pass
            time.sleep(1)
        else:
            print("ERROR: Server did not start in time", file=sys.stderr)
            proc.terminate()
            proc.wait()
            sys.exit(1)

        # Test each sample
        for i, entry in enumerate(samples):
            text = entry["text"]
            system, question, expected = parse_train_entry(text)

            # Build prompt: everything up to (but not including) the assistant
            # answer.  The model will generate from the assistant header.
            prompt_end = text.rfind(HEADER_ASSISTANT)
            if prompt_end == -1:
                prompt = text
            else:
                prompt = text[: prompt_end + len(HEADER_ASSISTANT)]

            body = json.dumps(
                {
                    "prompt": prompt,
                    "n_predict": 1024,
                    "temperature": 1.0,
                }
            ).encode()

            req = Request(
                f"{base_url}/completion",
                data=body,
                headers={"Content-Type": "application/json"},
            )
            resp = urlopen(req)
            result = json.loads(resp.read())
            answer = result.get("content", "").strip()

            print(f"\n{'=' * 60}")
            print(f"Q: {question}")
            print(f"A: {answer}")
            print(f"{'-' * 40}")
            print(f"[Expected]: {expected}")
            sys.stdout.flush()

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait()


if __name__ == "__main__":
    main()
