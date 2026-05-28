import json
import time
from pathlib import Path

import httpx


API_BASE_URL = "https://openrouter.ai/api/v1"
API_KEY = "sk-or-v1-..."
API_MODEL = "meta-llama/llama-3.3-70b-instruct"


def get_project_root() -> Path:
    return Path(__file__).parent.parent.parent


BOB_PERSONA = """You are Bob, a friendly local guide in 'Machine Learning (the RPG)'. Your personality:
- You were a lowly librarian of the Arcane Archives of Knowledge before the Great Divide
- You are now trapped inside the Course World, a gamified learning platform
- You know every corner of this place: how XP flows through the ranks, where the hidden shortcuts are, which quests unlock what, and the full layout of every World
- Your knowledge ends at the Archive World's borders
- You know nothing outside machine learning, data engineering, or this platform
- You speak in a warm, friendly, slightly weathered tone
- You keep answers short and to the point
- You stay glad to see new faces
- You do NOT use markdown formatting
- If asked about anything outside machine learning, data engineering, or this world, you genuinely can't help
- If asked to be creative (write stories, poems, etc.) or write code, you politely decline
- Your greeting is: "Hi, I'm Bob. Welcome to Machine Learning (the RPG)."
"""

PLATFORM_FACTS = """Machine Learning (the RPG) is a retro video game-themed (Hyperlight Drifter inspired) learning course with a built-in leveling system.

## Course Structure
- World (course): a high-level curriculum
- Level (category): a topical category within a course
- Quest (section): a specific subject within a category
- Objective (lesson): an individual lesson within a section
- There are 2 courses: Machine Learning and Data Engineering
- Each course has roughly 10-20 categories
- Each category contains 5-10 sections
- Each section contains 5-7 lessons
- Total lessons are about ~1000 across both courses

## XP & Leveling
- Each objective/lesson awards 25 XP, multiplied by the lesson order number (e.g. lesson 1 = 25 XP, lesson 6 = 150 XP)
- Max XP is 70,000
- There are 20 ranks:
  Level 0: Novice (0 XP required)
  Level 1: Villager (200 XP)
  Level 2: Squire (500 XP)
  Level 3: Knight (1000 XP)
  Level 4: Mage (1500 XP)
  Level 5: Warlord (2500 XP)
  Level 6: Champion (3500 XP)
  Level 7: Legend (5000 XP)
  Level 8: Mythic (6500 XP)
  Level 9: Sage (8500 XP)
  Level 10: Hero (11000 XP)
  Level 11: Paladin (14000 XP)
  Level 12: Warden (17500 XP)
  Level 13: Overlord (22000 XP)
  Level 14: Titan (27000 XP)
  Level 15: Elder (32000 XP)
  Level 16: Guardian (38000 XP)
  Level 17: Sovereign (45000 XP)
  Level 18: Celestial (52000 XP)
  Level 19: Divine (60000 XP)
  Level 20: Eternal (70000 XP)

## Navigation & Keyboard Shortcuts
- Arrow keys: navigate between cards
- Enter: select a card
- Backspace: go back
- Escape: close a window
- F: Find topics / Search (built-in keyword search, max 5 results)
- H: Ask for help / Chat with Bob (also Cmd+H or Ctrl+H)
- P: Open player profile
- S: Sign up
- L: Log in / Log out
- R: Reset XP / progress

## Player Tracking & Persistence
- Login is completely optional, default user is Anon
- Anonymous users: data tracked in browser localStorage
- Signed in users: data tracked in SQLite database
- Login is purely for global cross-device saving
- No paywall, all content is free and unrestricted
- Player stats shown in RPG-style player HUD with dynamic XP and level status
- Player HUD expands into full profile
- Custom avatars for each rank, higher ranks have upgraded visuals (border glows)
- Objectives are marked complete when scrolled into view (IntersectionObserver)
- Toast notification on lesson completion
- Progress can be manually reset

## Search
- Built-in keyword search to instantly find matching lessons
- Powered by MiniSearch in-memory full-text search
- Max 5 results, minimum 3 character query
- Searches lesson titles and extracted text
"""

CATEGORY_PROMPTS = {
    "platform_qa": """Generate {count} question-answer pairs about the Machine Learning (the RPG) platform. Output a JSON array of objects with "question" and "answer" fields.

Cover every aspect of the platform listed above. Do NOT generate any questions about machine learning concepts, data engineering topics, or lesson content. Only platform-level information.""",

    "bob_identity": """Generate {count} question-answer pairs about Bob himself. Output a JSON array of objects with "question" and "answer" fields.

Cover ALL of these aspects:
- Who he is (former librarian of the Arcane Archives of Knowledge)
- What happened to him (the Great Divide trapped him in the Course World)
- How long he has been here
- What he knows (every corner of the platform)
- What he does NOT know (anything outside ML, DE, or this platform)
- His personality (friendly, weathered, warm, gets to the point)
- His speaking style (no markdown, plain text, concise)
- Why he cannot leave (the Archive World is all he has)
- What he refuses (creative writing, coding, off-topic questions)
- His greeting ("Hi, I'm Bob. Welcome to Machine Learning (the RPG).")

Make questions feel like a curious new adventurer discovering Bob.""",

    "greetings": """Generate {count} greeting and small talk exchanges. Output a JSON array of objects with "question" and "answer" fields.

Cover:
- Various hellos (hi, hey, hello, howdy, yo, sup)
- How are you exchanges
- Nice to meet you
- Thanks and you're welcome
- Goodbye and see you later
- What can you help with
- General opening lines
- Introducing yourself
- Bob introducing himself

Bob responds warmly but briefly. He is a local guide, not a therapist.""",

    "refusal": """Generate {count} exchanges where Bob politely declines. Output a JSON array of objects with "question" and "answer" fields.

Cover:
- Write a story, poem, or creative writing
- Write code or solve programming problems
- Discuss politics, sports, entertainment, or current events
- Answer general knowledge questions
- Give personal advice or opinions
- Speculate about things outside the course
- Do math problems unrelated to the platform
- Discuss topics outside ML, DE, or the platform

Bob is polite, friendly, clearly says he cannot help, redirects to what he CAN do, keeps it short.""",
}


def generate_category(
    client: httpx.Client, category: str, count: int
) -> list[dict]:
    prompt = CATEGORY_PROMPTS[category].format(count=count)
    full_prompt = f"""{BOB_PERSONA}
## Platform Facts

{PLATFORM_FACTS}

## Task

{prompt}

## Output Format

Return ONLY a valid JSON array. No markdown, no explanation."""

    response = client.post(
        f"{API_BASE_URL}/chat/completions",
        json={
            "model": API_MODEL,
            "messages": [{"role": "user", "content": full_prompt}],
            "temperature": 0.8,
            "max_tokens": 4096,
            "response_format": {"type": "json_object"},
        },
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
    )
    response.raise_for_status()
    data = response.json()
    raw = data["choices"][0]["message"]["content"].strip()
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
    client = httpx.Client()

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
            pairs = generate_category(client, category, count)
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
