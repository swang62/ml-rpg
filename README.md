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
├── public/
│   └── search/
│       └── index.json          # Pre-built minisearch index (generated, not in git)
├── src/
│   ├── app.tsx                 # Root app component
│   ├── app.css                 # Global styles
│   ├── entry-client.tsx        # Client-side hydration entry point
│   ├── entry-server.tsx        # Server-side render entry point
│   ├── global.d.ts             # Global type declarations
│   ├── components/             # Reusable UI components
│   ├── data/
│   │   ├── site-data.ts        # Course/category/subsection/lesson hierarchy (static data)
│   │   └── lessons/            # Lesson TSX components (dynamically imported)
│   │       ├── ml-system-design/
│   │       └── data-engineering/
│   ├── utils/                  # Shared utils and constants
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
│                       └── index.tsx   # Individual lesson page
```

## Commands

```bash
pnpm dev            # dev server (HMR enabled)
pnpm build          # production build -> .output/public
pnpm preview        # serve built static files from .output/public
pnpm build:search   # rebuild search index from lesson TSX files
pnpm lint           # biome check --write . && pnpm typecheck && fallow audit
```

## Domain Glossary/Terms

| Term | Definition | Example |
|------|------------|---------|
| **Course** | A top-level curriculum | "ML System Design", "Data Engineering" |
| **Category** | A major topic category inside a course | "AB Testing", "Feature Stores" |
| **Subsection** | A specific subject inside a category | "Experiment Design", "Guardrail Metrics" |
| **Lesson** | An individual learning piece; links externally | "What Is Power Analysis And Why Does Sample Size Matter" |
