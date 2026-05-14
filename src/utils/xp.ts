export interface LevelDef {
  level: number;
  title: string;
  xpRequired: number;
}

/**
 * 20 levels with quadratically increasing XP thresholds.
 * Level 20 requires 60,000 XP (69% of ~87,000 total available XP).
 */
export const LEVELS: LevelDef[] = [
  { level: 0, title: "Novice", xpRequired: 0 },
  { level: 1, title: "Villager", xpRequired: 200 },
  { level: 2, title: "Squire", xpRequired: 500 },
  { level: 3, title: "Knight", xpRequired: 1000 },
  { level: 4, title: "Mage", xpRequired: 2000 },
  { level: 5, title: "Captain", xpRequired: 3500 },
  { level: 6, title: "Champion", xpRequired: 5500 },
  { level: 7, title: "Legend", xpRequired: 8000 },
  { level: 8, title: "Mythic", xpRequired: 11000 },
  { level: 9, title: "Sage", xpRequired: 14000 },
  { level: 10, title: "Hero", xpRequired: 18000 },
  { level: 11, title: "Paladin", xpRequired: 22000 },
  { level: 12, title: "Warden", xpRequired: 26000 },
  { level: 13, title: "Overlord", xpRequired: 30000 },
  { level: 14, title: "Titan", xpRequired: 34000 },
  { level: 15, title: "Elder", xpRequired: 38000 },
  { level: 16, title: "Guardian", xpRequired: 42000 },
  { level: 17, title: "Celestial", xpRequired: 46000 },
  { level: 18, title: "Divine", xpRequired: 50000 },
  { level: 19, title: "Transcendent", xpRequired: 55000 },
  { level: 20, title: "Eternal", xpRequired: 60000 },
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
