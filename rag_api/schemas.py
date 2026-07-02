from pydantic import BaseModel


class RetrieveRequest(BaseModel):
    query: str


class BatchChunkResult(BaseModel):
    title: str
    text: str


class BatchQueryResult(BaseModel):
    chunks: list[BatchChunkResult]


class RetrieveBatchRequest(BaseModel):
    queries: list[str]


class RetrieveBatchResponse(BaseModel):
    results: list[BatchQueryResult]


class SourceResult(BaseModel):
    title: str
    url: str
    score: float


class ChunkResult(BaseModel):
    title: str
    url: str
    text: str
    categoryTitle: str
    sectionTitle: str
    courseTitle: str
    relevance: float


class RetrieveResponse(BaseModel):
    chunks: list[ChunkResult]
    sources: list[SourceResult]
    keywords: list[str]


class EnrichRequest(BaseModel):
    texts: list[str]


class EnrichResponse(BaseModel):
    results: list[list[str]]


class GuardRequest(BaseModel):
    query: str


class GuardResponse(BaseModel):
    jailbreak: bool
    score: float
