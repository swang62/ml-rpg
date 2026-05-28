import json
import os
import sqlite3
from pathlib import Path


def get_course_db_path() -> str:
    return os.environ.get("COURSE_DB_PATH", "src/db/empty.db")


def get_project_root() -> Path:
    return Path(__file__).parent.parent.parent


def extract_course_structure(db_path: str) -> dict:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT id, slug, title FROM course ORDER BY id")
    courses = [dict(row) for row in cursor.fetchall()]

    for course in courses:
        cursor.execute(
            "SELECT id, slug, title FROM category WHERE course_id = ? ORDER BY id",
            (course["id"],),
        )
        categories = [dict(row) for row in cursor.fetchall()]
        total_lessons = 0

        for cat in categories:
            cursor.execute(
                "SELECT id, slug, title FROM section WHERE category_id = ? ORDER BY id",
                (cat["id"],),
            )
            sections = [dict(row) for row in cursor.fetchall()]

            for sec in sections:
                cursor.execute(
                    "SELECT COUNT(*) as cnt FROM lesson WHERE section_id = ?",
                    (sec["id"],),
                )
                sec["lesson_count"] = cursor.fetchone()["cnt"]
                total_lessons += sec["lesson_count"]

            cat["sections"] = sections
            cat["total_lessons"] = total_lessons

        course["categories"] = categories

    conn.close()
    return {"courses": courses}


def read_readme() -> str:
    readme_path = get_project_root() / "README.md"
    return readme_path.read_text(encoding="utf-8")


XP_RANKS = [
    {"level": 0, "title": "Novice", "xp_required": 0},
    {"level": 1, "title": "Villager", "xp_required": 200},
    {"level": 2, "title": "Squire", "xp_required": 500},
    {"level": 3, "title": "Knight", "xp_required": 1000},
    {"level": 4, "title": "Mage", "xp_required": 1500},
    {"level": 5, "title": "Warlord", "xp_required": 2500},
    {"level": 6, "title": "Champion", "xp_required": 3500},
    {"level": 7, "title": "Legend", "xp_required": 5000},
    {"level": 8, "title": "Mythic", "xp_required": 6500},
    {"level": 9, "title": "Sage", "xp_required": 8500},
    {"level": 10, "title": "Hero", "xp_required": 11000},
    {"level": 11, "title": "Paladin", "xp_required": 14000},
    {"level": 12, "title": "Warden", "xp_required": 17500},
    {"level": 13, "title": "Overlord", "xp_required": 22000},
    {"level": 14, "title": "Titan", "xp_required": 27000},
    {"level": 15, "title": "Elder", "xp_required": 32000},
    {"level": 16, "title": "Guardian", "xp_required": 38000},
    {"level": 17, "title": "Sovereign", "xp_required": 45000},
    {"level": 18, "title": "Celestial", "xp_required": 52000},
    {"level": 19, "title": "Divine", "xp_required": 60000},
    {"level": 20, "title": "Eternal", "xp_required": 70000},
]

XP_MATH = {
    "per_lesson_formula": "lesson_order * 25 XP",
    "examples": {"lesson_1": 25, "lesson_6": 150, "lesson_10": 250},
    "max_xp": 70000,
    "total_ranks": 20,
}

AVATAR_TIERS = [
    {"min_level": 20, "border_color": "#fbbf24", "glow": "golden"},
    {"min_level": 15, "border_color": "#a78bfa", "glow": "purple"},
    {"min_level": 10, "border_color": "#60a5fa", "glow": "blue"},
    {"min_level": 5, "border_color": "#34d399", "glow": "green"},
    {"min_level": 0, "border_color": "muted", "glow": "none"},
]

PLATFORM_FEATURES = {
    "navigation": {
        "keyboard_shortcuts": {
            "f": "Open search",
            "h": "Open Ask Bob chat",
            "p": "Open player profile",
            "s": "Open signup",
            "l": "Open login",
            "r": "Reset progress",
        },
        "arrow_keys": "Navigate between cards",
        "enter": "Select a card",
        "backspace": "Go back",
    },
    "read_tracking": {
        "method": "IntersectionObserver scroll detection",
        "completion": "Toast notification when lesson completed",
        "reset": "Can reset progress on quest page or in Player HUD stats",
    },
    "persistence": {
        "anonymous": "localStorage keys: read:{course}:{category}:{section}:{lesson}",
        "signed_in": "SQLite database via server",
        "login": "Optional, for cross-device saving only",
    },
    "levels": {
        "hierarchy": [
            "World (course)",
            "Level (category)",
            "Quest (section)",
            "Objective (lesson)",
        ],
        "conversion": {
            "world": "course",
            "level": "category",
            "quest": "section",
            "objective": "lesson",
        },
    },
    "general": {
        "no_paywall": True,
        "all_content_free": True,
        "total_courses": 2,
        "course_names": ["Machine Learning", "Data Engineering"],
        "themes": "Retro video game, Hyperlight Drifter inspired",
        "responsive": True,
        "mobile_support": True,
    },
    "search": {
        "engine": "MiniSearch in-memory full-text search",
        "max_results": 5,
        "min_query": 3,
    },
    "bob": {
        "trigger": "Ask Bob button or Cmd+H / Ctrl+H",
        "close": "Escape key",
        "model": "Finetuned SmolLM2-1.7B (local via llama.cpp) or Groq llama-3.1-8b-instant (fallback)",
        "rag": "Hybrid search (vector + BM25) across LanceDB",
    },
}


def main():
    db_path = get_course_db_path()
    if not os.path.exists(db_path):
        print(f"WARNING: DB not found at {db_path}, extracting minimal data")
        structure = {"courses": []}
    else:
        structure = extract_course_structure(db_path)

    platform_facts = {
        "course_structure": structure,
        "xp_ranks": XP_RANKS,
        "xp_math": XP_MATH,
        "avatar_tiers": AVATAR_TIERS,
        "platform_features": PLATFORM_FEATURES,
    }

    output_dir = get_project_root() / "llama_api" / "data" / "raw"
    output_dir.mkdir(parents=True, exist_ok=True)

    output_path = output_dir / "platform_facts.json"
    output_path.write_text(json.dumps(platform_facts, indent=2), encoding="utf-8")
    print(f"Extracted platform facts to {output_path}")


if __name__ == "__main__":
    main()
