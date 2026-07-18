# AGENTS.md

## Tech Stack

- **SolidStart** (SolidJS + `@solidjs/router`) — SSR meta-framework
- **Vinxi** (Nitro/Vite) — Build tool and dev server with HMR
- **Sqlc** — Type-safe generator: raw `.sql` → typed TS query functions
- **LanceDB** — Vector store for hybrid semantic/keyword RAG search
- **MiniSearch** — In-memory full-text search for lesson pages
- **LLama3.2 + FastEmbed** — Fine-tuned LLM and embeddings for the "Ask Bob" chat
- **MLX**, **Ollama**, **llama.cpp** — Custom fine-tuning pipeline for Bob

## Commands

```bash
pnpm dev              # start rag_api + llama-server + wrangler dev (Worker frontend)
pnpm build            # vinxi build (Worker bundle)
pnpm preview          # serve built app (vinxi start)
pnpm lint             # biome check --write --unsafe . && pnpm typecheck
pnpm test             # vitest run + pytest
pnpm generate:types   # sqlc generate — rebuilds typed query functions from src/db
pnpm generate          # tsx ./scripts/seed-db.ts — re-seeds from scraped lesson files
pnpm build:docker     # docker compose up --build --force-recreate -d — build rag_api + llama_api containers
pnpm build:finetune   # full fine-tuning pipeline
```

> Always use `uv sync --inexact` (never plain `uv sync`). spaCy models are installed as pip packages that aren't tracked by uv.lock, so a plain `uv sync` would remove them

## Folder Structure

```
.data/            Persistent databases
.github/          CI pipeline
.husky/           Pre-commit hooks
scripts/          Scripts
public/           Static assets
src/
  components/     Reusable UI components
  middleware/     SolidStart middleware
  db/
    raw/          Source .sql files (schema + queries)
    *_sql.ts      Auto-generated typed query functions
  routes/         File-system routing (SolidStart convention)
  server/         SSR functions organized by domain ('use server')
  utils/          Pure helpers
llama_api/        Bob LLM fine-tuning pipeline
rag_api/          Python FastAPI server for RAG chunk retrieval + embedding
```

## Code Style Preferences

- Biome for linting + formatting (no ESLint/Prettier).
- Husky pre-commit runs `lint-staged` automatically. No need to lint manually before `git commit`.
- All DB queries go through sqlc. Write ALL raw SQL in `src/db/raw/*.sql`, run `pnpm generate:types` and use generated functions only.
- sqlc snake_case workaround: sqlc does not support better-sqlite with TS plugin. Alias all snake_case columns to all-lowercase no-underscore (e.g., `user_password AS userpassword`, NOT `userPassword`). The TS plugin mangles underscores and is broken currently.
- SolidJS reactivity: Never destructure signals/props. Access via `props.signal`. Pass with `<Child prop={signal()} />`.

## Architecture

### UI ↔ Custom internal naming

| UI Label  | Internal |
| --------- | -------- |
| World     | course   |
| Level     | category |
| Quest     | section  |
| Objective | lesson   |

### Persistence

- **Signed-in users:** Progress in D1 (`D1_CONTENT` binding). Login is optional.
- **Anonymous users:** Progress in `localStorage`, reactivity is maintained through `version` bump signals in `local-storage.ts`.

### Middleware

- **Middleware** (`src/middleware/`) runs in the Vinxi/h3 request pipeline, BEFORE SolidStart's request context is set up. It intercepts raw requests — rate limiting, header manipulation, asset filtering. `"use server"` functions CANNOT be called from middleware `onRequest` because `getRequestEvent()` (SolidStart's async context) isn't available there.
- **Middleware is NOT Node.js.** It runs in Vinxi's h3 context, isolated from the SSR server. You cannot import Node.js native modules (`better-sqlite3`, `node:fs`, `crypto`, etc.) or `"use server"` functions from middleware. Any module that transitively imports native modules will break. This is not Express — frameworks like SolidStart/Nitro/Vinxi handle middleware differently.
- **Rule of thumb:** Middleware for pre-request concerns (rate limiting, static assets, headers). Server functions for business logic that touches DB, ENVs, or protected resources.

### Startup / Warmup

- **Database:** D1 binding provided by Cloudflare at runtime (seeded via `pnpm seed:local`).
- **Vector store:** Lazy init in rag_api — builds LanceDB index from lesson content. Both are self-healing.

### Fine-tuning Pipeline

A custom `llama_api/` pipeline that generates synthetic training data via Ollama, fine-tunes a Llama 3.2 3B model with LoRA using mlx-lm on Apple Silicon, fuses adapters, converts to GGUF, and serves via a llama.cpp server container.

### Key features

- **XP & levels:** Each lesson awards `lesson_order * 25 XP`. 20 ranks (Novice → Eternal), final rank requires 70,000 total XP.
- **Keyword Search:** MiniSearch index (title, content, category, section) built on first query in-memory.
- **RAG (Ask Bob):** Hybrid search using LanceDB → FastAPI backend for top chunks retrieval → sent to custom fine-tuned llama3.2 model (llama.cpp), rate-limiting, input sanitizing, jailbreak detection via regex patterns.
- **Rate limiting:** Per-IP sliding window middleware, most strict on auth, AI chat

### Testing

Tests in `__tests__/` co-located with source. Run with `pnpm test`. **Required for all new code logic (pure functions only, integration and E2E tests only when asked).** Cover happy path, edge cases, and invalid/malicious inputs.
