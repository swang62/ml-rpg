#!/bin/sh
set -e

HF_MODEL_REPO="${HF_MODEL_REPO:-ggml-org/gemma-3-4b-it-GGUF}"
HF_MODEL_FILE="${HF_MODEL_FILE:-gemma-3-4b-it-Q4_K_M.gguf}"

MODEL_PATH="/app/models"
MODEL_LOCATION="$MODEL_PATH/$HF_MODEL_FILE"

LLAMA_SERVER_ARGS="${LLAMA_SERVER_ARGS:---host 0.0.0.0 --port 8080 --sleep-idle-seconds 300 --ctx-size 8192 --parallel 1 --threads 4}"

mkdir -p "$(dirname "$MODEL_PATH")"

# Download model from HuggingFace if missing or out of date.
echo "Updating $HF_MODEL_FILE ..."
hf download "$HF_MODEL_REPO" "$HF_MODEL_FILE" --type model --local-dir "$MODEL_PATH"

echo "Starting llama-server with model: $HF_MODEL_FILE"
exec llama-server -m "$MODEL_PATH/$HF_MODEL_FILE" $LLAMA_SERVER_ARGS
