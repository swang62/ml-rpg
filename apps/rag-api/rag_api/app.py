import asyncio
import logging
import re
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request

from .config import (
    IDLE_TIMEOUT,
    LOG_LEVEL,
    MAX_TEXT_SIZE,
    MIN_TEXT_SIZE,
)
from .jailbreak.detect import check
from .retrieval.embedding import (
    embed_queries,
    is_embedder_loading,
    preload_embedder,
    unload_embedder,
)
from .retrieval.keyword_extract import unload_nlp_core
from .retrieval.routes import retrieve
from .retrieval.vector_search import close_vectordb, hybrid_search
from .schemas import (
    BatchChunkResult,
    BatchQueryResult,
    EmbedRequest,
    EmbedResponse,
    EnrichRequest,
    EnrichResponse,
    GuardRequest,
    GuardResponse,
    RetrieveBatchRequest,
    RetrieveBatchResponse,
    RetrieveRequest,
    RetrieveResponse,
)

_log_level = getattr(logging, LOG_LEVEL, logging.INFO)
logging.basicConfig(
    level=_log_level, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

for lib in (
    "asyncio",
    "httpx",
    "httpcore",
    "lancedb",
    "filelock",
    "uvicorn.access",
):
    logging.getLogger(lib).setLevel(logging.WARNING)

logger = logging.getLogger("rag_api")

_last_request_time = 0.0
_unloaded = False


async def _idle_unloader():
    global _last_request_time, _unloaded
    while True:
        await asyncio.sleep(IDLE_TIMEOUT)
        idle = time.monotonic() - _last_request_time
        if idle >= IDLE_TIMEOUT and not _unloaded:
            logger.info("idle for %.0fs — unloading resources...", idle)
            unload_nlp_core()
            close_vectordb()
            unload_embedder()
            _unloaded = True


@asynccontextmanager
async def lifespan(_app: FastAPI):
    global _last_request_time
    _last_request_time = time.monotonic()
    preload_embedder()
    unloader = asyncio.create_task(_idle_unloader())

    yield

    unloader.cancel()
    close_vectordb()
    unload_embedder()


app = FastAPI(title="rag-api", lifespan=lifespan)


@app.middleware("http")
async def track_request(request: Request, call_next):
    if request.url.path not in ("/health", "/status"):
        global _last_request_time, _unloaded
        _last_request_time = time.monotonic()
        _unloaded = False
    return await call_next(request)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.get("/status")
async def service_status():
    return {"idle": _unloaded, "model_loading": is_embedder_loading()}


@app.post("/embed", response_model=EmbedResponse)
async def embed_endpoint(req: EmbedRequest) -> EmbedResponse:
    try:
        embeddings = await embed_queries(req.texts)
        return EmbedResponse(embeddings=embeddings)
    except Exception:
        logger.exception("embed failed for %d texts", len(req.texts))
        raise HTTPException(status_code=500, detail="embedding failed")


@app.post("/guard", response_model=GuardResponse)
async def guard_endpoint(req: GuardRequest) -> GuardResponse:
    score, jailbreak = check(req.query)
    return GuardResponse(jailbreak=jailbreak, score=score)


@app.post("/retrieve", response_model=RetrieveResponse)
async def retrieve_endpoint(req: RetrieveRequest) -> RetrieveResponse:
    try:
        if len(req.query) < MIN_TEXT_SIZE:
            return RetrieveResponse(chunks=[], keywords=[], sources=[])

        return await retrieve(req.query)
    except Exception:
        logger.exception("retrieve failed for query: %r", req.query[:MAX_TEXT_SIZE])
        raise HTTPException(status_code=500, detail="internal error")


@app.post("/retrieve_chunks", response_model=RetrieveBatchResponse)
async def retrieve_chunks_batch(req: RetrieveBatchRequest) -> RetrieveBatchResponse:
    queries = [q[:MAX_TEXT_SIZE] for q in req.queries]
    embeddings: list[list[float] | None] = [None] * len(queries)

    logger.info("retrieve_chunks: %d queries", len(queries))

    valid_queries = [(i, q) for i, q in enumerate(queries) if len(q) >= MIN_TEXT_SIZE]
    if valid_queries:
        idxs, texts = zip(*valid_queries)
        logger.info("  -> %d valid, calling fastembed ...", len(valid_queries))
        try:
            batch_results = await embed_queries(list(texts))
            logger.info("  -> fastembed returned %d embeddings", len(batch_results))
            for idx, emb in zip(idxs, batch_results):
                embeddings[idx] = emb
        except Exception:
            logger.exception("fastembed failed for batch — returning empty results")

    results = []
    total_chunks = 0
    for query, embedding in zip(queries, embeddings):
        if not embedding:
            results.append(BatchQueryResult(chunks=[]))
        else:
            raw = hybrid_search(embedding, query)
            total_chunks += len(raw)
            results.append(
                BatchQueryResult(
                    chunks=[
                        BatchChunkResult(title=r["lessonTitle"], text=r["text"])
                        for r in raw
                    ]
                )
            )

    logger.info("  -> %d queries returned %d total chunks", len(results), total_chunks)
    return RetrieveBatchResponse(results=results)


_vectorizer_cache: tuple | None = None


@app.post("/extract_keywords", response_model=EnrichResponse)
async def extract_keywords_batch(req: EnrichRequest):
    global _vectorizer_cache

    cleaned = []
    for html in req.texts:
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text).strip()
        cleaned.append(text)

    from sklearn.feature_extraction.text import TfidfVectorizer

    if _vectorizer_cache is None:
        vectorizer = TfidfVectorizer(
            stop_words="english",
            token_pattern=r"(?u)\b[a-zA-Z]{5,}\b",
            max_df=0.85,
            min_df=2,
        )
        tfidf = vectorizer.fit_transform(cleaned)
        features = vectorizer.get_feature_names_out()
        _vectorizer_cache = (vectorizer, features)
    else:
        vectorizer, features = _vectorizer_cache
        tfidf = vectorizer.transform(cleaned)

    results = []
    for i in range(len(cleaned)):
        row = tfidf[i].toarray().flatten()  # type: ignore[index]
        top = row.argsort()[-5:][::-1]
        keywords = [features[idx] for idx in top if row[idx] > 0]
        results.append(keywords)

    return EnrichResponse(results=results)
