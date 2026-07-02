import json
import re
import unicodedata
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


def format_llama(messages: list[dict]) -> str:
    parts = []
    for msg in messages:
        role = msg["role"]
        content = msg["content"]
        parts.append(f"<|start_header_id|>{role}<|end_header_id|>\n\n{content}<|eot_id|>")
    return "".join(parts)


FORMATTERS = {
    "llama": format_llama,
}

REPEATED_PUNCTUATION_PATTERN = re.compile(r"([.,!?;:\-])\1{2,}")
LONG_PUNCTUATION_RUN_PATTERN = re.compile(r"[.,!?;:\-]{4,}")
NORMALIZED_PUNCTUATION_RUN_PATTERN = re.compile(r"([.,!?;:])\1{2,}|-{3,}|[.,!?;:\-]{4,}")
SUSPICIOUS_UNICODE_PUNCTUATION = {"…"}


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


def maybe_unescape_json_string(raw: str) -> str:
    stripped_raw = raw.strip()
    if not stripped_raw:
        return stripped_raw

    if '\\"' not in stripped_raw and '\\#' not in stripped_raw:
        return stripped_raw

    try:
        decoded = json.loads(stripped_raw)
    except json.JSONDecodeError:
        return stripped_raw

    if isinstance(decoded, str):
        return decoded.strip()

    return stripped_raw


def extract_openai_message_text(message: object) -> str:
    if isinstance(message, dict):
        message_content = message.get("content")
        reasoning_content = message.get("reasoning_content")
    else:
        message_content = getattr(message, "content", None)
        reasoning_content = getattr(message, "reasoning_content", None)
        if reasoning_content is None:
            model_extra = getattr(message, "model_extra", None)
            if isinstance(model_extra, dict):
                reasoning_content = model_extra.get("reasoning_content")

    if isinstance(message_content, str) and message_content.strip():
        return maybe_unescape_json_string(message_content)

    if isinstance(reasoning_content, str) and reasoning_content.strip():
        return maybe_unescape_json_string(reasoning_content)

    return ""


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


def recover_truncated_pairs_payload(raw: str) -> dict | None:
    pairs_key_index = raw.find('"pairs"')
    if pairs_key_index == -1:
        return None

    array_start_index = raw.find("[", pairs_key_index)
    if array_start_index == -1:
        return None

    decoder = json.JSONDecoder()
    recovered_pairs: list[dict] = []
    current_index = array_start_index + 1
    raw_length = len(raw)

    while current_index < raw_length:
        while current_index < raw_length and raw[current_index] in " \t\r\n,":
            current_index += 1

        if current_index >= raw_length or raw[current_index] == "]":
            break

        try:
            parsed_item, next_index = decoder.raw_decode(raw, current_index)
        except json.JSONDecodeError:
            break

        if isinstance(parsed_item, dict):
            recovered_pairs.append(parsed_item)

        current_index = next_index

    if not recovered_pairs:
        return None

    return {"pairs": recovered_pairs}


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


def has_weird_punctuation(text: str) -> bool:
    cleaned_text = clean_text(text)
    return bool(
        REPEATED_PUNCTUATION_PATTERN.search(cleaned_text)
        or LONG_PUNCTUATION_RUN_PATTERN.search(cleaned_text)
    )


def normalize_punctuation(text: str) -> str:
    return (
        text.replace("…", "...")
    )


def has_invisible_spacing_or_control(text: str) -> bool:
    for char in text:
        category = unicodedata.category(char)
        if char in {"\n", "\r", "\t", " "}:
            continue
        if category.startswith("C") or category == "Zs":
            return True
    return False


def has_suspicious_unicode_symbols(text: str) -> bool:
    for char in text:
        if char in SUSPICIOUS_UNICODE_PUNCTUATION:
            return True
        if ord(char) > 127 and unicodedata.category(char).startswith("S"):
            return True
    return False


def has_garbled_text(text: str) -> bool:
    cleaned_text = clean_text(text)
    normalized_text = normalize_punctuation(cleaned_text)
    return bool(
        has_invisible_spacing_or_control(text)
        or has_suspicious_unicode_symbols(text)
        or NORMALIZED_PUNCTUATION_RUN_PATTERN.search(normalized_text)
    )


def is_acceptable_generated_pair(pair: dict) -> bool:
    return not has_garbled_text(pair["question"]) and not has_garbled_text(
        pair["answer"]
    )


def parse_pairs(raw: str) -> list[dict]:
    raw = maybe_unescape_json_string(strip_control_chars(strip_code_fences(raw)))
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        recovered_data = recover_truncated_pairs_payload(raw)
        if recovered_data is None:
            raise
        data = recovered_data

    if isinstance(data, dict) and "choices" in data:
        choices = data.get("choices")
        if isinstance(choices, list) and choices:
            first_choice = choices[0]
            if isinstance(first_choice, dict):
                message = first_choice.get("message")
                extracted_text = extract_openai_message_text(message)
                if extracted_text:
                    return parse_pairs(extracted_text)

    items = extract_qas(data)
    pairs = []
    for it in items:
        pair = normalize_pair(it)
        if pair:
            pairs.append(pair)
    return pairs
