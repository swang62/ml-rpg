import json

import pytest

from ..scripts.utils import (
    clean_text,
    extract_openai_message_text,
    extract_qas,
    format_llama,
    has_garbled_text,
    has_invisible_spacing_or_control,
    has_suspicious_unicode_symbols,
    has_weird_punctuation,
    is_acceptable_generated_pair,
    maybe_unescape_json_string,
    normalize_pair,
    normalize_punctuation,
    parse_pairs,
    recover_truncated_pairs_payload,
    strip_code_fences,
    strip_control_chars,
)

# --- strip_control_chars ---


def test_strip_control_chars_removes_controls():
    assert strip_control_chars("\x00\x01\x1fabc") == "abc"


def test_strip_control_chars_preserves_valid():
    assert strip_control_chars("hello\nworld\t!") == "hello\nworld\t!"


def test_strip_control_chars_empty():
    assert strip_control_chars("") == ""


def test_strip_control_chars_all_control():
    assert strip_control_chars("\x00\x08\x0b\x0c\x0e\x1f") == ""


# --- clean_text ---


def test_clean_text_removes_emojis():
    assert clean_text("hello 😊 world") == "hello  world"


def test_clean_text_removes_flags():
    assert clean_text("flag 🇺🇸 here") == "flag  here"


def test_clean_text_removes_zero_width():
    assert clean_text("a\u200bb\u200cc") == "abc"


def test_clean_text_removes_bom():
    assert clean_text("\ufeffhello") == "hello"


def test_clean_text_removes_soft_hyphen():
    assert clean_text("so\u00adft") == "soft"


def test_clean_text_removes_replacement_char():
    assert clean_text("repl\ufffdace") == "replace"


def test_clean_text_strips_whitespace():
    assert clean_text("  hello  ") == "hello"


def test_clean_text_preserves_ascii():
    assert clean_text("Hello, World! 123.") == "Hello, World! 123."


def test_clean_text_empty():
    assert clean_text("") == ""


# --- strip_code_fences ---


def test_strip_code_fences_removes_basic():
    assert strip_code_fences("```\nhello\n```") == "hello"


def test_strip_code_fences_removes_with_json():
    assert strip_code_fences('```json\n{"key": "value"}\n```') == '{"key": "value"}'


def test_strip_code_fences_no_fences():
    assert strip_code_fences("plain text") == "plain text"


def test_strip_code_fences_partial_opening():
    assert strip_code_fences("```\nno closing") == "no closing"


def test_strip_code_fences_extra_whitespace():
    assert strip_code_fences("  ```\n  content\n  ```  ") == "content"


def test_strip_code_fences_empty():
    assert strip_code_fences("") == ""


# --- maybe_unescape_json_string ---


def test_maybe_unescape_json_string_returns_raw_plain_json():
    raw = '{"pairs": [{"question": "q1", "answer": "a1"}]}'
    assert maybe_unescape_json_string(raw) == raw


def test_maybe_unescape_json_string_decodes_escaped_json():
    raw = '"{\\"pairs\\": [{\\"question\\": \\"q1\\", \\"answer\\": \\"a1\\"}]}"'
    assert (
        maybe_unescape_json_string(raw)
        == '{"pairs": [{"question": "q1", "answer": "a1"}]}'
    )


# --- format_llama ---


def test_format_llama_single_message():
    result = format_llama([{"role": "user", "content": "hello"}])
    assert result == "<|start_header_id|>user<|end_header_id|>\n\nhello<|eot_id|>"


def test_format_llama_multiple_messages():
    result = format_llama(
        [
            {"role": "system", "content": "you are bob"},
            {"role": "user", "content": "hi"},
            {"role": "assistant", "content": "hello there"},
        ]
    )
    assert "<|start_header_id|>system<|end_header_id|>" in result
    assert "<|start_header_id|>user<|end_header_id|>" in result
    assert "<|start_header_id|>assistant<|end_header_id|>" in result
    assert result.count("<|eot_id|>") == 3


def test_format_llama_empty_content():
    result = format_llama([{"role": "user", "content": ""}])
    assert "<|start_header_id|>user<|end_header_id|>\n\n<|eot_id|>" in result


# --- extract_openai_message_text ---


def test_extract_openai_message_text_uses_content_first():
    message = {"content": '{"pairs": [{"question": "q1", "answer": "a1"}]}'}
    assert (
        extract_openai_message_text(message)
        == '{"pairs": [{"question": "q1", "answer": "a1"}]}'
    )


def test_extract_openai_message_text_falls_back_to_reasoning_content():
    message = {
        "content": "",
        "reasoning_content": '{"pairs": [{"question": "q1", "answer": "a1"}]}',
    }
    assert (
        extract_openai_message_text(message)
        == '{"pairs": [{"question": "q1", "answer": "a1"}]}'
    )


def test_extract_openai_message_text_decodes_escaped_reasoning_content():
    message = {
        "content": "",
        "reasoning_content": '"{\\"pairs\\": [{\\"question\\": \\"q1\\", \\"answer\\": \\"a1\\"}]}"',
    }
    assert (
        extract_openai_message_text(message)
        == '{"pairs": [{"question": "q1", "answer": "a1"}]}'
    )


# --- extract_qas ---


def test_extract_qas_list():
    assert extract_qas([{"q": "a"}, {"q": "b"}]) == [{"q": "a"}, {"q": "b"}]


def test_extract_qas_pairs_key():
    data = {"pairs": [{"q": "1"}, {"q": "2"}]}
    assert extract_qas(data) == [{"q": "1"}, {"q": "2"}]


def test_extract_qas_questions_key():
    data = {"questions": [{"q": "1"}]}
    assert extract_qas(data) == [{"q": "1"}]


def test_extract_qas_qa_pairs_key():
    data = {"qa_pairs": [{"q": "1"}]}
    assert extract_qas(data) == [{"q": "1"}]


def test_extract_qas_examples_key():
    data = {"examples": [{"q": "1"}]}
    assert extract_qas(data) == [{"q": "1"}]


def test_extract_qas_data_key():
    data = {"data": [{"q": "1"}]}
    assert extract_qas(data) == [{"q": "1"}]


def test_extract_qas_items_key():
    data = {"items": [{"q": "1"}]}
    assert extract_qas(data) == [{"q": "1"}]


def test_extract_qas_unknown_dict_wraps_in_list():
    data = {"custom": "value"}
    assert extract_qas(data) == [{"custom": "value"}]


def test_extract_qas_empty_dict():
    assert extract_qas({}) == [{}]


def test_extract_qas_none_matching_key_falls_back():
    data = {"unrelated": [{"q": "1"}], "pairs": [{"q": "2"}]}
    assert extract_qas(data) == [{"q": "2"}]


def test_extract_qas_invalid_type_raises():
    with pytest.raises(ValueError, match="Unexpected data type"):
        extract_qas("not a list or dict")


def test_extract_qas_none_raises():
    with pytest.raises(ValueError, match="Unexpected data type"):
        extract_qas(None)


def test_extract_qas_empty_list():
    assert extract_qas([]) == []


def test_extract_qas_order_is_prioritized():
    data = {
        "pairs": [{"q": "from pairs"}],
        "data": [{"q": "from data"}],
    }
    assert extract_qas(data) == [{"q": "from pairs"}]


# --- normalize_pair ---


def test_normalize_pair_full():
    result = normalize_pair({"question": "test?", "answer": "yes"})
    assert result == {"question": "test?", "answer": "yes"}


def test_normalize_pair_alias_q():
    result = normalize_pair({"q": "test?", "a": "yes"})
    assert result == {"question": "test?", "answer": "yes"}


def test_normalize_pair_alias_user_assistant():
    result = normalize_pair({"user": "test?", "assistant": "yes"})
    assert result == {"question": "test?", "answer": "yes"}


def test_normalize_pair_alias_human_bot():
    result = normalize_pair({"human": "test?", "bot": "yes"})
    assert result == {"question": "test?", "answer": "yes"}


def test_normalize_pair_alias_query_response():
    result = normalize_pair({"query": "test?", "response": "yes"})
    assert result == {"question": "test?", "answer": "yes"}


def test_normalize_pair_alias_bob():
    result = normalize_pair({"player": "test?", "bob": "yes"})
    assert result == {"question": "test?", "answer": "yes"}


def test_normalize_pair_missing_question():
    assert normalize_pair({"answer": "yes"}) is None


def test_normalize_pair_missing_answer():
    assert normalize_pair({"question": "test?"}) is None


def test_normalize_pair_non_dict():
    assert normalize_pair("string") is None
    assert normalize_pair(123) is None
    assert normalize_pair(None) is None
    assert normalize_pair([]) is None


def test_normalize_pair_cleans_text():
    result = normalize_pair({"question": "hello 😊", "answer": "  world  "})
    assert result == {"question": "hello", "answer": "world"}


# --- generated pair quality filter ---


def test_has_weird_punctuation_rejects_repeated_dots():
    assert has_weird_punctuation("Why... is this happening?") is True


def test_has_weird_punctuation_rejects_repeated_commas():
    assert has_weird_punctuation("hello,,, world") is True


def test_has_weird_punctuation_rejects_long_punctuation_runs():
    assert has_weird_punctuation("what?!?!") is True


def test_has_weird_punctuation_allows_normal_punctuation():
    assert has_weird_punctuation("What is overfitting?") is False


def test_normalize_punctuation_converts_unicode_variants():
    assert normalize_punctuation("Wait… really—yes‑no") == "Wait... really—yes‑no"


def test_has_invisible_spacing_or_control_detects_nbsp():
    assert has_invisible_spacing_or_control("hello\u00a0world") is True


def test_has_suspicious_unicode_symbols_detects_unicode_punctuation():
    assert has_suspicious_unicode_symbols("hello…world") is True


def test_has_garbled_text_detects_unicode_garble_runs():
    assert has_garbled_text("...??………‑ ..?…") is True


def test_has_garbled_text_allows_clean_ascii_text():
    assert has_garbled_text("Why does regularization help generalization?") is False


def test_is_acceptable_generated_pair_rejects_bad_question():
    assert (
        is_acceptable_generated_pair({"question": "Why...", "answer": "Because."})
        is False
    )


def test_is_acceptable_generated_pair_rejects_bad_answer():
    assert (
        is_acceptable_generated_pair({"question": "Why?", "answer": "No,,, never."})
        is False
    )


def test_is_acceptable_generated_pair_allows_clean_pair():
    assert (
        is_acceptable_generated_pair(
            {"question": "Why?", "answer": "Because it helps generalization."}
        )
        is True
    )


# --- parse_pairs ---


def test_parse_pairs_valid_json():
    raw = '{"pairs": [{"question": "q1", "answer": "a1"}]}'
    result = parse_pairs(raw)
    assert result == [{"question": "q1", "answer": "a1"}]


def test_parse_pairs_code_fenced():
    raw = '```json\n{"pairs": [{"question": "q1", "answer": "a1"}]}\n```'
    result = parse_pairs(raw)
    assert result == [{"question": "q1", "answer": "a1"}]


def test_parse_pairs_empty_raises():
    with pytest.raises(json.JSONDecodeError):
        parse_pairs("")


def test_parse_pairs_invalid_json_raises():
    with pytest.raises(json.JSONDecodeError):
        parse_pairs("not json")


def test_parse_pairs_multiple_pairs():
    raw = json.dumps(
        {
            "pairs": [
                {"question": "q1", "answer": "a1"},
                {"question": "q2", "answer": "a2"},
            ]
        }
    )
    result = parse_pairs(raw)
    assert len(result) == 2


def test_parse_pairs_filters_invalid_items():
    raw = json.dumps(
        {
            "pairs": [
                {"question": "q1", "answer": "a1"},
                {"question": "q2"},  # missing answer
            ]
        }
    )
    result = parse_pairs(raw)
    assert len(result) == 1


def test_parse_pairs_cleans_text():
    raw = json.dumps({"pairs": [{"question": "hello 😊", "answer": "fine  "}]})
    result = parse_pairs(raw)
    assert result == [{"question": "hello", "answer": "fine"}]


def test_parse_pairs_control_chars_stripped():
    raw = json.dumps({"pairs": [{"question": "\x00hello\x01", "answer": "world\x1f"}]})
    result = parse_pairs(raw)
    assert result == [{"question": "hello", "answer": "world"}]


def test_parse_pairs_openai_wrapper_with_reasoning_content():
    raw = json.dumps(
        {
            "choices": [
                {
                    "message": {
                        "role": "assistant",
                        "content": "",
                        "reasoning_content": '{"pairs": [{"question": "q1", "answer": "a1"}]}',
                    }
                }
            ]
        }
    )
    result = parse_pairs(raw)
    assert result == [{"question": "q1", "answer": "a1"}]


def test_parse_pairs_openai_wrapper_with_escaped_reasoning_content():
    raw = json.dumps(
        {
            "choices": [
                {
                    "message": {
                        "role": "assistant",
                        "content": "",
                        "reasoning_content": '"{\\"pairs\\": [{\\"question\\": \\"q1\\", \\"answer\\": \\"a1\\"}]}"',
                    }
                }
            ]
        }
    )
    result = parse_pairs(raw)
    assert result == [{"question": "q1", "answer": "a1"}]


def test_recover_truncated_pairs_payload_salvages_complete_pairs():
    raw = (
        '{"pairs": ['
        '{"question": "q1", "answer": "a1"}, '
        '{"question": "q2", "answer": "a2"}, '
        '{"question": "What is your'
    )
    result = recover_truncated_pairs_payload(raw)
    assert result == {
        "pairs": [
            {"question": "q1", "answer": "a1"},
            {"question": "q2", "answer": "a2"},
        ]
    }


def test_parse_pairs_salvages_truncated_pairs_payload():
    raw = (
        '{"pairs": ['
        '{"question": "q1", "answer": "a1"}, '
        '{"question": "q2", "answer": "a2"}, '
        '{"question": "What is your'
    )
    result = parse_pairs(raw)
    assert result == [
        {"question": "q1", "answer": "a1"},
        {"question": "q2", "answer": "a2"},
    ]
