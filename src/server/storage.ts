import { copyFileSync, existsSync, unlinkSync } from "node:fs";
import Database from "better-sqlite3";
import { runMigrations } from "~/server/migrations";
import { EMPTY_DB_PATH } from "~/utils/constants";
import { getEnv } from "~/utils/env";
import { ensureVectorStore } from "./search";

const env = getEnv();

let _db: Database.Database | null = null;
let _migrationsRun: boolean;

const COURSE_TABLES = ["course", "category", "section", "lesson"] as const;

function ensureCourseDb(): void {
  if (!existsSync(env.COURSE_DB_PATH)) {
    if (existsSync(EMPTY_DB_PATH)) {
      copyFileSync(EMPTY_DB_PATH, env.COURSE_DB_PATH);
      console.log(`[storage] Initialized ${env.COURSE_DB_PATH}`);
    } else {
      throw new Error(
        `[storage] Neither ${env.COURSE_DB_PATH} nor ${EMPTY_DB_PATH} found, critical error`,
      );
    }
    return;
  }

  // Course DB exists: sync course tables from fresh empty.db, preserve users + progress
  if (!existsSync(EMPTY_DB_PATH)) return;

  const fresh = new Database(EMPTY_DB_PATH, { readonly: true });
  try {
    const existing = new Database(env.COURSE_DB_PATH);
    try {
      existing.exec("PRAGMA foreign_keys = OFF");

      // Check if course tables in existing DB need updating (compare last-modified)
      // by checking if lesson count differs between fresh and existing
      const freshLessonCount = (
        fresh.prepare("SELECT COUNT(*) AS c FROM lesson").get() as { c: number }
      ).c;
      const existingLessonCount = (
        existing.prepare("SELECT COUNT(*) AS c FROM lesson").get() as {
          c: number;
        }
      ).c;

      if (freshLessonCount !== existingLessonCount) {
        console.log(
          `[storage] Syncing course tables (${freshLessonCount} lessons vs ${existingLessonCount})...`,
        );

        existing.exec("PRAGMA foreign_keys = OFF");

        // Sync schemas first: add any columns present in fresh but missing in existing
        for (const table of COURSE_TABLES) {
          const freshCols = fresh
            .prepare(`PRAGMA table_info(${table})`)
            .all() as {
            name: string;
            type: string;
            notnull: number;
            dflt_value: string | null;
          }[];
          const existingCols = existing
            .prepare(`PRAGMA table_info(${table})`)
            .all() as { name: string }[];
          const existingNames = new Set(existingCols.map((c) => c.name));

          for (const col of freshCols) {
            if (existingNames.has(col.name)) continue;
            const def =
              col.dflt_value !== null ? ` DEFAULT ${col.dflt_value}` : "";
            const nn = col.notnull ? " NOT NULL" : "";
            existing.exec(
              `ALTER TABLE ${table} ADD COLUMN ${col.name} ${col.type}${nn}${def}`,
            );
            console.log(`[storage] Added column ${table}.${col.name}`);
          }
        }

        // Replace course content rows using INSERT OR REPLACE with same IDs.
        // Lesson IDs are deterministic across seeds, so progress FK refs stay valid.
        for (const table of COURSE_TABLES) {
          const rows = fresh.prepare(`SELECT * FROM ${table}`).all() as Record<
            string,
            unknown
          >[];
          if (rows.length === 0) continue;

          const columns = Object.keys(rows[0]);
          const placeholders = columns.map(() => "?").join(", ");
          const colList = columns.join(", ");
          const upsert = existing.prepare(
            `INSERT OR REPLACE INTO ${table} (${colList}) VALUES (${placeholders})`,
          );

          for (const row of rows) {
            upsert.run(...columns.map((c) => row[c]));
          }
        }

        existing.exec("PRAGMA foreign_keys = ON");
        console.log(`[storage] Synced course content, progress preserved`);
      }
    } finally {
      existing.close();
    }
  } finally {
    fresh.close();
  }
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
  // (only needed for users/progress table changes now)
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
