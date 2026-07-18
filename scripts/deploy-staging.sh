#!/bin/bash
set -euo pipefail

echo "==> Rebuilding D1 seed data + search index..."
pnpm generate

echo "==> Building Worker bundle..."
pnpm build

echo "==> Seeding staging D1 (migrations + content)..."
pnpm seed:staging

echo "==> Deploying Worker to staging..."
CI=1 wrangler deploy --env staging

echo "==> Smoke test..."
curl -sf -o /dev/null https://dev-ml-rpg.stevewang.dev/ && echo "OK: Worker responds" || echo "WARN: Worker not reachable yet (DNS may need setup)"
curl -sf -o /dev/null https://dev-rag.stevewang.dev/health && echo "OK: rag_api healthy" || echo "WARN: rag_api not reachable"

echo ""
echo "Staging: https://dev-ml-rpg.stevewang.dev"
