# Machine Learning (the RPG)

![Homepage screenshot](public/assets/screenshot-homepage.webp)

A gamified learning course platform for ML engineering, data engineering, and overall system design. Built on SolidStart, mobile-responsive, supports full keyboard navigation on desktop, and includes a helpful RAG-assisted local "librarian" to help along your journey.

## Summary

A retro video game-themed (Hyperlight Drifter inspired) learning course with a built-in leveling system (just like an RPG!):

1. **World** (course) — a high-level curriculum
2. **Level** (category) — a topical category within a course
3. **Quest** (section) — a specific subject within a category
4. **Objective** (lesson) — an individual lesson within a section

Each objective/lesson awards XP when completed. Players level up gradually through 20 ranks as lessons are completed. Progress is tracked server-side, or locally in the browser if no login is detected. No paywall or restricted content, login is purely for global "saves".

## Core Features

### Course Information

- Courses available: Fundamental system design, ML engineering and Data engineering
- Each course has roughly 10-20 categories
- Each category contains 5-10 sections
- Each section contains 5-7 lessons

### Navigation

The platform is fully navigable by keyboard on desktop. All keys are ignored when typing in an input field.

| Key        | Action                   |
| ---------- | ------------------------ |
| Arrow keys | Navigate between cards   |
| Enter      | Select a card or confirm |
| Backspace  | Go back                  |
| Escape     | Close current panel      |
| f          | Focus keyword search     |
| h          | Ask Bob for help         |
| p          | Player profile           |
| s          | Sign-up form             |
| l          | Log in / Log out         |
| r          | Reset XP & progress      |

### XP & Leveling

- Each objective/lesson awards a multiple of `25 XP`, increasing with lesson count (e.g. lesson 1 = 25 XP, lesson 6 = 150 XP)
- 20 ranks: Novice (0), Villager (1), Squire (2), Knight (3), Mage (4), Warlord (5), Champion (6), Legend (7), Mythic (8), Sage (9), Hero (10), Paladin (11), Warden (12), Overlord (13), Titan (14), Elder (15), Guardian (16), Sovereign (17), Celestial (18), Divine (19), Eternal (20)
- Each rank has increasing XP thresholds until the final max level 20, which requires 70,000 total XP

### Player Tracking

- Login is completely optional. Default user is Anon
- **Anonymous users:** All progress is stored locally in your browser, does not sync across devices, and is lost if you clear your browser cache
- **Signed-in users:** Progress is synced server-side. Available across devices after logging in
- Player stats are shown in a RPG-style HUD with dynamic XP and level status; expands into a full profile sheet
- Custom avatars for each rank, higher ranks have upgraded visuals

---

## Who is Bob?

Before you arrived, Bob was a lowly librarian of the Arcane Archives of Knowledge, a vast library of machine learning, data engineering, and system design wisdom collected over the many ages. When the Great Divide split the digital realms apart, Bob found himself bound to the World of the Archives and unable to leave — the very world you're now exploring.

He's been here ever since, watching travelers come and go, helping them along their journey, reading through all the archives. He knows every corner of this place: how XP flows through the ranks, where the hidden shortcuts are, which quests unlock what, and the full layout of every World.

But he's also trapped. His knowledge ends at the Archive World's borders. Ask him about anything outside of machine learning, data engineering, or this world, and he genuinely doesn't know — he's never been able to leave.

Bob is friendly and always glad to see a new face.

> "Hi, I'm Bob. Welcome to Machine Learning (the RPG).

---

## Motivation

I created this repo to initially self-learn about ML/Data engineering and system design topics, but eventually turned it into a fun playground to practice AI tools and RAG/agentic workflows. Also sharpening my frontend design UI/UX. Truly meta-level learning.

## Codebase

I tried to avoid any external dependencies besides Cloudflare for this small project, so trading a little bit of accuracy in exchange for full privacy and offline processing is worth it IMO. All LLM models and embeddings are created locally with a backend FastAPI server. For a full breakdown of the repo architecture, tech stack, configuration, and local development setup, check out [AGENTS.md](AGENTS.md).

## License

MIT. Do what you will. [LICENSE](LICENSE).
