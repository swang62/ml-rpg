"use server";

import { createDatabase } from "db0";
import sqlite from "db0/connectors/better-sqlite3";
import { createStorage, prefixStorage } from "unstorage";
import dbDriver from "unstorage/drivers/db0";

export type Prefix = "xp" | "tracking";

const isProd = process.env.NODE_ENV === "production";

let _storage: ReturnType<typeof createStorage> | null = null;

export function getStorage(namespace: Prefix) {
  if (!_storage) {
    const dbName = isProd ? "prod.db" : "dev.db";
    const database = createDatabase(sqlite({ path: `.data/${dbName}` }));
    _storage = createStorage({
      driver: dbDriver({ database }),
    });
  }
  return prefixStorage(_storage, namespace);
}
