# AGENTS.md

## Stack

- **SolidStart** (not React/Next.js) with `@solidjs/router` and `@solidjs/meta`
- Build via **Vinxi** (not Vite directly): `vinxi dev` / `vinxi build`
- **Static-site output** (`ssr: false`, preset `static`, `prerender.crawlLinks: true`)
- Package manager: **pnpm**
- Node >= 22

## Commands

```bash
pnpm dev       # dev server
pnpm build     # production build → .output/public
pnpm preview   # serve built static files from .output/public
pnpm lint      # biome check --write .  (lints AND auto-fixes)
```

No test framework is configured.

## Code Style & Linting

- **Biome** handles both linting and formatting (no ESLint/Prettier)
- Double quotes, 2-space indent, organize imports on save
- Pre-commit hook runs `lint-staged` → `biome check --write --no-errors-on-unmatched` on staged files

## Architecture

- All content lives in a single static data file: `src/data/site-data.ts`
- No CMS or database — editing content means editing that file
- Articles are external links to `systemoverflow.com/learn/…`; this site only renders the navigation hierarchy

### Route structure

| Route | File |
|---|---|
| `/` | `src/routes/index.tsx` |
| `/ml-system-design` | `src/routes/ml-system-design/index.tsx` |
| `/ml-system-design/[category]` | `src/routes/ml-system-design/[category]/index.tsx` |
| `/ml-system-design/[category]/[subsection]` | `src/routes/ml-system-design/[category]/[subsection]/index.tsx` |

### Data hierarchy

`Course → Category → Subsection → Article` (defined in `site-data.ts`, rendered via routes above)

- Routes defined in `src/constants/paths.ts`

## Path Alias

`~/*` → `./src/*` (configured in `tsconfig.json`)

## Scripts

`scripts/` contains one-off utilities (Python and TS/JS) for extracting/migrating URL data — not part of the build.
