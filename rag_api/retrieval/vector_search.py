from ..config import GITHUB_REPO_URL, LANCEDB_PATH, MAX_RAG_CHUNKS, MIN_RAG_SCORE
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
        .limit(MAX_RAG_CHUNKS)
        .to_list()
    )

    for r in chunks:
        if r.get("lessonUrl") == GITHUB_REPO_URL:
            return [r]

    return [c for c in chunks if c.get("_relevance_score", 0.0) >= MIN_RAG_SCORE]


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
            seen[lesson_url] = SourceResult(title=lesson_title, url=lesson_url, score=score)

    return sorted(seen.values(), key=lambda s: s.score, reverse=True)
