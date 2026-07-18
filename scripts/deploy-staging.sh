#!/bin/bash
set -euo pipefail

echo "==> Building Worker bundle..."
pnpm build

echo "==> Rebuilding D1 seed data..."
pnpm generate

echo "==> Seeding staging D1 (migrations + content)..."
pnpm seed:staging

echo "==> Deploying Worker to staging..."
wrangler deploy --env staging

echo "==> Smoke test..."
curl -sf -o /dev/null https://dev-ml-rpg.stevewang.dev/ && echo "OK: Worker responds" || echo "WARN: Worker not reachable yet (DNS may need setup)"
curl -sf -o /dev/null https://dev-rag.stevewang.dev/health && echo "OK: rag_api healthy" || echo "WARN: rag_api not reachable"

echo ""
echo "Staging: https://dev-ml-rpg.stevewang.dev"
