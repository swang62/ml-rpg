import logging

from rag_api.config import MAX_TEXT_SIZE

from ..schemas import RetrieveResponse
from .embedding import embed_query
from .keyword_extraction import extract_keywords
from .vector_search import deduplicate_sources, hybrid_search

__all__ = ["retrieve"]

logger = logging.getLogger("rag_api")


async def retrieve(query: str) -> RetrieveResponse:
    logger.debug("retrieve: query=%r", query[:MAX_TEXT_SIZE])

    keywords = extract_keywords(query)
    logger.debug("extracted keywords: %s", keywords)
    if not keywords:
        logger.debug("no keywords found — returning empty")
        return RetrieveResponse(sources=[], keywords=[])

    embedding = await embed_query(query)
    logger.debug("embedding dims=%d", len(embedding))

    chunks = hybrid_search(embedding, keywords)
    logger.debug("hybrid search returned %d chunks", len(chunks))

    sources = deduplicate_sources(chunks)
    logger.debug("deduped to %d sources", len(sources))
    for s in sources:
        logger.debug("  source: %s (score=%.3f)", s.url, s.relevance)

    return RetrieveResponse(sources=sources, keywords=keywords)
