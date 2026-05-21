import { copyFileSync, existsSync } from "node:fs";
import Database from "better-sqlite3";
import { runMigrations } from "~/middleware/migrations";
import { EMPTY_DB_PATH } from "~/utils/constants";
import { getEnv } from "~/utils/env";

const env = getEnv();

let _db: Database.Database | null = null;
let _migrationsRun: boolean;

function ensureCourseDb(): void {
  if (existsSync(env.COURSE_DB_PATH)) return;
  if (existsSync(EMPTY_DB_PATH)) {
    copyFileSync(EMPTY_DB_PATH, env.COURSE_DB_PATH);
    console.log(`[storage] Initialized ${env.COURSE_DB_PATH}`);
    return;
  }
  throw new Error(
    `[storage] Neither ${env.COURSE_DB_PATH} nor ${EMPTY_DB_PATH} found, critical error`,
  );
}

export function getDb(): Database.Database {
  if (!_db) {
    ensureCourseDb();
    _db = new Database(env.COURSE_DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
  }

  // Run pending schema migrations on first access (idempotent)
  if (!_migrationsRun) {
    _migrationsRun = true;
    runMigrations(_db);
  }

  return _db;
}

/**
 * Closes the database connection gracefully.
 * Used during shutdown to ensure WAL checkpoint is written.
 * Safe to call multiple times.
 */
export function closeDb(): void {
  if (_db) {
    try {
      // Final WAL checkpoint to ensure durability
      _db.pragma("wal_checkpoint(TRUNCATE)");
      _db.close();
    } catch (error) {
      console.error("[storage] Error closing database:", error);
    }
    _db = null;
    _migrationsRun = false;
    console.log("[storage] Database connection closed");
  }
}
