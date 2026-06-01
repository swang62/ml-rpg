#!/bin/bash

# Trap SIGTERM
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

# Ensure spaCy for RAG backend
uv sync --inexact
uv run python -c "import en_core_web_sm" 2>/dev/null || uv run -- spacy download en_core_web_sm

# Start RAG API on port 8000 (with debugger)
echo "Starting rag API on port 8000 (debugger on 5678)..."
uv run python -m debugpy --listen 0.0.0.0:5678 -m uvicorn rag_api.app:app --host 0.0.0.0 --port 8000 &
PID_RAG=$!

# Start llama-server on port 8080
MODEL_PATH="llama_api/models/bob.gguf"
if [ -f "$MODEL_PATH" ]; then
  echo "Starting llama-server on port 8080..."
  llama-server \
    -m "$MODEL_PATH" \
    --host 127.0.0.1 \
    --port 8080 \
    --ctx-size 1024 \
    --parallel 1 \
    --threads 4 \
    --cache-ram 0 \
    --sleep-idle-seconds 60 &
  PID_LLAMA=$!
else
  echo "WARNING: Bob model not found at $MODEL_PATH — llama-server not started."
fi

# SolidStart dev
echo "Starting dev server..."
vinxi dev
