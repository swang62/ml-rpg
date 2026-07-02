import logging

from ..config import MAX_TEXT_SIZE
from ..schemas import RetrieveResponse
from .embedding import embed_query
from .keyword_extract import extract_keywords
from .vector_search import (
    deduplicate_sources,
    filter_by_keywords,
    hybrid_search,
    to_chunk_result,
)

logger = logging.getLogger("rag_api")


async def retrieve(query: str) -> RetrieveResponse:
    logger.debug("retrieve: query=%r", query[:MAX_TEXT_SIZE])

    keywords = extract_keywords(query)
    logger.debug("extracted keywords: %s", keywords)

    if not keywords:
        return RetrieveResponse(chunks=[], sources=[], keywords=[])

    embedding = await embed_query(query)
    logger.debug("generated fastembed embedding dims=%d", len(embedding))

    chunks = hybrid_search(embedding, query)
    logger.debug("hybrid search returned %d raw chunks", len(chunks))

    chunks = filter_by_keywords(chunks, keywords)
    logger.debug("after keyword filter: %d chunks", len(chunks))

    chunk_results = [to_chunk_result(c) for c in chunks]
    sources = deduplicate_sources(chunks)
    logger.debug("deduped to %d sources", len(sources))

    return RetrieveResponse(
        chunks=chunk_results,
        sources=sources,
        keywords=keywords,
    )
