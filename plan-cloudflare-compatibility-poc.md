# Plan: Cloudflare compatibility proof of concept

## Goal

Prepare the codebase for a later SolidStart-to-Cloudflare Workers migration without deploying or cutting over the website. The POC must:

* Move all embedding and persistent LanceDB work into `rag_api`, sourced from D1.
* Produce a Cloudflare Worker-compatible frontend bundle with incompatible libraries removed or isolated behind platform-specific modules.
* Keep the current website fully functional while shifting runtime app data access to D1.

### Plan amendment: runtime target clarified

This plan now targets a **Node-hosted frontend with D1 at runtime**. The frontend does **not** need to run on Workers yet, but it **does** need to stop owning Cloudflare-incompatible runtime code. By the end of this plan:

* frontend SSR/runtime remains on Node/Docker for now;
* D1 is the runtime database for content, auth, session/account data, and progress flows that previously depended on SQLite in the app runtime;
* all embedding, vector indexing, LanceDB persistence, and other Worker-incompatible search/index lifecycle work live in `rag_api` only;
* remaining frontend incompatibilities are isolated behind seams so a later Worker cutover is smaller.

Production Worker deployment, staging traffic, domains, and cutover will be planned only after this POC is accepted.

## Scope

### In scope

* A D1 runtime database containing course content plus the app data needed by the Node-hosted frontend.
* D1-to-LanceDB indexing owned entirely by `rag_api` on the VPS.
* Removal of LanceDB and embedding code from the web runtime while retaining in-memory MiniSearch.
* A package-by-package Cloudflare compatibility audit of frontend runtime dependencies.
* Minimal Worker build configuration and a dry-run bundle, not a running Worker environment.
* Platform-specific storage, environment, password, session, cleanup, and rate-limit seams needed to keep incompatible Node libraries out of the Worker bundle.
* Runtime D1 support for content, auth/session/account data, and progress in the Node-hosted frontend.
* Unit tests for D1 adapters and Worker-specific pure logic.
* Full Docker regression testing.

### Out of scope

* Running the frontend with `wrangler dev` or deploying a staging/production Worker.
* DNS or traffic cutover.
* Migrating existing production users or progress unless explicitly required to keep local/runtime behavior working in this repo.
* VPS public-origin authentication and production networking changes.
* GitHub Actions or Cloudflare Git integration.
* Replacing Node hosting for the frontend where build isolation is sufficient.
* Request-time HTML sanitization. Seeded content is trusted; the existing presentation-related JSX/code/CSS transformations remain.

## Tasks

### [x] Task 1: Add a dry-run Worker build and dependency audit

* Description: Add the minimum Cloudflare build target using SolidStart's `cloudflare_module` preset, required async-context externals, `nodejs_compat`, and a proof Wrangler configuration. Run a dry-run bundle to inventory every frontend runtime dependency and Node API. Classify each as Web-standard, Cloudflare-supported, Docker-only, build-only, replace, or remove. Save the inventory in project documentation so later work has an explicit exit checklist.
* Files: `package.json`, `app.config.ts`, `wrangler.jsonc` (new), `tsconfig.json`, `README.md`
* Acceptance criteria:
  * Existing `pnpm build`, `pnpm dev`, Dockerfile, and Compose commands keep their current meanings.
  * A separate command produces a Cloudflare dry-run bundle without deploying it.
  * The audit covers all runtime dependencies in `package.json` and direct `node:*`, `process`, timer, filesystem, and native-addon uses under `src/`.
  * The audit explicitly covers `better-sqlite3`, `argon2`, `@lancedb/lancedb`, `@langchain/textsplitters`, `node-cron`, `isomorphic-dompurify`, MiniSearch, Zod, Vinxi sessions, and `node:crypto`.
  * Each incompatible item has one chosen action and named files; no item is marked "probably supported" without a build or focused test.
* Guardrails:
  * Do not deploy a Worker or provision production Cloudflare resources.
  * Do not upgrade SolidStart/Vinxi unless the pinned versions cannot emit the documented Cloudflare bundle.
  * Do not add broad Node emulation to conceal unsupported packages.

### [x] Task 2: Publish proof course content to D1

* Description: Create an initial D1 schema and deterministic content-version record. Add a command that reads `src/db/empty.db` and applies ordered, idempotent inserts/updates for courses, categories, sections, and lessons. This establishes D1 as the first runtime-owned data source, with auth/session/progress data moving in later tasks.
* Files: `src/db/raw/base.sql`, `migrations/0001_initial.sql` (new), `migrations/0002_content_metadata.sql` (new), `scripts/export-d1-content.ts` (new), `scripts/seed-db.ts`, `package.json`, `wrangler.jsonc`
* Acceptance criteria:
  * A non-production D1 database can be migrated and seeded without a Worker deployment.
  * Publishing the same `empty.db` twice is idempotent and retains the same content version.
  * Course, category, section, and lesson counts, stable IDs, HTML, order, and keywords match SQLite.
  * No user or progress data is exported.
  * The proof database is below the Free-tier 500 MB limit and no lesson row exceeds D1's 2 MB row limit.
* Guardrails:
  * Do not change Docker's SQLite source of truth for the web app.
  * Do not commit API tokens or other secrets.

### [ ] Task 3: Move all embeddings and LanceDB indexing into `rag_api`

* Description: Port the current lesson extraction, recursive chunking with overlap, tag enrichment, README chunks, batched FastEmbed calls, vector-dimension validation, LanceDB table creation, and FTS index creation into Python. Query D1 using its authenticated REST API and keyset pagination. At container startup compare D1's content version with the local index version, skip a current index, and build a missing or stale index before readiness. Build into a temporary path and replace the old index only after validation.
* Files: `rag_api/indexing/__init__.py` (new), `rag_api/indexing/d1_client.py` (new), `rag_api/indexing/build_index.py` (new), `rag_api/indexing/ensure_index.py` (new), `rag_api/config.py`, `rag_api/Dockerfile`, `rag_api/app.py`, `rag_api/retrieval/vector_search.py`, `rag_api/__tests__/test_index_builder.py` (new), `rag_api/__tests__/test_app.py`, `docker-compose.yaml`
* Acceptance criteria:
  * An empty RAG volume builds a usable `chunks` table from D1 while the web container is stopped.
  * An unchanged content version makes no embedding calls and performs no table rewrite.
  * A changed version rebuilds once and records the new version.
  * Rows preserve `id`, `vector`, `text`, `lessonTitle`, `lessonUrl`, `categoryTitle`, `sectionTitle`, `courseTitle`, `chunkIndex`, and `tags`.
  * FTS indexes exist for `text` and `lessonTitle`; dimensions match `FASTEMBED_MODEL_NAME`; representative hybrid searches return expected lesson and README sources.
  * A failed refresh preserves a valid old index and reports stale status. If no valid index exists, readiness fails.
  * Cloudflare credentials are scoped, injected into the RAG container, and never logged.
* Guardrails:
  * Do not overwrite or delete the last valid index before replacement validation passes.
  * Do not expose arbitrary D1 SQL through a public endpoint.
  * Do not change existing RAG or llama response contracts.
  * Keep every embedding and LanceDB filesystem operation inside `rag_api`.

### [ ] Task 4: Remove persistent vector code from the frontend

* Description: Reduce `src/server/search.ts` to lazy in-memory MiniSearch. Remove all web code for LanceDB lifecycle, embedding, dimension checks, stale markers, FTS creation, and README vector updates. Remove storage startup hooks that trigger vector work. Remove JavaScript LanceDB/text-splitter packages after imports are gone.
* Files: `src/server/search.ts`, `src/server/storage.ts`, `src/utils/constants.ts`, `src/utils/types.ts`, `package.json`, `pnpm-lock.yaml`, `src/server/__tests__/search.test.ts`
* Acceptance criteria:
  * Docker keyword search retains its current result shape, query validation, and limits.
  * Starting or reseeding the Docker web app cannot create, inspect, invalidate, or delete LanceDB and cannot call `/embed`.
  * No frontend source imports `@lancedb/lancedb` or `@langchain/textsplitters`.
  * `rag_api` can rebuild from D1 while the Docker web container is stopped.
* Guardrails:
  * Keep MiniSearch in memory; do not move it into RAG, KV, Redis, or Durable Objects.

### [ ] Task 5: Replace or isolate every remaining Worker-incompatible library

* Description: Work through the Task 1 inventory and close every incompatible frontend item with the smallest dual-runtime change. The frontend remains Node-hosted, but its runtime data path must use D1 and no longer depend on frontend-owned native SQLite/vector/runtime-only code that blocks a later Worker cutover. Keep Docker-specific implementations only where hosting/lifecycle still requires Node today and select Worker implementations only during the Cloudflare build.
* Files: `src/db/d1-adapter.ts` (new), `src/server/storage.cloudflare.ts` (new), `src/utils/env.ts`, `src/utils/env.cloudflare.ts` (new), `src/server/session.ts`, `src/server/password.ts` (new), `src/server/password.cloudflare.ts` (new), `src/server/cleanup.ts`, `src/entry-server.tsx`, `src/middleware/rate-limiter.ts`, `src/middleware/rate-limiter.cloudflare.ts` (new), `src/utils/search-utils.ts`, `src/server/course.ts`, `app.config.ts`, relevant tests
* Required actions:
  * `better-sqlite3`: remove from the frontend runtime data path; add a minimal D1 `prepare`/bind/`get`/`all`/`run` adapter for the Node-hosted frontend and exclude the native addon from the Worker bundle.
  * Prefer preserving sqlc type safety by routing Worker-side D1 access through a sqlc-compatible TypeScript D1 adapter/plugin flow rather than rewriting the data layer to Drizzle or hand-written queries. Use the `sqlc-gen-ts-d1` approach as the starting point, pin the exact WASM release/hash if adopted, and keep the generated-query surface aligned with the existing `src/db/*_sql.ts` usage.
  * `argon2`: remove from the frontend runtime data path where it blocks D1-backed auth/session readiness; add a versioned Web Crypto password implementation for D1-backed accounts and exclude native Argon2 from the Worker bundle.
  * `@lancedb/lancedb` and `@langchain/textsplitters`: remove from frontend dependencies after Tasks 3-4.
  * `node-cron`, process signals, persistent `node:fs`, and long-lived cleanup timers: keep only in Docker-selected modules when still needed for hosting/lifecycle, or replace the Worker side with no-op/testable request-safe seams for this build POC.
  * `isomorphic-dompurify`: remove. Keep only the existing JSX/code/CSS transformations needed for presentation; clean trusted HTML during seeding.
  * `node:crypto`: retain only if the dry-run build and focused stream-token test pass with `nodejs_compat`; otherwise use Web Crypto in the Worker-selected module.
  * MiniSearch, Zod, SolidJS, router/meta, and Lucide: retain after dry-run bundle verification.
* Acceptance criteria:
  * D1 adapter tests cover no-row, one-row, many-row, writes, positional parameters, booleans, and D1 errors.
  * Node-hosted frontend runtime reads/writes content, auth/session/account data, and progress via D1-compatible code paths.
  * Docker continues using Node hosting, current cleanup behavior, and Node environment variables.
  * Worker-selected modules typecheck without requiring native addons or persistent filesystem access.
  * `cleanLessonHtml` contains required transformations but no sanitization dependency.
  * The dependency audit has no unresolved "replace" or "remove" entries.
* Guardrails:
  * Implement only the D1 API surface used by generated queries; do not recreate `better-sqlite3`.
  * Do not replace sqlc with Drizzle or another ORM unless the sqlc-compatible D1 adapter path is proven unworkable and explicitly re-approved.
  * Do not edit generated `src/db/*_sql.ts` files manually.
  * Do not weaken password settings merely to make a test fast.
  * Do not remove Node packages still required by the Docker-selected build.

### [ ] Task 6: Prove the Worker bundle excludes Node-only implementations

* Description: Produce the dry-run Worker bundle after all replacements, inspect it for forbidden imports/native binaries, and run focused unit tests against Worker-selected modules. This proves build compatibility only; it does not claim runtime or deployment readiness.
* Files: `package.json`, `app.config.ts`, `wrangler.jsonc`, `tsconfig.json`, Worker-specific tests added in Task 5, `README.md`
* Acceptance criteria:
  * The Cloudflare dry-run bundle completes with no unresolved modules.
  * Bundle inspection finds no runtime import or binary for `better-sqlite3`, `argon2`, LanceDB, `node-cron`, or `isomorphic-dompurify`.
  * No bundled Worker path performs persistent filesystem writes, process exits/signals, or interval `.unref()` calls.
  * D1 adapter, Worker env validation, Web Crypto password format, and stream-token compatibility tests pass.
  * The report distinguishes "bundle proven" from untested Worker runtime behavior.
* Guardrails:
  * Do not start `wrangler dev`, deploy a Worker, or claim SSR/runtime compatibility from a dry-run bundle alone.

### [ ] Task 7: Run the Docker regression and close the POC

* Description: Run the full Node/Python test suites and production Docker build. Start Compose with the updated RAG startup indexer, verify D1-backed retrieval plus D1-backed frontend runtime flows, and exercise existing web behavior. Record POC results, remaining runtime risks, and exact inputs for the later deployment plan.
* Files: Existing co-located tests, `README.md`, `AGENTS.md`, `docker-compose.yaml`
* Acceptance criteria:
  * `pnpm test`, `pnpm typecheck`, Python tests, and the Docker production build pass.
  * Docker SSR, D1-backed accounts/session/progress/reset, MiniSearch, RAG retrieval, and streamed chat still work.
  * The web app remains usable if the RAG index is already valid and D1 is temporarily unavailable at RAG restart.
  * A fresh RAG volume correctly stays unready when D1 cannot be reached.
  * The final audit lists no frontend dependency known to block a future Worker bundle.
  * The POC report explicitly defers `wrangler dev`, Worker SSR, D1 runtime queries, Worker sessions, Free-tier CPU measurements, VPS public-origin authentication, production configuration, and cutover to the next plan.
* Guardrails:
  * Do not delete Docker data, the existing SQLite database, or the proof D1 database when closing the POC.
  * Do not proceed automatically into deployment work.

## Dependencies

* Task 1 starts the dependency audit and creates the dry-run build harness.
* Task 2 must finish before `rag_api` can prove D1-backed indexing.
* Task 3 must pass before Task 4 removes frontend vector ownership.
* Task 5 uses the audit from Task 1 and the simplified frontend from Task 4.
* Task 6 blocks final Docker regression and POC acceptance.

External prerequisites:

* A non-production Cloudflare D1 database and a scoped API token for the RAG indexing POC.
* Access to rebuild and restart `rag_api` on the VPS.
* A disposable or backed-up LanceDB test volume for replacement/failure tests.

## QA/testing scenarios

* D1 publication is repeatable and matches SQLite course content.
* Fresh, current, stale, failed-refresh, and missing-index RAG startup paths.
* LanceDB schema, dimensions, FTS indexes, tags, README chunks, and representative hybrid searches.
* Docker web startup and reseed with no frontend LanceDB access.
* Docker account, progress, MiniSearch, RAG, and SSE chat regression.
* D1 adapter and Worker-selected module unit tests without a running Worker.
* Dry-run bundle inspection for native addons, Node-only lifecycle code, and removed packages.
