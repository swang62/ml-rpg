# System Overflow

A statically-generated course catalog for ML System Design content. Built with SolidStart, served as static HTML.

## What This Project Does

System Overflow is a content-navigation site for ML System Design courses:

1. **Course** — a high-level curriculum (currently: "ML System Design")
2. **Category** — a topical category within a course (e.g., "AB Testing", "Embeddings", "Feature Stores")
3. **Subsection** — a specific subject within a category (e.g., "Experiment Design", "Guardrail Metrics")
4. **Article** — an individual learning piece that links to the external System Overflow learning platform

The site is read-only: it renders data from a static TypeScript file and provides navigable routes for browsing the hierarchy. All article links open externally.

## Tech Stack

- **SolidStart** — meta-framework (SolidJS + file-system routing + static generation)
- **Vinxi** — build tool and dev server (based on Nitro)
- **Biome** — linting and formatting
- **pnpm** — package manager

## Folder Structure

```
src/
├── app.tsx                 # Root app component
├── app.css                 # Global styles
├── entry-client.tsx        # Client-side hydration entry point
├── entry-server.tsx        # Server-side render entry point
├── global.d.ts             # Global type declarations
├── components/             # Reusable UI components
├── constants/              # Global constants
├── data/                   # Static content and data
├── utils/                  # Utility functions
└── routes/                 # File-system routing
    ├── index.tsx           # Home page (main entrypoint)
    └── ml-system-design/   # ML System Design course routes
```

## Domain Glossary/Terms

| Term | Definition | Example |
|------|------------|---------|
| **Course** | A top-level curriculum | "ML System Design" |
| **Category** | A major topic category inside a course | "AB Testing", "Feature Stores" |
| **Subsection** | A specific subject inside a category | "Experiment Design", "Guardrail Metrics" |
| **Article** | An individual learning piece; links externally | "What Is Power Analysis And Why Does Sample Size Matter" |
