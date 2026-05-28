from ..config import GITHUB_REPO_URL, LANCEDB_PATH, MAX_SOURCES
from ..schemas import ChunkResult, SourceResult

_table = None


def get_vectordb():
    global _table
    if _table is not None:
        return _table

    import lancedb

    db = lancedb.connect(LANCEDB_PATH)
    _table = db.open_table("chunks")
    return _table


def close_vectordb():
    global _table
    _table = None


def hybrid_search(embedding: list[float], keywords: list[str]) -> list[dict]:
    vectordb = get_vectordb()
    chunks = (
        vectordb.search(query_type="hybrid")
        .vector(embedding)
        .text(" ".join(keywords))
        .limit(MAX_SOURCES)
        .to_list()
    )

    for r in chunks:
        if r.get("lessonUrl") == GITHUB_REPO_URL:
            return [r]

    return chunks


def to_chunk_result(raw: dict) -> ChunkResult:
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
    seen: dict[str, tuple[SourceResult, float]] = {}

    for chunk in chunks:
        lesson_url = chunk["lessonUrl"]
        score = chunk.get("_relevance_score", 0.0)
        existing = seen.get(lesson_url)

        if existing is None or score > existing[1]:
            seen[lesson_url] = (
                SourceResult(
                    title=chunk["lessonTitle"],
                    url=chunk["lessonUrl"],
                ),
                score,
            )

    return [s for s, _ in sorted(seen.values(), key=lambda x: x[1], reverse=True)]
