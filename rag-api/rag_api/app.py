from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from .retrieval.vector_search import close_table
from .schemas import RetrieveRequest, RetrieveResponse
from .retrieval import retrieve


@asynccontextmanager
async def lifespan(_app: FastAPI):
    yield
    close_table()


app = FastAPI(title="rag-api", lifespan=lifespan)


@app.post("/retrieve", response_model=RetrieveResponse)
async def retrieve_endpoint(req: RetrieveRequest) -> RetrieveResponse:
    try:
        return await retrieve(req.query)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
