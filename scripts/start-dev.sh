#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Load .env so LOG_LEVEL and other vars are available
if [ -f "$PROJECT_DIR/.env" ]; then
    set -a
    . "$PROJECT_DIR/.env"
    set +a
fi

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

# Find the patched llama-server (self-built, not Homebrew)
LLAMA_CPP_DIR="${LLAMA_CPP_DIR:-/Users/steve/dev/llama.cpp}"
LLAMA_SERVER="$LLAMA_CPP_DIR/build/bin/llama-server"

# Map LOG_LEVEL to llama-server -lv (0=error, 1=warn, 3=info, 4=debug)
LV=3
case "${LOG_LEVEL:-INFO}" in
  ERROR|error)   LV="0" ;;
  WARN|warn)     LV="1" ;;
  DEBUG|debug)   LV="4" ;;
esac

# Start llama-server on port 8080
MODEL_PATH="llama_api/models/bob.gguf"
if [ -f "$MODEL_PATH" ] && [ -x "$LLAMA_SERVER" ]; then
  echo "Starting llama-server on port 8080..."
  "$LLAMA_SERVER" \
    -m "$MODEL_PATH" \
    -lv "$LV" \
    --host 127.0.0.1 \
    --port 8080 \
    --ctx-size 8192 \
    --parallel 1 \
    --threads 4 \
    --cache-ram 0 \
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
