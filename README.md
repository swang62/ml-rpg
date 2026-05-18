# Machine Learning (the RPG)

A gamified learning course platform for ML & Data Engineering content. Built on SolidStart. 

## Summary

A retro video game-themed (Hyperlight Drifter inspired) content-navigation site with a built-in leveling system (just like an RPG!):

1. **World** (course) — a high-level curriculum
2. **Level** (category) — a topical category within a world
3. **Quest** (subsection) — a specific subject within a level
4. **Objective** (lesson) — an individual lesson with its own page and external links

Each objective awards XP when completed. Players level up through 20 ranks (Novice → Eternal). Progress is tracked server-side or locally in the browser if no login is detected. No paywall or restricted content, login is purely for global "saves".

## Features

### XP & Leveling

- Each objective awards `order * 25 XP` (objective 1 = 25 XP, objective 6 = 150 XP)
- 20 ranks from Novice (0) to Eternal (20), gradual increasing difficulty curve
- Level 20 requires 60,000 XP (~87,000 is total available XP if all lessons are completed)

### Player HUD

- Login is completely optional, default user is Anon using local storage tracking
- Rendered as player profile in bottom bar, fetches and shows dynamic XP stats and leveling
- Custom avatars with each rank, border glow scales with higher levels

### Read Tracking

- Objectives are marked read immediately when completed
- "Reset All" button clears read status for the current quest
- XP earned animations (+XP) just like in Mario

---

## Tech Stack

- **SolidStart** — meta-framework (SolidJS for reactivity + file-system routing)
- **Vinxi** — build tool and dev server with HMR (Vite/Nitro)
- **better-sqlite3** — fast synchronous persistence layer for course & user data
- **sqlc** - fully type-safe TS generator for handling sql queries/mutations
- **Docker** - full production-ready CI/CD deployment from github hooks

## Folder Structure

```
├── scripts/                    # Build-time utilities (Python and TS)
├── public/
│   └── assets/                 # Icons and backgrounds
├── src/
│   ├── components/             # Reusable UI components
│   ├── db/                     # SQL files for sqlc and generated queries
│   ├── routes/                 # File-system routing
│   ├── server/                 # SSR functions (Nitro)
│   └── utils/                  # Shared utilities, types, and constants
```
