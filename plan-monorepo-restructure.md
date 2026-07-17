# Plan: Monorepo Restructure

## Goal

Restructure the repo into a three-app monorepo while preserving root commands, Docker builds, Docker Compose deployment, Python imports, FastAPI startup, and current test/build behavior.

Target layout:

```txt
apps/
  web/          SolidStart app (pnpm workspace)
  rag-api/      FastAPI RAG backend, Python package `rag_api`
  llama-api/    llama.cpp server + training scripts, Python package `llama_api`
```

Root remains the orchestration layer with one shared `pyproject.toml` / uv env and one pnpm workspace root.

## Scope

**IN**

- [ ] Move SolidStart app into `apps/web`
- [ ] Move `rag_api` package into `apps/rag-api/rag_api`
- [ ] Move `llama_api` package into `apps/llama-api/llama_api`
- [ ] Move Dockerfiles with their apps
- [ ] Keep root `docker-compose.yaml`
- [ ] Keep one root `pyproject.toml` / `uv.lock`
- [ ] Keep root `package.json` scripts delegating to apps
- [ ] Preserve service names: `ml-rpg`, `rag-api`, `llama-api`
- [ ] Preserve root commands: `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm build:docker`, `pnpm build:finetune`
- [ ] Verify all local scripts + full Compose deployment

**OUT**

- Splitting Python into separate `pyproject.toml` files
- Renaming Python import packages from `rag_api` / `llama_api`
- Changing runtime ports
- Running full fine-tune pipeline end-to-end by default
- Adding extra tooling like Nx/Turborepo unless later requested

## Tasks

### Task 1: Create monorepo app layout

- **Move web files to `apps/web`:**
  - `src/`, `public/`, `scripts/`
  - `app.config.ts`, `vitest.config.ts`, `postcss.config.mjs`
  - `tsconfig.json`, `Dockerfile`
  - `.dockerignore`
- **Move Python apps:**
  - `rag_api/` package → `apps/rag-api/rag_api/`
  - `rag_api/Dockerfile` → `apps/rag-api/Dockerfile`
  - `llama_api/` package → `apps/llama-api/llama_api/`
  - `llama_api/Dockerfile` → `apps/llama-api/Dockerfile`
  - `llama_api/entrypoint.sh` → `apps/llama-api/entrypoint.sh`
- **Keep root files where they are:**
  - `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
  - `pyproject.toml`, `uv.lock`
  - `docker-compose.yaml`
  - `Justfile`, `.github/`, `README.md`, `AGENTS.md`
  - `biome.json`, `sqlc.yaml`, `lora_config.yaml`

**Acceptance Criteria**

- Repo visibly separates three apps under `apps/`
- Python import package names remain `rag_api` and `llama_api`
- No app-specific Dockerfile left at stale old paths

---

### Task 2: Convert Node side to pnpm workspace

- Root `package.json` becomes orchestration-only (keep it `private: true`)
- Add `apps/web/package.json` with all current SolidStart deps and scripts
- Update `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/web"

minimumReleaseAge: 10080

allowBuilds:
  "@parcel/watcher": true
  argon2: true
  better-sqlite3: true
  esbuild: true
```

- Root scripts delegate to `apps/web`, e.g.:
  - `build`: `pnpm --filter @ml-rpg/web build`
  - `dev`: `pnpm --filter @ml-rpg/web dev`
  - `preview`: `pnpm --filter @ml-rpg/web preview`
  - `typecheck`: `pnpm --filter @ml-rpg/web typecheck`
  - `test` delegates to web vitest + keeps python test step

- `pnpm install --frozen-lockfile` must work after lockfile refresh
- Web dependencies scoped to `apps/web/lib` (same version ranges as current root)

**Dependencies**: Task 1 complete

**Acceptance Criteria**

- `pnpm install` succeeds from root
- Root `package.json` scripts delegate correctly
- `apps/web` has its own `package.json` with all deps

---

### Task 3: Fix web paths (tsconfig, sqlc, vitest, constants)

Update all paths broken by moving `src/` → `apps/web/src/`:

- `apps/web/app.config.ts` — `middleware: "src/middleware/index.ts"` stays relative (runs from `apps/web`)
- `apps/web/vitest.config.ts`
  - Alias: `"~" -> "./src"`
  - Include: `src/**/__tests__/*.test.ts`
  - Env paths must reference root `.data`:
    - `COURSE_DB_PATH: "../../.data/course.db"`
    - `LANCEDB_PATH: "../../.data/search"`
- `apps/web/tsconfig.json` — `paths: {"~/*": ["./src/*"]}`, excludes stay app-local
- `sqlc.yaml` (root):
  - `schema: "apps/web/src/db/raw/base.sql"`
  - `queries: "apps/web/src/db/raw/"`
  - `out: apps/web/src/db`
- `apps/web/src/utils/constants.ts`
  - `EMPTY_DB_PATH` — update to match where empty.db lives relative to cwd at runtime. Check current value and determine correct path.
  - Currently: `"src/db/empty.db"` — this needs to resolve correctly whether running from `apps/web` or from root.
- Scripts in `apps/web/scripts/` — check for root-relative paths and update.

**Dependencies**: Task 1, Task 2

**Acceptance Criteria**

- TypeScript path alias `~/...` still resolves
- `pnpm generate:types` writes generated files into `apps/web/src/db/`
- Vitest tests use repo-root `.data`, not `apps/web/.data`
- `pnpm typecheck` passes

---

### Task 4: Preserve Python imports and FastAPI startup

Keep root `pyproject.toml` as single source of Python deps. Packages moved to `apps/rag-api/rag_api` and `apps/llama-api/llama_api` must remain importable as `rag_api` and `llama_api`.

Approach: add `[tool.setuptools.package-dir]` mapping so setuptools can find packages under `apps/*`:

```toml
[tool.setuptools.package-dir]
"" = "apps/rag-api"
"" = "apps/llama-api"
```

If setuptools `package-dir` doesn't support multiple roots well, use `PYTHONPATH` strategy instead — add both app dirs to `PYTHONPATH` in development and Docker.

Files to update:

- `pyproject.toml`:
  - `[tool.setuptools.packages.find]` — update `include` and `where` if using multi-root
  - `[tool.basedpyright]` — update `include: ["apps/rag-api/rag_api", "apps/llama-api/llama_api"]`
- `pyproject.toml` dependency groups — no changes needed

Verify from root:

```sh
uv run python -c "import rag_api; import llama_api"
uv run uvicorn rag_api.app:app --host 127.0.0.1 --port 8000
uv run python -m llama_api.scripts.utils
```

**Dependencies**: Task 1

**Acceptance Criteria**

- `uv run python -c "import rag_api; print(rag_api.app.app.title)"` works
- `uv run uvicorn rag_api.app:app` starts successfully
- Python tests pass: `pnpm test:python`
- basedpyright passes: `uv run basedpyright apps/rag-api/rag_api/ apps/llama-api/llama_api/`

---

### Task 5: Update Dockerfiles

#### Web Dockerfile (`apps/web/Dockerfile`)

Build context: root (`docker-compose.yaml` → `context: .`).

```dockerfile
FROM node:24.13-alpine AS build

ARG CI=true
ARG VITE_SITE_URL
ARG VITE_SITE_ID

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
  --mount=type=cache,target=/root/.cache/node/corepack \
  npm install --global corepack@latest && \
  corepack enable && corepack prepare pnpm@11.2.2 --activate

# Copy root workspace files first for install
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --store-dir /pnpm/store

# Copy web app source
COPY apps/web ./apps/web
COPY README.md ./README.md

# Build from apps/web directory
WORKDIR /app/apps/web
RUN pnpm build

FROM node:24.13-alpine

ARG PORT=3333
EXPOSE $PORT

ENV HOST=0.0.0.0 \
  PORT=$PORT \
  COURSE_DB_PATH=/app/.data/course.db \
  LANCEDB_PATH=/app/.data/search \
  NODE_ENV=production

RUN adduser -D -H -h /app -u 1001 www && \
  mkdir -p /app/.data && \
  chown -R 1001:1001 /app

WORKDIR /app/apps/web

COPY --from=build --chown=1001:1001 /app/apps/web/.output .output
COPY --from=build --chown=1001:1001 /app/README.md /app/README.md

# empty.db for DB initialization at runtime
COPY --from=build --chown=1001:1001 /app/apps/web/src/db/empty.db src/db/empty.db

USER www

STOPSIGNAL SIGTERM
CMD ["node", ".output/server/index.mjs"]
```

#### RAG Dockerfile (`apps/rag-api/Dockerfile`)

Build context: root (`docker-compose.yaml` → `context: .`).

```dockerfile
FROM python:3.14-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copy root Python config for uv sync
COPY pyproject.toml uv.lock ./
# Copy rag_api package (Python package, not directory name)
COPY apps/rag-api/rag_api /app/rag_api

RUN --mount=type=cache,target=/root/.cache/uv \
  uv sync --inexact && \
  uv run python -c "import en_core_web_sm" 2>/dev/null || uv run -- spacy download en_core_web_sm

RUN uv run python -c "from huggingface_hub import snapshot_download; snapshot_download(repo_id='qdrant/bge-small-en-v1.5-onnx-q', cache_dir='/root/.cache/huggingface/hub')"

ENV PYTHONPATH=/app
ENV HF_HUB_CACHE=/root/.cache/huggingface/hub
CMD ["uv", "run", "uvicorn", "rag_api.app:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Llama Dockerfile (`apps/llama-api/Dockerfile`)

Build context: `./apps/llama-api` (app-local).

```dockerfile
FROM ghcr.io/ggml-org/llama.cpp:server

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip \
    && pip3 install --break-system-packages --no-cache-dir huggingface-hub hf_transfer \
    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /app/entrypoint.sh
COPY llama_api/scripts/ /app/scripts/

RUN chmod +x /app/entrypoint.sh

ENV MODEL_PATH=/app/models
ENV HF_MODEL_REPO=scubastevve/ml-rpg-bob
ENV HF_MODEL_FILE=bob.gguf

RUN mkdir -p $MODEL_PATH

EXPOSE 8080

ENTRYPOINT ["/app/entrypoint.sh"]
```

**Dependencies**: Task 1, Task 2, Task 3, Task 4

**Acceptance Criteria**

- `docker compose build` builds all three images
- No COPY failures for missing files
- Image sizes reasonable (no node_modules bloat in runtime stage)

---

### Task 6: Update Docker Compose

Update root `docker-compose.yaml` build paths:

```yaml
services:
  ml-rpg:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    # ... rest unchanged

  rag-api:
    build:
      context: .
      dockerfile: apps/rag-api/Dockerfile
    # ... rest unchanged

  llama-api:
    build:
      context: ./apps/llama-api
      dockerfile: Dockerfile
    # ... rest unchanged
```

Preserve:
- Service names, container names, ports, volumes, env vars, healthchecks
- Internal URLs: `RAG_API_URL=http://rag-api:8000`, `LLAMA_API_URL=http://llama-api:9876`
- `depends_on` with health conditions

**Dependencies**: Task 5

**Acceptance Criteria**

- `pnpm build:docker` still runs `docker compose up --build --force-recreate -d`
- `docker compose ps` shows all three services healthy
- Web container can reach `rag-api:8000` and `llama-api:9876`

---

### Task 7: Update root scripts, dev startup, and CI

Files:

- Root `package.json` scripts
- `apps/web/scripts/start-dev.sh`
- `.github/workflows/ci.yml`

Script delegations:

```json
{
  "build": "pnpm --filter @ml-rpg/web build",
  "preview": "pnpm --filter @ml-rpg/web preview",
  "typecheck": "pnpm --filter @ml-rpg/web typecheck",
  "lint": "biome check --write --unsafe . && pnpm typecheck && uv run basedpyright apps/rag-api/rag_api/ apps/llama-api/llama_api/",
  "test": "pnpm --filter @ml-rpg/web test && pnpm test:python",
  "test:python": "uv run --group dev pytest apps/rag-api/rag_api/__tests__ apps/llama-api/llama_api/__tests__ -v"
}
```

`start-dev.sh` updates:

- RAG: `uv run python -m debugpy ... -m uvicorn rag_api.app:app ...`
- Bob model: `MODEL_PATH="apps/llama-api/llama_api/models/bob.gguf"`
- Web: `pnpm --dir apps/web vinxi dev` (or via filter)

CI updates:

- Cache paths for node_modules may need adjustment for pnpm workspace layout
- `.vinxi` cache path: `apps/web/.vinxi`
- Python test paths updated in lint/test jobs

**Dependencies**: All prior tasks

**Acceptance Criteria**

- `pnpm dev` starts same three local services
- `pnpm lint` passes
- `pnpm test` passes
- CI workflow file paths resolve correctly

---

### Task 8: Update Justfile fine-tuning paths

```just
root_dir := "apps/llama-api/llama_api"
data_dir := root_dir + "/data"
models_dir := root_dir + "/models"
log_dir := root_dir + "/logs"
```

- Python module invocations (`llama_api.scripts.*`) stay unchanged
- `lora_config.yaml` stays root-level, reference path unchanged
- `preprocess` task: `uv run uvicorn rag_api.app:app ...` stays unchanged

**Dependencies**: Task 4

**Acceptance Criteria**

- `just --list` shows correct tasks (if just is installed)
- Path references point to `apps/llama-api/llama_api/...`
- Module imports remain `llama_api.scripts...`

---

### Task 9: Update docs (README, AGENTS)

Document new layout:

```txt
apps/
  web/        SolidStart app (pnpm workspace member)
  rag-api/    FastAPI RAG backend, Python package rag_api
  llama-api/  llama.cpp server + training scripts, Python package llama_api
```

Update command notes where paths changed.

**Dependencies**: All prior tasks

**Acceptance Criteria**

- README reflects monorepo structure
- AGENTS.md path references are current

---

## Dependencies

```
Task 1 (move files)
  ├── Task 2 (pnpm workspace) ──┐
  │                               ├── Task 5 (Dockerfiles)
  ├── Task 3 (web paths) ────────┤        │
  │                               │        └── Task 6 (compose)
  └── Task 4 (Python paths) ─────┘
                                        └── Task 7 (scripts/CI)
                                             └── Task 8 (Justfile)
                                                  └── Task 9 (docs)
```

Tasks 2, 3, 4 can run in parallel after Task 1.

## QA Scenarios

### Local Node/Web
```sh
pnpm install --frozen-lockfile
pnpm generate:types
pnpm typecheck
pnpm build
```

### Python Imports/FastAPI
```sh
uv sync --group dev --inexact
uv run python -c "import rag_api; import llama_api"
uv run python -c "from rag_api.app import app; print(app.title)"
```

### Tests
```sh
pnpm test
```

### Docker Build
```sh
docker compose build
```

### Compose Runtime
```sh
docker compose up --build --force-recreate -d
docker compose ps          # all healthy
```

### Finetune Smoke
```sh
just --list   # (if just installed) paths resolve
```

## Main Risk

Docker context drift. Mitigations:
- Web and RAG use root context (they need root lock/config files)
- Llama uses app-local context (self-contained)
- Compose remains single entrypoint
- Python module names stay unchanged even though folders move
