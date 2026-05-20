FROM node:26-alpine AS build

ARG CI=true
WORKDIR /app

RUN npm install --global corepack@latest && \
  corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile --store-dir /pnpm/store

COPY . .

RUN pnpm build

FROM node:26-alpine

ARG PORT=3333
EXPOSE $PORT

ENV HOST=0.0.0.0 \
  PORT=$PORT \
  COURSE_DB_PATH=/app/.data/course.db \
  LANCEDB_PATH=/app/.data/search \
  NODE_ENV=production

RUN adduser -D -H -h /app www && \
  mkdir -p /app/.data && \
  chown -R www:www /app

WORKDIR /app
USER www

COPY --from=build --chown=www:www /app/.output .
COPY --from=build --chown=www:www /app/README.md /app/README.md
COPY --from=build --chown=www:www /app/src/db/empty.db /app/src/db/empty.db

CMD ["node", "server/index.mjs"]
