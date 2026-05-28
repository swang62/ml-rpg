from pydantic import BaseModel


class RetrieveRequest(BaseModel):
    query: str


class SourceResult(BaseModel):
    title: str
    url: str
    text: str
    categoryTitle: str
    sectionTitle: str
    courseTitle: str
    relevance: float


class RetrieveResponse(BaseModel):
    sources: list[SourceResult]
    keywords: list[str]
