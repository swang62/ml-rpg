import logging
import os
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from fastembed import TextEmbedding
from huggingface_hub import snapshot_download

from ..config import FASTEMBED_BATCH_SIZE, FASTEMBED_MAX_LENGTH, FASTEMBED_MODEL_NAME

logger = logging.getLogger("rag_api")

_embedder: TextEmbedding | None = None
_embedder_loading: bool = False
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


def is_embedder_loading() -> bool:
    return _embedder_loading


def is_embedder_loaded() -> bool:
    return _embedder is not None


def _load_embedder() -> TextEmbedding:
    logger.info("loading fastembed model: %s", FASTEMBED_MODEL_NAME)
    embedder = TextEmbedding(
        model_name=FASTEMBED_MODEL_NAME,
        max_length=FASTEMBED_MAX_LENGTH,
        cache_dir=_hf_cache_dir(),
    )
    logger.info("fastembed model loaded (cache: %s)", _hf_cache_dir())
    return embedder


def _fastembed_hf_repo_id() -> str:
    supported_models = TextEmbedding.list_supported_models()
    for supported_model in supported_models:
        if supported_model.get("model") != FASTEMBED_MODEL_NAME:
            continue

        hf_repo = supported_model.get("sources", {}).get("hf")
        if hf_repo:
            return hf_repo

        break

    return FASTEMBED_MODEL_NAME


def _prefetch_model_files() -> None:
    hf_repo_id = _fastembed_hf_repo_id()
    logger.info(
        "prefetching fastembed model files: %s (hf repo: %s)",
        FASTEMBED_MODEL_NAME,
        hf_repo_id,
    )
    snapshot_download(
        repo_id=hf_repo_id,
        cache_dir=_hf_cache_dir(),
        token=os.environ.get("HF_TOKEN"),
    )
    logger.info("fastembed model files ready in cache: %s", _hf_cache_dir())


def has_cached_model_files() -> bool:
    hf_repo_id = _fastembed_hf_repo_id()

    try:
        snapshot_download(
            repo_id=hf_repo_id,
            cache_dir=_hf_cache_dir(),
            token=os.environ.get("HF_TOKEN"),
            local_files_only=True,
        )
        return True
    except Exception:
        return False


def preload_embedder() -> None:
    global _embedder_loading

    if _embedder is not None or _embedder_loading:
        return

    if has_cached_model_files():
        logger.info("fastembed model files already cached; skipping preload")
        return

    _embedder_loading = True

    _executor.submit(_prefetch_model_files_in_background)


def _prefetch_model_files_in_background() -> None:
    global _embedder_loading

    try:
        _prefetch_model_files()
    except Exception:
        logger.exception("failed to prefetch fastembed model files")
    finally:
        _embedder_loading = False


def get_embedder() -> TextEmbedding:
    global _embedder, _embedder_loading

    if _embedder is not None:
        return _embedder

    try:
        _embedder_loading = True
        _embedder = _load_embedder()
    finally:
        _embedder_loading = False

    if _embedder is None:
        raise RuntimeError("fastembed model failed to load")

    return _embedder


def unload_embedder() -> None:
    global _embedder, _embedder_loading
    if _embedder is not None:
        logger.info("unloading fastembed model")
        _embedder = None
    _embedder_loading = False


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
