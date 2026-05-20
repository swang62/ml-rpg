/**
 * Manual migration system for SQLite schema changes.
 *
 * sqlc generates typed queries from raw SQL but does NOT handle migrations.
 * This module tracks schema versions via a `schema_version` table and runs
 * migrations sequentially on startup.
 *
 * To add a new migration:
 * 1. Add the SQL to the `MIGRATIONS` array below with an incremented version.
 * 2. Update `base.sql` so fresh databases get the full schema.
 * 3. Run `pnpm generate:types` if you added new named queries.
 */

import type { Database } from "better-sqlite3";
import {
  ensureSchemaVersionTable,
  getCurrentSchemaVersion,
  applyMigration,
} from "~/db/base_sql";

interface Migration {
  version: number;
  description: string;
  sql: string;
}

// Ordered list of schema migrations. Each must be idempotent (use IF NOT EXISTS / IF EXISTS).
const MIGRATIONS: Migration[] = [
  // Starting point — v1 is the initial schema from base.sql.
  // Future migrations append here:
  // { version: 2, description: "add user email column", sql: `ALTER TABLE users ADD COLUMN email TEXT;` },
];

export async function runMigrations(db: Database): Promise<void> {
  // Ensure the version tracking table exists
  await ensureSchemaVersionTable(db);

  // Get current version (0 if none applied)
  const current = await getCurrentSchemaVersion(db);
  const currentVersion = current?.version ?? 0;

  // Run pending migrations in order
  for (const migration of MIGRATIONS) {
    if (migration.version <= currentVersion) continue;

    console.log(
      `[migrations] Applying v${migration.version}: ${migration.description}`,
    );

    // Execute the migration SQL in a transaction
    const runMigration = db.transaction(() => {
      db.exec(migration.sql);
      applyMigration(db, {
        version: migration.version,
        description: migration.description,
      });
    });

    runMigration();
    console.log(`[migrations] v${migration.version} applied`);
  }

  if (
    MIGRATIONS.length === 0 ||
    MIGRATIONS.every((m) => m.version <= currentVersion)
  ) {
    if (currentVersion === 0) {
      console.log(`[migrations] Schema initialized at version 0`);
    } else {
      console.log(`[migrations] Schema up-to-date at version ${currentVersion}`);
    }
  }
}
