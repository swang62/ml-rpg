"use server";

import type { Prefix } from "~/utils/types";
import { getStorage } from "./storage";

const PREFIX: Prefix = "xp";

function lessonKey(course: string, subsection: string, lesson: string) {
  return `${course}:${subsection}:${lesson}`;
}
function sectionKey(course: string, subsection: string) {
  return `${course}:${subsection}`;
}

export async function addLessonXp(
  course: string,
  subsection: string,
  lesson: string,
  xp: number,
): Promise<void> {
  const storage = getStorage(PREFIX);
  const key = lessonKey(course, subsection, lesson);
  const exists = await storage.getItem(key);
  if (!exists) {
    await storage.setItem(key, xp);
  }
}

export async function getTotalXp(): Promise<number> {
  const storage = getStorage(PREFIX);
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
  const storage = getStorage(PREFIX);
  const keys = await storage.getKeys();
  const section = sectionKey(course, subsection);

  for (const key of keys) {
    if (key.includes(section)) {
      await storage.removeItem(key);
    }
  }
}

export async function getSectionXp(
  course?: string,
  subsection?: string,
): Promise<number> {
  if (!course || !subsection) return 0;
  const storage = getStorage(PREFIX);
  const keys = await storage.getKeys();
  const section = sectionKey(course, subsection);

  let total = 0;
  for (const key of keys) {
    if (key.includes(section)) {
      const val = await storage.getItem<number>(key);
      if (val) total += val;
    }
  }
  return total;
}
