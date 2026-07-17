FROM python:3.14-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml .
COPY rag_api/ /app/rag_api/

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --inexact && \
  uv run python -c "import en_core_web_sm" 2>/dev/null || uv run -- spacy download en_core_web_sm

RUN uv run python -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='qdrant/bge-small-en-v1.5-onnx-q', cache_dir='/root/.cache/huggingface/hub')"

ENV PYTHONPATH=/app
ENV HF_HUB_CACHE=/root/.cache/huggingface/hub
CMD ["uv", "run", "uvicorn", "rag_api.app:app", "--host", "0.0.0.0", "--port", "8000"]
