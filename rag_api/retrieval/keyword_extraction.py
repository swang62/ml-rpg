import csv
from pathlib import Path

from ..config import MIN_TEXT_SIZE

GREETINGS_PATH = Path(__file__).parent.parent / "data" / "greetings.csv"

_nlp = None


def _load_nlp():
    global _nlp
    if _nlp is not None:
        return _nlp

    import spacy

    nlp = spacy.load("en_core_web_sm", disable=["parser", "lemmatizer", "ner"])

    greetings: list[str] = []
    with open(GREETINGS_PATH, "r") as f:
        rows = csv.reader(f)
        for row in rows:
            for word in row:
                greetings.append(word)

    ruler = nlp.get_pipe("attribute_ruler")
    patterns = [[{"LOWER": {"FUZZY": word}}] for word in greetings]
    attrs = {"POS": "INTJ"}
    ruler.add(patterns=patterns, attrs=attrs, index=0)

    _nlp = nlp
    return _nlp


def warm_nlp() -> None:
    """Pre-load the spaCy model so the first request isn't cold."""
    _load_nlp()


def _formatted(word: str) -> str:
    return word.strip().lower()


def extract_keywords(query: str) -> list[str]:
    if len(query) < MIN_TEXT_SIZE:
        return []

    nlp = _load_nlp()
    doc = nlp(query)
    keywords: set[str] = set()

    for token in doc:
        if (
            token.pos_ in ("NOUN", "PROPN", "ADJ")
            and not token.is_stop
            and len(_formatted(token.text)) >= MIN_TEXT_SIZE
        ):
            keywords.add(_formatted(token.text))

    return list(keywords)
