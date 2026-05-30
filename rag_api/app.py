import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from .config import LOG_LEVEL, MAX_TEXT_SIZE, MIN_TEXT_SIZE
from .retrieval.embedding import close_client, embed_queries
from .retrieval.keyword_extract import load_nlp_core
from .retrieval.routes import retrieve
from .retrieval.vector_search import hybrid_search
from .schemas import (
    BatchChunkResult,
    BatchQueryResult,
    RetrieveBatchRequest,
    RetrieveBatchResponse,
    RetrieveRequest,
    RetrieveResponse,
)

_log_level = getattr(logging, LOG_LEVEL, logging.INFO)
logging.basicConfig(
    level=_log_level, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

# Silence noisy libraries — only show their WARNING+ messages
for lib in ("asyncio", "httpx", "httpcore", "lancedb", "uvicorn.access"):
    logging.getLogger(lib).setLevel(logging.WARNING)

logger = logging.getLogger("rag_api")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    logger.info("starting up — pre-warming spaCy")
    try:
        await asyncio.to_thread(load_nlp_core)
    except Exception:
        logger.exception("failed to load spaCy model — keyword extraction disabled")
    logger.info("warm-up complete")
    yield
    await close_client()


app = FastAPI(title="rag-api", lifespan=lifespan)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/retrieve", response_model=RetrieveResponse)
async def retrieve_endpoint(req: RetrieveRequest) -> RetrieveResponse:
    try:
        if len(req.query) < MIN_TEXT_SIZE:
            return RetrieveResponse(chunks=[], keywords=[], sources=[])

        return await retrieve(req.query)
    except Exception:
        raise HTTPException(status_code=500, detail="internal error")


@app.post("/retrieve_chunks", response_model=RetrieveBatchResponse)
async def retrieve_chunks_batch(req: RetrieveBatchRequest) -> RetrieveBatchResponse:
    queries = [q[:MAX_TEXT_SIZE] for q in req.queries]
    embeddings: list[list[float] | None] = [None] * len(queries)

    logger.info("retrieve_chunks: %d queries", len(queries))

    # Step 1: embed all queries via Voyage
    valid_queries = [(i, q) for i, q in enumerate(queries) if len(q) >= MIN_TEXT_SIZE]
    if valid_queries:
        idxs, texts = zip(*valid_queries)
        logger.info("  -> %d valid, calling Voyage API ...", len(valid_queries))
        try:
            batch_results = await embed_queries(list(texts))
            logger.info("  -> Voyage returned %d embeddings", len(batch_results))
            for idx, emb in zip(idxs, batch_results):
                embeddings[idx] = emb
        except Exception:
            logger.exception(
                "Voyage embedding failed for batch — returning empty results"
            )

    # Step 2: hybrid search for each (local, fast)
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
