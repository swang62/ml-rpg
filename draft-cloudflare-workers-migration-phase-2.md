# Draft: Phase 2 Cloudflare Workers migration

## Status

This is the preserved Phase 2 draft. It is not the active implementation plan. Phase 2 starts only after `plan-cloudflare-compatibility-poc.md` is completed and accepted.

## Goal

Deploy the SolidStart SSR frontend to Cloudflare Workers while the existing Node/Docker web deployment remains available in parallel. Use isolated staging and production D1 databases, validate gradually, and cut over without dual writes.

## Requirements

* Keep the existing Docker Compose web deployment working throughout migration and the initial observation window.
* Keep `rag_api` and `llama_api` on the VPS in Docker.
* Use the Phase 1 result where `rag_api` owns all embeddings and LanceDB indexing and pulls course content from D1.
* Keep MiniSearch in memory in each web runtime: SQLite-backed in Docker and D1-backed in Workers.
* Start Cloudflare with fresh accounts and progress. Do not migrate existing SQLite users, password hashes, sessions, or progress.
* Preserve anonymous local-storage progress behavior.
* Target Cloudflare's Free tier first and record limits that would require upgrading.
* Start with Wrangler scripts. Defer GitHub Actions and Cloudflare Git integration.

## Decisions already made

### Parallel rollout and data

* Use an isolated Cloudflare staging/canary deployment first.
* Use separate staging and production Workers, D1 databases, secrets, routes, and rate-limit namespaces.
* Do not implement dual writes, bidirectional replication, or shared user data between Docker SQLite and D1.
* At cutover, seed production course content but start accounts/progress fresh.
* Keep Docker running for rollback during an observation window.
* A rollback to Docker temporarily makes D1-only accounts unavailable; the runbook must state this clearly.

### Database

* Workers use D1 for courses, users, and progress.
* Docker keeps `better-sqlite3`, WAL, its current migrations, and local content synchronization.
* Reuse existing generated sqlc query functions through the minimal D1 adapter proven in Phase 1 rather than adding an ORM or duplicating business logic.
* Wrangler owns D1 schema migrations. Request startup must not run migrations or seed data.
* Publish course content to D1 from the same seeded source used by Docker, preserving stable IDs and a deterministic content version.
* Future course publications must preserve users/progress and clean up progress only for lessons intentionally removed.

### Authentication and sessions

* Docker keeps native Argon2id for existing accounts.
* Workers use the versioned Web Crypto password format proven in Phase 1 for fresh D1 accounts.
* Do not add Worker-side legacy Argon2 verification.
* Preserve current cookie behavior: `HttpOnly`, `Secure` in production, `SameSite=Lax`, and the existing timeout.
* If a safe password KDF cannot fit measured Free-tier CPU limits, do not weaken it silently; disable Worker signup/login or revise the plan/account tier.

### RAG and llama connectivity

* Workers call existing public HTTPS RAG and llama origins.
* Do not add Cloudflare Tunnel in this migration.
* Add machine-to-machine authentication at the existing VPS reverse proxy. Workers attach a secret header stored as a Cloudflare secret; the proxy rejects calls without it.
* Do not expose the secret or VPS origins in client code.
* Preserve `/guard`, `/retrieve`, `/status`, `/embed`, `/v1/chat/completions`, stream-token validation, abort timeouts, and SSE passthrough behavior.

### Search and HTML

* Persistent LanceDB/vector work remains exclusively in `rag_api` on the VPS.
* MiniSearch remains a disposable per-process/per-isolate cache built from the selected relational store.
* Do not add KV, Redis, or Durable Objects for MiniSearch.
* Seeded lesson HTML is trusted and clean.
* Remove `isomorphic-dompurify`; retain only request-time JSX/code/CSS transformations required for presentation.

### Cloudflare runtime

* Use SolidStart's Nitro `cloudflare_module` preset.
* Enable `nodejs_compat` and the async-context/static-content externals required by current SolidStart guidance.
* Use typed Worker bindings/secrets rather than relying on Node `process.env` in Worker-selected modules.
* Native addons, persistent filesystem assumptions, process signals/exits, and long-running cron loops must stay out of the Worker bundle.
* Keep `node:crypto` stream-token code only if Phase 1 proves it under `nodejs_compat`; otherwise use the Worker-specific Web Crypto implementation.

### Rate limiting and maintenance

* Use Cloudflare rate-limit bindings for regular, authentication, and chat traffic, with independent staging/production namespaces.
* Rate-limited chat requests must stop before reaching the VPS.
* Keep Docker's existing in-memory limiter.
* Defer stale D1 account cleanup rather than creating a second Worker solely for cron during initial migration.
* If rate-limit bindings are unavailable on the selected Free account, keep AI routes disabled until an approved alternative or tier change is selected.

## Draft tasks

### Task 1: Review the accepted Phase 1 artifacts

* Confirm the Worker dry-run bundle, D1 adapter, Worker environment/password seams, package audit, and Docker regression all passed.
* Confirm `rag_api` independently maintains LanceDB from D1 and no frontend code touches it.
* Convert every Phase 1 deferred runtime risk into a Phase 2 test or blocker.

Likely files: `plan-cloudflare-compatibility-poc.md`, Phase 1 POC report in `README.md`, `package.json`, `app.config.ts`, `wrangler.jsonc`.

### Task 2: Make the Worker target runnable locally

* Complete Cloudflare binding types and local D1 persistence configuration.
* Run the SolidStart Worker through `wrangler dev` rather than relying on dry-run bundling.
* Verify SSR, static assets, server functions, async context, selected platform modules, and error handling.
* Keep existing Docker commands and default app configuration behavior unchanged.

Likely files: `app.config.ts`, `wrangler.jsonc`, `package.json`, `tsconfig.json`, Worker environment/storage modules created in Phase 1.

### Task 3: Validate D1 application behavior

* Apply local D1 migrations and publish course content.
* Exercise every generated query path used by course pages, MiniSearch, authentication, mutations, and progress.
* Verify D1 result-shape conversions, booleans, `RETURNING`, joins, timestamps, and error handling.
* Confirm no request performs migration, SQLite synchronization, PRAGMAs, WAL setup, or filesystem writes.

Likely files: `src/server/course.ts`, `src/server/progress.ts`, `src/server/mutations.ts`, `src/server/auth.ts`, `src/server/search.ts`, `src/db/d1-adapter.ts`, D1 migrations and publication script.

### Task 4: Validate Worker authentication and sessions

* Test fresh signup, login, wrong-password rejection, session refresh, logout, display-name updates, and account-dependent progress.
* Measure the Worker password KDF against Free-tier CPU limits.
* Validate cookie flags and session signing on local and staging HTTPS environments.
* Confirm Docker Argon2id accounts remain unaffected.

Likely files: `src/server/session.ts`, Worker password/environment modules, `src/server/auth.ts`, auth tests.

### Task 5: Adapt middleware and protect VPS upstreams

* Wire Cloudflare rate-limit bindings into regular, auth, and chat paths.
* Use `cf-connecting-ip`/request context correctly and keep counters separated by environment.
* Attach the secret upstream header only in Worker server code.
* Configure the VPS reverse proxy to require the header for RAG/llama routes without changing either API contract.
* Verify SSE streams remain incremental through Worker and reverse proxy.

Likely files: `src/middleware/index.ts`, Worker rate-limiter module, `src/server/rag.ts`, `src/routes/api/chat.ts`, `src/server/stream-tokens.ts`, `wrangler.jsonc`; VPS reverse-proxy configuration remains outside the repository.

### Task 6: Define staging and production configuration

* Add distinct Worker names, routes, D1 IDs, secrets, rate-limit namespaces, asset settings, compatibility date/flags, and observability.
* Add explicit commands for local migration/seed, staging migration/seed/deploy, production migration/seed/deploy, logs, version inspection, and rollback.
* Prevent staging commands from mutating production D1.
* Keep `pnpm build` non-deploying and current Docker scripts unchanged.

Likely files: `wrangler.jsonc`, `package.json`, `.gitignore`, `README.md`, `AGENTS.md`.

### Task 7: Deploy and test staging

* Provision and seed staging D1.
* Deploy the Worker to a staging hostname.
* Test SSR course routes, static assets/cache headers, anonymous local progress, fresh accounts, signed-in progress, MiniSearch, RAG retrieval, streamed chat, rate limits, malformed input, invalid stream tokens, and upstream outages.
* Measure bundle size, CPU, D1 reads/writes, database size, subrequests, and first-search latency against Free-tier limits.
* Keep Docker production traffic unchanged.

### Task 8: Prepare production and cutover

* Provision/migrate/seed production D1 independently of staging.
* Deploy the same tested Worker version to production configuration before attaching the public route.
* Point the RAG indexer to production D1, restart it, verify the production content version, and test retrieval before DNS/route changes.
* Attach the production domain and run smoke tests.
* Keep Docker ready for rollback through the observation window.

### Task 9: Observe and close migration

* Monitor Worker errors, D1 failures, rate limiting, chat upstream latency, RAG health, and Free-tier consumption.
* Roll back routing if acceptance thresholds fail; do not delete D1 or Worker versions.
* After the observation window, decide separately whether to retire the Docker web service and old SQLite user data.

## Acceptance criteria for the final Phase 2 plan

* Docker and Worker builds/tests are green from the same repository state.
* A staging Worker runs the complete site before any production routing change.
* Staging and production use different D1 databases, secrets, routes, and rate-limit namespaces.
* Worker requests load no native addon and make no persistent local filesystem assumption.
* Course pages and MiniSearch produce equivalent results in Docker and Workers.
* Fresh D1 auth/progress works; SQLite auth/progress remains independent and intact.
* Direct unauthenticated calls to protected VPS AI origins fail; Worker-proxied calls succeed.
* Chat remains streamed rather than buffered.
* Production RAG confirms the production D1 content version before cutover.
* Measured usage fits the Free tier or records an explicit upgrade blocker.
* Rollback restores Docker traffic without deleting or corrupting D1 data.

## QA scenarios to preserve

* Worker cold start and warm-isolate SSR.
* First MiniSearch query versus cached subsequent queries.
* D1 unavailable during course/auth/progress requests.
* Signup/login/session expiry and invalid password inputs.
* Duplicate progress writes, reset operations, and anonymous progress.
* Rate-limited requests that never reach the VPS.
* RAG/llama timeout, non-2xx, malformed response, and stream cancellation.
* Invalid/expired stream tokens.
* Static asset caching and dynamic route handling.
* Staging-to-production configuration isolation.
* DNS/route rollback to Docker with D1 retained.

## Open items for the later planning interview

* Exact staging and production hostnames/routes.
* Exact Free-tier resource measurements from the Phase 1 and local runtime tests.
* Observation-window length and production rollback thresholds.
* Whether production deployment remains manual Wrangler or gains CI after staging.
* Whether and when to retire the Docker web service after cutover.
