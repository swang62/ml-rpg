import { copyFileSync, existsSync } from "node:fs";
import Database from "better-sqlite3";
import { runMigrations } from "~/middleware/migrations";
import { COURSE_DB_PATH, EMPTY_DB_PATH } from "~/utils/constants";

let _db: Database.Database | null = null;
let _migrationsRun: boolean;

function ensureCourseDb(): void {
  if (existsSync(COURSE_DB_PATH)) return;
  if (existsSync(EMPTY_DB_PATH)) {
    copyFileSync(EMPTY_DB_PATH, COURSE_DB_PATH);
    console.log(`[storage] Initialized ${COURSE_DB_PATH}`);
    return;
  }
  throw new Error(
    `[storage] Neither ${COURSE_DB_PATH} nor ${EMPTY_DB_PATH} found, critical error`,
  );
}

export function getDb(): Database.Database {
  if (!_db) {
    ensureCourseDb();
    _db = new Database(COURSE_DB_PATH);
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
