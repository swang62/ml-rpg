FROM node:26-alpine AS build

ARG CI=true
WORKDIR /app

RUN npm install --global corepack@latest
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM busybox:1.37-uclibc

EXPOSE 3000

RUN adduser -D -H -h /www www
USER www

COPY --from=build /app/.output/public /www

CMD ["httpd", "-f", "-p", "3000", "-h", "/www"]
