import { copyFileSync, existsSync, unlinkSync } from "node:fs";
import Database from "better-sqlite3";
import {
  getCategorySyncRows,
  getCourseSyncRows,
  getLessonSyncRows,
  getSectionSyncRows,
  upsertCategory,
  upsertCourse,
  upsertLesson,
  upsertSection,
} from "~/db/sync_sql";
import { runMigrations } from "~/server/migrations";
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

async function syncCourseContent(): Promise<void> {
  if (!existsSync(EMPTY_DB_PATH) || !_db) return;

  const fresh = new Database(EMPTY_DB_PATH, { readonly: true });
  try {
    const freshCount = (
      fresh.prepare("SELECT COUNT(*) AS c FROM lesson").get() as { c: number }
    ).c;
    const existingCount = (
      _db.prepare("SELECT COUNT(*) AS c FROM lesson").get() as { c: number }
    ).c;

    if (freshCount === existingCount) {
      // Column might not exist pre-V2 — safe check
      try {
        const row = _db
          .prepare(
            "SELECT COUNT(*) AS c FROM lesson WHERE keywords IS NOT NULL AND keywords != '[]'",
          )
          .get() as { c: number } | undefined;
        if (row && row.c > 0) return;
      } catch {
        return;
      }
    }

    console.log(`[storage] Syncing ${freshCount} lessons from source db...`);

    try {
      // First attempt: upsert using ON CONFLICT(id). This works when the
      // production DB is clean. If constraints are violated (e.g. messy
      // production data with conflicting slugs), we fall back to a full
      // delete-and-reinsert of all content rows (preserving user/progress).
      for (const row of await getCourseSyncRows(fresh))
        await upsertCourse(_db, row);
      for (const row of await getCategorySyncRows(fresh))
        await upsertCategory(_db, {
          id: row.id,
          slug: row.slug,
          title: row.title,
          courseId: row.courseid,
        });
      for (const row of await getSectionSyncRows(fresh))
        await upsertSection(_db, {
          id: row.id,
          slug: row.slug,
          title: row.title,
          courseId: row.courseid,
          categoryId: row.categoryid,
        });
      for (const row of await getLessonSyncRows(fresh))
        await upsertLesson(_db, {
          id: row.id,
          slug: row.slug,
          title: row.title,
          html: row.html,
          lessonOrder: row.lessonorder,
          courseId: row.courseid,
          categoryId: row.categoryid,
          sectionId: row.sectionid,
          keywords: row.keywords,
        });
    } catch (err) {
      const error = err as Error;
      if (error.message.includes("failed")) {
        console.log(
          "[storage] Constraint violation during upsert, falling back to full content refresh...",
        );
        _db.pragma("foreign_keys = OFF");
        _db.exec("DELETE FROM lesson");
        _db.exec("DELETE FROM section");
        _db.exec("DELETE FROM category");
        _db.exec("DELETE FROM course");
        _db.pragma("foreign_keys = ON");

        // Tables are empty now — plain INSERT works, upsert functions are fine too
        for (const row of await getCourseSyncRows(fresh))
          await upsertCourse(_db, row);
        for (const row of await getCategorySyncRows(fresh))
          await upsertCategory(_db, {
            id: row.id,
            slug: row.slug,
            title: row.title,
            courseId: row.courseid,
          });
        for (const row of await getSectionSyncRows(fresh))
          await upsertSection(_db, {
            id: row.id,
            slug: row.slug,
            title: row.title,
            courseId: row.courseid,
            categoryId: row.categoryid,
          });
        for (const row of await getLessonSyncRows(fresh))
          await upsertLesson(_db, {
            id: row.id,
            slug: row.slug,
            title: row.title,
            html: row.html,
            lessonOrder: row.lessonorder,
            courseId: row.courseid,
            categoryId: row.categoryid,
            sectionId: row.sectionid,
            keywords: row.keywords,
          });

        // Reset autoincrement sequences so future inserts start fresh
        try {
          _db.exec(
            "DELETE FROM sqlite_sequence WHERE name IN ('lesson', 'section', 'category', 'course')",
          );
        } catch {
          // sqlite_sequence may not exist on first insert — fine
        }

        console.log("[storage] Full content refresh complete");
      } else {
        throw err;
      }
    }

    // No vector store teardown needed — rag_api owns the LanceDB lifecycle
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

    if (!_migrationsRun) {
      runMigrations(_db);
      _migrationsRun = true;
    }

    syncCourseContent();
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
