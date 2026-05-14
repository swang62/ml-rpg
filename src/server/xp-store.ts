"use server";

import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import { dataDir } from "~/server/data-path";

let _xpStorage: ReturnType<typeof createStorage> | null = null;

function getStorage() {
  if (!_xpStorage) {
    _xpStorage = createStorage({
      driver: fsDriver({ base: dataDir("xp") }),
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

export async function removeSectionXp(
  course?: string,
  subsection?: string,
): Promise<void> {
  if (!course || !subsection) return;
  const storage = getStorage();
  const keys = await storage.getKeys();
  const prefix = `${course}:${subsection}:`;
  for (const key of keys) {
    if (key.startsWith(prefix)) {
      await storage.removeItem(key);
    }
  }
}

export async function getSectionXp(
  course?: string,
  subsection?: string,
): Promise<number> {
  if (!course || !subsection) return 0;
  const storage = getStorage();
  const keys = await storage.getKeys();
  let total = 0;
  for (const key of keys) {
    if (key.startsWith(`${course}:${subsection}:`)) {
      const val = await storage.getItem<number>(key);
      if (val) total += val;
    }
  }
  return total;
}
