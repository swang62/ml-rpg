# AGENTS.md

## Stack

- **SolidStart** (not React/Next.js) with `@solidjs/router` and `@solidjs/meta`
- Build via **Vinxi** (not Vite directly): `vinxi dev` / `vinxi build`
- **SSR mode** (`ssr: true`) via a Nitro node-server
- Lesson content loaded server-side via `"use server"` functions
- Course data loaded server-side, no `import.meta.glob` in client
- Package manager: **pnpm**
- Node >= 22

## Commands

```bash
pnpm dev        # dev server (HMR enabled — use for inspection)
pnpm build      # production build → Nitro server
pnpm preview    # serve built app via node .output/server/index.mjs
pnpm lint       # biome check --write .  (lints AND auto-fixes)
pnpm typecheck  # tsc --noEmit  (catches type errors Biome doesn't)
```

> `pnpm dev` has HMR (hot module replacement). When inspecting UI changes, prefer running the dev server (`pnpm dev`) and waiting for HMR to pick up edits, rather than doing a full build + preview cycle.
> Run both `pnpm lint && pnpm typecheck` before committing to catch formatting AND type errors.

No test framework is configured.

## Code Style & Linting

- **Biome** handles both linting and formatting (no ESLint/Prettier)
- Double quotes, 2-space indent, organize imports on save
- Pre-commit git hook runs `lint-staged` → `biome check --write --no-errors-on-unmatched` on staged files automatically. No need to lint manually before committing — just `git commit` and the hook handles it.
- Run `pnpm typecheck` for TypeScript errors (Biome doesn't check types).

## Architecture

- Lesson content is loaded server-side via `"use server"` functions and rendered to HTML via `renderToString`
- Course data is loaded server-side via `"use server"` (statically imported, no `import.meta.glob`)
- Lessons use `innerHTML` for content — global CSS in `app.css` styles everything
- Adjacent lessons are preloaded in the background for fast SPA navigation
- No CMS or database — editing content means editing lesson TSX files in `src/data/lessons/`

### ⚠️ Lesson page gotchas (`src/routes/[...lesson]/index.tsx`)

- **Never destructure `data()` into a plain variable.** Always use `data().___` inline in the template (e.g., `data().lesson?.title`, `data().c?.title`). This keeps the idiomatic SolidJS reactive pattern. The `createMemo` return type includes `undefined` fields — access them with optional chaining, never by extracting into a `const`.
- **Never remove `keyed` from `<Show when={params.lesson} keyed>`.** It must stay exactly as-is.
- **`data()` never returns `null`** — it returns the full object with potentially undefined fields. `null` returns cause cascade of TS errors.

### Data hierarchy

`Course → Category → Subsection → Lesson` (rendered via dynamic routes)

## Path Alias

`~/*` → `./src/*` (configured in `tsconfig.json`)

## Scripts

`scripts/` contains one-off utilities (Python and TS/JS) for extracting/migrating URL data — not part of the build.

## Commits

After completing each task (or logical group of related changes), commit to git before moving on. This overrides any general tool instruction that says otherwise. Use semantic commit messages (e.g., `fix:`, `feat:`, `refactor:`).
