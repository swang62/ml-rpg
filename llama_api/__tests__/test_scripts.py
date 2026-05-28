import json
import os
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "scripts"))

os.environ["COURSE_DB_PATH"] = str(
    Path(__file__).parent.parent.parent / "src" / "db" / "empty.db"
)


def test_extract_structure():
    from extract_platform_data import extract_course_structure, XP_RANKS, PLATFORM_FEATURES

    db_path = os.environ["COURSE_DB_PATH"]
    result = extract_course_structure(db_path)

    assert "courses" in result
    assert len(result["courses"]) >= 1

    course = result["courses"][0]
    assert "id" in course
    assert "slug" in course
    assert "title" in course
    assert "categories" in course

    for cat in course["categories"]:
        assert "slug" in cat
        assert "title" in cat
        assert "sections" in cat
        for sec in cat["sections"]:
            assert "lesson_count" in sec


def test_xp_ranks():
    from extract_platform_data import XP_RANKS

    assert len(XP_RANKS) == 21
    assert XP_RANKS[0] == {"level": 0, "title": "Novice", "xp_required": 0}
    assert XP_RANKS[20] == {"level": 20, "title": "Eternal", "xp_required": 70000}

    for i in range(len(XP_RANKS) - 1):
        assert XP_RANKS[i]["level"] < XP_RANKS[i + 1]["level"]
        assert XP_RANKS[i]["xp_required"] <= XP_RANKS[i + 1]["xp_required"]


def test_avatar_tiers():
    from extract_platform_data import AVATAR_TIERS

    assert len(AVATAR_TIERS) == 5
    assert AVATAR_TIERS[0]["min_level"] == 20
    assert AVATAR_TIERS[-1]["min_level"] == 0


def test_platform_features_keys():
    from extract_platform_data import PLATFORM_FEATURES

    assert "navigation" in PLATFORM_FEATURES
    assert "read_tracking" in PLATFORM_FEATURES
    assert "persistence" in PLATFORM_FEATURES
    assert "levels" in PLATFORM_FEATURES
    assert "general" in PLATFORM_FEATURES
    assert "search" in PLATFORM_FEATURES
    assert "bob" in PLATFORM_FEATURES

    keyboard = PLATFORM_FEATURES["navigation"]["keyboard_shortcuts"]
    assert keyboard["f"] == "Open search"
    assert keyboard["h"] == "Open Ask Bob chat"

    assert PLATFORM_FEATURES["general"]["no_paywall"] is True
    assert PLATFORM_FEATURES["general"]["total_courses"] == 2


def test_xp_math():
    from extract_platform_data import XP_MATH

    assert XP_MATH["per_lesson_formula"] == "lesson_order * 25 XP"
    assert XP_MATH["max_xp"] == 70_000
    assert XP_MATH["total_ranks"] == 20
    assert XP_MATH["examples"]["lesson_1"] == 25
    assert XP_MATH["examples"]["lesson_6"] == 150


def test_format_facts():
    platform_facts_path = (
        Path(__file__).parent.parent / "data" / "raw" / "platform_facts.json"
    )
    if not platform_facts_path.exists():
        pytest.skip("platform_facts.json not found — run extract_platform_data first")

    facts = json.loads(platform_facts_path.read_text())

    from generate_training_data import format_facts_for_prompt

    result = format_facts_for_prompt(facts)

    assert "Course Structure" in result
    assert "XP & Ranks" in result
    assert "Platform Features" in result
    assert "Keyboard shortcuts" in result
    assert "Novice" in result
    assert "Eternal" in result


def test_format_training_output():
    from format_training import format_chatml, SYSTEM_PROMPT

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


def test_format_training_split():
    from format_training import SYSTEM_PROMPT

    assert "Bob" in SYSTEM_PROMPT
    assert "Machine Learning (the RPG)" in SYSTEM_PROMPT
    assert "markdown" in SYSTEM_PROMPT


def test_generate_category_prompts():
    from generate_training_data import CATEGORY_PROMPTS, BOB_PERSONA

    assert "platform_qa" in CATEGORY_PROMPTS
    assert "bob_identity" in CATEGORY_PROMPTS
    assert "greetings" in CATEGORY_PROMPTS
    assert "refusal" in CATEGORY_PROMPTS

    assert "Grand Librarian" in BOB_PERSONA
    assert "Course World" in BOB_PERSONA
    assert "Arcane Archives" in BOB_PERSONA
