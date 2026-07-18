"""Tests for the index builder — lesson extraction, chunking, versioning."""

import json
import tempfile
from pathlib import Path

import pytest

from ..indexing.build_index import (
    _compute_content_hash,
    _compute_db_content_hash,
    _enrich_tags,
    _extract_relevant_text,
    _extract_word_tokens,
    _get_readme_lesson_group,
    _load_lessons_from_db,
    _parse_tags,
    _split_text,
    README_PATH,
)
from ..indexing.ensure_index import _has_valid_table


# ---------------------------------------------------------------------------
# Lesson text extraction
# ---------------------------------------------------------------------------


def test_extract_relevant_text_h1():
    html = "<h1>Introduction to ML</h1><p>Some text</p>"
    result = _extract_relevant_text(html)
    assert "Introduction to ML" in result


def test_extract_relevant_text_card():
    html = '<span class="Learn_keyTakeaways_abc">Key insight here</span>'
    result = _extract_relevant_text(html)
    assert "Key insight here" in result


def test_extract_relevant_text_border():
    html = '<div style="border-left: 4px solid red;">Callout text</div>'
    result = _extract_relevant_text(html)
    assert "Callout text" in result


def test_extract_relevant_text_empty():
    assert _extract_relevant_text("") == ""


def test_extract_relevant_text_no_match():
    html = "<p>Just a paragraph with no headers or cards</p>"
    result = _extract_relevant_text(html)
    # Should still return cleaned text (border pattern catches the <p>)
    assert "Just" in result or result == ""


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


def test_load_lessons_from_db():
    """Should load lesson groups from the local content DB."""
    groups = _load_lessons_from_db()
    assert len(groups) > 0
    first = groups[0]
    assert "lessonTitle" in first
    assert "lessonUrl" in first
    assert "categoryTitle" in first
    assert "sectionTitle" in first
    assert "courseTitle" in first
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


def test_compute_db_file_hash():
    """Should return a deterministic 16-char hex hash based on lesson content."""
    db_hash = _compute_db_content_hash()
    assert len(db_hash) == 16
    assert all(c in "0123456789abcdef" for c in db_hash)
    # Stable within the same call
    assert _compute_db_content_hash() == db_hash
