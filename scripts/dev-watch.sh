#!/bin/bash
# Development loop with auto-rebuild on source changes.
#
# Watches src/ for .ts/.tsx changes, rebuilds, and restarts wrangler dev.
# HMR is not available — this provides the closest working edit loop.
#
# Usage:
#   pnpm dev:watch

set -euo pipefail

cleanup() {
  echo ""
  echo "Stopping dev-watch..."
  kill "$PID_WRANGLER" 2>/dev/null || true
  wait "$PID_WRANGLER" 2>/dev/null || true
  exit 0
}
trap cleanup EXIT INT TERM

echo "==> Initial build..."
pnpm generate
pnpm seed:local
pnpm build

echo "==> Starting wrangler dev on port 3333..."
npx wrangler dev --local --port 3333 &
PID_WRANGLER=$!

echo "==> Watching src/ for changes (polling every 3s)..."
echo "NOTE: HMR is not available. Rebuild ~10s on each change."

while true; do
  sleep 3

  changed=$(find src/ \( -name "*.ts" -o -name "*.tsx" \) -newer .output/server/index.mjs -print -quit 2>/dev/null || true)

  if [ -n "$changed" ]; then
    echo "Change detected: $changed"
    echo "Rebuilding..."
    kill "$PID_WRANGLER" 2>/dev/null || true
    wait "$PID_WRANGLER" 2>/dev/null || true

    pnpm build

    echo "Restarting wrangler dev..."
    npx wrangler dev --local --port 3333 &
    PID_WRANGLER=$!
  fi
done
