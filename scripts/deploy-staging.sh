#!/bin/bash
set -euo pipefail

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

echo "==> Building Worker bundle..."
pnpm build

echo "==> Deploying Worker to staging..."
retry wrangler deploy --env staging </dev/null

sleep 20

echo "==> Smoke test..."
curl -sf -o /dev/null https://dev-ml-rpg.stevewang.dev/ && echo "OK: Worker responds" || echo "WARN: Worker not reachable yet (DNS may need setup)"
curl -sf -o /dev/null https://dev-rag.stevewang.dev/health && echo "OK: rag_api healthy" || echo "WARN: rag_api not reachable"

echo ""
echo "Staging: https://dev-ml-rpg.stevewang.dev"
