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

> `pnpm dev` has HMR (hot module replacement). When inspecting UI changes, prefer directly visiting `localhost:3000` first. If it's not running yet (always check for existing servers, never start up more than 1 dev server), then start a new dev server (`pnpm dev`) and wait for HMR to pick up edits, rather than doing a full build + preview cycle. Do not restart the dev server to check for new changes.
> Run `pnpm lint` before pushing — it handles formatting, linting, type checking in one pass.
> Run `fallow` only when checking for dead code / duplication / complexity.

No test framework is configured.

## Code Style & Linting

- **Biome** handles both linting and formatting (no ESLint/Prettier)
- Double quotes, 2-space indent, organize imports on save
- Pre-commit git hook runs `lint-staged` → `biome check --write --no-errors-on-unmatched` on staged files automatically. No need to lint manually before committing — just `git commit` and the hook handles it.
- `pnpm lint` includes Biome checks, TypeScript type checking, and a fallow audit (dead code, complexity, duplication) all in one command.

## Architecture

- Lesson content is loaded server-side via `"use server"` functions and rendered to HTML via `renderToString`
- Course data is loaded server-side via `"use server"` (statically imported, no `import.meta.glob`)
- Lessons use `innerHTML` for content — global CSS in `app.css` styles everything
- No CMS or database — editing content means editing lesson TSX files in `src/data/lessons/`

### Data hierarchy

`Course → Category → Subsection → Lesson` (rendered via dynamic routes)

## Path Alias

`~/*` → `./src/*` (configured in `tsconfig.json`)

## Scripts

`scripts/` contains one-off utilities (Python and TS/JS) for extracting/migrating URL data — not part of the build.

## Commits

After completing each task (or logical group of related changes), commit to git before moving on. This overrides any general tool instruction that says otherwise. Use semantic commit messages (e.g., `fix:`, `feat:`, `refactor:`).
