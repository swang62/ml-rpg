#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cleanup() {
  echo ""
  echo "Stopping spaCy API..."
  kill "${SPACY_PID:-}" 2>/dev/null || true
  wait "${SPACY_PID:-}" 2>/dev/null || true
  echo "Done."
}
trap cleanup EXIT INT TERM

cd "$PROJECT_DIR"

# Ensure spaCy venv and model
uv sync --quiet
uv run python -m spacy download en_core_web_sm --quiet 2>/dev/null || true

# Start spaCy API
echo "Starting spaCy API on port 8000..."
uv run uvicorn app:app --host 0.0.0.0 --port 8000 --app-dir spacy-api &
SPACY_PID=$!

# Start Vinxi dev
echo "Starting Vinxi dev server..."
vinxi dev
