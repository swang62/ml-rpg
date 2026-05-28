FROM python:3.14-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY pyproject.toml .
COPY rag_api/ /app/rag_api/

RUN uv sync --quiet --inexact && uv run -- spacy download en_core_web_sm

ENV PYTHONPATH=/app
CMD ["uv", "run", "uvicorn", "rag_api.app:app", "--host", "0.0.0.0", "--port", "8000"]
