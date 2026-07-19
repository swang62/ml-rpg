import logging

import lancedb

from ..config import (
    GITHUB_REPO_URL,
    INITIAL_RAG_CHUNKS,
    LANCEDB_PATH,
    MIN_RAG_SCORE,
    TOP_K_CHUNKS,
)
from ..schemas import ChunkResult, SourceResult

_table = None


def get_vectordb():
    global _table
    if _table is not None:
        return _table

    db = lancedb.connect(LANCEDB_PATH)
    table_names = db.table_names()
    if "chunks" not in table_names:
        raise RuntimeError("LanceDB 'chunks' table not found — index has not been built yet")
    _table = db.open_table("chunks")
    return _table


def close_vectordb():
    global _table
    _table = None


logger = logging.getLogger("rag_api")


def hybrid_search(embedding: list[float], query: str) -> list[dict]:
    vectordb = get_vectordb()

    chunks = (
        vectordb.search(query_type="hybrid", fts_columns=["text", "lessonTitle"])
        .vector(embedding)
        .text(query)
        .limit(INITIAL_RAG_CHUNKS)
        .to_list()
    )

    query_lower = query.lower()
    for chunk in chunks:
        tags = chunk.get("tags") or []
        if any(tag.lower() in query_lower for tag in tags):
            chunk["_relevance_score"] = chunk.get("_relevance_score", 0.0) * 1.2

    # If any of the chunks are from the GitHub repo, return all repo chunks.
    for r in chunks:
        if r.get("lessonUrl") == GITHUB_REPO_URL:
            return [c for c in chunks if c.get("lessonUrl") == GITHUB_REPO_URL]

    chunks = [c for c in chunks if c.get("_relevance_score", 0.0) >= MIN_RAG_SCORE]
    return chunks[:TOP_K_CHUNKS]


def map_chunk_result(raw: dict) -> ChunkResult:
    return ChunkResult(
        title=raw["lessonTitle"],
        url=raw["lessonUrl"],
        text=raw["text"],
        categoryTitle=raw["categoryTitle"],
        sectionTitle=raw["sectionTitle"],
        courseTitle=raw["courseTitle"],
        relevance=raw.get("_relevance_score", 0.0),
    )


def deduplicate_sources(chunks: list[dict]) -> list[SourceResult]:
    seen: dict[str, SourceResult] = {}

    for chunk in chunks:
        lesson_url = chunk["lessonUrl"]
        lesson_title = chunk["lessonTitle"]
        score = chunk.get("_relevance_score", 0.0)
        existing_source = seen.get(lesson_url)

        if existing_source is not None:
            if score > existing_source.score:
                existing_source.score = score
        else:
            seen[lesson_url] = SourceResult(
                title=lesson_title, url=lesson_url, score=score
            )

    return sorted(seen.values(), key=lambda s: s.score, reverse=True)
