import pytest

from ..retrieval.keyword_extract import extract_keywords, formatted

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


class TestNumerals:
    """Ordinal and cardinal numbers should be extracted as keywords."""

    def test_two_as_num(self):
        result = extract_keywords("two systems")
        assert "two" in result

    def test_three_as_num(self):
        result = extract_keywords("three approaches")
        assert "three" in result

    def test_first_as_adj(self):
        result = extract_keywords("first layer in a neural network")
        # "first" is ADJ but is_stop=True, so it's filtered out.
        assert "first" not in result
        assert "layer" in result

    def test_second_as_adj(self):
        result = extract_keywords("second method is better")
        # "second" is ADJ and is_stop=False (not in spaCy stop list)
        assert "second" in result
        assert "better" in result or "method" in result

    def test_numeral_with_verb(self):
        result = extract_keywords("two distributed systems")
        assert "two" in result
        assert "distributed" in result


class TestFormatted:
    """The formatted helper strips whitespace and lowercases."""

    def test_strips_whitespace(self):
        assert formatted("  Hello  ") == "hello"

    def test_lowercases(self):
        assert formatted("HELLO") == "hello"

    def test_mixed_case(self):
        assert formatted("  MaChInE  ") == "machine"

    def test_empty_string(self):
        assert formatted("") == ""

    def test_already_lower(self):
        assert formatted("hello") == "hello"

    def test_special_chars(self):
        assert formatted("  hello-world!  ") == "hello-world!"
