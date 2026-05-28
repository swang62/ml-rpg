# AGENTS.md

## Tech Stack

- **SolidStart** (SolidJS + `@solidjs/router`) — SSR meta-framework
- **Vinxi** (Nitro/Vite) — Build tool and dev server with HMR
- **Better-sqlite3** — Synchronous SQLite for course & user data
- **Sqlc** — Type-safe generator: raw `.sql` → typed TS query functions
- **LanceDB** — Vector store for hybrid semantic/keyword RAG search
- **MiniSearch** — In-memory full-text search for lesson pages
- **Groq + Voyage AI** — LLM answers and embeddings for the "Ask Bob" chat

## Commands

```bash
pnpm dev              # dev server (HMR enabled)
pnpm build            # production build
pnpm preview          # serve built app
pnpm lint             # biome check --write . && pnpm typecheck
pnpm test             # vitest run + pytest
pnpm generate:types   # sqlc generate — rebuilds typed query functions from src/db/raw/*.sql
pnpm seed             # tsx ./scripts/seed-db.ts — re-seeds course.db from scraped lesson files
pnpm build:docker     # docker compose up --build --force-recreate -d
```

> Always use `uv sync --inexact` (never plain `uv sync`). spaCy models are installed as pip packages that aren't tracked by uv.lock, so plain `uv sync` would remove them.

> Never touch `pnpm dev` — the user controls it. HMR reflects edits instantly. Run `pnpm lint` before pushing.

## Folder Structure

```
.data/            Persistent SQLite DB + LanceDB vector store (gitignored)
.github/          CI pipeline (lint, test, build)
.husky/           Pre-commit hooks (lint-staged)
scripts/          One-off utilities for scraping/migrating data
public/assets/    Static assets (SVG avatars, background images)
src/
  components/     Reusable UI components + co-located __tests__/
  middleware/     SolidStart middleware (rate limiting, schema migrations, graceful shutdown)
  db/
    raw/          Source .sql files (schema + queries) — edit these, then pnpm generate:types
    *_sql.ts      Auto-generated typed query functions — DO NOT EDIT
    empty.db      Pre-seeded course DB template, copied on first run
  routes/         File-system routing (SolidStart convention)
  server/         SSR functions organized by domain (auth, course, mutations, rag, search, session, storage, etc.)
  utils/          Pure helpers (env validation, XP math, search utils, keyboard, animation, localStorage)
```

## Code Style

- Biome for linting + formatting (no ESLint/Prettier). Double quotes, 2-space indent.
- Husky pre-commit runs `lint-staged` + `vitest related` automatically. No need to lint manually before `git commit`.
- **All DB queries go through sqlc.** Write SQL in `src/db/raw/*.sql`, run `pnpm generate:types`.
- **sqlc snake_case workaround:** Alias all snake_case columns to all-lowercase no-underscore (e.g., `user_password AS userpassword`, NOT `userPassword`). The TS plugin mangles underscores.
- **SolidJS reactivity:** Never destructure signals/props. Access via `props.signal`. Pass with `<Child prop={signal()} />`.
- Path alias: `~/*` → `./src/*`.

## Architecture

### Data hierarchy

```
Course → Category → Section → Lesson
```
Rendered via dynamic routes at `/[course]/[category]/[section]/[lesson]`.

### UI ↔ Internal naming

| UI Label  | Internal |
|-----------|----------|
| World     | course   |
| Level     | category |
| Quest     | section  |
| Objective | lesson   |

### Persistence

- **Signed-in users:** Progress in SQLite via `COURSE_DB_PATH`. Login is optional (cross-device saving only).
- **Anonymous users:** Progress in `localStorage` under `read:{course}:{category}:{section}:{lesson}` keys, managed by a reactive `version` signal in `local-storage.ts`.

### Environment variables

| Variable           | Required | Default               | Purpose                            |
|--------------------|----------|-----------------------|------------------------------------|
| `COURSE_DB_PATH`   | Yes      | —                     | SQLite database path               |
| `LANCEDB_PATH`     | Yes      | —                     | LanceDB vector store directory     |
| `SESSION_SECRET`   | Yes      | —                     | Session encryption key (min 32ch)  |
| `VOYAGE_API_KEY`   | No*      | —                     | Embedding API for vector store     |
| `GROQ_API_KEY`     | No*      | —                     | LLM API for RAG chat               |
| `PORT`             | No       | `3333`                | Server port                        |
| `HOST`             | No       | `0.0.0.0`             | Server host                        |

*Optional — RAG and login simply disable if missing. Validated via zod on startup.

### Startup

- **Database:** Lazy init in `getDb()` — copies `empty.db` to `COURSE_DB_PATH` if missing, runs schema migrations.
- **Vector store:** Lazy init on first RAG query — builds LanceDB index from all lessons via Voyage AI embeddings. Both are self-healing.

### Key features

- **XP & levels:** Each lesson awards `lesson_order * 25 XP`. 20 ranks (Novice → Eternal), 70k XP max. Avatar border glows at higher tiers.
- **Read tracking:** `IntersectionObserver` in `LessonTracker` marks lessons complete when scrolled into view. Toast notification on completion.
- **Keyword Search:** MiniSearch index (title + extracted text) built on first query. Prefix + fuzzy matching (0.2), capped at 5 results.
- **RAG (Ask Bob):** Hybrid search (vector + BM25) across LanceDB → top chunks sent to Groq (`llama-3.1-8b-instant`) with jailbreak detection via `llama-prompt-guard`. Max 3 chat history turns.
- **Rate limiting:** Per-IP sliding window middleware. 200 req/60s general, 10 req/60s login. Returns 429 with standard headers.
- **Graceful shutdown:** SIGTERM/SIGINT handlers flush WAL checkpoint, close DB, stop cleanup intervals.

### Testing

Tests in `__tests__/` co-located with source. Run with `pnpm test` (`vitest run`). **Required for all new code.** Cover happy path, edge cases, and invalid/malicious inputs.

### Docker

Two-stage Alpine build: `pnpm build` in stage 1, minimal runtime in stage 2. Non-root `www` user. Volume at `/app/.data` persists DB + vector store across restarts. `STOPSIGNAL SIGTERM` for graceful shutdown.

## Commits

After each task (or logical group), commit before moving on. Semantic messages (`fix:`, `feat:`, `refactor:`).
