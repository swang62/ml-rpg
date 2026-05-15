"use server";

import { createDatabase } from "db0";
import sqlite from "db0/connectors/better-sqlite3";
import { createStorage, prefixStorage, type Storage } from "unstorage";
import dbDriver from "unstorage/drivers/db0";
import { IS_PROD } from "~/utils/constants";
import type { Prefix } from "~/utils/types";

// Singletons
let _storage: Storage | null = null;
const _prefixStorage: Record<Prefix, Storage | null> = {
  xp: null,
  tracking: null,
};

export function getStorage(namespace: Prefix) {
  if (!_storage) {
    const dbName = IS_PROD ? "prod.db" : "dev.db";
    const database = createDatabase(sqlite({ path: `.data/${dbName}` }));
    _storage = createStorage({
      driver: dbDriver({ database }),
    });
  }
  if (!_prefixStorage[namespace]) {
    _prefixStorage[namespace] = prefixStorage(_storage, namespace);
  }

  return _prefixStorage[namespace];
}
