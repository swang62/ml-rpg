set dotenv-load := true
set shell := ["bash", "-euo", "pipefail", "-c"]

# Model settings
finetuning_model := "unsloth/Llama-3.2-3B-Instruct"
ollama_model := env_var_or_default("OLLAMA_MODEL", "gpt-oss:20b")

# Preprocessing
examples_per_category := "100"
test_set_pct := "0.1"

# HF upload
hf_model_repo := env_var_or_default("HF_MODEL_REPO", "scubastevve/ml-rpg-bob")
hf_model_file := env_var_or_default("HF_MODEL_FILE", "bob.gguf")

# Timing format (bash TIMEFORMAT — shows elapsed real time only)
elapsed := "\n[elapsed]: %lR\n"

# Derived paths
root_dir := "llama_api"
data_dir := root_dir + "/data"
models_dir := root_dir + "/models"
log_dir := root_dir + "/logs"

# Run the full pipeline with timestamped log, no upload
default:
    @mkdir -p "{{log_dir}}" && \
    LOG="{{log_dir}}/train-$(date +%Y%m%d-%H%M%S).log" && \
    START=$(date +%s) && \
    echo "=== Pipeline started at $(date) ===" | tee -a "$LOG" && \
    just check generate preprocess train fuse convert test upload 2>&1 | tee -a "$LOG" && \
    ELAPSED=$(($(date +%s) - START)) && \
    MIN=$((ELAPSED / 60)) && \
    SEC=$((ELAPSED % 60)) && \
    HR=$((MIN / 60)) && \
    MIN=$((MIN % 60)) && \
    if [ "$HR" -gt 0 ]; then \
        ELAPSED_STR="${HR}h ${MIN}m ${SEC}s"; \
    elif [ "$MIN" -gt 0 ]; then \
        ELAPSED_STR="${MIN}m ${SEC}s"; \
    else \
        ELAPSED_STR="${SEC}s"; \
    fi && \
    TRAIN_LOSS=$(grep -o 'Iter [0-9]*: Train loss [0-9.]*' "$LOG" | tail -1 | sed 's/.*Train loss //') && \
    VAL_LOSS=$(grep -o 'Iter [0-9]*: Val loss [0-9.]*' "$LOG" | tail -1 | sed 's/.*Val loss //') && \
    echo "" && \
    echo "=== Results ===" && \
    echo "  Total elapsed:    $ELAPSED_STR" && \
    echo "  Final train loss: ${TRAIN_LOSS:-N/A}" && \
    echo "  Final val loss:   ${VAL_LOSS:-N/A}" && \
    echo "  GGUF:             $(du -h "{{models_dir}}/{{hf_model_file}}" 2>/dev/null | cut -f1)" && \
    echo "  Log:              ${LOG}" && \
    echo "=== Pipeline finished at $(date) ===" \


# Step 1: Ensure dependencies
check:
    @echo "--- Step 1: Ensuring dependencies ---"
    @TIMEFORMAT="{{elapsed}}"; time uv sync --group train --inexact
    @test -f "$LLAMA_CPP_DIR/convert_hf_to_gguf.py" || { echo "ERROR: llama.cpp scripts are missing"; exit 1; }
    @test -f "$LLAMA_CPP_DIR/build/bin/llama-quantize" || { echo "ERROR: llama.cpp binaries are missing"; exit 1; }
    @test -f "$LLAMA_CPP_DIR/build/bin/llama-server" || { echo "ERROR: llama.cpp binaries are missing"; exit 1; }


# Step 2: Generate training data
generate: check
    @echo "--- Step 2: Generating training data ---"
    @TIMEFORMAT="{{elapsed}}"; time uv run python -m llama_api.scripts.generate_training_data \
        --model "{{ollama_model}}" \
        --examples-per-category "{{examples_per_category}}" \
        --output "{{data_dir}}/training_raw.jsonl"


# Step 3: Format and split for MLX
preprocess: check
    @echo "--- Step 3: Formatting for MLX ---"
    -@bash -c '\
        kill_rag() { kill -9 $(lsof -ti:8001) 2>/dev/null || true; }; \
        trap kill_rag EXIT; \
        kill_rag; \
        uv run uvicorn rag_api.app:app --host 127.0.0.1 --port 8001 > /dev/stdout 2>&1 & \
        echo "[preprocess] Waiting for rag-api on :8001 ..."; \
        for i in $(seq 1 30); do \
            if curl -sf http://127.0.0.1:8001/health > /dev/null; then \
                echo "[preprocess] rag-api ready"; \
                break; \
            fi; \
            sleep 1; \
        done; \
        TIMEFORMAT="{{elapsed}}"; time uv run python -m llama_api.scripts.preprocessing \
            --input "{{data_dir}}/training_raw.jsonl" \
            --output-dir "{{data_dir}}" \
            --rag-api-url "http://localhost:8001" \
            --val-pct "{{test_set_pct}}" \
            --model-family llama \
    '


# Step 4: Train LoRA adapters
train: check
    @echo "--- Step 4: Training LoRA adapters ---"
    @mkdir -p "{{models_dir}}/adapters"
    @TIMEFORMAT="{{elapsed}}"; time uv run mlx_lm.lora \
        --model "{{finetuning_model}}" \
        --train \
        --data "{{data_dir}}" \
        --adapter-path "{{models_dir}}/adapters" \
        --config "lora_config.yaml" \
        --max-seq-len 1024 \
        --save-every 999999


# Step 5: Fuse LoRA into base model
fuse:
    @echo "--- Step 5: Fusing LoRA into base model ---"
    @mkdir -p "{{models_dir}}/fused"
    @TIMEFORMAT="{{elapsed}}"; time uv run mlx_lm.fuse \
        --model "{{finetuning_model}}" \
        --adapter-path "{{models_dir}}/adapters" \
        --save-path "{{models_dir}}/fused"

# Step 6: Convert to GGUF
convert: check
    @echo "--- Step 6: Converting to GGUF ---"
    @TIMEFORMAT="{{elapsed}}"; time bash -c '\
        echo "[convert] Running convert_hf_to_gguf.py ..."; \
        uv run python "$LLAMA_CPP_DIR/convert_hf_to_gguf.py" \
            "{{models_dir}}/fused" \
            --outfile "{{models_dir}}/fused-f16.gguf" \
            --outtype f16 > /tmp/convert.log 2>&1; \
        echo "[convert] Done — f16 GGUF ready"; \
        echo "[convert] Quantizing to Q4_K_M ..."; \
        "$LLAMA_CPP_DIR/build/bin/llama-quantize" \
            "{{models_dir}}/fused-f16.gguf" \
            "{{models_dir}}/{{hf_model_file}}" \
            q4_k_m > /tmp/quantize.log 2>&1; \
        echo "[convert] Done — {{hf_model_file}} ready" \
    '


# Step 7: Test the GGUF with random questions from training data
test:
    @echo "--- Testing GGUF model ---"
    @TIMEFORMAT="{{elapsed}}"; time uv run python -m llama_api.scripts.eval_model \
        "{{models_dir}}/{{hf_model_file}}" \
        "{{data_dir}}/valid.jsonl" \
        8082 \
        "$LLAMA_CPP_DIR/build/bin/llama-server" \
        10


# Step 8: Upload to HuggingFace
upload:
    @echo "--- Step 8: Uploading to HuggingFace ---"
    @TIMEFORMAT="{{elapsed}}"; time bash -c '\
        if [ -n "$HF_TOKEN" ]; then \
            echo "Uploading {{hf_model_file}} to {{hf_model_repo}} ..."; \
            hf upload "{{hf_model_repo}}" "{{models_dir}}/{{hf_model_file}}" "{{hf_model_file}}" --repo-type model; \
            echo "Upload complete: https://huggingface.co/{{hf_model_repo}}"; \
        else \
            echo "HF_TOKEN not set -- skipping upload."; \
            echo "Set HF_TOKEN in .env to auto-upload to {{hf_model_repo}}"; \
        fi \
    '

# Preload the finetuning model
download:
    @echo "--- Downloading {{finetuning_model}} ---"
    @hf download "{{finetuning_model}}"
