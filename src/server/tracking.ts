"use server";

import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import type { Category, Subsection } from "~/data/types";
import { dataDir } from "~/server/data-path";
import { removeSectionXp } from "~/server/xp-store";

let _storage: ReturnType<typeof createStorage> | null = null;

function getStorage() {
  if (!_storage) {
    _storage = createStorage({
      driver: fsDriver({ base: dataDir("tracking") }),
    });
  }
  return _storage;
}

function sectionKey(course: string, subsection: string) {
  return `read:${course}:${subsection}`;
}

export async function getReadLessons(
  course?: string,
  subsection?: string,
): Promise<string[]> {
  if (!course || !subsection) return [];
  const storage = getStorage();
  const key = sectionKey(course, subsection);
  return (await storage.getItem<string[]>(key)) ?? [];
}

export async function isLessonRead(
  course?: string,
  subsection?: string,
  lesson?: string,
): Promise<boolean> {
  if (!course || !subsection || !lesson) return false;
  const lessons = await getReadLessons(course, subsection);
  return lessons.includes(lesson);
}

export async function markLessonRead(
  course: string,
  subsection: string,
  lesson: string,
): Promise<void> {
  const storage = getStorage();
  const key = sectionKey(course, subsection);
  const lessons = (await storage.getItem<string[]>(key)) ?? [];
  if (!lessons.includes(lesson)) {
    lessons.push(lesson);
    await storage.setItem(key, lessons);
  }
}

export async function resetSection(
  course?: string,
  subsection?: string,
): Promise<void> {
  if (!course || !subsection) return;
  const storage = getStorage();
  const key = sectionKey(course, subsection);
  await storage.removeItem(key);
  await removeSectionXp(course, subsection);
}

export async function fetchSectionReadStatus(
  course: string | undefined,
  cats: Category[],
): Promise<Map<string, boolean[]>> {
  if (!cats.length || !course) return new Map();
  const results = await Promise.all(
    cats.map(async (cat) => {
      const statuses = await Promise.all(
        cat.subsections.map(
          async (sub) =>
            (await getReadLessons(course, sub.subsection)).length >=
            sub.lessons.length,
        ),
      );
      return { category: cat.category, statuses };
    }),
  );
  return new Map(results.map((r) => [r.category, r.statuses]));
}

export async function fetchReadCounts(
  course: string | undefined,
  subs: Subsection[],
): Promise<Map<string, number>> {
  if (!subs.length || !course) return new Map();
  const results = await Promise.all(
    subs.map(async (sub) => {
      const read = await getReadLessons(course, sub.subsection);
      return { subsection: sub.subsection, read: read.length };
    }),
  );
  return new Map(results.map((r) => [r.subsection, r.read]));
}
