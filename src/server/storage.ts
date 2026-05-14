"use server";

import { resolve } from "node:path";
import { createStorage, prefixStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

export type Prefix = "xp" | "tracking";

const isProd = process.env.NODE_ENV === "production";

let _storage: ReturnType<typeof createStorage> | null = null;

export function getStorage(namespace: Prefix) {
  if (!_storage) {
    _storage = createStorage({
      driver: fsDriver({
        base: resolve(`.data/${isProd ? "prod" : "dev"}`),
      }),
    });
  }
  return prefixStorage(_storage, namespace);
}
