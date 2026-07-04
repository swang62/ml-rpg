#!/usr/bin/env python3
"""Download the latest Bob GGUF model using huggingface_hub + hf_transfer."""

import os
import sys
import time
from pathlib import Path

from huggingface_hub import hf_hub_download, HfApi

REPO_ID = os.environ.get("HF_MODEL_REPO", "scubastevve/ml-rpg-bob")
FILENAME = os.environ.get("HF_MODEL_FILE", "bob.gguf")
MODEL_DIR = Path(os.environ.get("MODEL_PATH", "/app/models"))
TOKEN = os.environ.get("HF_TOKEN") or None

# Enable high-performance transfer (Xet, replaces hf_transfer)
os.environ.setdefault("HF_XET_HIGH_PERFORMANCE", "1")
os.environ.setdefault("HF_HUB_ENABLE_HF_TRANSFER", "1")

MODEL_DIR.mkdir(parents=True, exist_ok=True)
model_path = MODEL_DIR / FILENAME
etag_path = MODEL_DIR / f"{FILENAME}.etag"


def log(msg: str) -> None:
    print(f"[model] {msg}", flush=True)


def main():
    log(f"checking {REPO_ID}/{FILENAME}")

    # Try to get the latest commit SHA
    latest_sha: str | None = None
    try:
        log(f"HF_TOKEN: {'exists' if TOKEN else 'missing'}")
        api = HfApi(token=TOKEN)
        commits = api.list_repo_commits(REPO_ID, revision="main")
        if commits:
            latest_sha = commits[0].commit_id
            log(f"latest remote: {latest_sha}")
    except Exception as exc:
        log(f"could not reach HuggingFace: {exc}")

    # Read local ETag
    local_sha = etag_path.read_text().strip() if etag_path.exists() else None
    if local_sha:
        log(f"local: {local_sha}")

    # Decide what to do
    if latest_sha and latest_sha == local_sha and model_path.exists():
        log(f"up to date ({latest_sha})")
        return

    if not latest_sha and model_path.exists():
        log("cannot reach HuggingFace — using local model")
        return

    if not latest_sha and not model_path.exists():
        log("ERROR: cannot reach HuggingFace and no local model found")
        sys.exit(1)

    # We need to download
    assert latest_sha is not None
    log(f"downloading {FILENAME} ({latest_sha}) ...")

    # Fetch file size first so we know what to expect
    expected_size: int | None = None
    try:
        from huggingface_hub import get_hf_file_metadata, hf_hub_url

        url = hf_hub_url(REPO_ID, FILENAME, revision=latest_sha)
        metadata = get_hf_file_metadata(url, token=TOKEN)
        expected_size = metadata.size
        if expected_size:
            log(f"file size: {expected_size / (1024 * 1024):.0f} MB")
    except Exception:
        pass

    start = time.time()
    try:
        result = hf_hub_download(
            repo_id=REPO_ID,
            filename=FILENAME,
            token=TOKEN,
            local_dir=str(MODEL_DIR),
        )
    except Exception as exc:
        log(f"ERROR: download failed: {exc}")
        sys.exit(1)

    elapsed = time.time() - start
    actual_size = os.path.getsize(result)
    if expected_size and actual_size != expected_size:
        log(f"WARNING: size mismatch — expected {expected_size}, got {actual_size}")

    mbps = (actual_size / (1024 * 1024)) / elapsed if elapsed > 0 else 0
    log(f"download complete ({elapsed:.0f}s, {mbps:.0f} MB/s)")
    log(f"saved to: {result}")

    etag_path.write_text(latest_sha + "\n")
    log(f"download complete ({latest_sha})")


if __name__ == "__main__":
    main()
