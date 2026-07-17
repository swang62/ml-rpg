import { existsSync } from "node:fs";
import Database from "better-sqlite3";
import cron from "node-cron";
import { deleteStaleUsers } from "~/db/users_sql";
import { SESSION_TIMEOUT_DAYS } from "~/utils/constants";
import { getEnv } from "~/utils/env";

console.log("[cleanup] Registered daily stale user sweep");

// Guard: prevent double registration on HMR reloads
const g = globalThis as { __sweepStarted?: boolean };
if (!g.__sweepStarted) {
  g.__sweepStarted = true;

  cron.schedule("0 0 * * *", () => {
    const env = getEnv();
    if (!existsSync(env.COURSE_DB_PATH)) return;

    let db: Database.Database | null = null;
    try {
      db = new Database(env.COURSE_DB_PATH);
      db.pragma("journal_mode = WAL");
      db.pragma("foreign_keys = ON");

      const staleUserCutoff = new Date(
        Date.now() - SESSION_TIMEOUT_DAYS * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      deleteStaleUsers(db, { lastVisitedAt: staleUserCutoff });
    } catch (error) {
      console.error("[cleanup] Failed to sweep stale users:", error);
    } finally {
      db?.close();
    }
  });
}
