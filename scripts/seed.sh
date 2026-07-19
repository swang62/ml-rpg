#!/bin/bash
# Seed the D1 database. Usage: ./seed.sh {local|staging|production}
# Always produces a clean state: wipes content tables, then re-inserts.
# Never touches users/progress.

set -euo pipefail

ENV="${1:-local}"
if [[ "$ENV" != "local" && "$ENV" != "staging" && "$ENV" != "production" ]]; then
  echo "Usage: $0 {local|staging|production}"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Generating lessons.db from raw scraped data..."
npx tsx "$SCRIPT_DIR/generate-db-data.ts"

echo ""
echo "==> Converting D1 seed SQL from lessons.db..."
npx tsx "$SCRIPT_DIR/convert-db-to-sql.ts"

if [[ "$ENV" == "local" ]]; then
  echo ""
  echo "==> Applying D1 migrations..."
  npx wrangler d1 migrations apply D1_CONTENT --local

  echo ""
  echo "==> Wiping data..."
  npx wrangler d1 execute D1_CONTENT --local --file="$SCRIPT_DIR/wipe-content.sql"

  echo ""
  echo "==> Seeding..."
  for f in .data/d1-seed-*.sql; do
    npx wrangler d1 execute D1_CONTENT --local --file="$f"
  done
else
  echo ""
  echo "==> Applying D1 migrations to $ENV..."
  npx wrangler d1 migrations apply D1_CONTENT --remote --env "$ENV" </dev/null

  echo ""
  echo "==> Wiping data..."
  npx wrangler d1 execute D1_CONTENT --remote --env "$ENV" --file="$SCRIPT_DIR/wipe-content.sql" </dev/null

  echo ""
  echo "==> Seeding..."
  for f in .data/d1-seed-*.sql; do
    for attempt in 1 2 3; do
      echo "  Uploading $f (attempt $attempt)..."
      if npx wrangler d1 execute D1_CONTENT --remote --env "$ENV" --file="$f" </dev/null; then
        break
      fi
      echo "  Failed. Retrying..."
      sleep 3
    done || exit 1
    sleep 3
  done
fi

echo ""
echo "Done. $ENV D1 database initialized."
