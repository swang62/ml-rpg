#!/usr/bin/env bash
set -euo pipefail

FINETUNING_MODEL="HuggingFaceTB/SmolLM2-1.7B-Instruct"
HF_MODEL_REPO="${HF_MODEL_REPO:-scubastevve/ml-rpg-bob}"
GGUF_FILENAME="bob-q4_k_m.gguf"

set -a; . ./.env; set +a
CONVERT_SCRIPT="$LLAMA_CPP_DIR/convert_hf_to_gguf.py"
QUANTIZE_BIN="$LLAMA_CPP_DIR/build/bin/llama-quantize"

ROOT_DIR="llama_api"
DATA_DIR="$ROOT_DIR/data"
MODELS_DIR="$ROOT_DIR/models"
SCRIPTS_DIR="$ROOT_DIR/scripts"
FINAL_GGUF="$MODELS_DIR/$GGUF_FILENAME"

echo "=== ML-RPG Bob Training Pipeline ==="
echo ""

# Step 1: Ensure dependencies
echo "--- Step 1: Ensuring dependencies ---"
uv sync --group train

if [ ! -f "$CONVERT_SCRIPT" ] || [ ! -f "$QUANTIZE_BIN" ]; then
    echo "ERROR: llama.cpp scripts are missing"
    exit 1
fi
echo ""

# Step 2: Generate training data
echo "--- Step 2: Generating training data ---"
uv run python "$SCRIPTS_DIR/generate_training_data.py"
echo ""

# Step 3: Format and split for MLX
echo "--- Step 3: Formatting for MLX ---"
uv run python "$SCRIPTS_DIR/preprocessing.py"
echo ""

# Step 4: Train LoRA adapters
echo "--- Step 4: Training LoRA adapters ---"
mkdir -p "$MODELS_DIR/adapters"
uv run mlx_lm.lora \
    --model "$FINETUNING_MODEL" \
    --train \
    --data "$DATA_DIR" \
    --adapter-path "$MODELS_DIR/adapters" \
    --config "$ROOT_DIR/lora_config.yaml"
echo ""

# Step 5: Fuse LoRA into base model
echo "--- Step 5: Fusing LoRA into base model ---"
mkdir -p "$MODELS_DIR/fused"
uv run mlx_lm.fuse \
    --model "$FINETUNING_MODEL" \
    --adapter-path "$MODELS_DIR/adapters" \
    --save-path "$MODELS_DIR/fused"
echo ""

# Step 6: Convert to GGUF
echo "--- Step 6: Converting to GGUF ---"
uv run python "$CONVERT_SCRIPT" \
    "$MODELS_DIR/fused" \
    --outfile "$MODELS_DIR/bob-f16.gguf" \
    --outtype f16

"$QUANTIZE_BIN" \
    "$MODELS_DIR/bob-f16.gguf" \
    "$FINAL_GGUF" \
    q4_k_m

echo ""

# Step 7: Upload to HuggingFace (public)
echo "--- Step 7: Uploading to HuggingFace ---"
if [ -n "${HF_TOKEN:-}" ]; then
    echo "Uploading $FINAL_GGUF to $HF_MODEL_REPO (public)..."
    hf upload "$HF_MODEL_REPO" "$FINAL_GGUF" "$GGUF_FILENAME" \
        --repo-type model
    echo "Upload complete: https://huggingface.co/$HF_MODEL_REPO"
else
    echo "HF_TOKEN not set — skipping upload."
    echo "Set HF_TOKEN in .env to auto-upload to $HF_MODEL_REPO"
fi

echo ""
echo "=== Done! ==="
