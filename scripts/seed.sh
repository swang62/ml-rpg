#!/bin/bash
# Seed the D1 database. Usage: ./seed.sh {local|staging|production}
# Always produces a clean state: wipes content tables, then re-inserts.
# User progress is backed up by slug path before wiping and restored after reseeding.
# Lessons that no longer exist between seed runs are silently dropped.

set -euo pipefail

ENV="${1:-local}"
if [[ "$ENV" != "local" && "$ENV" != "staging" && "$ENV" != "production" ]]; then
  echo "Usage: $0 {local|staging|production}"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

retry() {
  local max_attempts=3 delay=5 attempt=1
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
  echo "==> Backing up progress and wiping data..."
  npx wrangler d1 execute D1_CONTENT --local --file="$SCRIPT_DIR/backup-and-wipe-content.sql"

  echo ""
  echo "==> Seeding..."
  for f in .data/d1-seed-*.sql; do
    npx wrangler d1 execute D1_CONTENT --local --file="$f"
  done

  echo ""
  echo "==> Restoring progress..."
  npx wrangler d1 execute D1_CONTENT --local --file="$SCRIPT_DIR/restore-progress.sql"
else
  echo ""
  echo "==> Applying D1 migrations to $ENV..."
  retry npx wrangler d1 migrations apply D1_CONTENT --remote --env "$ENV" </dev/null

  echo ""
  echo "==> Backing up progress and wiping data..."
  retry npx wrangler d1 execute D1_CONTENT --remote --env "$ENV" --file="$SCRIPT_DIR/backup-and-wipe-content.sql" </dev/null

  echo ""
  echo "==> Seeding..."
  for f in .data/d1-seed-*.sql; do
    echo "  Uploading $f..."
    retry npx wrangler d1 execute D1_CONTENT --remote --env "$ENV" --file="$f" </dev/null
    sleep 3
  done

  echo ""
  echo "==> Restoring progress..."
  retry npx wrangler d1 execute D1_CONTENT --remote --env "$ENV" --file="$SCRIPT_DIR/restore-progress.sql" </dev/null
fi

echo ""
echo "Done. $ENV D1 database initialized."
