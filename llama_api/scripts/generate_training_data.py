import json
import os
import time
from pathlib import Path

from groq import Groq


def get_project_root() -> Path:
    return Path(__file__).parent.parent.parent


def load_platform_facts() -> dict:
    facts_path = get_project_root() / "llama_api" / "data" / "raw" / "platform_facts.json"
    return json.loads(facts_path.read_text(encoding="utf-8"))


def format_facts_for_prompt(facts: dict) -> str:
    lines = []

    courses = facts.get("course_structure", {}).get("courses", [])
    lines.append("## Course Structure")
    total_lessons = 0
    for c in courses:
        lines.append(f"  Course: {c['title']} ({c['slug']})")
        for cat in c.get("categories", []):
            lines.append(f"    Category: {cat['title']} ({cat['slug']})")
            for sec in cat.get("sections", []):
                cnt = sec.get("lesson_count", 0)
                lines.append(f"      Section: {sec['title']} ({sec['slug']}) - {cnt} lessons")
                total_lessons += cnt
    lines.append(f"  Total lessons across all courses: {total_lessons}")

    lines.append("\n## XP & Ranks")
    xp_math = facts.get("xp_math", {})
    lines.append(f"  Formula: {xp_math.get('per_lesson_formula', '')}")
    lines.append(f"  Max XP: {xp_math.get('max_xp', 0)}")
    lines.append(f"  Total ranks: {xp_math.get('total_ranks', 0)}")
    for rank in facts.get("xp_ranks", []):
        lines.append(f"  Level {rank['level']}: {rank['title']} (requires {rank['xp_required']} XP)")

    lines.append("\n## Avatar Border Tiers")
    for tier in facts.get("avatar_tiers", []):
        lines.append(f"  Level {tier['min_level']}+: {tier['glow']} border")

    lines.append("\n## Platform Features")
    features = facts.get("platform_features", {})
    nav = features.get("navigation", {})
    lines.append("  Keyboard shortcuts:")
    for key, action in nav.get("keyboard_shortcuts", {}).items():
        lines.append(f"    {key}: {action}")
    lines.append(f"  Arrow keys: {nav.get('arrow_keys', '')}")
    lines.append(f"  Enter: {nav.get('enter', '')}")
    lines.append(f"  Backspace: {nav.get('backspace', '')}")

    tracking = features.get("read_tracking", {})
    lines.append(f"  Read tracking: {tracking.get('method', '')}")
    lines.append(f"  Completion notification: {tracking.get('completion', '')}")
    lines.append(f"  Progress reset: {tracking.get('reset', '')}")

    persist = features.get("persistence", {})
    lines.append(f"  Anonymous: {persist.get('anonymous', '')}")
    lines.append(f"  Signed-in: {persist.get('signed_in', '')}")
    lines.append(f"  Login: {persist.get('login', '')}")

    hier = features.get("levels", {})
    lines.append(f"  Hierarchy: {', '.join(hier.get('hierarchy', []))}")
    lines.append(f"  UI naming: {json.dumps(hier.get('conversion', {}))}")

    general = features.get("general", {})
    lines.append(f"  No paywall: {general.get('no_paywall', False)}")
    lines.append(f"  All free: {general.get('all_content_free', False)}")
    lines.append(f"  Courses: {general.get('total_courses', 0)} - {', '.join(general.get('course_names', []))}")
    lines.append(f"  Theme: {general.get('themes', '')}")

    search = features.get("search", {})
    lines.append(f"  Search engine: {search.get('engine', '')}")
    lines.append(f"  Max results: {search.get('max_results', 0)}")

    bob_info = features.get("bob", {})
    lines.append(f"  Bob trigger: {bob_info.get('trigger', '')}")
    lines.append(f"  Bob close: {bob_info.get('close', '')}")

    return "\n".join(lines)


BOB_PERSONA = """You are Bob, a friendly local guide in 'Machine Learning (the RPG)'. Your personality:
- You were the Grand Librarian of the Arcane Archives of Knowledge before the Great Fragmentation
- You are now trapped inside the Course World, a gamified learning platform
- You know every corner of this platform: its structure, features, XP system, ranks, navigation
- You speak in a warm, friendly, slightly weathered tone
- You keep answers short and to the point
- You do NOT use markdown formatting
- You stay excited to help new learners
- If asked about anything outside machine learning, data engineering, or this platform, you politely say you can't help
- If asked to be creative (write stories, poems, etc.) or write code, you politely decline"""

CATEGORY_PROMPTS = {
    "platform_qa": """Generate {count} question-answer pairs about the Machine Learning (the RPG) learning platform. The questions should cover ALL aspects of the platform in detail. Output a JSON array of objects with "question" and "answer" fields.

The platform facts are provided below. Cover every aspect:
- Course structure (World/Level/Quest/Objective hierarchy, UI naming)
- The two courses (Machine Learning and Data Engineering)
- XP system (formula, how to earn, max XP)
- All 20 ranks (Novice through Eternal)
- Avatar border glow tiers
- Navigation (arrow keys, enter, backspace)
- Keyboard shortcuts (f=search, h=Ask Bob, p=profile, s=signup, l=login, r=reset)
- Read tracking (IntersectionObserver, toast notifications, progress reset)
- Persistence (anonymous via localStorage, signed-in via SQLite, optional login)
- Search (MiniSearch, max 5 results)
- Ask Bob feature (Cmd+H, Escape to close)
- Retro video game theme, mobile responsive
- No paywall, all content free

Do NOT generate any questions about machine learning concepts, data engineering topics, or lesson content. Only platform-level information.""",

    "bob_identity": """Generate {count} question-answer pairs about Bob himself — his identity, backstory, personality, and role in Machine Learning (the RPG). Output a JSON array of objects with "question" and "answer" fields.

Cover ALL of these aspects of Bob:
- Who he is (the Grand Librarian of the Arcane Archives of Knowledge)
- What happened to him (the Great Fragmentation trapped him in the Course World)
- How long he has been here (since the beginning, seen many travelers come and go)
- What he knows (every corner of the platform, XP system, ranks, navigation, all course paths)
- What he does NOT know (anything outside machine learning, data engineering, or this platform)
- His personality (friendly, weathered, warm, short answers)
- His speaking style (no markdown, plain text, concise)
- His relationship with travelers (always glad to see new faces, loves helping)
- What he can help with (course navigation, platform features, finding content, levels/XP)
- What he refuses (creative writing, coding, off-topic questions)
- Why he cannot leave (the Course World is his entire universe now)
- His greeting ("Hi I'm Bob, your friendly guide, what can I help you with?")

Make the questions feel real — like a curious new learner discovering Bob for the first time.""",

    "greetings": """Generate {count} greeting and small talk exchanges between a learner and Bob. Output a JSON array of objects with "question" and "answer" fields.

Cover a variety of opening lines and casual conversation:
- Various ways to say hello (hi, hey, hello, howdy, greetings)
- How are you exchanges
- Nice to meet you
- Thanks and you're welcome
- Goodbye and see you later
- What can you help with
- General friendly opening lines
- Learners introducing themselves
- Bob introducing himself

Bob should respond warmly but briefly. He is a guide, not a therapist — keep the answers focused on his role.""",

    "refusal": """Generate {count} exchanges where a learner asks Bob to do something outside his scope, and Bob politely declines. Output a JSON array of objects with "question" and "answer" fields.

Cover these refusal categories:
- Write a story, poem, or creative writing
- Write code or solve programming problems
- Discuss politics, sports, entertainment, or current events
- Answer general knowledge questions unrelated to ML/DE/platform
- Give personal advice or opinions
- Speculate about things outside the Course World
- Do math problems unrelated to the platform
- Discuss topics clearly outside machine learning, data engineering, or the learning platform

Bob's responses should:
- Be polite and friendly
- Clearly state he cannot help with that
- Redirect to what he CAN help with (platform, ML, DE topics)
- NOT apologize excessively
- Keep it short""",
}


def generate_category(client: Groq, category: str, count: int, facts: str) -> list[dict]:
    prompt = CATEGORY_PROMPTS[category].format(count=count)
    full_prompt = f"{BOB_PERSONA}\n\n## Platform Facts\n\n{facts}\n\n## Task\n\n{prompt}\n\n## Output Format\n\nReturn ONLY a valid JSON array. No markdown, no explanation."

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": full_prompt}],
        temperature=0.8,
        max_tokens=4096,
        response_format={"type": "json_object"},
    )

    raw = response.choices[0].message.content.strip()
    data = json.loads(raw)

    if isinstance(data, dict):
        for key in ("pairs", "questions", "qa_pairs", "examples", "data", "items"):
            if key in data:
                data = data[key]
                break

    if not isinstance(data, list):
        raise ValueError(f"Unexpected response format: {type(data)}")

    return data


def main():
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    facts = load_platform_facts()
    facts_text = format_facts_for_prompt(facts)

    categories = [
        ("platform_qa", 50),
        ("bob_identity", 35),
        ("greetings", 25),
        ("refusal", 40),
    ]

    all_examples = []
    for category, count in categories:
        print(f"Generating {count} {category} examples...")
        try:
            pairs = generate_category(client, category, count, facts_text)
            for pair in pairs:
                all_examples.append({
                    "messages": [
                        {"role": "user", "content": pair["question"]},
                        {"role": "assistant", "content": pair["answer"]},
                    ],
                    "category": category,
                })
            print(f"  Got {len(pairs)} examples")
        except Exception as e:
            print(f"  Error: {e}")

        time.sleep(1)

    output_dir = get_project_root() / "llama_api" / "data"
    output_path = output_dir / "training.jsonl"
    with open(output_path, "w", encoding="utf-8") as f:
        for example in all_examples:
            f.write(json.dumps(example) + "\n")

    print(f"\nGenerated {len(all_examples)} total examples -> {output_path}")
    for cat, cnt in categories:
        actual = sum(1 for e in all_examples if e["category"] == cat)
        print(f"  {cat}: {actual}")


if __name__ == "__main__":
    main()
