import Database from "better-sqlite3";
import { createDatabase } from "db0";
import sqlite from "db0/connectors/better-sqlite3";
import { createStorage, type Storage } from "unstorage";
import dbDriver from "unstorage/drivers/db0";
import { IS_PROD } from "~/utils/constants";

const dbName = IS_PROD ? "prod.db" : "dev.db";
const dbPath = `.data/${dbName}`;

let _db: Database.Database | null = null;
let _storage: Storage | null = null;

/** Returns the raw better-sqlite3 database instance for the new typed queries. */
export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(dbPath);
    _db.pragma("journal_mode = WAL");
  }
  return _db;
}

/** Legacy unstorage instance — kept for migration. Will be removed. */
export function getStorage() {
  if (!_storage) {
    const database = createDatabase(sqlite({ path: dbPath }));
    _storage = createStorage({
      driver: dbDriver({ database }),
    });
  }
  return _storage;
}
