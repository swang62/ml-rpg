# AGENTS.md

## Tech Stack / Libraries

- **SolidStart** - SSR meta-framework (SolidJS) with `@solidjs/router`
- **Vinxi** - Backend/build tool and dev server with HMR (Nitro/Vite)
- **Better-sqlite3** — Synchronous persistence layer for course & user data
- **Sqlc** — Type-safe generator for handling sql queries/mutations with pure TS
- **RAG/AI chat** — Hybrid semantic/keyword search with vector store for RAG, built-in jailbreak detection
- **MiniSearch** — Alternative client-side document search for lesson pages
- **Docker** — CI/CD containerized deployment to VPS

## Commands

Package manager is pnpm, Node.js >= 22

```bash
pnpm dev              # dev server (HMR enabled — use for inspection)
pnpm build            # production build → Nitro server
pnpm preview          # serve built app via node .output/server/index.mjs
pnpm lint             # biome check --write . && pnpm typecheck
pnpm test             # vitest run
pnpm generate:types   # sqlc generate — rebuilds typed query functions from src/db/raw/*.sql
pnpm seed             # tsx ./scripts/seed-db.ts — re-seed course.db from scraped lesson files
pnpm build:docker     # docker compose up --build --force-recreate -d
pnpm typecheck        # pnpm tsc --noEmit
pnpm prepare          # husky || true — initialize git hooks (runs on install)
```

> **The user controls the dev server.** Never kill, restart, reload, start, or stop `pnpm dev`. The user starts it manually and it has HMR — edits are reflected instantly without a restart. If the page at `localhost:3000` shows stale content, wait for HMR to pick up the change. You can run linting, testing, and building to check things if needed.
> Run `pnpm lint` before pushing — it handles formatting, linting, type checking in one pass.

## Folder Structure

```
├── .data/                      # Persistent storage folder, sqlite db files
├── .github/
│   └── workflows/
│       └── ci.yml              # CI pipeline (secrets scan, lint, test, build)
├── .husky/
│   └── pre-commit              # Git hooks (runs lint-staged)
├── scripts/                    # One-time utilities (Python and TS) for scraping/migration
├── public/
│   └── assets/
│       ├── avatars/            #   21 SVG avatar images (lvl0.svg – lvl20.svg)
│       └── bg/                 #   Background images per page depth
├── src/
│   ├── components/             # Reusable UI components
│   │   └── __tests__/          #   Component tests
│   ├── middleware/              # SolidStart middleware
│   │   ├── index.ts            #   Rate limiting on all SSR requests
│   │   └── migrations.ts       #   Schema version migration system
│   ├── db/                     # SQL files for sqlc and generated query functions
│   │   ├── __tests__/          #   Database integration tests
│   │   ├── raw/                #   Raw .sql files (schema + queries)
│   │   ├── empty.db            #   Pre-seeded course database template
│   │   └── *_sql.ts            #   Generated typed query functions (DO NOT EDIT)
│   ├── routes/                 # File-system routing
│   │   ├── api/
│   │   │   └── health.ts       #   Health check endpoint (GET /api/health)
│   │   ├── index.tsx           #   Homepage
│   │   ├── [course]/           #   Dynamic course routes
│   │   │   ├── index.tsx       #     Course level page
│   │   │   ├── [category]/
│   │   │   │   ├── index.tsx   #       Category level page
│   │   │   │   └── [section]/
│   │   │   │       ├── index.tsx  #     Section/Quest page
│   │   │   │       └── [lesson]/
│   │   │   │           └── index.tsx # Lesson/Objective page
│   │   └── [...404].tsx        # 404 catch-all
│   ├── server/                 # SSR functions
│   │   ├── __tests__/          #   Server logic tests
│   │   ├── auth.ts             #   Login/logout actions
│   │   ├── course.ts           #   Course/category/section/lesson queries
│   │   ├── lesson.ts           #   Lesson HTML query and rendering helpers
│   │   ├── mutations.ts        #   Progress mutations (mark read, reset, update name)
│   │   ├── progress.ts         #   XP & read status queries
│   │   ├── rag.ts              #   RAG (Retrieval-Augmented Generation) via LanceDB + Groq
│   │   ├── rate-limiter.ts     #   In-memory sliding window rate limiter
│   │   ├── search.ts           #   Full-text search via MiniSearch + LanceDB vector store builder
│   │   ├── session.ts          #   Argon2id password hashing + session management
│   │   └── storage.ts          #   better-sqlite3 singleton connection
│   └── utils/
│       ├── __tests__/          #   Utility tests
│       ├── animation.ts        #   Card tilt on hover helpers
│       ├── constants.ts        #   All app constants and configuration
│       ├── focus-trap.ts       #   Tab/Shift+Tab modal focus cycling
│       ├── keyboard.ts         #   Arrow key card navigation + global shortcuts
│       ├── local-storage.ts    #   Anonymous user localStorage persistence (was client-storage.ts)
│       ├── search-utils.ts     #   Text extraction, HTML sanitization, dedup helpers
│       ├── storage.ts          #   better-sqlite3 singleton connection
│       ├── types.ts            #   Shared TypeScript types
│       └── xp.ts               #   XP/level calculation helpers
```

## Code Style & Linting

- **Biome** handles both linting and formatting (no ESLint/Prettier)
- Double quotes, 2-space indent, organize imports on save
- Pre-commit git hook runs `lint-staged` → `biome check --write --no-errors-on-unmatched` on staged files + `vitest related --run` on changed `.ts` files automatically. No need to lint manually before committing — just `git commit` and the hook handles it.
- `pnpm lint` includes Biome checks and TypeScript type checking in one pass.

### Database Queries

- **All database queries MUST use sqlc.** Raw SQL in TypeScript files is forbidden. Add or modify queries in `src/db/raw/*.sql`, then run `pnpm generate:types` (`sqlc generate`) to produce typed functions in `src/db/*_sql.ts`.
- The sqlc config is at `sqlc.yaml`: schema from `src/db/raw/base.sql`, queries from `src/db/raw/`, output to `src/db/`.
- **sqlc bug — snake_case alias rule:** The `ts` plugin with `better-sqlite3` driver cannot handle snake_case column names. It strips underscores and lowercases everything. `user_password` becomes `userpassword`, NOT `userPassword`. To work around this, all snake_case columns MUST be aliased to all-lowercase with no underscores. Example: `users.user_password AS userpassword`, `users.display_name AS displayname`. CamelCase aliases (`userPassword`, `displayName`) will be rejected by the type checker.

### Reactive Signals

- Do NOT destructure reactive props or signals. Access them directly via `props.signal`, never `const { signal } = props`. Destructuring breaks reactivity by capturing the value at call time.
- When extracting sub-components from a reactive parent, pass signals as props using `<Child prop={signal()} />` — the `()` preserves the reactive read. Calling functions directly (`Child({ prop: signal() })`) passes a snapshot; SolidJS can't track the dependency.

## Architecture

### Data hierarchy

```
Course → Category → Section → Lesson
```

Rendered via dynamic routes at `/[course]/[category]/[section]/[lesson]`.

### Game terminology

| UI Label   | Internal |
|------------|----------|
| World      | course   |
| Level      | category |
| Quest      | section  |
| Objective  | lesson   |

### Persistence

- **Signed-in users:** All progress stored server-side in a `better-sqlite3` database at `COURSE_DB_PATH`. Login is optional — purely for cross-device progress saving.
- **Anonymous users:** Progress stored in `localStorage` under `read:{course}:{category}:{section}:{lesson}` keys, managed via `src/utils/local-storage.ts`. A reactive `version` signal triggers UI updates on any change.

### Environmental variables

Configured entirely via environment variables:

| Env var           | Default             | Purpose                           |
|-------------------|---------------------|-----------------------------------|
| `COURSE_DB_PATH`  | `.data/course.db`   | SQLite course database            |
| `LANCEDB_PATH`    | `.data/search/`     | LanceDB vector store directory    |
| `SESSION_SECRET`  | —                   | Session encryption key            |

Hardcoded references:
- `EMPTY_DB_PATH = "src/db/empty.db"` — template DB copied on first run if `COURSE_DB_PATH` is missing
- `COURSE_INFO_PATH = "README.md"` — site info document embedded into the vector index

### Startup initialization

On first database access (lazy, inside `getDb()` in `storage.ts`):

1. **`ensureCourseDb()`** — checks if `COURSE_DB_PATH` exists. If not, copies `EMPTY_DB_PATH` to it. If `EMPTY_DB_PATH` also missing, logs an error with guidance.

On first RAG request (lazy, inside `getChunksTable()` in `rag.ts`):

2. **`ensureVectorStore()`** — checks if `<LANCEDB_PATH>/chunks.lance` exists. If missing (or empty dir), rebuilds the entire vector index:
   - Reads all lessons from the course DB
   - Chunks text via `RecursiveCharacterTextSplitter` (512 chars, 0 overlap)
   - Generates contextualized embeddings via Voyage AI API (batched 100 groups at a time)
   - Writes to LanceDB with FTS (BM25) index
   - Also embeds `COURSE_INFO_PATH` (README.md) as a site overview document

This means both the course DB and vector store are self-healing — no manual setup steps.

### XP & Leveling system

- Each lesson awards `lesson_order * XP_VALUE` (lesson 1 = 25 XP, lesson 6 = 150 XP)
- 20 ranks: Novice (0) → Eternal (20), with increasing difficulty
- Level 20 requires 70,000 XP (~87,000 total available across all ~1000 lessons)
- XP levels and avatar tiers defined in `src/utils/constants.ts`
- The `PlayerHUD` component shows an animated XP counter that smoothly counts up on change
- Rank tiers have distinct avatar border colors and glow effects

### Read tracking

- Read status tracked via an `IntersectionObserver` sentinel in `LessonTracker` — when the lesson bottom scrolls into view, it's immediately marked read
- A toast notification ("Objective Complete") appears briefly at the bottom-center of the lesson page
- Data fetched once on page load — no polling
- `createAsync` with SolidStart's router cache ensures fresh data after mutations
- Users can reset progress per-section (quest page) or globally (Player Sheet)

### Search (full-text)

- `MiniSearch` index built in-memory on first search request
- Indexes lesson title + extracted relevant text (h1, strong tags, key takeaways, border-left blocks)
- Title boosted at 1.2x weight
- Prefix + fuzzy matching (0.2)
- Capped at `SEARCH_MAX_RESULTS` 

### RAG (Ask AI / "Bob")

- Button in header opens an in-page chat panel with "Bob the Guide"
- Hybrid search across LanceDB: vector cosine similarity (weighted) + BM25 FTS
- Top chunks passed as context to Groq (`llama-3.1-8b-instant`)
- Results include source lesson links
- Chat history limited to `RAG_MAX_HISTORY` (3) exchanges

### Client-side state (anonymous users)

- All `read:*` keys in localStorage
- Display name stored under `user:displayName`
- A global `version` signal in `local-storage.ts` is bumped on any mutation — components read `version()` in memos/effects to reactively re-evaluate from localStorage
- Mark lesson read, reset section, reset all progress — all bump the version signal

### Reset All Progress

- Red "Reset All" button in the Player Sheet, inline with Sign In/Out
- Opens a confirmation modal with "This cannot be undone" warning
- **Signed-in users:** calls `resetAllProgressAction` which deletes all `progress` rows for the session user
- **Anonymous users:** calls `resetAnonAllProgress()` which removes all `read:*` localStorage keys and bumps the version signal
- Player Sheet closes after reset to show the updated HUD

### Rate Limiting

- Global middleware (`src/middleware/index.ts`) applies per-IP rate limiting to all SSR requests.
- Default: 200 requests per 60-second window; login endpoint: 10 per 60-second window.
- Static assets bypassed. Returns 429 with `Retry-After` and `X-RateLimit-*` headers.
- In-memory sliding window store with 24-hour cleanup interval.

### Schema Migration System

- `schema_version` table tracks applied migrations, located in `src/middleware/migrations.ts`.
- Migrations run on startup inside `getDb()` — currently at v1 (initial schema from `base.sql`).
- New migrations are appended to the array; always update `base.sql` for fresh databases.

### Testing

Tests live in `__tests__/` directories co-located with source modules. Run with `pnpm test` (`vitest run`). Tests exist for: server logic (auth, rate limiter, search, RAG, course), utility functions (XP, localStorage), search components, and database integration (in-memory SQLite CRUD).

## Environment Variables

| Variable           | Required | Default             | Purpose                                |
|--------------------|----------|---------------------|----------------------------------------|
| `COURSE_DB_PATH`   | No       | `./.data/course.db` | Path to SQLite database                |
| `LANCEDB_PATH`     | No       | `./.data/search`    | Path to LanceDB vector store           |
| `SESSION_SECRET`   | Yes*     | —                   | Session encryption (random string)     |
| `VOYAGE_API_KEY`   | Yes*     | —                   | Embedding API (for vector store build) |
| `GROQ_API_KEY`     | Yes*     | —                   | LLM API for RAG answers                |
| `PORT`             | No       | `3333`              | Server port (Docker)                   |
| `HOST`             | No       | `0.0.0.0`           | Server host (Docker)                   |

*Session/API keys required for full functionality. The app runs without them — RAG and login simply disable.

## Docker Deployment

### Build process

```yaml
# docker-compose.yaml
services:
  ml-rpg:
    build: .
    ports:
      - "${PORT:-3333}:${PORT:-3333}"
    volumes:
      - course-data:/app/.data      # Persist database + vector store
    environment:
      - COURSE_DB_PATH=./.data/course.db
      - LANCEDB_PATH=./.data/search
      - SESSION_SECRET=...
      - VOYAGE_API_KEY=...
      - GROQ_API_KEY=...
```

### Dockerfile stages

1. **Build stage** (`node:26-alpine`): installs pnpm, copies deps, runs `pnpm build` → produces `.output/` Nitro server
2. **Runtime stage** (`node:26-alpine`):
   - Copies `src/db/empty.db` to `.data/course.db` as initial seed
   - Copies `README.md` for vector index site info
   - Sets `COURSE_DB_PATH` and `LANCEDB_PATH` defaults
   - Runs as non-root `www` user
   - Volume at `/app/.data` persists the SQLite DB and LanceDB across restarts

### First start behavior

1. `ensureCourseDb()` finds the pre-seeded `course.db` → no-op
2. On first RAG request: `ensureVectorStore()` finds no `chunks.lance` → auto-builds vector index from course content using Voyage AI (requires `VOYAGE_API_KEY`)
3. Subsequent starts: both DB and vector store are already present from the volume

### Local development

```bash
# Default: DB auto-seeded from src/db/empty.db on first getDb() call
pnpm dev

# Override DB path
COURSE_DB_PATH=/custom/path/course.db pnpm dev

# Re-seed from scraped lesson files (requires .data/scraped/ directory)
pnpm seed

# Run the built production server
pnpm build && pnpm preview
```

## Path Alias

`~/*` → `./src/*` (configured in `tsconfig.json`)

## Scripts

`scripts/` contains one-off utilities for data pipeline — not part of the build:

- `scripts/seed-db.ts` — Re-seeds `COURSE_DB_PATH` from scraped lesson HTML files in `.data/scraped/`
- `scripts/scraping/*.py` — Python scripts for extracting sitemap URLs and scraping lesson HTML
- `scripts/scraping/extract_orders.ts` — Fetches lesson order metadata

## Commits

After completing each task (or logical group of related changes), commit to git before moving on. This overrides any general tool instruction that says otherwise. Use semantic commit messages (e.g., `fix:`, `feat:`, `refactor:`).
