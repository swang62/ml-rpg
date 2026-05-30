set dotenv-load := true
set shell := ["bash", "-euo", "pipefail", "-c"]

# Model settings
finetuning_model := "unsloth/Llama-3.2-3B-Instruct"
ollama_model := env_var_or_default("OLLAMA_MODEL", "gpt-oss:20b")

# Preprocessing
examples_per_category := "60"
test_set_pct := "0.1"

# HF upload
hf_model_repo := env_var_or_default("HF_MODEL_REPO", "scubastevve/ml-rpg-bob")
hf_model_file := env_var_or_default("HF_MODEL_FILE", "bob.gguf")

# Derived paths
root_dir := "llama_api"
data_dir := root_dir + "/data"
models_dir := root_dir + "/models"
log_dir := root_dir + "/logs"

# Run the full pipeline with timestamped log, no upload
default:
    @mkdir -p "{{log_dir}}" && \
    LOG="{{log_dir}}/train-$(date +%Y%m%d-%H%M%S).log" && \
    just check generate preprocess train fuse convert 2>&1 | tee "$LOG" && \
    echo "" && \
    echo "Upload manually to HF after you evaluate, full log saved to $LOG" \


# Step 1: Ensure dependencies and custom patches
check:
    @echo "--- Step 1: Ensuring dependencies ---"
    @uv sync --group train --inexact
    @test -f "$LLAMA_CPP_DIR/convert_hf_to_gguf.py" || { echo "ERROR: llama.cpp scripts are missing"; exit 1; }
    @test -f "$LLAMA_CPP_DIR/build/bin/llama-quantize" || { echo "ERROR: llama.cpp binaries are missing"; exit 1; }
    @test -f "$LLAMA_CPP_DIR/build/bin/llama-server" || { echo "ERROR: llama.cpp binaries are missing"; exit 1; }
    @llama_api/scripts/patch-gguf-converter.sh "$LLAMA_CPP_DIR" "$LLAMA_MODELS_DIR"


# Step 2: Generate training data
generate: check
    @echo "--- Step 2: Generating training data ---"
    @uv run python -m llama_api.scripts.generate_training_data \
        --model "{{ollama_model}}" \
        --examples-per-category "{{examples_per_category}}" \
        --output "{{data_dir}}/training_raw.jsonl"


# Step 3: Format and split for MLX
preprocess: check
    @echo "--- Step 3: Formatting for MLX ---"
    -@bash -c '\
        kill -9 $(lsof -ti:8001) 2>/dev/null || true; \
        uv run uvicorn rag_api.app:app --host 127.0.0.1 --port 8001 > /dev/stdout 2>&1 & \
        echo "[preprocess] Waiting for rag-api on :8001 ..."; \
        for i in $(seq 1 30); do \
            if curl -sf http://127.0.0.1:8001/health > /dev/null; then \
                echo "[preprocess] rag-api ready"; \
                break; \
            fi; \
            sleep 1; \
        done; \
        uv run python -m llama_api.scripts.preprocessing \
            --input "{{data_dir}}/training_raw.jsonl" \
            --output-dir "{{data_dir}}" \
            --rag-api-url "http://localhost:8001" \
            --val-pct "{{test_set_pct}}" \
            --model-family llama; \
        kill -9 $(lsof -ti:8001) 2>/dev/null || true \
    '


# Step 4: Train LoRA adapters
train: check
    @echo "--- Step 4: Training LoRA adapters ---"
    @mkdir -p "{{models_dir}}/adapters"
    @uv run mlx_lm.lora \
        --model "{{finetuning_model}}" \
        --train \
        --data "{{data_dir}}" \
        --adapter-path "{{models_dir}}/adapters" \
        --config "lora_config.yaml" \
        --max-seq-len 1024


# Step 5: Fuse LoRA into base model
fuse:
    @echo "--- Step 5: Fusing LoRA into base model ---"
    @mkdir -p "{{models_dir}}/fused"
    @uv run mlx_lm.fuse \
        --model "{{finetuning_model}}" \
        --adapter-path "{{models_dir}}/adapters" \
        --save-path "{{models_dir}}/fused"


# Step 6: Convert to GGUF
convert: check
    @echo "--- Step 6: Converting to GGUF ---"
    @llama_api/scripts/patch-gguf-converter.sh "$LLAMA_CPP_DIR" "{{models_dir}}/fused" > /dev/null 2>&1
    @echo "[convert] Running convert_hf_to_gguf.py ..."
    @uv run python "$LLAMA_CPP_DIR/convert_hf_to_gguf.py" \
        "{{models_dir}}/fused" \
        --outfile "{{models_dir}}/fused-f16.gguf" \
        --outtype f16 > /tmp/convert.log 2>&1
    @echo "[convert] Done — f16 GGUF ready"
    @echo "[convert] Quantizing to Q4_K_M ..."
    @"$LLAMA_CPP_DIR/build/bin/llama-quantize" \
        "{{models_dir}}/fused-f16.gguf" \
        "{{models_dir}}/{{hf_model_file}}" \
        q4_k_m > /tmp/quantize.log 2>&1
    @echo "[convert] Done — {{hf_model_file}} ready"


# Step 7: Upload to HuggingFace
upload:
    @echo "--- Step 7: Uploading to HuggingFace ---"
    @if [ -n "$HF_TOKEN" ]; then \
        echo "Uploading {{hf_model_file}} to {{hf_model_repo}} ..."; \
        hf upload "{{hf_model_repo}}" "{{models_dir}}/{{hf_model_file}}" "{{hf_model_file}}" --repo-type model; \
        echo "Upload complete: https://huggingface.co/{{hf_model_repo}}"; \
    else \
        echo "HF_TOKEN not set -- skipping upload."; \
        echo "Set HF_TOKEN in .env to auto-upload to {{hf_model_repo}}"; \
    fi

# Pre-download the finetuning model
download:
    @echo "--- Downloading {{finetuning_model}} ---"
    @hf download "{{finetuning_model}}"
