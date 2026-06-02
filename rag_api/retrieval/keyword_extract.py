import csv
import logging
from pathlib import Path

import spacy

from ..config import MIN_TEXT_SIZE

logger = logging.getLogger("rag_api")

GREETINGS_PATH = Path(__file__).parent.parent / "data" / "greetings.csv"

_nlp = None


def load_nlp_core():
    global _nlp
    if _nlp is not None:
        return _nlp

    logger.info("initializing spaCy...")
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


def unload_nlp_core():
    global _nlp
    _nlp = None


def formatted(word: str) -> str:
    return word.strip().lower()


def extract_keywords(query: str) -> list[str]:
    if len(query) < MIN_TEXT_SIZE:
        return []

    nlp = load_nlp_core()
    doc = nlp(query)
    keywords: set[str] = set()

    for token in doc:
        if (
            token.pos_ in ("NUM", "NOUN", "PROPN", "ADJ")
            and not token.is_stop
            and len(formatted(token.text)) >= MIN_TEXT_SIZE
        ):
            keywords.add(formatted(token.text))

    return list(keywords)
