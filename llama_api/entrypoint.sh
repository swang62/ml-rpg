#!/bin/sh
set -e

HF_MODEL_REPO="${HF_MODEL_REPO:-scubastevve/ml-rpg-bob}"
HF_MODEL_FILE="${HF_MODEL_FILE:-bob.gguf}"
MODEL_LOCATION="${MODEL_PATH:-/app/models}/$HF_MODEL_FILE"

LLAMA_SERVER_ARGS="--host 0.0.0.0 --port 8080 --sleep-idle-seconds 300 --ctx-size 1024 --cache-ram 0 --parallel 1 --threads 4"

# Map LOG_LEVEL to llama-server -lv (0=error, 1=warn, 3=info, 4=debug)
LV=3
case "${LOG_LEVEL:-INFO}" in
    ERROR|error)   LV="0" ;;
    WARN|warn)     LV="1" ;;
esac

# Fetch remote ETag (x-repo-commit = git commit SHA at HEAD)
REMOTE_ETAG=""
HF_HEADERS=$(curl -sI --connect-timeout 10 \
    "https://huggingface.co/$HF_MODEL_REPO/resolve/main/$HF_MODEL_FILE" 2>/dev/null) || true
if [ -n "$HF_HEADERS" ]; then
    REMOTE_ETAG=$(echo "$HF_HEADERS" | grep -i "^x-repo-commit:" | sed 's/.*: //' | tr -d '\r\n')
fi

# Read local ETag from sidecar file
LOCAL_ETAG=""
if [ -f "$MODEL_LOCATION.etag" ]; then
    LOCAL_ETAG=$(cat "$MODEL_LOCATION.etag" | tr -d '\r\n')
fi

# Decide: download if no local model, or ETags don't match
if [ -z "$REMOTE_ETAG" ] && [ -f "$MODEL_LOCATION" ]; then
    echo "[model] Cannot reach HuggingFace — using local model ($LOCAL_ETAG)"
elif [ -z "$REMOTE_ETAG" ] && [ ! -f "$MODEL_LOCATION" ]; then
    echo "[model] ERROR: Cannot reach HuggingFace and no local model found"
    exit 1
elif [ "$REMOTE_ETAG" = "$LOCAL_ETAG" ] && [ -f "$MODEL_LOCATION" ]; then
    echo "[model] Up to date ($REMOTE_ETAG)"
elif [ -n "$LOCAL_ETAG" ] && [ -f "$MODEL_LOCATION" ]; then
    echo "[model] New version: $LOCAL_ETAG -> $REMOTE_ETAG"
    echo "[model] Downloading update ..."
    curl -L -# -o "${MODEL_LOCATION}.new" \
        "https://huggingface.co/$HF_MODEL_REPO/resolve/main/$HF_MODEL_FILE" && \
        mv "${MODEL_LOCATION}.new" "$MODEL_LOCATION" && \
        echo "$REMOTE_ETAG" > "$MODEL_LOCATION.etag"
    echo "[model] Update complete ($REMOTE_ETAG)"
else
    echo "[model] Downloading $HF_MODEL_FILE ..."
    curl -L -# -o "${MODEL_LOCATION}.new" \
        "https://huggingface.co/$HF_MODEL_REPO/resolve/main/$HF_MODEL_FILE" && \
        mv "${MODEL_LOCATION}.new" "$MODEL_LOCATION" && \
        echo "$REMOTE_ETAG" > "$MODEL_LOCATION.etag"
    echo "[model] Download complete ($REMOTE_ETAG)"
fi

echo "Starting llama-server with model: $HF_MODEL_FILE"
exec /app/llama-server -m "$MODEL_LOCATION" -lv "$LV" $LLAMA_SERVER_ARGS
