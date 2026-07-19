FROM ghcr.io/ggml-org/llama.cpp:server

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip \
    && pip3 install --break-system-packages --no-cache-dir huggingface-hub hf_transfer \
    && rm -rf /var/lib/apt/lists/*

ENV MODEL_PATH=/app/models
ENV HF_MODEL_REPO=scubastevve/ml-rpg-bob
ENV HF_MODEL_FILE=bob.gguf

RUN mkdir -p $MODEL_PATH

# App source — changes most frequently
COPY entrypoint.sh /app/entrypoint.sh
COPY scripts/ /app/scripts/

RUN chmod +x /app/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]
