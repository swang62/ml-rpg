import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))


def test_preprocessing_format():
    from preprocessing import format_chatml, SYSTEM_PROMPT

    messages = [
        {"role": "user", "content": "Hello"},
        {"role": "assistant", "content": "Hi there!"},
    ]
    full_messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *messages,
    ]
    result = format_chatml(full_messages)

    assert "<|im_start|>system" in result
    assert "<|im_start|>user" in result
    assert "<|im_start|>assistant" in result
    assert "Hello" in result
    assert "Hi there!" in result
    assert result.endswith("<|im_start|>assistant\n")


def test_preprocessing_system_prompt():
    from preprocessing import SYSTEM_PROMPT

    assert "Bob" in SYSTEM_PROMPT
    assert "Machine Learning (the RPG)" in SYSTEM_PROMPT
    assert "markdown" in SYSTEM_PROMPT


def test_preprocessing_splits(tmp_path):
    from preprocessing import format_chatml, SYSTEM_PROMPT

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": "test"},
        {"role": "assistant", "content": "answer"},
    ]
    text = format_chatml(messages)
    parsed = json.loads(json.dumps({"text": text}))
    assert "text" in parsed
    assert "<|im_start|>assistant\n" in parsed["text"]


def test_generate_has_all_categories():
    from generate_training_data import CATEGORY_PROMPTS, BOB_PERSONA, PLATFORM_FACTS

    assert "platform_qa" in CATEGORY_PROMPTS
    assert "bob_identity" in CATEGORY_PROMPTS
    assert "greetings" in CATEGORY_PROMPTS
    assert "refusal" in CATEGORY_PROMPTS


def test_generate_bob_persona():
    from generate_training_data import BOB_PERSONA

    assert "librarian" in BOB_PERSONA.lower()
    assert "Arcane Archives" in BOB_PERSONA
    assert "Course World" in BOB_PERSONA or "Archive World" in BOB_PERSONA
    assert "Great Divide" in BOB_PERSONA or "Great Fragmentation" in BOB_PERSONA


def test_generate_platform_facts():
    from generate_training_data import PLATFORM_FACTS

    assert "World" in PLATFORM_FACTS
    assert "Level" in PLATFORM_FACTS
    assert "Quest" in PLATFORM_FACTS
    assert "Objective" in PLATFORM_FACTS
    assert "25 XP" in PLATFORM_FACTS
    assert "Novice" in PLATFORM_FACTS
    assert "Eternal" in PLATFORM_FACTS
    assert "arrow keys" in PLATFORM_FACTS.lower()
    assert "localStorage" in PLATFORM_FACTS
    assert "MiniSearch" in PLATFORM_FACTS


def test_generate_ranks_listed():
    from generate_training_data import PLATFORM_FACTS

    for rank in ["Novice", "Villager", "Eternal", "Knight", "Mage", "Sage", "Divine"]:
        assert rank in PLATFORM_FACTS, f"{rank} missing from PLATFORM_FACTS"


def test_generate_no_ml_content():
    from generate_training_data import CATEGORY_PROMPTS

    for name, prompt in CATEGORY_PROMPTS.items():
        if name == "platform_qa":
            assert "Do NOT generate any questions about machine learning concepts" in prompt
