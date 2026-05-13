import { createEffect, createSignal, onCleanup } from "solid-js";
import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";
import type { Category, Subsection } from "~/data/types";
import { POLL_INTERVAL } from "./constants";

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

/**
 * For each category, check whether every subsection's lessons are all read.
 * Returns a map keyed by category slug, value is boolean[] (one per subsection).
 */
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

/**
 * For each subsection in a category, count how many lessons are read.
 * Returns a map keyed by subsection slug, value is the count of read lessons.
 */
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

/**
 * Reactive hook that polls IndexedDB to detect when a lesson is marked as read.
 * Returns a signal that flips to `true` once the lesson is read and stays true.
 * Re-initializes whenever the lesson key changes.
 */
export function useLessonReadStatus(
  course?: string,
  subsection?: string,
  getLesson?: () => string | undefined,
) {
  const [isRead, setIsRead] = createSignal(false);

  createEffect(() => {
    if (!course || !subsection) return;
    const lesson = getLesson?.();
    if (!lesson) return;

    setIsRead(false);
    let cancelled = false;

    const check = async () => {
      if (cancelled) return;
      const read = await isLessonRead(course, subsection, lesson);
      if (!cancelled && read) {
        setIsRead(true);
        clearInterval(timer);
      }
    };

    check();
    const timer = setInterval(check, POLL_INTERVAL);

    onCleanup(() => {
      cancelled = true;
      clearInterval(timer);
    });
  });

  return isRead;
}
