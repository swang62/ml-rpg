import { AVATAR_TIERS, LEVELS, type LevelDef } from "./constants";

export function formatXP(n: number): string {
  return n >= 1000
    ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "")}k`
    : `${n}`;
}

export function getAvatarStyle(level: number) {
  const tier =
    AVATAR_TIERS.find((t) => level >= t.minLevel) ??
    AVATAR_TIERS[AVATAR_TIERS.length - 1];
  return {
    border: `2px solid ${tier.borderColor}`,
    "box-shadow": tier.glow,
  };
}

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
  nextLevelXp: number;
  xpNeeded: number;
  pct: number;
} {
  const currentLevel = getLevel(xp);
  const nextIdx = currentLevel.level + 1;
  if (nextIdx >= LEVELS.length) {
    return { currentXp: xp, nextLevelXp: Infinity, xpNeeded: 0, pct: 100 };
  }
  const nextLevel = LEVELS[nextIdx];
  const xpIntoLevel = xp - currentLevel.xpRequired;
  const xpForNext = nextLevel.xpRequired - currentLevel.xpRequired;
  const pct = Math.round((xpIntoLevel / xpForNext) * 100);
  return {
    currentXp: xpIntoLevel,
    nextLevelXp: nextLevel.xpRequired,
    xpNeeded: xpForNext,
    pct,
  };
}
