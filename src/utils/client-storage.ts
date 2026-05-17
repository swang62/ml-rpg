import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { XP_VALUE } from "~/utils/constants";

const BASE = "sf:";

// Reactive version counter — all mutations bump this signal.
// Components can read version() in a createEffect/createMemo to reactively
// re-read from localStorage when anonymous data changes.
const [version, bumpVersion] = createSignal(0);

export { bumpVersion, version };

function ls(): Storage | null {
  if (isServer) return null;
  try {
    return localStorage;
  } catch {
    return null;
  }
}

function getItem(key: string): string | null {
  const storage = ls();
  return storage ? storage.getItem(key) : null;
}

function setItem(key: string, value: string): void {
  const storage = ls();
  if (storage) storage.setItem(key, value);
}

function removeItem(key: string): void {
  const storage = ls();
  if (storage) storage.removeItem(key);
}

function keys(): string[] {
  const storage = ls();
  if (!storage) return [];
  const result: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i);
    if (k) result.push(k);
  }
  return result;
}

export function getAnonDisplayName(): string {
  const key = `${BASE}anon:displayName`;
  let value = getItem(key);
  if (value === null) {
    setItem(key, "Anon");
    value = "Anon";
  }
  return value;
}

export function setAnonDisplayName(name: string): void {
  setItem(`${BASE}anon:displayName`, name);
  bumpVersion((v: number) => v + 1);
}

function makeKey(
  course: string,
  category: string,
  section: string,
  lesson: string,
): string {
  return `${BASE}read:${course}:${category}:${section}:${lesson}`;
}

export function markAnonLessonRead(
  course: string,
  category: string,
  section: string,
  lesson: string,
  lessonOrder: number,
): void {
  setItem(makeKey(course, category, section, lesson), String(lessonOrder));
  bumpVersion((v: number) => v + 1);
}

export function isAnonLessonRead(
  course: string,
  category: string,
  section: string,
  lesson: string,
): boolean {
  return getItem(makeKey(course, category, section, lesson)) !== null;
}

export function getAnonSectionReadSlugs(
  course: string,
  subsection: string,
): string[] {
  const prefix = `${BASE}read:${course}:`;
  const slugs: string[] = [];
  for (const key of keys()) {
    if (!key.startsWith(prefix)) continue;
    const parts = key.slice(prefix.length).split(":");
    if (parts[1] === subsection) {
      slugs.push(parts.slice(2).join(":"));
    }
  }
  return slugs;
}

export function getAnonCategoryReadCounts(
  course: string,
): Record<string, number> {
  const prefix = `${BASE}read:${course}:`;
  const result: Record<string, number> = {};
  for (const key of keys()) {
    if (!key.startsWith(prefix)) continue;
    const parts = key.slice(prefix.length).split(":");
    result[parts[1]] = (result[parts[1]] ?? 0) + 1;
  }
  return result;
}

export function resetAnonSection(course: string, subsection: string): void {
  const prefix = `${BASE}read:${course}:`;
  for (const key of keys()) {
    if (!key.startsWith(prefix)) continue;
    const parts = key.slice(prefix.length).split(":");
    if (parts[1] === subsection) {
      removeItem(key);
    }
  }
  bumpVersion((v: number) => v + 1);
}

export function getAnonTotalXp(): { count: number; percent: number } {
  const prefix = `${BASE}read:`;
  let sum = 0;
  for (const key of keys()) {
    if (!key.startsWith(prefix)) continue;
    const value = getItem(key);
    const num = Number(value);
    if (!Number.isNaN(num)) {
      sum += num;
    }
  }
  return { count: sum * XP_VALUE, percent: 0 };
}
