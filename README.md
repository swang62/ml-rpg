# System Overflow

A gamified course catalog for ML System Design and Data Engineering content. Built with SolidStart, served as a static site with a Nitro server for persistence.

## What This Project Does

System Overflow is a retro game-themed content-navigation site with an XP/leveling system:

1. **World** (course) — a high-level curriculum (e.g., "ML System Design", "Data Engineering")
2. **Level** (category) — a topical category within a world (e.g., "AB Testing", "Embeddings")
3. **Quest** (subsection) — a specific subject within a level (e.g., "Experiment Design")
4. **Objective** (lesson) — an individual learning piece with its own page and external links

Each objective awards XP (order * 25) when read. Players level up through 20 ranks (Novice → Eternal) with a quadratic XP curve. Progress persists server-side via unstorage.

## Tech Stack

- **SolidStart** — meta-framework (SolidJS + file-system routing)
- **Vinxi** — build tool and dev server (based on Nitro)
- **unstorage** — persistence layer with fs driver
- **Biome** — linting and formatting
- **pnpm** — package manager

## Folder Structure

```
├── scripts/                    # Build-time utilities (Python and TS)
├── public/
│   ├── assets/
│   │   ├── avatars/            # 21 level icons (lvl0.svg - lvl20.svg)
│   │   ├── bg/                 # Hierarchy-specific background images
│   │   └── icons/              # Game-themed UI icons
│   └── search/                 # Pre-built minisearch index (generated)
├── src/
│   ├── components/             # Reusable UI components
│   ├── data/
│   │   ├── course-index.ts     # Course metadata index
│   │   ├── courses/            # Per-course data definitions
│   │   └── lessons/            # Objective TSX components (server-rendered)
│   ├── server/                 # "use server" functions (Nitro)
│   ├── utils/                  # Shared utilities, types, and constants
│   └── routes/                 # File-system routing
```

## Commands

```bash
pnpm dev            # Dev server (HMR enabled)
pnpm build          # Production build → .output/
pnpm preview        # Serve built app via .output/server/index.mjs
pnpm build:index   # Rebuild search index from lesson TSX files
pnpm lint           # biome check --write . && pnpm typecheck && fallow audit
```

## Domain Glossary

| Game Term | Internal Name | Definition | Example |
|-----------|--------------|------------|---------|
| **World** | course | A top-level curriculum | "ML System Design", "Data Engineering" |
| **Level** | category | A major topic inside a world | "AB Testing", "Feature Stores" |
| **Quest** | subsection | A specific subject inside a level | "Experiment Design" |
| **Objective** | lesson | An individual learning piece | "What Is Power Analysis" |

## Game Features

### XP & Leveling

- Each objective awards `order * 25` XP (objective 1 = 25 XP, objective 6 = 150 XP)
- 20 ranks from Novice (0) to Eternal (20), quadratic XP curve
- Level 20 requires 60,000 XP (69% of ~87,000 total available XP)
- Server-side persistence via unstorage + fs driver (`.data/xp/`)
- Separate dev/prod stores based on `NODE_ENV`

### Player HUD

- Rendered in the top nav bar, polls `getTotalXp()` every 3 seconds
- Shows: level title, XP progress bar, Lv.#, XP count (k-abbreviated)
- Circular avatar with border glow that scales with level (gold at 20)
- 21 unique avatar icons (`public/assets/avatars/lvl{n}.svg`)

### Read Tracking

- Objectives are marked read after scrolling past a sentinel + delay
- Quest page shows read progress: completed objectives get muted cards and greyed XP badges
- "Reset All" button clears read status for the current quest
- Server-side persistence via unstorage + fs driver (`.data/tracking/`)

### Visual Design

- Dark retro theme with purple (world), green (level), gold (quest) accents
- Pixel font (Press Start 2P) on HUD, order badges, and XP indicators
- Display font (Plus Jakarta Sans) on navigation and body text
- Card-based layout with 3px retro borders and hover glow effects
- Hierarchy-specific background images with dark overlays

## Data Persistence

Runtime data is stored in `.data/` at the project root (gitignored, only `.gitkeep` files tracked):

```
.data/
├── xp/
│   ├── dev/         # Dev XP data (when NODE_ENV != production)
│   └── prod/        # Prod XP data (Docker volume mount)
└── tracking/
    ├── dev/         # Dev read tracking
    └── prod/        # Prod read tracking (Docker volume mount)
```
