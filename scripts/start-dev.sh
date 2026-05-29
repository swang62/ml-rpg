#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cleanup() {
  echo ""
  echo "Stopping services..."
  for pid in "${PID_RAG:-}" "${PID_LLAMA:-}"; do
    kill "$pid" 2>/dev/null || true
    wait "$pid" 2>/dev/null || true
  done
  echo "Done."
}
trap cleanup EXIT

cd "$PROJECT_DIR"

# Ensure spaCy model — skip download if already installed
uv sync --inexact
uv run python -c "import en_core_web_sm" 2>/dev/null || uv run -- spacy download en_core_web_sm

# Start llama-server (local Bob model) on port 8080
MODEL_PATH="llama_api/models/bob.gguf"
if [ -f "$MODEL_PATH" ]; then
  echo "Starting llama-server on port 8080..."
  llama-server \
    -m "$MODEL_PATH" \
    --host 127.0.0.1 \
    --port 8080 \
    --ctx-size 8192 \
    --parallel 1 \
    --threads 4 \
    --sleep-idle-seconds 60 &
  PID_LLAMA=$!
else
  echo "WARNING: Bob model not found at $MODEL_PATH — llama-server not started."
fi

# Start rag API (debugpy always enabled for VS Code attach)
echo "Starting rag API on port 8000 (debugger on 5678)..."
uv run python -m debugpy --listen 0.0.0.0:5678 -m uvicorn rag_api.app:app --host 0.0.0.0 --port 8000 &
PID_RAG=$!

# Start Vinxi dev
echo "Starting Vinxi dev server..."
vinxi dev
