import { createDatabase } from "db0";
import sqlite from "db0/connectors/better-sqlite3";
import { createStorage, type Storage } from "unstorage";
import dbDriver from "unstorage/drivers/db0";
import { IS_PROD } from "~/utils/constants";

let _storage: Storage | null = null;

export function getStorage() {
  if (!_storage) {
    const dbName = IS_PROD ? "prod.db" : "dev.db";
    const database = createDatabase(sqlite({ path: `.data/${dbName}` }));
    _storage = createStorage({
      driver: dbDriver({ database }),
    });
  }
  return _storage;
}
