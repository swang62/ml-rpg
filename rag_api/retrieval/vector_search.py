from ..config import GITHUB_REPO_URL, LANCEDB_PATH, MAX_SOURCES
from ..schemas import SourceResult

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

    # Only return github repo url if about the course
    for r in chunks:
        if r.get("lessonUrl") == GITHUB_REPO_URL:
            return [r]

    return chunks


def deduplicate_sources(chunks: list[dict]) -> list[SourceResult]:
    seen: dict[str, SourceResult] = {}

    for chunk in chunks:
        lesson_url = chunk["lessonUrl"]
        score = chunk.get("_relevance_score", 0.0)
        existing = seen.get(lesson_url)

        if existing is not None:
            if score > existing.relevance:
                existing.relevance = score
        else:
            seen[lesson_url] = SourceResult(
                title=chunk["lessonTitle"],
                url=chunk["lessonUrl"],
                text=chunk["text"],
                categoryTitle=chunk["categoryTitle"],
                sectionTitle=chunk["sectionTitle"],
                courseTitle=chunk["courseTitle"],
                relevance=score,
            )

    return sorted(seen.values(), key=lambda s: s.relevance, reverse=True)
