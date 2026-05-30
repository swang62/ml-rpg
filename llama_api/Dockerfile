FROM ghcr.io/ggml-org/llama.cpp:server

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV HF_MODEL_REPO=scubastevve/ml-rpg-bob
ENV HF_MODEL_FILE=bob.gguf

EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]
