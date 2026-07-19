#!/bin/bash
# Seed the production/remote D1 database with content schema and data.
# Wipes content tables first (never users/progress), then re-inserts.
#
# Prerequisites:
#   1. A remote D1 database must exist and be wired into wrangler.jsonc
#      under env.production.d1_databases with binding D1_CONTENT.
#   2. You must be logged in to Cloudflare:
#        wrangler login

set -euo pipefail

echo "==> Generating lessons.db from raw scraped data..."
npx tsx scripts/generate-db-data.ts

echo ""
echo "==> Generating D1 seed SQL from lessons.db..."
npx tsx scripts/convert-db-to-sql.ts

echo ""
echo "==> Applying D1 migrations to production..."
npx wrangler d1 migrations apply D1_CONTENT --remote --env production </dev/null

echo ""
echo "==> Wiping data..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
npx wrangler d1 execute D1_CONTENT --remote --env production --file="$SCRIPT_DIR/wipe-content.sql" </dev/null

echo ""
echo "==> Seeding..."
for f in .data/d1-seed-*.sql; do
  for attempt in 1 2 3; do
    echo "  Uploading $f (attempt $attempt)..."
    if npx wrangler d1 execute D1_CONTENT --remote --env production --file="$f" </dev/null; then
      break
    fi
    echo "  Failed. Retrying..."
    sleep 3
  done || exit 1
  sleep 3
done

echo ""
echo "Done. Production D1 database initialized."
