#!/bin/sh
set -e

MODEL_PATH="${MODEL_PATH:-/app/model.gguf}"
HF_MODEL_REPO="${HF_MODEL_REPO:-scubastevve/ml-rpg-bob}"
HF_MODEL_FILE="${HF_MODEL_FILE:-bob-q4_k_m.gguf}"
LLAMA_SERVER_ARGS="${LLAMA_SERVER_ARGS:---host 0.0.0.0 --port 8080 --sleep-idle-seconds 300 --ctx-size 4096 --parallel 1 --threads 4}"

# If the path is a directory (e.g. from a docker bind mount to a nonexistent file),
# append the default model filename
if [ -d "$MODEL_PATH" ]; then
    MODEL_PATH="$MODEL_PATH/$HF_MODEL_FILE"
fi

# Download model from HuggingFace if not present locally
if [ ! -f "$MODEL_PATH" ]; then
    echo "Model not found at $MODEL_PATH. Downloading from Hugging Face..."
    mkdir -p "$(dirname "$MODEL_PATH")"

    URL="https://huggingface.co/${HF_MODEL_REPO}/resolve/main/${HF_MODEL_FILE}"
    if [ -n "${HF_TOKEN:-}" ]; then
        echo "Using authenticated download..."
        curl -# -L -o "$MODEL_PATH" \
            -H "Authorization: Bearer $HF_TOKEN" \
            "$URL"
    else
        echo "Downloading public model (no HF_TOKEN set)..."
        curl -# -L -o "$MODEL_PATH" "$URL"
    fi
    echo "Download complete: $MODEL_PATH"
fi

echo "Starting llama-server with model: $MODEL_PATH"
# shellcheck disable=SC2086
exec llama-server -m "$MODEL_PATH" $LLAMA_SERVER_ARGS
