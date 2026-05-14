FROM node:26-alpine AS build

ARG CI=true
WORKDIR /app

RUN npm install --global corepack@latest
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:26-alpine

ENV NODE_ENV=production
EXPOSE 3000

RUN adduser -D -H -h /app www

# Create production data directories writable by www user
RUN mkdir -p /app/.data/xp/prod /app/.data/tracking/prod && \
    chown -R www:www /app/.data

USER www
WORKDIR /app

COPY --from=build /app/.output .

CMD ["node", "server/index.mjs"]
