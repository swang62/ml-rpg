import Database from "better-sqlite3";
import { ensureCourseDb } from "~/server/startup";
import { COURSE_DB_PATH } from "~/utils/constants";

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    ensureCourseDb();
    _db = new Database(COURSE_DB_PATH);
    _db.pragma("journal_mode = WAL");
  }
  return _db;
}
