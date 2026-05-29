FROM ghcr.io/ggml-org/llama.cpp:server

# Install hf CLI for model downloads
RUN curl -LsSf https://hf.co/cli/install.sh | bash -s

COPY llama_api/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV HF_MODEL_REPO=ggml-org/gemma-3-4b-it-GGUF
ENV HF_MODEL_FILE=gemma-3-4b-it-Q4_K_M.gguf

EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]
