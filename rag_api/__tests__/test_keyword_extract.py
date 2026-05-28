import pytest

from ..retrieval.keyword_extract import extract_keywords

spacy = pytest.importorskip("spacy")


def test_short_query():
    assert extract_keywords("ab") == []


def test_empty_query():
    assert extract_keywords("") == []


def test_org_entity():
    result = extract_keywords("I work at Google")
    assert "google" in result


def test_noun_and_adjective():
    result = extract_keywords("modern machine learning")
    assert "modern" in result
    assert "machine" in result
    assert "learning" in result


def test_greeting_only():
    result = extract_keywords("hello there")
    assert result == []
