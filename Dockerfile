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

ENV HOST=0.0.0.0
ENV PORT=$PORT
ENV COURSE_DB_PATH=/app/.data/course.db
ENV LANCEDB_PATH=/app/.data/search
EXPOSE $PORT

RUN adduser -D -H -h /app www

# Seed empty DB and expose LanceDB directory
RUN mkdir -p /app/.data
COPY --from=build /app/src/db/empty.db /app/.data/course.db
RUN chown -R www:www /app/.data

USER www
WORKDIR /app

COPY --from=build /app/.output .

CMD ["node", "server/index.mjs"]
