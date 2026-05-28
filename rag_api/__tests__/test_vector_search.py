import pytest

from rag_api.config import MAX_SOURCES
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


class TestDeduplicateSources:
    def test_empty_input(self):
        assert deduplicate_sources([]) == []

    def test_single_chunk(self):
        chunk = make_chunk()
        result = deduplicate_sources([chunk])
        assert len(result) == 1
        assert result[0].title == "Lesson"
        assert result[0].url == "/course/ml/lesson-1"
        assert result[0].relevance == 0.8

    def test_deduplicate_by_url_keeps_highest_score(self):
        chunks = [
            make_chunk(lessonUrl="/same", _relevance_score=0.5),
            make_chunk(lessonUrl="/same", _relevance_score=0.9),
        ]
        result = deduplicate_sources(chunks)
        assert len(result) == 1
        assert result[0].relevance == 0.9

    def test_multiple_duplicates(self):
        chunks = [
            make_chunk(lessonUrl="/a", _relevance_score=0.3),
            make_chunk(lessonUrl="/a", _relevance_score=0.7),
            make_chunk(lessonUrl="/a", _relevance_score=0.5),
        ]
        result = deduplicate_sources(chunks)
        assert len(result) == 1
        assert result[0].relevance == 0.7

    def test_preserves_separate_lessons(self):
        chunks = [
            make_chunk(lessonUrl="/lesson-1", _relevance_score=0.8),
            make_chunk(lessonUrl="/lesson-2", _relevance_score=0.6),
            make_chunk(lessonUrl="/lesson-3", _relevance_score=0.4),
        ]
        result = deduplicate_sources(chunks)
        assert len(result) == 3

    def test_sorts_by_relevance_descending(self):
        chunks = [
            make_chunk(lessonUrl="/low", _relevance_score=0.2),
            make_chunk(lessonUrl="/high", _relevance_score=0.9),
            make_chunk(lessonUrl="/mid", _relevance_score=0.5),
        ]
        result = deduplicate_sources(chunks)
        assert [s.relevance for s in result] == [0.9, 0.5, 0.2]

    def test_limits_to_max_sources(self):
        chunks = [
            make_chunk(lessonUrl=f"/lesson-{i}", _relevance_score=(10 - i) / 10)
            for i in range(10)
        ]
        result = deduplicate_sources(chunks)
        assert len(result) == MAX_SOURCES

    def test_preserves_first_encountered_metadata(self):
        chunks = [
            make_chunk(
                lessonUrl="/same",
                lessonTitle="First Title",
                categoryTitle="Category A",
                _relevance_score=0.5,
            ),
            make_chunk(
                lessonUrl="/same",
                lessonTitle="Different Title",
                categoryTitle="Category B",
                _relevance_score=0.9,
            ),
        ]
        result = deduplicate_sources(chunks)
        assert len(result) == 1
        assert result[0].title == "First Title"
        assert result[0].relevance == 0.9
