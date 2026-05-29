FROM ghcr.io/ggml-org/llama.cpp:server

COPY llama_api/start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENV MODEL_PATH=/app/model.gguf \
    HF_MODEL_REPO=scubastevve/ml-rpg-bob \
    HF_MODEL_FILE=bob-q4_k_m.gguf

EXPOSE 8080

ENTRYPOINT ["/app/start.sh"]
