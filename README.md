# Machine Learning (the RPG)

A gamified learning course catalog for ML & Data Engineering content. Built on SolidStart (Nitro). 

## Summary

A retro video game-themed (Hyperlight Drifter inspired) content-navigation site with a built-in XP/leveling RPG system:

1. **World** (course) — a high-level curriculum
2. **Level** (category) — a topical category within a world
3. **Quest** (subsection) — a specific subject within a level
4. **Objective** (lesson) — an individual lesson with its own page and external links

Each objective awards XP when completed. Players level up through 20 ranks (Novice → Eternal). Progress is tracked server-side or locally in the browser if no login is detected. No paywall or restricted content, login is purely for global "saves".

## Features

### XP & Leveling

- Each objective awards `order * XP_VALUE` XP (objective 1 = 25 XP, objective 6 = 150 XP)
- 20 ranks from Novice (0) to Eternal (20), gradual exponential curve
- Level 20 requires 60,000 XP (~87,000 is total available XP if all lessons are completed)
- Server-side persistence via better-sqlite3
- Separate dev/prod environments based on `NODE_ENV`

### Player HUD

- Auth is completely optional, default user is Anon/Anonymous, local storage tracking
- Rendered as player profile in bottom bar, fetches and shows dynamic XP stats and levelling
- Custom avatars at each rank, with border glow that scales with level

### Read Status Tracking

- Objectives are marked read immediately when completed
- "Reset All" button clears read status for the current quest
- Completed toast appears briefly, along with XP animations

---

## Tech Stack

- **SolidStart** — meta-framework (SolidJS + file-system routing)
- **Vinxi** — build tool and dev server (based on Nitro)
- **Sqlite** — persistence layer (local storage fallback)
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
