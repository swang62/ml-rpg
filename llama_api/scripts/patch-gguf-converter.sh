#!/bin/bash
set -euo pipefail

LLAMA_CPP_DIR="${1:-$LLAMA_CPP_DIR}"
MODEL_DIR="${2:-LLAMA_MODELS_DIR}"
if [ -z "$LLAMA_CPP_DIR" ] || [ ! -d "$LLAMA_CPP_DIR" ]; then
    echo "Usage: $0 <path/to/llama.cpp> [path/to/fused/model]"
    echo "Or set LLAMA_CPP_DIR environment variable"
    exit 1
fi

CHKHSH="789696f5946cc0fc59371f39f6097cafed196b3acded6140432f26bbb1ae1669"
needs_rebuild=false

# --- Patch 1: Python converter (conversion/base.py) ---
BASE_PY="$LLAMA_CPP_DIR/conversion/base.py"
if [ ! -f "$BASE_PY" ]; then
    echo "WARNING: $BASE_PY not found — run convert_hf_to_gguf_update.py first"
else
    if grep -q "$CHKHSH" "$BASE_PY"; then
        echo "[ok] Python converter script patched"
    else
        LINE=$(grep -n "if chkhsh == " "$BASE_PY" | tail -1 | cut -d: -f1)
        if [ -n "$LINE" ]; then
            sed -i '' "${LINE}a\\
        if chkhsh == \"$CHKHSH\":\\
            # ref: https://huggingface.co/google/gemma-3-4b-it\\
            res = \"gemma-3\"
" "$BASE_PY"
            echo "[patched] Python converter — added Gemma 3 tokenizer"
        fi
    fi
fi

# --- Patch 2: C++ runtime (src/llama-vocab.cpp) ---
VOCAB_CPP="$LLAMA_CPP_DIR/src/llama-vocab.cpp"
if [ ! -f "$VOCAB_CPP" ]; then
    echo "WARNING: $VOCAB_CPP not found"
else
    if grep -q 'tokenizer_pre == "gemma-3"' "$VOCAB_CPP"; then
        echo "[ok] llama.cpp runtime patched"
    else
        sed -i '' 's/tokenizer_pre == "gemma4")/tokenizer_pre == "gemma-3" ||\n                    tokenizer_pre == "gemma4")/' "$VOCAB_CPP"
        echo "[patched] C++ runtime — added Gemma 3 pre-tokenizer type"
        needs_rebuild=true
    fi
fi

# --- Patch 3: Fused model chat template ---
# Gemma 3's official template uses raise_exception which llama.cpp can't parse.
# Replace with a simpler equivalent — only for Gemma models.
CONFIG_FILE="${MODEL_DIR}/config.json"
TEMPLATE_FILE="${MODEL_DIR}/chat_template.jinja"
if [ -d "$MODEL_DIR" ] && [ -f "$CONFIG_FILE" ]; then
    MODEL_TYPE=$(python3 -c "import json; print(json.load(open('$CONFIG_FILE')).get('text_config', {}).get('model_type', json.load(open('$CONFIG_FILE')).get('model_type', '')))")
    if echo "$MODEL_TYPE" | grep -qi "gemma"; then
        cat > "$TEMPLATE_FILE" << 'TEMPLATE'
{%- for message in messages %}
{%- if message["role"] == "assistant" %}
{%- set role = "model" %}
{%- else %}
{%- set role = message["role"] %}
{%- endif %}
<start_of_turn>{{ role }}
{{ message["content"] }}<end_of_turn>
{%- endfor %}
{%- if add_generation_prompt %}
<start_of_turn>model
{% endif %}
TEMPLATE
        echo "[ok] Chat template patched (gemma)"
    else
        echo "[skip] Chat template patch only applies to gemma (detected: $MODEL_TYPE)"
    fi
fi

if [ "$needs_rebuild" = true ]; then
    echo "Rebuilding llama-server..."
    cd "$LLAMA_CPP_DIR"
    cmake --build build -j --target llama-server 2>&1
    echo "Done."
fi
