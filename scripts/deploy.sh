#!/bin/bash
set -euo pipefail

ENV="${1:-}"
if [[ "$ENV" != "staging" && "$ENV" != "production" ]]; then
  echo "Usage: $0 {staging|production}" >&2
  exit 1
fi

retry() {
  local max_attempts=3 delay=10 attempt=1
  while true; do
    if "$@"; then
      return 0
    fi
    if [[ $attempt -ge $max_attempts ]]; then
      echo "  FAILED after $max_attempts attempts: $*" >&2
      return 1
    fi
    echo "  Attempt $attempt failed. Retrying in ${delay}s..." >&2
    sleep "$delay"
    ((attempt++))
  done
}

if [[ "$ENV" == "staging" ]]; then
  SITE_URL="https://dev-ml-rpg.stevewang.dev"
  RAG_URL="https://dev-rag.stevewang.dev"
else
  SITE_URL="https://ml-rpg.stevewang.dev"
  RAG_URL="https://rag.stevewang.dev"
fi

echo "==> Building Worker bundle..."
pnpm build

echo "==> Applying D1 migrations to $ENV..."
retry npx wrangler d1 migrations apply D1_CONTENT --remote --env "$ENV" </dev/null

echo "==> Deploying main Worker to $ENV..."
retry wrangler deploy --env "$ENV" </dev/null

echo "==> Deploying cron Worker to $ENV..."
retry wrangler deploy --config cron/wrangler.jsonc --env "$ENV" </dev/null

sleep 20

echo "==> Smoke test..."
curl -sf -o /dev/null "$SITE_URL/" && echo "OK: Worker responds" || echo "WARN: Worker not reachable yet (DNS may need setup)"
curl -sf -o /dev/null "$RAG_URL/health" && echo "OK: rag_api healthy" || echo "WARN: rag_api not reachable"

echo ""
echo "${ENV^}: $SITE_URL"
