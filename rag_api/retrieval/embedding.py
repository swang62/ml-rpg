import logging
import os
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from fastembed import TextEmbedding

from ..config import FASTEMBED_BATCH_SIZE, FASTEMBED_MODEL_NAME

logger = logging.getLogger("rag_api")

_embedder: TextEmbedding | None = None
_executor = ThreadPoolExecutor(max_workers=1)


def _hf_cache_dir() -> str:
    """Return the HuggingFace cache directory for model downloads."""
    return os.environ.get(
        "HF_HUB_CACHE",
        os.environ.get(
            "HF_HOME",
            str(Path.home() / ".cache" / "huggingface" / "hub"),
        ),
    )


def get_embedder() -> TextEmbedding:
    global _embedder
    if _embedder is None:
        logger.info("loading fastembed model: %s", FASTEMBED_MODEL_NAME)
        _embedder = TextEmbedding(
            model_name=FASTEMBED_MODEL_NAME,
            max_length=512,
            cache_dir=_hf_cache_dir(),
        )
        logger.info("fastembed model loaded (cache: %s)", _hf_cache_dir())
    return _embedder


def unload_embedder() -> None:
    global _embedder
    if _embedder is not None:
        logger.info("unloading fastembed model")
        _embedder = None


async def embed_query(query: str) -> list[float]:
    loop = __import__("asyncio").get_event_loop()
    return await loop.run_in_executor(_executor, _embed_single, query)


def _embed_single(text: str) -> list[float]:
    embedder = get_embedder()
    results = list(embedder.embed([text], batch_size=1))
    return results[0].tolist()


async def embed_queries(texts: list[str]) -> list[list[float]]:
    if not texts:
        return []
    loop = __import__("asyncio").get_event_loop()
    return await loop.run_in_executor(_executor, _embed_batch, texts)


async def embed_documents(texts: list[str]) -> list[list[float]]:
    return await embed_queries(texts)


def _embed_batch(texts: list[str]) -> list[list[float]]:
    embedder = get_embedder()
    results = list(embedder.embed(texts, batch_size=FASTEMBED_BATCH_SIZE))
    return [r.tolist() for r in results]
