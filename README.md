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

## Project Structure

```
src/
├── app.tsx              # Root App component
├── app.css              # Global styles
├── entry-client.tsx     # Client-side hydration entry point
├── entry-server.tsx     # Server-side render entry point
├── global.d.ts          
│
├── components/          # Reusable UI components
│   ├── Breadcrumbs.tsx  
│   ├── NotFound.tsx     
│   ├── PageHeader.tsx   
│   └── PageTitle.tsx    
│
├── constants/
│   └── paths.ts         # Centralized route definitions
│
├── data/
│   └── site-data.ts     # Static content (url slugs)
│
└── routes/              # File-system routing
    ├── [...404].tsx     # Catch-all
    ├── index.tsx        # Home page
    └── ml-system-design/
        ├── index.tsx    # Course page
        └── [category]/
            ├── index.tsx          # Category: lists all subsections
            └── [subsection].tsx   # Subsection: lists all articles
```

## Domain Glossary

| Term | Definition | Example |
|------|------------|---------|
| **Course** | A top-level curriculum | "ML System Design" |
| **Category** | A major topic category inside a course | "AB Testing", "Feature Stores" |
| **Subsection** | A specific subject inside a category | "Experiment Design", "Guardrail Metrics" |
| **Article** | An individual learning piece; links externally | "What Is Power Analysis And Why Does Sample Size Matter" |
| **Card** | Visual UI element representing a navigable item | Hoverable box with title and metadata |
| **Breadcrumb** | Navigation trail showing current position in hierarchy | "System Overflow / ML System Design / AB Testing" |

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for static deployment
pnpm preview  # Preview the static build
pnpm lint     # Run Biome linter and formatter
```

## Configuration

- **Static site generation** — `app.config.ts` sets `ssr: false` and `preset: "static"` with link crawling
- **Path aliases** — `~/*` maps to `./src/*` (configured in `tsconfig.json`)
