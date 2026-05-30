import json
import re
from pathlib import Path

from pydantic import BaseModel


class QAPair(BaseModel):
    question: str
    answer: str


class QAPairs(BaseModel):
    pairs: list[QAPair]


QA_KEY_ALIASES = {
    "q": "question",
    "question": "question",
    "Question": "question",
    "query": "question",
    "Q": "question",
    "Q1": "question",
    "user": "question",
    "human": "question",
    "player": "question",
    "a": "answer",
    "answer": "answer",
    "Answer": "answer",
    "response": "answer",
    "A": "answer",
    "A1": "answer",
    "assistant": "answer",
    "bot": "answer",
    "bob": "answer",
}


def get_project_root() -> Path:
    return Path(__file__).parent.parent.parent


def format_chatml(messages: list[dict]) -> str:
    parts = []
    for msg in messages:
        role = msg["role"]
        content = msg["content"]
        parts.append(f"<|im_start|>{role}\n{content}<|im_end|>")
    return "\n".join(parts)


def format_llama(messages: list[dict]) -> str:
    parts = []
    for msg in messages:
        role = msg["role"]
        content = msg["content"]
        parts.append(f"<|start_header_id|>{role}<|end_header_id|>\n\n{content}<|eot_id|>")
    return "".join(parts)


FORMATTERS = {
    "chatml": format_chatml,
    "llama": format_llama,
}


def strip_control_chars(text: str) -> str:
    return re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)


def clean_text(text: str) -> str:
    text = strip_control_chars(text)
    text = re.sub(
        "[\U0001F300-\U0001FAFF"    # Misc Symbols, Emoticons, Enclosed, etc.
        "\U0001F600-\U0001F64F"     # Emoticons
        "\U0001F680-\U0001F6FF"     # Transport & Map
        "\U0001F1E0-\U0001F1FF"     # Flags
        "\U00002600-\U000027BF"     # Misc Symbols, Dingbats
        "\U0000FE00-\U0000FE0F"     # Variation Selectors
        "\U0000200B-\U0000200F"     # Zero-width spaces, LTR/RTL marks
        "\U0000202A-\U0000202E"     # Bidi override/embedding
        "\U0000FEFF"                # BOM
        "\U000000AD"                # Soft hyphen
        "\U00002060"                # Word joiner
        "\U0000FFFD"                # Replacement character
        "]",
        "",
        text,
    )
    return text.strip()


def strip_code_fences(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```(?:json)?\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)
    return raw.strip()


def extract_qas(data: object) -> list[dict]:
    """Pull QA pairs from whatever shape the model returns."""
    if isinstance(data, list):
        return data
    if isinstance(data, dict):
        for key in (
            "pairs",
            "questions",
            "qa_pairs",
            "examples",
            "data",
            "items",
            "qas",
            "qa",
            "conversations",
            "dialogues",
            "exchanges",
        ):
            val = data.get(key)
            if isinstance(val, list):
                return val
        return [data]
    raise ValueError(f"Unexpected data type: {type(data)}")


def normalize_pair(item: object) -> dict | None:
    if not isinstance(item, dict):
        return None
    aliased = {}
    for k, v in item.items():
        dst = QA_KEY_ALIASES.get(k)
        if dst:
            aliased[dst] = v
    if "question" not in aliased or "answer" not in aliased:
        return None
    aliased["question"] = clean_text(aliased["question"])
    aliased["answer"] = clean_text(aliased["answer"])
    QAPair(**aliased)
    return {"question": aliased["question"], "answer": aliased["answer"]}


def parse_pairs(raw: str) -> list[dict]:
    raw = strip_control_chars(strip_code_fences(raw))
    data = json.loads(raw)
    items = extract_qas(data)
    pairs = []
    for it in items:
        pair = normalize_pair(it)
        if pair:
            pairs.append(pair)
    return pairs
