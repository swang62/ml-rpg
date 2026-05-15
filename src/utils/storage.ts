import Database from "better-sqlite3";
import { IS_PROD } from "~/utils/constants";

const dbPath = `.data/${IS_PROD ? "prod" : "dev"}.db`;
let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(dbPath);
    _db.pragma("journal_mode = WAL");
  }
  return _db;
}
