#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATA_DIR="$ROOT_DIR/data"
MODELS_DIR="$ROOT_DIR/models"
SCRIPTS_DIR="$ROOT_DIR/scripts"

echo "=== ML-RPG Bob Training Pipeline ==="
echo ""

# Step 1: Ensure dependencies
echo "--- Step 1: Ensuring dependencies ---"
uv sync --group train
echo ""

# Step 2: Generate training data via Groq
echo "--- Step 2: Generating training data ---"
export GROQ_API_KEY="${GROQ_API_KEY:-}"
uv run python "$SCRIPTS_DIR/generate_training_data.py"
echo ""

# Step 3: Format and split for MLX
echo "--- Step 3: Formatting for MLX ---"
uv run python "$SCRIPTS_DIR/preprocessing.py"
echo ""

# Step 4: Train LoRA adapters
echo "--- Step 4: Training LoRA adapters ---"
mkdir -p "$MODELS_DIR/adapters"
mlx_lm.lora \
    --model HuggingFaceTB/SmolLM2-1.7B-Instruct \
    --train \
    --data "$DATA_DIR" \
    --adapter-path "$MODELS_DIR/adapters" \
    --iters 200 \
    --lora-rank 16 \
    --learning-rate 2e-5 \
    --batch-size 4 \
    --num-layers 24
echo ""

# Step 5: Fuse LoRA into base model
echo "--- Step 5: Fusing LoRA into base model ---"
mkdir -p "$MODELS_DIR/fused"
mlx_lm.fuse \
    --model HuggingFaceTB/SmolLM2-1.7B-Instruct \
    --adapter-path "$MODELS_DIR/adapters" \
    --save-path "$MODELS_DIR/fused"
echo ""

# Step 6: Convert to GGUF
echo "--- Step 6: Converting to GGUF ---"
LLAMA_CPP_DIR="${LLAMA_CPP_DIR:-$ROOT_DIR/../llama.cpp}"
CONVERT_SCRIPT="$LLAMA_CPP_DIR/convert_hf_to_gguf.py"
QUANTIZE_BIN="$LLAMA_CPP_DIR/build/bin/llama-quantize"

if [ ! -f "$CONVERT_SCRIPT" ]; then
    echo "ERROR: llama.cpp not found at $LLAMA_CPP_DIR"
    echo "Please clone it: git clone https://github.com/ggml-org/llama.cpp.git $LLAMA_CPP_DIR"
    echo "And build: cmake -B build && cmake --build build -t llama-quantize"
    exit 1
fi

mkdir -p "$MODELS_DIR"

uv run python "$CONVERT_SCRIPT" \
    "$MODELS_DIR/fused" \
    --outfile "$MODELS_DIR/bob-f16.gguf" \
    --outtype f16

"$QUANTIZE_BIN" \
    "$MODELS_DIR/bob-f16.gguf" \
    "$MODELS_DIR/bob-q4_k_m.gguf" \
    q4_k_m

echo ""
echo "=== Done! ==="
echo "Final model: $MODELS_DIR/bob-q4_k_m.gguf"
ls -lh "$MODELS_DIR/bob-q4_k_m.gguf"
