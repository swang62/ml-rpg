FROM node:26-alpine AS build

ARG CI=true
WORKDIR /app

RUN npm install --global corepack@latest && \
  corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --store-dir /pnpm/store

COPY . .

# Build the Nitro server
RUN pnpm build

FROM node:26-alpine

ARG PORT
EXPOSE $PORT

ENV HOST=0.0.0.0
ENV PORT=$PORT
ENV COURSE_DB_PATH=./.data/course.db
ENV LANCEDB_PATH=./.data/search

RUN adduser -D -H -h /app www

# Setup course database
RUN mkdir -p /app/.data
COPY --from=build /app/src/db/empty.db /app/.data/course.db
RUN chown -R www:www /app/.data

USER www
WORKDIR /app

COPY --from=build /app/.output .
COPY --from=build /app/README.md /app/README.md

# Healthcheck: verifies DB connectivity every 5 minutes, 3 retries, 10s timeout
HEALTHCHECK --interval=5m --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-3333}/health || exit 1

CMD ["node", "server/index.mjs"]
