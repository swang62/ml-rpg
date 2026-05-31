#!/bin/sh
set -e

HF_MODEL_REPO="${HF_MODEL_REPO:-scubastevve/ml-rpg-bob}"
HF_MODEL_FILE="${HF_MODEL_FILE:-bob.gguf}"
MODEL_LOCATION="${MODEL_PATH:-/app/models}/$HF_MODEL_FILE"

LLAMA_SERVER_ARGS="--host 0.0.0.0 --port 8080 --sleep-idle-seconds 300 --ctx-size 1024 --cache-ram 0 --parallel 1 --threads 4"

# Clean up old sidecar files (no longer used)
rm -f "$MODEL_LOCATION.etag" "${MODEL_LOCATION}.new"

# Map LOG_LEVEL to llama-server -lv (0=error, 1=warn, 3=info, 4=debug)
LV=3
case "${LOG_LEVEL:-INFO}" in
    ERROR|error)   LV="0" ;;
    WARN|warn)     LV="1" ;;
esac

# Get the repo's last commit date from the HF API
# API returns format: 2026-05-30T16:30:27.000Z
REMOTE_RAW=$(curl -s --connect-timeout 10 \
    "https://huggingface.co/api/models/$HF_MODEL_REPO" 2>/dev/null | \
    grep -o '"lastModified":"[^"]*"' | cut -d'"' -f4) || true

# Reformat both dates identically for display and comparison
REMOTE_DATE_FMT=""
if [ -n "$REMOTE_RAW" ]; then
    REMOTE_DATE_FMT=$(echo "$REMOTE_RAW" | sed 's/T/ /; s/\.000Z/ UTC/')
fi

LOCAL_DATE_FMT=""
if [ -f "$MODEL_LOCATION" ]; then
    LOCAL_DATE_FMT=$(date -u -r "$MODEL_LOCATION" "+%Y-%m-%d %H:%M:%S UTC" 2>/dev/null || echo "unknown")
fi

# Compare using lexicographic order (ISO 8601 dates sort correctly)
# String format: YYYY-MM-DD HH:MM:SS UTC — identical for both
if [ -z "$REMOTE_RAW" ] && [ -f "$MODEL_LOCATION" ]; then
    echo "[model] Cannot reach HuggingFace — using local model ($LOCAL_DATE_FMT)"
elif [ -z "$REMOTE_RAW" ] && [ ! -f "$MODEL_LOCATION" ]; then
    echo "[model] ERROR: Cannot reach HuggingFace and no local model found"
    exit 1
elif [ -z "$LOCAL_DATE_FMT" ] || [ "$REMOTE_DATE_FMT" \> "$LOCAL_DATE_FMT" ]; then
    echo "[model] Remote:  $REMOTE_DATE_FMT"
    echo "[model] Local:   ${LOCAL_DATE_FMT:-none}"
    if [ -z "$LOCAL_DATE_FMT" ]; then
        echo "[model] No local model found — downloading $HF_MODEL_FILE ..."
    else
        echo "[model] Remote is newer — downloading update ..."
    fi
    curl -L -o "${MODEL_LOCATION}.new" \
        "https://huggingface.co/$HF_MODEL_REPO/resolve/main/$HF_MODEL_FILE" && \
        mv "${MODEL_LOCATION}.new" "$MODEL_LOCATION"
    echo "[model] Download complete (dated $REMOTE_DATE_FMT)"
else
    echo "[model] Model is up to date (remote: $REMOTE_DATE_FMT, local: $LOCAL_DATE_FMT)"
fi

echo "Starting llama-server with model: $HF_MODEL_FILE"
exec /app/llama-server -m "$MODEL_LOCATION" -lv "$LV" $LLAMA_SERVER_ARGS
