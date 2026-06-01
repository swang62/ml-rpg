import { copyFileSync, existsSync, unlinkSync } from "node:fs";
import Database from "better-sqlite3";
import { runMigrations } from "~/server/migrations";
import { EMPTY_DB_PATH } from "~/utils/constants";
import { getEnv } from "~/utils/env";
import { ensureVectorStore } from "./search";

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
  "use server";

  if (!_db) {
    ensureCourseDb();

    _db = new Database(env.COURSE_DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");

    ensureVectorStore();
  }

  // Run pending schema migrations on first access (idempotent)
  if (!_migrationsRun) {
    runMigrations(_db);
    _migrationsRun = true;
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
      // Final WAL checkpoint to ensure durability.
      // Returns { busy, log, checkpointed } — if busy > 0 some pages couldn't
      // be checkpointed (unlikely with single connection, but worth noting).
      const result = _db.pragma("wal_checkpoint(TRUNCATE)", {
        simple: false,
      }) as { busy: number; log: number; checkpointed: number }[];
      if (result[0]?.busy) {
        console.warn(
          `[storage] WAL checkpoint busy (${result[0].busy} pages), proceeding with close`,
        );
      }
      _db.close();

      // SQLite may leave behind zero-byte WAL and SHM files after close,
      // especially on fast shutdowns. Clean them up explicitly.
      const walPath = `${env.COURSE_DB_PATH}-wal`;
      const shmPath = `${env.COURSE_DB_PATH}-shm`;
      try {
        unlinkSync(walPath);
      } catch {
        // File may already be gone — that's fine
      }
      try {
        unlinkSync(shmPath);
      } catch {
        // File may already be gone — that's fine
      }
    } catch (error) {
      console.error("[storage] Error closing database:", error);
    }
    _db = null;
    _migrationsRun = false;
    console.log("[storage] Database connection closed");
  }
}
