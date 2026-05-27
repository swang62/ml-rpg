import csv
from pathlib import Path

from fastapi import FastAPI
from pydantic import BaseModel
import spacy

GREETINGS_PATH = Path(__file__).with_name("greetings.csv")

app = FastAPI(title="spacy-api")
nlp = spacy.load("en_core_web_sm", disable=["parser", "lemmatizer", "ner"])

MIN_TEXT_SIZE = 3


class QueryRequest(BaseModel):
    query: str


class KeywordResponse(BaseModel):
    keywords: list[str]


def initialize_nlp():
    greetings = []
    with open(GREETINGS_PATH, "r") as file:
        rows = csv.reader(file)
        for row in rows:
            for word in row:
                greetings.append(word)
    ruler = nlp.get_pipe("attribute_ruler")
    patterns = [[{"LOWER": {"FUZZY": word}}] for word in greetings]
    attrs = {"POS": "INTJ"}
    ruler.add(patterns=patterns, attrs=attrs, index=0)


initialize_nlp()


def formatted(word: str):
    return word.strip().lower()


@app.post("/extract-keywords", response_model=KeywordResponse)
async def extract_keywords(req: QueryRequest):
    query = req.query
    if len(query) < MIN_TEXT_SIZE:
        return KeywordResponse(keywords=[])

    document = nlp(query)
    keywords: set[str] = set()

    for token in document:
        if (
            token.pos_ in ("NOUN", "PROPN", "ADJ")
            and not token.is_stop
            and len(formatted(token.text)) >= MIN_TEXT_SIZE
        ):
            keywords.add(formatted(token.text))

    return KeywordResponse(keywords=list(keywords))
