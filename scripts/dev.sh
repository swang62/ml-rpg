#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
SPACY_DIR="$PROJECT_DIR/spacy-api"

cleanup() {
  echo ""
  echo "Stopping spaCy API..."
  kill "${SPACY_PID:-}" 2>/dev/null || true
  wait "${SPACY_PID:-}" 2>/dev/null || true
  echo "Done."
}
trap cleanup EXIT INT TERM

# Ensure spaCy venv and model
cd "$SPACY_DIR"
if [ ! -d ".venv" ]; then
  echo "Setting up spaCy API venv..."
  uv sync --quiet
fi
uv run python -m spacy download en_core_web_sm --quiet 2>/dev/null || true

# Start spaCy API
echo "Starting spaCy API on port 8000..."
uv run uvicorn app:app --host 0.0.0.0 --port 8000 &
SPACY_PID=$!

# Start Vinxi dev
cd "$PROJECT_DIR"
echo "Starting Vinxi dev server..."
vinxi dev
