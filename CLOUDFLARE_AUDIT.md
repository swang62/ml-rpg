# Cloudflare Workers Compatibility Audit

This document inventories every runtime dependency and Node.js-specific API used
under `src/` that affects whether the app can run on Cloudflare Workers.

## Legend

| Status | Meaning |
|--------|---------|
| BLOCKING | Cannot run in Workers at all. Requires replacement, removal, or external service. |
| PARTIAL | Works with `nodejs_compat` or needs minor adaptation. |
| COMPATIBLE | Pure JS / Web API / works as-is in Workers. |

---

## 1. Runtime Dependencies (package.json)

### better-sqlite3 — BLOCKING

- **Why**: C++ native addon (`node-gyp`), filesystem-backed SQLite.
- **Action**: Replace with Cloudflare D1 SQLite-over-HTTP, or retain a Node.js backend (the current Docker architecture) and expose DB operations via API endpoints.
- **Files**: `src/server/storage.ts`, `src/server/course.ts`, `src/server/progress.ts`, `src/server/mutations.ts`, `src/server/migrations.ts`, `src/server/auth.ts`, `src/server/cleanup.ts`, `src/server/search.ts`, `src/db/*_sql.ts` (all 8 generated query files).
- **Alternatives**: D1 binding, Turso (libsql) over HTTP, or retain Node.js proxy service.

### argon2 — BLOCKING

- **Why**: C/C++ native addon for Argon2 password hashing.
- **Action**: Replace with Web Crypto API (`crypto.subtle` — PBKDF2 or Argon2 via WASM). The `hash` and `verify` calls in `session.ts` would need to switch to a Workers-compatible approach.
- **Files**: `src/server/session.ts` (import), `src/server/auth.ts` (callers).
- **Alternatives**: `crypto.subtle.deriveKey` + constant-time comparison; or delegate auth to an external service.

### @lancedb/lancedb — BLOCKING

- **Why**: Native addon (Rust via Node.js NAPI) — cannot run in Workers.
- **Note**: LanceDB already runs in the `rag_api` Python FastAPI service. The JS library is used to build local/search indexes on startup. In a Worker architecture, all LanceDB interactions must go through the `rag_api` HTTP API.
- **Action**: Remove direct JS LanceDB dependency; call `rag_api` endpoints for all vector / FTS operations.
- **Files**: `src/server/search.ts` (import + usage of `connect`, `Index`, `openTable`, `createTable`, `dropTable`, `delete`, `add`, `createIndex`).
- **Alternatives**: Already proxied through rag_api; just need to remove the JS-native path.

### @langchain/textsplitters — COMPATIBLE

- **Why**: Pure JS text chunking — no native addons. Uses only Web APIs internally.
- **Action**: No change needed.
- **Files**: `src/server/search.ts` (import + usage).

### Isomorphic-DOMPurify — COMPATIBLE

- **Why**: Pure JS with fallback for browser/server. Workers can run the server-side build.
- **Action**: No change needed.
- **Note**: Verify the import resolves to the server build in a Worker context.

### MiniSearch — COMPATIBLE

- **Why**: Pure JS in-memory full-text search. No native deps.
- **Action**: No change needed.
- **Files**: `src/server/search.ts` (import + usage).

### node-cron — PARTIAL (but likely BLOCKING for the current use)

- **Why**: Uses `setTimeout` internally for scheduling. Workers have `cron` triggers (workerd-level), not `node-cron` minute-level scheduling.
- **Action**: Replace the daily user sweep (`cron.schedule("0 0 * * *")`) with a Cloudflare Cron Trigger (via `wrangler.jsonc` `triggers.crons`) that invokes a dedicated handler.
- **Files**: `src/server/cleanup.ts`.
- **Alternatives**: `export default { async scheduled(event, env, ctx) { ... } }` Worker handler.

### Zod — COMPATIBLE

- **Why**: Pure JS, no native deps. Widely used in Workers.
- **Action**: No change needed.
- **Files**: `src/utils/env.ts`, `src/utils/input-validation.ts`.

### Vinxi Sessions (vinxi/http useSession) — PARTIAL

- **Why**: Uses `h3` session middleware, which should work in Workers with `nodejs_compat`. Signed cookies via `password` — no native crypto deps.
- **Action**: Verify in a focused build test. May need session storage (currently in-memory/cookie-based) — Workers require a stateful store (KV, D1) for session persistence across edge requests.
- **Files**: `src/server/session.ts`, `src/server/auth.ts`, `src/server/mutations.ts`, `src/server/progress.ts`, `src/server/rag.ts`.
- **Note**: Sessions work fine if cookie-only; `useSession` defaults to encrypted cookie storage.

---

## 2. Direct node:* Imports Under src/

### node:fs (existsSync, copyFileSync, unlinkSync, readFileSync, rmSync) — BLOCKING

- **Why**: Filesystem APIs are not available in Workers (no local disk).
- **Action**: Replace with Cloudflare Workers KV / R2 / Durable Objects, or pre-compute at build time and ship static data.
  - `storage.ts` — DB file init/copy/sync → pre-bundle the empty DB or use D1.
  - `search.ts` — LanceDB filesystem path checks and lock cleanup → delegate to rag_api.
  - `cleanup.ts` — `existsSync` guard → remove (not needed in Worker).
- **Files**:
  - `src/server/storage.ts` (lines 1, 24-33, 36, 210, 216)
  - `src/server/search.ts` (lines 1, 149, 162-183, 207)
  - `src/server/cleanup.ts` (lines 1, 17)

### node:crypto (createHmac, randomUUID) — PARTIAL (SUPPORTED with nodejs_compat)

- **Why**: `node:crypto` is partially available via `nodejs_compat`. `createHmac` and `randomUUID` are supported.
- **Action**: Add `nodejs_compat` to `wrangler.jsonc` (already done). Verify in build test.
- **Files**: `src/server/stream-tokens.ts` (line 9, 27-29, 43-45).

---

## 3. process and Timer Usage Under src/

### process.env — PARTIAL

- **Why**: Workers access env vars differently (`env.NAME` in handler, or `process.env` via `nodejs_compat` with specific configuration).
- **Action**: Replace `process.env` in `src/utils/env.ts` (line 41) with Cloudflare env binding access pattern. Vinxi/Nitro's `cloudflare_module` preset should handle `process.env` shimming for build-time vars.
- **Files**: `src/utils/env.ts` (line 41), `src/middleware/index.ts` (line 20).

### process.exit / process.on — BLOCKING

- **Why**: Workers are single-request ephemeral; no `process.exit()` or `process.on("SIGTERM")`.
- **Action**: Wrap `shutdown.ts` behind a Node.js guard so the signal handlers register only when `typeof process !== "undefined" && process.on` is available. In Workers, graceful shutdown is handled by the runtime — no manual cleanup needed.
- **Files**: `src/server/shutdown.ts` (lines 17, 26, 35, 39, 44, 45, 48).

### setInterval / setTimeout — COMPATIBLE (with caveats)

- **Why**: Workers support `setTimeout`/`setInterval` within a request context. Long-running intervals are discouraged — use Cron Triggers instead.
- **Action**: The `setInterval` in `rate-limiter.ts` (line 22) for stale entry cleanup is fine. The `setTimeout` in `shutdown.ts` is Node-only (see above).
- **Files**: `src/middleware/rate-limiter.ts` (line 22), `src/server/shutdown.ts` (line 24).

---

## 4. Native Addons Summary

| Package | Type | Status | Action |
|---------|------|--------|--------|
| better-sqlite3 | C++ (node-gyp) | BLOCKING | Replace with D1 or API proxy |
| argon2 | C/C++ (node-gyp) | BLOCKING | Replace with Web Crypto |
| @lancedb/lancedb | Rust NAPI | BLOCKING | Remove; route through rag_api |
| @langchain/textsplitters | Pure JS | COMPATIBLE | No change |
| isomorphic-dompurify | Pure JS | COMPATIBLE | No change |
| MiniSearch | Pure JS | COMPATIBLE | No change |
| zod | Pure JS | COMPATIBLE | No change |
| node-cron | JS (timers) | PARTIAL | Replace with Cron Trigger |

---

## 5. Recommended Migration Order

1. **Shim `process.env`** — Nitro/Vinxi `cloudflare_module` preset handles most of this.
2. **Guard `shutdown.ts`** — Wrap signal handlers in a `process.on` existence check.
3. **Replace `argon2`** — Switch to `crypto.subtle` with PBKDF2.
4. **Replace `better-sqlite3`** — Either adopt D1 bindings or proxy through the existing Docker backend as an external API.
5. **Replace `node-cron`** — Convert to Cloudflare Cron Trigger.
6. **Remove `@lancedb/lancedb`** — All operations already go through rag_api; remove the JS-native path entirely.
7. **Remove `node:fs` usage** — Pre-bundle static data; delegate runtime file ops to KV/R2/rag_api.
8. **Build and verify** — Run `pnpm build:cloudflare` and verify the Worker bundle in `wrangler.jsonc`.
