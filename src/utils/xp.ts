import { LEVELS, type LevelDef } from "./constants";

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
