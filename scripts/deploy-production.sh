#!/bin/bash
set -euo pipefail

echo "==> Building Worker bundle..."
pnpm build

echo "==> Deploying Worker to production..."
wrangler deploy --env production </dev/null

sleep 20

echo "==> Smoke test..."
curl -sf -o /dev/null https://ml-rpg.stevewang.dev/ && echo "OK: Worker responds" || echo "WARN: Worker not reachable yet (DNS may need setup)"
curl -sf -o /dev/null https://rag.stevewang.dev/health && echo "OK: rag_api healthy" || echo "WARN: rag_api not reachable"

echo ""
echo "Production: https://ml-rpg.stevewang.dev"
