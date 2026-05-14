import type { Course } from "~/data/types";
import { getReadLessons } from "~/utils/tracking";

export interface LevelDef {
  level: number;
  title: string;
  xpRequired: number;
}

export const LEVELS: LevelDef[] = [
  { level: 0, title: "Nobody", xpRequired: 0 },
  { level: 1, title: "Villager", xpRequired: 100 },
  { level: 2, title: "Squire", xpRequired: 300 },
  { level: 3, title: "Knight", xpRequired: 600 },
  { level: 4, title: "Mage", xpRequired: 1000 },
  { level: 5, title: "Captain", xpRequired: 1500 },
  { level: 6, title: "Champion", xpRequired: 2100 },
  { level: 7, title: "Legend", xpRequired: 2800 },
  { level: 8, title: "Mythic", xpRequired: 3600 },
  { level: 9, title: "Godlike", xpRequired: 4500 },
];

export function getLevel(xp: number): LevelDef {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.xpRequired) {
      current = lvl;
    } else {
      break;
    }
  }
  return current;
}

export function xpToNextLevel(xp: number): {
  currentXp: number;
  xpNeeded: number;
  pct: number;
} {
  const currentLevel = getLevel(xp);
  const nextIdx = currentLevel.level + 1;
  if (nextIdx >= LEVELS.length) {
    return { currentXp: xp, xpNeeded: 0, pct: 100 };
  }
  const nextLevel = LEVELS[nextIdx];
  const xpIntoLevel = xp - currentLevel.xpRequired;
  const xpForNext = nextLevel.xpRequired - currentLevel.xpRequired;
  const pct = Math.round((xpIntoLevel / xpForNext) * 100);
  return { currentXp: xpIntoLevel, xpNeeded: xpForNext, pct };
}

export async function calculateTotalXp(courses: Course[]): Promise<number> {
  let totalXp = 0;

  for (const course of courses) {
    for (const category of course.categories) {
      for (const subsection of category.subsections) {
        const readLessons = await getReadLessons(
          course.title,
          subsection.subsection,
        );
        const readSet = new Set(readLessons);

        for (const lesson of subsection.lessons) {
          if (readSet.has(lesson.lesson)) {
            totalXp += lesson.order * 25;
          }
        }
      }
    }
  }

  return totalXp;
}
