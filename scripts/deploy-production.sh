#!/bin/bash
set -euo pipefail

echo "==> Building Worker bundle..."
pnpm build

echo "==> Rebuilding D1 seed data..."
pnpm generate

echo "==> Seeding production D1 (migrations + content)..."
pnpm seed:production

echo "==> Deploying Worker to production..."
wrangler deploy --env production

echo "==> Smoke test..."
curl -sf -o /dev/null https://ml-rpg.stevewang.dev/ && echo "OK: Worker responds" || echo "WARN: Worker not reachable yet (DNS may need setup)"
curl -sf -o /dev/null https://rag.stevewang.dev/health && echo "OK: rag_api healthy" || echo "WARN: rag_api not reachable"

echo ""
echo "Production: https://ml-rpg.stevewang.dev"
