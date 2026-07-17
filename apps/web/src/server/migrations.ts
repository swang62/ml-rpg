/**
 * Manual migration system for SQLite schema changes.
 *
 * sqlc generates typed queries from raw SQL but does NOT handle migrations.
 * This module tracks schema versions via a `schema_version` table and runs
 * migrations sequentially on startup.
 *
 * To add a new migration:
 * 1. Add the migration to the `MIGRATIONS` array below with an incremented version.
 * 2. Update `base.sql` so fresh databases get the full schema.
 * 3. Run `pnpm generate:types` if you added new named queries.
 */

import type { Database } from "better-sqlite3";
import {
  applyMigration,
  ensureSchemaVersionTable,
  getCurrentSchemaVersion,
} from "~/db/base_sql";

interface Migration {
  version: number;
  description: string;
  sql: string;
}

// Ordered list of schema migrations. Each must be idempotent (use IF NOT EXISTS / IF EXISTS).
const MIGRATIONS: Migration[] = [
  {
    version: 1,
    description:
      "add last_visited_at to users, enable delete cascade on progress",
    sql: `
      DROP TABLE IF EXISTS users_new;
      CREATE TABLE users_new (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        user_password TEXT NOT NULL,
        display_name TEXT,
        last_visited_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO users_new (id, username, user_password, display_name, last_visited_at)
        SELECT id, username, user_password, display_name, datetime('now') FROM users;
      DROP TABLE users;
      ALTER TABLE users_new RENAME TO users;

      DROP TABLE IF EXISTS progress_new;
      CREATE TABLE progress_new (
        lesson_id INTEGER NOT NULL REFERENCES lesson(id),
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        read_at TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (lesson_id, user_id)
      );
      INSERT INTO progress_new (lesson_id, user_id, read_at) SELECT lesson_id, user_id, read_at FROM progress;
      DROP TABLE progress;
      ALTER TABLE progress_new RENAME TO progress;
    `,
  },
  {
    version: 2,
    description: "add keywords column to lesson for TF-IDF enrichment",
    sql: "ALTER TABLE lesson ADD COLUMN keywords TEXT NOT NULL DEFAULT '[]';",
  },
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
      `[db] Applying migrations, V${migration.version}: ${migration.description}`,
    );

    // Disable FK enforcement during schema changes per SQLite best practice.
    // Table drops/renames and constraint changes require this to avoid
    // FOREIGN KEY constraint errors during migration.
    db.exec("PRAGMA foreign_keys = OFF");

    const runMigration = db.transaction(() => {
      db.exec(migration.sql);
      applyMigration(db, {
        version: migration.version,
        description: migration.description,
      });
    });

    try {
      runMigration();
    } catch (err) {
      // Re-enable FK enforcement before deciding how to handle the error
      db.exec("PRAGMA foreign_keys = ON");

      if (
        err instanceof Object &&
        "code" in (err as object) &&
        (err as { code: string }).code === "SQLITE_ERROR" &&
        (err as { message: string }).message?.includes("duplicate column name")
      ) {
        console.log(
          `[db] V${migration.version}: column already exists, skipping`,
        );
        // Record the migration version since the schema is already up-to-date
        applyMigration(db, {
          version: migration.version,
          description: migration.description,
        });
        continue;
      }

      throw err;
    }

    db.exec("PRAGMA foreign_keys = ON");
    console.log(`[db] V${migration.version} successfully applied`);
  }

  if (
    MIGRATIONS.length === 0 ||
    MIGRATIONS.every((m) => m.version <= currentVersion)
  ) {
    if (currentVersion === 0) {
      console.log(`[db] Schema initialized V0`);
    } else {
      console.log(`[db] Schema up-to-date: V${currentVersion}`);
    }
  }
}
