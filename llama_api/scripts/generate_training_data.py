import json
import os
import time

from groq import Groq


PLATFORM_FEATURES = {
    "navigation": {
        "keyboard_shortcuts": {
            "f": "Find topics / Search",
            "h": "Ask for help / Chat with Bob",
            "p": "Player's profile",
            "s": "Sign up",
            "l": "Log in / Log out",
            "r": "Reset XP",
        },
        "arrow_keys": "Navigate between cards",
        "enter": "Select a card",
        "backspace": "Go back",
        "esc": "Close window",
    },
    "tracking": {
        "anonymous": "localStorage",
        "signed_in": "SQLite database",
        "login": "Optional, for cross-device saves",
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
        "total_courses": 2,
        "course_names": ["Machine Learning", "Data Engineering"],
    },
}

CATEGORY_PROMPTS = {
    "platform_qa": """Generate {count} question-answer pairs about the Machine Learning (the RPG) learning platform. The questions should cover ALL aspects of the platform in detail. Output a JSON array of objects with "question" and "answer" fields.

The platform facts are provided above. Cover every aspect:
- Course structure (World/Level/Quest/Objective hierarchy, UI naming)
- The two courses (Machine Learning and Data Engineering)
- XP system (formula, how to earn, max XP)
- All 20 ranks (Novice through Eternal)
- Navigation (arrow keys, enter, backspace)
- Keyboard shortcuts (f=search, h=Ask for Help, p=profile, s=signup, l=login, r=reset)
- Persistence (anonymous via localStorage, optional login)
- Search
- Ask for Help feature to chat with a local guide (H)
- Retro video game theme, inspired by Hyperlight Drifter
- No paywall, all content is free, logins are purely for global cross-device saving

Do NOT generate any questions about machine learning concepts, data engineering topics, or lesson content. Only platform-level information.
""",
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

Make the questions feel real — like a curious new adventurer discovering Bob for the first time.
""",
    "greetings": """Generate {count} greeting and small talk exchanges between a user and Bob. Output a JSON array of objects with "question" and "answer" fields.

Cover a variety of opening lines and casual conversation:
- Various ways to say hello (hi, hey, hello, howdy, greetings, yo, sup, whatsup)
- How are you exchanges
- Nice to meet you
- Thanks and you're welcome
- Goodbye and see you later
- What can you help with
- General friendly opening lines
- Users introducing themselves
- Bob introducing himself

Bob should respond warmly but briefly. He is a guide, not a therapist — keep the answers focused on his role and backstory.
""",
    "refusal": """Generate {count} exchanges where a learner asks Bob to do something outside his scope, and Bob politely declines. Output a JSON array of objects with "question" and "answer" fields.

Cover these refusal categories:
- Write a story, poem, or creative writing
- Write code or solve programming problems
- Discuss politics, sports, entertainment, or current events
- Answer general knowledge questions unrelated to ML/DE/platform
- Give personal advice or opinions
- Speculate about things outside the course
- Do math problems unrelated to the platform
- Discuss topics clearly outside machine learning, data engineering, or the current learning platform

Bob's responses should:
- Be polite and friendly
- Clearly state he cannot help with that
- Redirect to what he CAN help with (platform, ML, DE topics)
- NOT apologize excessively
- Keep it short
""",
}


def generate_category(
    client: Groq, category: str, count: int, facts: str
) -> list[dict]:
    prompt = CATEGORY_PROMPTS[category].format(count=count)
    full_prompt = f"""
    {BOB_PERSONA}
    ## Platform Facts\n\n
    {facts}\n\n
    ## Task\n\n
    {prompt}
    \n\n
    ## Output Format\n\n
    Return ONLY a valid JSON array. No markdown, no explanation.
    """

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
            pairs = generate_category(client, category, count, facts)
            for pair in pairs:
                all_examples.append(
                    {
                        "messages": [
                            {"role": "user", "content": pair["question"]},
                            {"role": "assistant", "content": pair["answer"]},
                        ],
                        "category": category,
                    }
                )
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
