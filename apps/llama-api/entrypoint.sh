#!/bin/sh
set -e

HF_MODEL_REPO="${HF_MODEL_REPO:-scubastevve/ml-rpg-bob}"
HF_MODEL_FILE="${HF_MODEL_FILE:-bob.gguf}"
MODEL_LOCATION="${MODEL_PATH:-/app/models}/$HF_MODEL_FILE"

IDLE_TIMEOUT="${IDLE_TIMEOUT:-300}"
LLAMA_SERVER_ARGS="--host 0.0.0.0 --port 9876 --sleep-idle-seconds $IDLE_TIMEOUT --ctx-size 1024 --cache-ram 1024 --cache-idle-slots --parallel 1 --threads 4"

# Map LOG_LEVEL to llama-server -lv (0=error, 1=warn, 3=info, 4=debug)
LV=3
case "${LOG_LEVEL:-INFO}" in
    ERROR|error)   LV="0" ;;
    WARN|warn)     LV="1" ;;
esac

# Download/check model using huggingface_hub
python3 /app/scripts/download_model.py

echo "Starting llama-server with model: $HF_MODEL_FILE"
exec /app/llama-server -m "$MODEL_LOCATION" -lv "$LV" $LLAMA_SERVER_ARGS
