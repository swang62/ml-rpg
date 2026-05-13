import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";

let _storage: ReturnType<typeof createStorage> | null = null;

function getStorage() {
  if (typeof window === "undefined") return null;
  if (!_storage) {
    _storage = createStorage({
      driver: indexedDbDriver({ base: "so:" }),
    });
  }
  return _storage;
}

function sectionKey(course: string, subsection: string) {
  return `read:${course}:${subsection}`;
}

/** Get all read lesson slugs for a given section. Returns an empty array if none. */
export async function getReadLessons(
  course?: string,
  subsection?: string,
): Promise<string[]> {
  if (!course || !subsection) return [];
  const storage = getStorage();
  if (!storage) return [];
  const key = sectionKey(course, subsection);
  return (await storage.getItem<string[]>(key)) ?? [];
}

/** Check if a specific lesson has been marked as read. */
export async function isLessonRead(
  course?: string,
  subsection?: string,
  lesson?: string,
): Promise<boolean> {
  if (!course || !subsection || !lesson) return false;
  const lessons = await getReadLessons(course, subsection);
  return lessons.includes(lesson);
}

/** Mark a lesson as read. Idempotent — won't add duplicates. */
export async function markLessonRead(
  course: string,
  subsection: string,
  lesson: string,
): Promise<void> {
  const storage = getStorage();
  if (!storage) return;
  const key = sectionKey(course, subsection);
  const lessons = (await storage.getItem<string[]>(key)) ?? [];
  if (!lessons.includes(lesson)) {
    lessons.push(lesson);
    await storage.setItem(key, lessons);
  }
}

/** Reset all read progress for a single section. */
export async function resetSection(
  course?: string,
  subsection?: string,
): Promise<void> {
  const storage = getStorage();
  if (!storage || !course || !subsection) return;
  const key = sectionKey(course, subsection);
  await storage.removeItem(key);
}
