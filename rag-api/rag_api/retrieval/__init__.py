from ..schemas import RetrieveResponse

from .embedding import embed_query
from .keyword_extraction import extract_keywords
from .vector_search import deduplicate_sources, hybrid_search

__all__ = ["retrieve"]


async def retrieve(query: str) -> RetrieveResponse:
    if not query:
        return RetrieveResponse(sources=[], keywords=[])

    keywords = extract_keywords(query)
    if not keywords:
        return RetrieveResponse(sources=[], keywords=[])

    embedding = await embed_query(query)
    chunks = await hybrid_search(embedding, keywords)
    sources = deduplicate_sources(chunks)

    return RetrieveResponse(sources=sources, keywords=keywords)
