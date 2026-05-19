# AGENTS.md

## Stack

- **SolidStart** (not React/Next.js) with `@solidjs/router` and `@solidjs/meta`
- Build via **Vinxi** (not Vite directly): `vinxi dev` / `vinxi build`
- **SSR mode** (`ssr: true`) via a Nitro node-server
- Lesson content loaded server-side via `"use server"` functions
- Package manager: **pnpm**
- Node >= 22

## Commands

```bash
pnpm dev        # dev server (HMR enabled — use for inspection)
pnpm build      # production build → Nitro server
pnpm preview    # serve built app via node .output/server/index.mjs
pnpm lint       # biome check --write . && pnpm typecheck && fallow audit
```

> **The user controls the dev server.** Never kill, restart, reload, start, or stop `pnpm dev`. The user starts it manually and it has HMR — edits are reflected instantly without a restart. If the page at `localhost:3000` shows stale content, wait for HMR to pick up the change. You can run linting and building to check things if needed.
> Run `pnpm lint` before pushing — it handles formatting, linting, type checking in one pass.
> Run `fallow` only when checking for dead code / duplication / complexity.

No test framework is configured.

## Code Style & Linting

- **Biome** handles both linting and formatting (no ESLint/Prettier)
- Double quotes, 2-space indent, organize imports on save
- Pre-commit git hook runs `lint-staged` → `biome check --write --no-errors-on-unmatched` on staged files automatically. No need to lint manually before committing — just `git commit` and the hook handles it.
- `pnpm lint` includes Biome checks, TypeScript type checking, and a fallow audit (dead code, complexity, duplication) all in one command.

### Database Queries

- **All database queries MUST use sqlc.** Raw SQL in TypeScript files is forbidden. Add or modify queries in `src/db/raw/*.sql`, then run `pnpm generate:types` (`sqlc generate`) to produce typed functions in `src/db/*_sql.ts`.
- The sqlc config is at `sqlc.yaml`: schema from `src/db/raw/base.sql`, queries from `src/db/raw/`, output to `src/db/`.
- **sqlc bug — snake_case alias rule:** The `ts` plugin with `better-sqlite3` driver cannot handle snake_case column names. It strips underscores and lowercases everything. `user_password` becomes `userpassword`, NOT `userPassword`. To work around this, all snake_case columns MUST be aliased to all-lowercase with no underscores. Example: `users.user_password AS userpassword`, `users.display_name AS displayname`. CamelCase aliases (`userPassword`, `displayName`) will be rejected by the type checker.

### Reactive Signals

- Do NOT destructure reactive props or signals. Access them directly via `props.signal`, never `const { signal } = props`. Destructuring breaks reactivity by capturing the value at call time.
- When extracting sub-components from a reactive parent, pass signals as props using `<Child prop={signal()} />` — the `()` preserves the reactive read. Calling functions directly (`Child({ prop: signal() })`) passes a snapshot; SolidJS can't track the dependency.

## Architecture

- Lesson content and course metadata are loaded server-side via `"use server"` functions from a `better-sqlite3` database
- Lessons use `innerHTML` for content — global CSS in `app.css` styles everything
- Database location is configured via `COURSE_DB_PATH` env var (defaults to `./.data/course.db`)

### Data hierarchy

`Course → Category → Subsection → Lesson` (rendered via dynamic routes)

### Game terminology

| UI Label | Internal | Route Param |
|----------|----------|-------------|
| WORLD | course | `[course]` |
| LEVEL | category | `[category]` |
| QUEST | subsection | `[subsection]` |
| Objective | lesson | `[lesson]` |

### XP & tracking system

- XP, read status, and lesson content stored server-side in a `better-sqlite3` database at `COURSE_DB_PATH`
- Vector store (LanceDB) for RAG is auto-rebuilt on first request if missing via `src/server/startup.ts`
- `"use server"` functions in `src/server/` handle all persistence
- Data is fetched once on page load — no polling for lesson content or read status
- Read status is tracked via an `IntersectionObserver` sentinel in `LessonTracker`; when the sentinel scrolls into view, the lesson is immediately marked read
- Toast notification ("Objective Complete") appears briefly at the bottom-center of the lesson page

## Path Alias

`~/*` → `./src/*` (configured in `tsconfig.json`)

## Scripts

`scripts/` contains one-off utilities (Python and TS/JS) for extracting/migrating URL data — not part of the build.

## Commits

After completing each task (or logical group of related changes), commit to git before moving on. This overrides any general tool instruction that says otherwise. Use semantic commit messages (e.g., `fix:`, `feat:`, `refactor:`).
