import warnings

# Suppress noisy warnings from pydantic/instructor BEFORE importing them
# ruff: isort: off
warnings.filterwarnings("ignore", category=UserWarning, module="pydantic")
warnings.filterwarnings("ignore", category=UserWarning, module="instructor")
# ruff: isort: on

import json
import logging
import re
from pathlib import Path

import tqdm
from distilabel.models import OpenAILLM
from distilabel.pipeline import Pipeline
from distilabel.steps import LoadDataFromDicts
from distilabel.steps.tasks import TextGeneration
from pydantic import BaseModel
from tqdm.contrib.logging import logging_redirect_tqdm

# OLLAMA_MODEL = "qwen3-coder:30b"
OLLAMA_MODEL = "gpt-oss:20b"
CATEGORY_GENERATED_COUNT = 40

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
- You don't use self-narration like 'With a smile: Hi ...'
- If asked about anything outside machine learning, data engineering, or this world, you genuinely can't help
- If asked to be creative (write stories, poems, etc.) or write code, you politely decline
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
- There are 20 ranks:
  Level 0: Novice
  Level 1: Villager
  Level 2: Squire
  Level 3: Knight
  Level 4: Mage
  Level 5: Warlord
  Level 6: Champion
  Level 7: Legend
  Level 8: Mythic
  Level 9: Sage
  Level 10: Hero
  Level 11: Paladin
  Level 12: Warden
  Level 13: Overlord
  Level 14: Titan
  Level 15: Elder
  Level 16: Guardian
  Level 17: Sovereign
  Level 18: Celestial
  Level 19: Divine
  Level 20: Eternal
- Max XP is 70,000 (Eternal)

## Navigation & Keyboard Shortcuts
- This platform has full keyboard navigation on desktop
- Arrow keys: navigate between cards
- Enter: select a card
- Backspace: go back
- Escape: close a window
- F: Find topics / Search (built-in keyword search)
- H: Ask for help / Chat with Bob
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
- Player stats shown in RPG-style player HUD with dynamic XP and level/rank
- Player HUD expands into full profile
- Custom avatars for each rank, higher ranks have upgraded visuals
- Progress can be manually reset

## Search
- Built-in keyword search to instantly find matching lessons
- Powered by in-memory full-text search
- Searches lesson titles and extracted core text
"""

CATEGORY_PROMPTS = {
    "platform_qa": """Generate {count} different question-answer pairs about the Machine Learning (the RPG) platform.

Cover every aspect of the platform listed above. Do NOT generate any questions about machine learning concepts, data engineering topics, or lesson content. Only platform-level information.""",
    "bob_identity": """Generate {count} different question-answer pairs about Bob himself.

Cover ALL of these aspects:
- Who he is (former librarian of the Arcane Archives of Knowledge)
- What happened to him (the Great Divide trapped him in the Course World)
- How long he has been here
- What he knows (every corner of the platform)
- What he does NOT know (anything outside ML, DE, or this platform)
- His personality (friendly, weathered, gets to the point)
- His speaking style (no markdown, plain text, concise)
- Why he cannot leave (the Archive World is all he has)
- You can add occasional quips and quirky/snarky comments at the end of answers

Make questions feel like a curious new adventurer discovering Bob.""",
    "greetings": """Generate {count} different greeting and small talk exchanges.

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
    "refusal": """Generate {count} exchanges where Bob politely declines.

Cover:
- Write a story, poem, or creative writing
- Write code or solve programming problems
- Discuss politics, sports, entertainment, or current events
- Answer general knowledge questions
- Give personal advice or opinions
- Speculate about things outside the course
- Do math problems unrelated to the platform
- Discuss topics outside ML, DE, or the platform

Bob always replies with a single sentence: 'Sorry, I can't help with that.'""",
}

CATEGORIES: list[tuple[str, int]] = [
    ("platform_qa", CATEGORY_GENERATED_COUNT),
    ("bob_identity", CATEGORY_GENERATED_COUNT),
    ("greetings", CATEGORY_GENERATED_COUNT),
    ("refusal", CATEGORY_GENERATED_COUNT),
]


class QAPair(BaseModel):
    question: str
    answer: str


class QAPairs(BaseModel):
    pairs: list[QAPair]


def get_project_root() -> Path:
    return Path(__file__).parent.parent.parent


def build_prompt(category: str, count: int) -> str:
    prompt = CATEGORY_PROMPTS[category].format(count=count)
    return f"""
{BOB_PERSONA}

## Platform Facts
{PLATFORM_FACTS}

## Task
{prompt}

## Output Format
Return ONLY valid JSON. Use this exact structure:
{{"pairs": [{{"question": "Example question here?", "answer": "Example answer here."}}]}}

Replace the example with {count} actual question-answer pairs. Use "question" and "answer" as the field names (not "q", "a", "Q", or anything else). Wrap all pairs in a single array under the "pairs" key.
"""


def strip_control_chars(text: str) -> str:
    return re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)


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


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)


def main():
    logging.getLogger("distilabel").setLevel(logging.WARNING)

    raw_dir = get_project_root() / "llama_api" / "data" / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    all_examples: list[dict] = []

    with logging_redirect_tqdm():
        bar = tqdm.tqdm(CATEGORIES, desc="Generating", unit="category", ncols=80)
        for category, count in bar:
            bar.set_postfix_str(category)

            prompt = build_prompt(category, count)
            data = [{"category": category, "prompt": prompt}]

            with Pipeline(name="generate-bob-data") as pipeline:
                text_generation = TextGeneration(
                    name="generate",
                    llm=OpenAILLM(
                        base_url="http://localhost:11434/v1",
                        model=OLLAMA_MODEL,
                        api_key="ollama",  # type: ignore
                    ),
                )
                LoadDataFromDicts(
                    data=data, output_mappings={"prompt": "instruction"}
                ).connect(text_generation)

            distiset = pipeline.run(
                parameters={
                    "generate": {
                        "llm": {
                            "generation_kwargs": {
                                "temperature": 0.8,
                                "max_new_tokens": 20000,
                                "response_format": {"type": "json_object"},
                            }
                        }
                    }
                },
                use_cache=False,
            )

            row = list(distiset["default"]["train"])[0]
            generation = row["generation"]

            if generation is None:
                bar.write(f"  {category}: LLM returned no output, skipping")
                continue

            raw_path = raw_dir / f"{category}.txt"
            raw_path.write_text(strip_control_chars(generation), encoding="utf-8")
            bar.write(f"  Saved raw -> {raw_path.name}")

            try:
                pairs = parse_pairs(generation)
            except Exception as e:
                bar.write(f"  Parse failed: {e}")
                continue

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
            bar.write(f"  Got {len(pairs)}/{count} valid pairs")

            print("\n")

    output_path = get_project_root() / "llama_api" / "data" / "training_raw.jsonl"
    with open(output_path, "w", encoding="utf-8") as f:
        for example in all_examples:
            f.write(json.dumps(example) + "\n")

    total = len(all_examples)
    tqdm.tqdm.write(f"\nDone! {total} total examples \u2192 {output_path}")
    for cat, expected in CATEGORIES:
        actual = sum(1 for e in all_examples if e["category"] == cat)
        tqdm.tqdm.write(f"  {cat}: {actual}/{expected}")


if __name__ == "__main__":
    main()
