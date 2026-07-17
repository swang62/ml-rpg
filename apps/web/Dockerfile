FROM node:24.13-alpine AS build

# Build ARGs, not needed in production
ARG CI=true
ARG VITE_SITE_URL
ARG VITE_SITE_ID

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
  --mount=type=cache,target=/root/.cache/node/corepack \
  npm install --global corepack@latest && \
  corepack enable && corepack prepare pnpm@11.2.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --store-dir /pnpm/store

COPY apps/web ./apps/web
COPY shared ./shared
COPY README.md ./README.md

RUN pnpm build

FROM node:24.13-alpine

ARG PORT=3333
EXPOSE $PORT

ENV HOST=0.0.0.0 \
  PORT=$PORT \
  COURSE_DB_PATH=/app/.data/course.db \
  LANCEDB_PATH=/app/.data/search \
  NODE_ENV=production

# Create non-root user with explicit UID 1001 (required for consistent
# filesystem permissions across deployments and volume mounts).
RUN adduser -D -H -h /app -u 1001 www && \
  mkdir -p /app/.data && \
  chown -R 1001:1001 /app

WORKDIR /app

# Copy with explicit UID for consistency with the www user
COPY --from=build --chown=1001:1001 /app/apps/web/.output .
COPY --from=build --chown=1001:1001 /app/README.md /app/README.md
COPY --from=build --chown=1001:1001 /app/apps/web/src/db/empty.db /app/src/db/empty.db

# Switch to non-root user for runtime
USER www

# node:26-alpine uses tini as its default entrypoint for proper signal
# forwarding. Ensure SIGTERM reaches the Node process so the graceful
# shutdown handler (src/server/shutdown.ts) can close DB connections.
STOPSIGNAL SIGTERM

# The Node process handles SIGTERM via shutdown.ts which:
# 1. Closes the SQLite database (WAL checkpoint)
# 2. Stops the rate limiter cleanup interval
# 3. Exits cleanly
CMD ["node", "server/index.mjs"]
