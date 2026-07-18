# Plan: Cloudflare Staging & Production Environments

## Goal

Set up isolated staging and production environments on Cloudflare Workers/D1, with working Worker ↔ rag_api connectivity, complete with deployment scripts, rate limiting, and DNS.

## Hostnames

| Service     | Staging                          | Production                  |
| ----------- | -------------------------------- | --------------------------- |
| Worker      | `dev-ml-rpg.stevewang.dev`       | `ml-rpg.stevewang.dev`      |
| rag_api     | `https://dev-rag.stevewang.dev`  | `https://rag.stevewang.dev` |

Both are one-level subdomains covered by the Free plan `*.stevewang.dev` Universal SSL certificate.

## Scope

- Complete Cloudflare env configuration: D1 databases, secrets, vars, rate-limit bindings
- Worker deploy + seed scripts for both environments
- DNS setup for Worker hostnames
- Smoke-test both environments end-to-end (Worker → rag_api → LLM)

### Out of scope

- Migrating existing Docker SQLite data to D1 (fresh start per draft)
- CI/CD pipeline (manual Wrangler deploys only)
- Custom domain setup for rag_api/llama_api VPS upstreams (already done)

---

## Tasks

### [ ] Task 1: Create production D1 database

- **Description**: Provision the production D1 database via Wrangler, record its ID, and update `wrangler.jsonc`.
- **Files**: `wrangler.jsonc`
- **Steps**:
  1. Run `wrangler d1 create ml-rpg-content-production` and capture the `database_id`
  2. In `wrangler.jsonc`, add a `production` env section mirroring `staging`:
     ```jsonc
     "production": {
       "vars": {
         "RAG_API_URL": "https://rag.stevewang.dev"
       },
       "d1_databases": [
         {
           "binding": "D1_CONTENT",
           "database_name": "ml-rpg-content-production",
           "database_id": "<REAL_ID>",
           "migrations_dir": "migrations"
         }
       ]
     }
     ```
  3. Update the `staging` env `RAG_API_URL` from `""` to `"https://dev-rag.stevewang.dev"`
  4. Update the `staging` `database_id` from `"REPLACE_ME"` to the real ID (re-run `wrangler d1 create ml-rpg-content-staging` if needed)
- **Acceptance**: `wrangler d1 list` shows both databases; `wrangler.jsonc` has valid IDs

### [ ] Task 2: Create production seed script

- **Description**: Add `seed:production` script mirroring the staging pattern.
- **Files**: `scripts/seed-production.sh`, `package.json`
- **Steps**:
  1. Copy `scripts/seed-staging.sh` → `scripts/seed-production.sh`
  2. Change `--env staging` → `--env production` throughout
  3. Add to `package.json`: `"seed:production": "./scripts/seed-production.sh"`
- **Acceptance**: `pnpm seed:production` runs without error (after migrations + seed SQL exist)

### [ ] Task 3: Set Cloudflare secrets

- **Description**: Push `SESSION_SECRET` as a Wrangler secret for both environments (so it never appears in `wrangler.jsonc` or source code).
- **Steps**:
  1. `echo "<secret>" | wrangler secret put SESSION_SECRET --env staging`
  2. `echo "<secret>" | wrangler secret put SESSION_SECRET --env production`
  3. Verify: `wrangler secret list --env staging` and `--env production`
- **Acceptance**: Secrets exist for both envs; same value as the rag_api VPS `SESSION_SECRET`
- **Guardrail**: Never commit secrets to source. The `.dev.vars` file is already gitignored for local dev.

### [ ] Task 4: Add rate-limiting bindings

- **Description**: Configure Cloudflare rate-limit bindings in `wrangler.jsonc` for both environments. Three buckets: regular, auth, and chat.
- **Files**: `wrangler.jsonc`
- **Steps**:
  1. Add `unsafe.bindings` with rate-limit namespaces to top-level config (default/local) and both env sections:
     ```jsonc
     "unsafe": {
       "bindings": [
         { "type": "ratelimit", "name": "RL_GENERAL", "namespace_id": "local", "simple": { "limit": 100, "period": 60 } },
         { "type": "ratelimit", "name": "RL_AUTH", "namespace_id": "local-auth", "simple": { "limit": 5, "period": 60 } },
         { "type": "ratelimit", "name": "RL_CHAT", "namespace_id": "local-chat", "simple": { "limit": 10, "period": 60 } }
       ]
     }
     ```
  2. For staging/production: create real rate-limit namespaces via `wrangler ratelimit namespace create` (or use unique `namespace_id` strings; Cloudflare auto-creates them)
  3. Adjust limits as needed for production traffic
- **Acceptance**: `wrangler.jsonc` has valid rate-limit bindings; `wrangler deploy --dry-run` passes
- **Note**: Free plan rate-limit availability may cap rules; verify with `wrangler ratelimit namespace list`. If only X namespaces allowed, collapse to one namespace with per-path logic in middleware.

### [ ] Task 5: Deploy staging Worker

- **Description**: Build and deploy the Worker to staging, seed the D1 database, and verify the Worker boots.
- **Files**: `wrangler.jsonc`
- **Steps**:
  1. `pnpm generate` → creates `.data/d1-seed.sql`
  2. `pnpm build` → bundles Worker to `.output/`
  3. `pnpm seed:staging` → applies migrations + wipes + seeds
  4. `wrangler deploy --env staging`
  5. Verify: `curl https://dev-ml-rpg.stevewang.dev` returns HTML
- **Acceptance**: Staging Worker serves SSR pages; no errors in `wrangler tail --env staging`

### [ ] Task 6: Set up DNS for Worker hostnames

- **Description**: Create proxied (orange cloud) DNS AAAA records pointing to Cloudflare Workers for both staging and production hostnames.
- **Steps**:
  1. Add DNS record: `CNAME dev-ml-rpg` → `ml-rpg.stevewang.dev` (or AAAA `100::` to trigger Worker routing)
  2. Add DNS record: `CNAME ml-rpg` → Worker route (or AAAA `100::`)
  3. Verify DNS resolves: `dig dev-ml-rpg.stevewang.dev` shows Cloudflare IPs
  4. Wait for SSL provisioning (typically < 5 min)
  5. Verify: `curl -I https://dev-ml-rpg.stevewang.dev` returns 200
- **Acceptance**: Both hostnames resolve over HTTPS to the Worker

### [ ] Task 7: Smoke-test staging end-to-end

- **Description**: Verify all critical paths work on the staging Worker.
- **Steps**:
  1. SSR course page: `curl https://dev-ml-rpg.stevewang.dev/ml-system-design` → 200 with HTML
  2. Static assets: `curl -I https://dev-ml-rpg.stevewang.dev/assets/...` → proper cache headers
  3. MiniSearch: use browser to verify keyword search loads and works
  4. Anonymous progress: load a lesson, verify XP bar updates in localStorage
  5. Signup + login: create an account, log out, log back in
  6. RAG chat: send a chat message via the UI or direct API call
  7. Auth protection: `curl https://dev-ml-rpg.stevewang.dev/api/chat -d '...'` (no auth → should still work, Worker proxies to rag_api which requires Bearer)
  8. rag_api connectivity: Worker → rag_api Bearer auth works, returns chat stream
- **Acceptance**: All paths work; no console errors; no 403s from rag_api

### [ ] Task 8: Deploy and smoke-test production

- **Description**: Same as staging, but for production.
- **Steps**:
  1. `pnpm seed:production` (migrations + wipe + seed)
  2. `wrangler deploy --env production`
  3. Run the same smoke tests against `ml-rpg.stevewang.dev`
  4. Confirm isolated state: staging accounts don't appear in production
- **Acceptance**: Production Worker works identically to staging with its own data

### [ ] Task 9: Update documentation

- **Description**: Document the new deployment flow so future-you knows the commands.
- **Files**: `README.md`
- **Steps**:
  1. Add a `## Cloudflare Deploy` section in README.md with the full deploy workflow:
     ```markdown
     ### Staging deploy
     1. `pnpm generate` — rebuilds `.data/d1-seed.sql` from lesson files
     2. `pnpm build` — bundles Worker
     3. `pnpm seed:staging` — migrates + seeds staging D1
     4. `wrangler deploy --env staging`
     5. Verify: https://dev-ml-rpg.stevewang.dev

     ### Production deploy
     1. `pnpm build` (must match the tested staging build)
     2. `pnpm seed:production` — migrates + seeds production D1
     3. `wrangler deploy --env production`
     4. Verify: https://ml-rpg.stevewang.dev

     ### Wipe local D1 (dev)
     `pnpm db:delete-local && pnpm seed:local`
     ```
  2. Remove old Docker-frontend deployment docs if any remain
- **Acceptance**: README has clear, copy-pastable deploy commands

---

## Dependencies

- Task 1 (create D1) before Task 3 (secrets can be set anytime, but deployment needs DB)
- Task 1 + 2 before Task 5 (staging deploy needs DB + seed script)
- Task 5 before Task 6 (DNS should point to a deployed Worker)
- Task 1 + 4 before Task 8 (production deploy needs DB + rate limits)
- Task 7 before Task 8 (production only after staging verified)

## Parallel opportunities

- Tasks 1, 2, 3, 4 can all be done in parallel (all configuration work)
- Tasks 6 and 7 partially overlap (DNS propagation while testing)

## QA / Testing Scenarios

1. **Isolation**: Sign up on staging, confirm account does not exist on production
2. **Secrets**: `wrangler deploy --dry-run` shows no secrets in bundle
3. **Free tier caps**: Monitor `wrangler tail` for D1 row limits, subrequest counts, CPU time warnings
4. **Rollback**: `wrangler rollback --env production` restores previous version; D1 data unchanged
5. **rag_api auth**: Direct `curl` to `https://dev-rag.stevewang.dev/retrieve` without Bearer → 403; Worker-proxied call → 200
6. **SSL**: Both Worker hostnames serve valid Cloudflare edge certs (not self-signed)
7. **Streaming**: Chat SSE stream is not buffered through Worker → rag_api → llama_api chain
