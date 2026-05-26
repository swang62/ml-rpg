from fastapi import FastAPI
from pydantic import BaseModel
import spacy

app = FastAPI(title="spacy-api")
nlp = spacy.load("en_core_web_sm")

KEEP_ENTITY_LABELS = {"PRODUCT", "WORK_OF_ART"}


class QueryRequest(BaseModel):
    query: str


class KeywordResponse(BaseModel):
    keywords: list[str]


@app.post("/extract-keywords", response_model=KeywordResponse)
async def extract_keywords(req: QueryRequest):
    doc = nlp(req.query)
    keywords: set[str] = set()

    for ent in doc.ents:
        if ent.label_ in KEEP_ENTITY_LABELS:
            text = ent.text.lower().strip()
            if len(text) > 1:
                keywords.add(text)

    for chunk in doc.noun_chunks:
        text = chunk.text.lower().strip()
        if len(text) > 2:
            keywords.add(text)

    for token in doc:
        if (
            token.pos_ in ("NOUN", "PROPN", "ADJ")
            and not token.is_stop
            and len(token.text) > 2
        ):
            keywords.add(token.lemma_.lower())

    return KeywordResponse(keywords=list(keywords))
