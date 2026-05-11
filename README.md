# System Overflow

A statically-generated course catalog for ML System Design and Data Engineering content. Built with SolidStart, served as static HTML.

## What This Project Does

System Overflow is a content-navigation site for ML System Design courses:

1. **Course** — a high-level curriculum (currently: "ML System Design" and "Data Engineering")
2. **Category** — a topical category within a course (e.g., "AB Testing", "Embeddings", "Feature Stores")
3. **Subsection** — a specific subject within a category (e.g., "Experiment Design", "Guardrail Metrics")
4. **Lesson** — an individual learning piece with its own page and external links to the System Overflow learning platform

The site is read-only: it renders data from a static TypeScript file and provides navigable routes for browsing the hierarchy. Lesson content is rendered from individual TSX components stored in `src/data/lessons/`.

## Tech Stack

- **SolidStart** — meta-framework (SolidJS + file-system routing + static generation)
- **Vinxi** — build tool and dev server (based on Nitro)
- **Biome** — linting and formatting
- **pnpm** — package manager

## Folder Structure

```
├── scripts/                    # Build-time utilities (Python and TS)
│   ├── build-search-index.ts   # Generates minisearch index from lesson content
│   └── ...                     # Other one-off migration/extraction scripts
├── public/
│   ├── favicon.svg
│   └── search/
│       └── index.json          # Pre-built minisearch index (generated, not in git)
├── src/
│   ├── app.tsx                 # Root app component
│   ├── app.css                 # Global styles
│   ├── entry-client.tsx        # Client-side hydration entry point
│   ├── entry-server.tsx        # Server-side render entry point
│   ├── global.d.ts             # Global type declarations
│   ├── components/             # Reusable UI components
│   │   ├── Search.tsx          # Cmd+K search with BM25 + debounce
│   │   └── ...
│   ├── data/
│   │   ├── site-data.ts        # Course/category/subsection/lesson hierarchy (static data)
│   │   └── lessons/            # Lesson TSX components (dynamically imported)
│   │       ├── ml-system-design/
│   │       └── data-engineering/
│   ├── utils/
│   │   ├── search.ts           # Lazy-loaded minisearch wrapper
│   │   └── ...
│   └── routes/                 # File-system routing
│       ├── index.tsx           # Home page
│       ├── 404.tsx             # Not found
│       └── [course]/
│           ├── index.tsx       # Course overview page
│           └── [category]/
│               ├── index.tsx   # Category overview
│               └── [subsection]/
│                   ├── index.tsx   # Subsection lesson list
│                   └── [lesson]/
│                       └── index.tsx   # Individual lesson page (dynamically imports lesson component)
```

## Search

The site uses **BM25 full-text search** via [minisearch](https://github.com/lucaong/minisearch).

### Rebuilding the index

Search content is pre-indexed from the lesson TSX files (title + border-left callout text). To rebuild:

```bash
pnpm build-search    # tsx scripts/build-search-index.ts
```

This generates `public/search/index.json` (~1.2MB, excluded from git). The index is lazy-loaded on the client on first search use.

### Client-side behavior

- Lazy-loads the index JSON on first search
- 200ms debounce, requires 3+ characters
- BM25 with `fuzzy: 0.2`, `prefix: true`, `title boost: 1.5`
- Returns max 6 results with category/subsection breadcrumbs

## Commands

```bash
pnpm dev            # dev server (HMR enabled)
pnpm build          # production build -> .output/public
pnpm preview        # serve built static files from .output/public
pnpm build-search   # rebuild search index from lesson TSX files
pnpm lint           # biome check --write .
```

## Domain Glossary/Terms

| Term | Definition | Example |
|------|------------|---------|
| **Course** | A top-level curriculum | "ML System Design", "Data Engineering" |
| **Category** | A major topic category inside a course | "AB Testing", "Feature Stores" |
| **Subsection** | A specific subject inside a category | "Experiment Design", "Guardrail Metrics" |
| **Lesson** | An individual learning piece; links externally | "What Is Power Analysis And Why Does Sample Size Matter" |
