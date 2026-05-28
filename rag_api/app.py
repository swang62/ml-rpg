import asyncio
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from rag_api.config import LOG_LEVEL, MIN_TEXT_SIZE

from .retrieval.embedding import close_client
from .retrieval.keyword_extraction import warm_nlp
from .retrieval.vector_search import get_vectordb, close_vectordb
from .schemas import RetrieveRequest, RetrieveResponse
from .retrieval import retrieve

_log_level = getattr(logging, LOG_LEVEL, logging.INFO)
logging.basicConfig(level=_log_level, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")

# Silence noisy libraries — only show their WARNING+ messages
for lib in ("httpx", "httpcore", "lancedb", "uvicorn.access", "uvicorn.error"):
    logging.getLogger(lib).setLevel(logging.WARNING)

logger = logging.getLogger("rag_api")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    logger.info("starting up — pre-warming spaCy and LanceDB")
    try:
        await asyncio.to_thread(warm_nlp)
    except Exception:
        logger.exception("failed to load spaCy model — keyword extraction disabled")
    try:
        await asyncio.to_thread(get_vectordb)
    except Exception:
        logger.exception("failed to connect to LanceDB — hybrid search disabled")
    logger.info("warm-up complete")
    yield
    logger.info("shutting down")
    close_vectordb()
    await close_client()


app = FastAPI(title="rag-api", lifespan=lifespan)


@app.post("/retrieve", response_model=RetrieveResponse)
async def retrieve_endpoint(req: RetrieveRequest) -> RetrieveResponse:
    try:
        if len(req.query) < MIN_TEXT_SIZE:
            logger.debug("empty query — returning empty")
            return RetrieveResponse(chunks=[], keywords=[], sources=[])

        return await retrieve(req.query)
    except Exception:
        logger.exception("rag retrieval failed")
        raise HTTPException(status_code=500, detail="internal error")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("rag_api.app:app", host="0.0.0.0", port=8000, reload=True)
