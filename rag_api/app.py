import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from .retrieval.embedding import close_client
from .retrieval.keyword_extraction import extract_keywords, warm_nlp
from .retrieval.vector_search import _get_table, close_table
from .schemas import RetrieveRequest, RetrieveResponse
from .retrieval import retrieve


@asynccontextmanager
async def lifespan(_app: FastAPI):
    await asyncio.to_thread(warm_nlp)
    await asyncio.to_thread(_get_table)
    yield
    close_table()
    await close_client()


app = FastAPI(title="rag-api", lifespan=lifespan)


@app.post("/retrieve", response_model=RetrieveResponse)
async def retrieve_endpoint(req: RetrieveRequest) -> RetrieveResponse:
    try:
        return await retrieve(req.query)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
