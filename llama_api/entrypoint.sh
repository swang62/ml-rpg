#!/bin/sh
set -e

HF_MODEL_REPO="${HF_MODEL_REPO:-scubastevve/ml-rpg-bob}"
HF_MODEL_FILE="${HF_MODEL_FILE:-bob.gguf}"

MODEL_PATH="/app/models"
MODEL_LOCATION="$MODEL_PATH/$HF_MODEL_FILE"

LLAMA_SERVER_ARGS="${LLAMA_SERVER_ARGS:---host 0.0.0.0 --port 8080 --sleep-idle-seconds 300 --ctx-size 8192 --cache-ram 0 --parallel 1 --threads 4}"

mkdir -p "$(dirname "$MODEL_PATH")"

# Download model from HuggingFace if missing
if [ ! -f "$MODEL_LOCATION" ]; then
    echo "Downloading $HF_MODEL_FILE from $HF_MODEL_REPO ..."
    curl -L -# -o "$MODEL_LOCATION" "https://huggingface.co/$HF_MODEL_REPO/resolve/main/$HF_MODEL_FILE"
fi

echo "Starting llama-server with model: $HF_MODEL_FILE"
exec /app/llama-server -m "$MODEL_PATH/$HF_MODEL_FILE" $LLAMA_SERVER_ARGS
