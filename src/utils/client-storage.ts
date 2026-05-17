import { XP_VALUE } from "~/utils/constants";

const BASE = "sf:";
const VERSION_KEY = `${BASE}version`;
const DISPLAY_NAME_KEY = `${BASE}anon:displayName`;

export function getAnonDisplayName(): string {
  return localStorage.getItem(DISPLAY_NAME_KEY) ?? "Anon";
}

export function setAnonDisplayName(name: string): void {
  localStorage.setItem(DISPLAY_NAME_KEY, name);
}

export function bumpVersion(): void {
  localStorage.setItem(VERSION_KEY, Date.now().toString());
}

export function getVersion(): number {
  return Number(localStorage.getItem(VERSION_KEY)) || 0;
}

function readKey(
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
  localStorage.setItem(
    readKey(course, category, section, lesson),
    String(lessonOrder),
  );
  bumpVersion();
}

export function isAnonLessonRead(
  course: string,
  category: string,
  section: string,
  lesson: string,
): boolean {
  return (
    localStorage.getItem(readKey(course, category, section, lesson)) !== null
  );
}

export function getAnonSectionReadSlugs(
  course: string,
  subsection: string,
): string[] {
  const prefix = `${BASE}read:${course}:`;
  const slugs: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;
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
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;
    const parts = key.slice(prefix.length).split(":");
    result[parts[1]] = (result[parts[1]] ?? 0) + 1;
  }
  return result;
}

export function resetAnonSection(course: string, subsection: string): void {
  const prefix = `${BASE}read:${course}:`;
  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;
    const parts = key.slice(prefix.length).split(":");
    if (parts[1] === subsection) {
      toRemove.push(key);
    }
  }
  for (const key of toRemove) localStorage.removeItem(key);
  bumpVersion();
}

export function getAnonTotalXp(): { count: number; percent: number } {
  const prefix = `${BASE}read:`;
  let sum = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(prefix)) continue;
    const value = localStorage.getItem(key);
    const num = Number(value);
    if (!Number.isNaN(num)) {
      sum += num;
    }
  }
  return { count: sum * XP_VALUE, percent: 0 };
}
