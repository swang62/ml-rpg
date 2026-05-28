#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cleanup() {
  echo ""
  echo "Stopping rag API..."
  kill "${PID:-}" 2>/dev/null || true
  wait "${PID:-}" 2>/dev/null || true
  echo "Done."
}
trap cleanup EXIT INT TERM

cd "$PROJECT_DIR"

# Ensure spaCy model — skip download if already installed
uv sync --inexact
uv run python -c "import en_core_web_sm" 2>/dev/null || uv run -- spacy download en_core_web_sm

# Start rag API
echo "Starting rag API on port 8000..."
uv run uvicorn rag_api.app:app --host 0.0.0.0 --port 8000 &
PID=$!

# Start Vinxi dev
echo "Starting Vinxi dev server..."
vinxi dev
