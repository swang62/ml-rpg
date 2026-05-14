export interface LevelDef {
  level: number;
  title: string;
  xpRequired: number;
}

/**
 * 20 levels with quadratically increasing XP thresholds.
 * Level 20 requires ~61,200 XP (70% of ~87,500 total available XP).
 */
export const LEVELS: LevelDef[] = [
  { level: 0, title: "Novice", xpRequired: 0 },
  { level: 1, title: "Villager", xpRequired: 150 },
  { level: 2, title: "Squire", xpRequired: 600 },
  { level: 3, title: "Knight", xpRequired: 1350 },
  { level: 4, title: "Mage", xpRequired: 2450 },
  { level: 5, title: "Captain", xpRequired: 3850 },
  { level: 6, title: "Champion", xpRequired: 5550 },
  { level: 7, title: "Legend", xpRequired: 7550 },
  { level: 8, title: "Mythic", xpRequired: 9850 },
  { level: 9, title: "Sage", xpRequired: 12450 },
  { level: 10, title: "Hero", xpRequired: 15350 },
  { level: 11, title: "Paladin", xpRequired: 18550 },
  { level: 12, title: "Warden", xpRequired: 22050 },
  { level: 13, title: "Overlord", xpRequired: 25850 },
  { level: 14, title: "Titan", xpRequired: 29950 },
  { level: 15, title: "Elder", xpRequired: 34350 },
  { level: 16, title: "Guardian", xpRequired: 39050 },
  { level: 17, title: "Celestial", xpRequired: 44150 },
  { level: 18, title: "Divine", xpRequired: 49550 },
  { level: 19, title: "Transcendent", xpRequired: 55250 },
  { level: 20, title: "Eternal", xpRequired: 61200 },
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
