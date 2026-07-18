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
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --store-dir /pnpm/store

COPY . .

RUN pnpm build

FROM node:24.13-alpine

ARG PORT=3333
EXPOSE $PORT

ENV HOST=0.0.0.0 \
  PORT=$PORT \
  NODE_ENV=production

# Create non-root user with explicit UID 1001 (required for consistent
# filesystem permissions across deployments and volume mounts).
RUN adduser -D -H -h /app -u 1001 www && \
  mkdir -p /app/.data && \
  chown -R 1001:1001 /app

WORKDIR /app

# Copy with explicit UID for consistency with the www user
COPY --from=build --chown=1001:1001 /app/.output .

# Switch to non-root user for runtime
USER www

STOPSIGNAL SIGTERM

CMD ["node", "server/index.mjs"]
