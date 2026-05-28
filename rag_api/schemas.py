from pydantic import BaseModel


class RetrieveRequest(BaseModel):
    query: str


class SourceResult(BaseModel):
    title: str
    url: str


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
