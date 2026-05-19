# Machine Learning (the RPG)

![Homepage screenshot](public/assets/screenshot-homepage.png)

A gamified learning course platform for ML & Data Engineering content. Built on SolidStart, fully mobile-responsive, supports full keyboard navigation on desktop.

## Summary

A retro video game-themed (Hyperlight Drifter inspired) content-navigation site with a built-in leveling system (just like an RPG!):

1. **World** (course) — a high-level curriculum
2. **Level** (category) — a topical category within a world
3. **Quest** (section) — a specific subject within a level
4. **Objective** (lesson) — an individual lesson with its own page and external links

Each objective/lesson awards XP when completed. Players level up gradually through 20 ranks as lessons are completed. Progress is tracked server-side, or locally in the browser if no login is detected. No paywall or restricted content, login is purely for global "saving".

## Core Features

### Course Information

- Currently only 2 courses, machine learning and data engineering
- Each course has roughly 10-20 categories
- Each category contains 5-10 sections
- Each section contains 5-7 lessons
- Total lessons are about ~1000 lessons
  
### XP & Leveling system

- Each objective awards a multiple of `25 XP` (e.g. lesson 1 = 25 XP, lesson 6 = 150 XP)
- 20 ranks: Novice (0), Villager (1), Squire (2), Knight (3), Mage (4), Warlord (5), Champion (6), Legend (7), Mythic (8), Sage (9), Hero (10), Paladin (11), Warden (12), Overlord (13), Titan (14), Elder (15), Guardian (16), Sovereign (17), Celestial (18), Divine (19), Eternal (20) — increasing difficulty curve

### Player Tracking

- Login is completely optional, default user is Anon.
- For guest/anonymous users, all data is tracked in the browser, fully local.
- Player stats are rendered as RPG-style player HUD, shows dynamic XP and level status
- Custom avatars with each rank, border glows at higher ranks

### Read Tracking

- Objectives are marked complete when a user reads the full lesson
- Users can manually reset progress on the quest page, or in the Player HUD detailed stats section

---

## Motivation

I created this repo to initially learn about ML/Data engineering topics, but eventually turned it into a fun playground to practice new web development libraries and RAG/agentic workflows and implementation. Also practicing my frontend design UI/UX skills. Truly meta-level learning on learning action.

## Development

For a full breakdown of the repo architecture, tech stack, configuration, and local development setup, check out [AGENTS.md](AGENTS.md).

## License

MIT. Do what you will. [LICENSE.md](LICENSE.md). 
