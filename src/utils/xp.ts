export interface LevelDef {
  level: number;
  title: string;
  xpRequired: number;
}

/** 20 levels with increasing XP thresholds. Max level 20 at 25,000 XP. */
export const LEVELS: LevelDef[] = [
  { level: 0, title: "Novice", xpRequired: 0 },
  { level: 1, title: "Villager", xpRequired: 80 },
  { level: 2, title: "Squire", xpRequired: 200 },
  { level: 3, title: "Knight", xpRequired: 400 },
  { level: 4, title: "Mage", xpRequired: 700 },
  { level: 5, title: "Captain", xpRequired: 1100 },
  { level: 6, title: "Champion", xpRequired: 1600 },
  { level: 7, title: "Legend", xpRequired: 2200 },
  { level: 8, title: "Mythic", xpRequired: 3000 },
  { level: 9, title: "Sage", xpRequired: 4000 },
  { level: 10, title: "Hero", xpRequired: 5200 },
  { level: 11, title: "Paladin", xpRequired: 6600 },
  { level: 12, title: "Warden", xpRequired: 8200 },
  { level: 13, title: "Overlord", xpRequired: 10000 },
  { level: 14, title: "Titan", xpRequired: 12000 },
  { level: 15, title: "Elder", xpRequired: 14200 },
  { level: 16, title: "Guardian", xpRequired: 16600 },
  { level: 17, title: "Celestial", xpRequired: 19200 },
  { level: 18, title: "Divine", xpRequired: 22000 },
  { level: 19, title: "Transcendent", xpRequired: 25000 },
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
