"use server";

import { resolve } from "node:path";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

let _xpStorage: ReturnType<typeof createStorage> | null = null;

function getStorage() {
  if (!_xpStorage) {
    _xpStorage = createStorage({
      driver: fsDriver({ base: resolve(".data/xp") }),
    });
  }
  return _xpStorage;
}

export async function addLessonXp(
  course: string,
  subsection: string,
  lesson: string,
  xp: number,
): Promise<void> {
  const storage = getStorage();
  const key = `${course}:${subsection}:${lesson}`;
  const exists = await storage.getItem(key);
  if (!exists) {
    await storage.setItem(key, xp);
  }
}

export async function getTotalXp(): Promise<number> {
  const storage = getStorage();
  const keys = await storage.getKeys();
  let total = 0;
  for (const key of keys) {
    const val = await storage.getItem<number>(key);
    if (val) total += val;
  }
  return total;
}
