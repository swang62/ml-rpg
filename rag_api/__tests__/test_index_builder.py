"""Tests for the index builder — lesson extraction, chunking, versioning."""

import json
import sqlite3
import tempfile
from pathlib import Path

import pytest

from ..indexing.build_index import (
    _compute_content_hash,
    _compute_db_content_hash,
    _enrich_tags,
    _extract_word_tokens,
    _get_readme_lesson_group,
    _load_lessons_from_db,
    _parse_tags,
    _split_text,
    README_PATH,
)
from ..indexing.ensure_index import _has_valid_table


@pytest.fixture
def content_db(tmp_path):
    """Create a minimal SQLite content DB with the expected schema."""
    db_path = tmp_path / "test_lessons.db"
    conn = sqlite3.connect(str(db_path))
    conn.executescript("""
        CREATE TABLE course (id INTEGER PRIMARY KEY, slug TEXT, title TEXT);
        CREATE TABLE category (id INTEGER PRIMARY KEY, slug TEXT, title TEXT, course_id INTEGER);
        CREATE TABLE section (id INTEGER PRIMARY KEY, slug TEXT, title TEXT, course_id INTEGER, category_id INTEGER);
        CREATE TABLE lesson (slug TEXT, title TEXT, html TEXT, lesson_highlights TEXT, keywords TEXT, section_id INTEGER, category_id INTEGER, course_id INTEGER);

        INSERT INTO course VALUES (1, 'ml-engineering', 'ML Engineering');
        INSERT INTO category VALUES (1, 'ml-basics', 'ML Basics', 1);
        INSERT INTO section VALUES (1, 'intro', 'Introduction', 1, 1);
        INSERT INTO lesson VALUES ('lesson-1', 'What is ML', '<h1>Intro</h1><p>Machine learning is fun</p>', 'Intro Machine learning is fun', '["ml"]', 1, 1, 1);
    """)
    conn.close()
    return str(db_path)


# ---------------------------------------------------------------------------
# Text splitting
# ---------------------------------------------------------------------------


def test_split_text_simple():
    text = "Hello world. " * 200
    chunks = _split_text(text, chunk_size=512, chunk_overlap=0)
    assert len(chunks) > 1
    assert all(len(c) <= 512 for c in chunks)


def test_split_text_single_chunk():
    text = "Short text"
    chunks = _split_text(text, chunk_size=512, chunk_overlap=0)
    assert len(chunks) == 1
    assert chunks[0] == "Short text"


def test_split_text_empty():
    assert _split_text("", 512, 0) == []


# ---------------------------------------------------------------------------
# Tag enrichment
# ---------------------------------------------------------------------------


def test_parse_tags_valid():
    assert _parse_tags('["ml", "data"]') == ["ml", "data"]


def test_parse_tags_invalid():
    assert _parse_tags("not json") == []
    assert _parse_tags("") == []


def test_enrich_tags_adds_tokens():
    tags = _enrich_tags("[]", "Machine Learning", "Basics")
    assert "machine" in tags
    assert "learning" in tags
    assert "basics" in tags


def test_enrich_tags_skips_stop_words():
    tags = _enrich_tags("[]", "The About", "Section")
    # "the", "about" are stop words
    assert "the" not in tags
    assert "about" not in tags
    assert "section" in tags


def test_extract_word_tokens():
    tokens = _extract_word_tokens("Machine Learning is Fun")
    assert "machine" in tokens
    assert "learning" in tokens
    # "fun" is < 5 chars and won't match \b[a-z]{5,}\b
    assert "fun" not in tokens


def test_extract_word_tokens_short_words():
    tokens = _extract_word_tokens("a an the cat")
    assert tokens == []


# ---------------------------------------------------------------------------
# Content hash stability
# ---------------------------------------------------------------------------


def test_content_hash_stable():
    groups_a = [
        {
            "lessonUrl": "/ml/basics/lesson-1",
            "texts": ["chunk one", "chunk two"],
        },
        {
            "lessonUrl": "/ml/basics/lesson-2",
            "texts": ["chunk three"],
        },
    ]
    groups_b = [
        {
            "lessonUrl": "/ml/basics/lesson-1",
            "texts": ["chunk one", "chunk two"],
        },
        {
            "lessonUrl": "/ml/basics/lesson-2",
            "texts": ["chunk three"],
        },
    ]
    assert _compute_content_hash(groups_a) == _compute_content_hash(groups_b)


def test_content_hash_different():
    groups_a = [
        {
            "lessonUrl": "/ml/basics/lesson-1",
            "texts": ["chunk one"],
        },
    ]
    groups_b = [
        {
            "lessonUrl": "/ml/basics/lesson-1",
            "texts": ["chunk one", "chunk two"],
        },
    ]
    assert _compute_content_hash(groups_a) != _compute_content_hash(groups_b)


# ---------------------------------------------------------------------------
# Load lessons from local DB
# ---------------------------------------------------------------------------


def test_load_lessons_from_db(content_db, monkeypatch):
    """Should load lesson groups from a minimal content DB."""
    import sys
    monkeypatch.setattr(sys.modules["rag_api.indexing.build_index"], "CONTENT_DB_PATH", content_db)

    groups = _load_lessons_from_db()
    assert len(groups) == 1
    first = groups[0]
    assert first["lessonTitle"] == "What is ML"
    assert first["lessonUrl"] == "/ml-engineering/ml-basics/intro/lesson-1"
    assert first["categoryTitle"] == "ML Basics"
    assert first["sectionTitle"] == "Introduction"
    assert first["courseTitle"] == "ML Engineering"
    assert "texts" in first
    assert len(first["texts"]) > 0
    assert "tags" in first


# ---------------------------------------------------------------------------
# README ingestion
# ---------------------------------------------------------------------------


def test_get_readme_lesson_group_returns_valid_group():
    """Should return a lesson group from the local README.md."""
    group = _get_readme_lesson_group()
    assert group is not None
    assert group["lessonTitle"] == "Site Information"
    assert group["sectionTitle"] == "README"
    assert group["courseSlug"] == "ml-rpg"
    assert group["lessonUrl"] == "https://github.com/swang62/ml-rpg"
    assert "texts" in group
    assert len(group["texts"]) > 0
    assert group["tags"] == []


def test_get_readme_lesson_group_readme_exists():
    """Verify the README.md file exists at the expected path."""
    assert README_PATH.exists(), f"README not found at {README_PATH}"


# ---------------------------------------------------------------------------
# DB file hash
# ---------------------------------------------------------------------------


def test_compute_db_file_hash(content_db, monkeypatch):
    """Should return a deterministic 16-char hex hash based on lesson content."""
    import sys
    monkeypatch.setattr(sys.modules["rag_api.indexing.build_index"], "CONTENT_DB_PATH", content_db)

    db_hash = _compute_db_content_hash()
    assert len(db_hash) == 16
    assert all(c in "0123456789abcdef" for c in db_hash)
    # Stable within the same call
    assert _compute_db_content_hash() == db_hash
