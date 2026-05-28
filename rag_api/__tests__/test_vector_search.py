from rag_api.retrieval.vector_search import deduplicate_sources


def make_chunk(**overrides):
    chunk = {
        "id": "1",
        "text": "some text",
        "lessonTitle": "Lesson",
        "lessonUrl": "/course/ml/lesson-1",
        "categoryTitle": "ML",
        "sectionTitle": "Basics",
        "courseTitle": "Course",
        "chunkIndex": 0,
        "_relevance_score": 0.8,
    }
    chunk.update(overrides)
    return chunk


def test_empty():
    assert deduplicate_sources([]) == []


def test_single_chunk():
    result = deduplicate_sources([make_chunk()])
    assert len(result) == 1
    assert result[0].title == "Lesson"
    assert result[0].url == "/course/ml/lesson-1"


def test_deduplicate_keeps_highest():
    chunks = [
        make_chunk(lessonUrl="/same", _relevance_score=0.5),
        make_chunk(lessonUrl="/same", _relevance_score=0.9),
    ]
    result = deduplicate_sources(chunks)
    assert len(result) == 1


def test_preserves_separate():
    chunks = [
        make_chunk(lessonUrl="/a", _relevance_score=0.8),
        make_chunk(lessonUrl="/b", _relevance_score=0.6),
        make_chunk(lessonUrl="/c", _relevance_score=0.4),
    ]
    result = deduplicate_sources(chunks)
    assert len(result) == 3


def test_sorts_by_relevance():
    chunks = [
        make_chunk(lessonUrl="/low", lessonTitle="low", _relevance_score=0.2),
        make_chunk(lessonUrl="/high", lessonTitle="high", _relevance_score=0.9),
        make_chunk(lessonUrl="/mid", lessonTitle="mid", _relevance_score=0.5),
    ]
    result = deduplicate_sources(chunks)
    assert [s.title for s in result] == ["high", "mid", "low"]
