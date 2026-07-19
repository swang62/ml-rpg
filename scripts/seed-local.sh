#!/bin/bash
# Apply D1 migrations and seed data to the local D1 database.
# Always produces a clean state: wipes content tables, then re-inserts.

set -euo pipefail

echo "==> Generating lessons.db from raw scraped data..."
npx tsx scripts/generate-db-data.ts

echo ""
echo "==> Converting D1 seed SQL from lessons.db..."
npx tsx scripts/convert-db-to-sql.ts

echo ""
echo "==> Applying D1 migrations..."
npx wrangler d1 migrations apply D1_CONTENT --local

echo ""
echo "==> Wiping D1 data..."
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
npx wrangler d1 execute D1_CONTENT --local --file="$SCRIPT_DIR/wipe-content.sql"

echo ""
echo "==> Seeding D1 data..."
for f in .data/d1-seed-*.sql; do
  npx wrangler d1 execute D1_CONTENT --local --file="$f"
done

echo ""
echo "Done. Local D1 database initialized."
