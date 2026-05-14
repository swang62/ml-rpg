export const BASE_URL = "https://www.systemoverflow.com/learn";
export const SITE_NAME = "System Overflow";
export const POLL_INTERVAL = 1000;
export const XP_POLL_INTERVAL = 3000;
export const LESSON_READ_DELAY_MS = 5000;
export const NOT_FOUND_PATH = "/404";
export const SEARCH_INDEX_PATH = "/search/index.json";
export const SEARCH_DEBOUNCE_MS = 200;
export const SEARCH_BLUR_CLOSE_MS = 200;
export const SEARCH_MIN_QUERY_LENGTH = 3;
export const SEARCH_MAX_RESULTS = 6;

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

export interface AvatarTier {
  minLevel: number;
  borderColor: string;
  glow: string;
}

export const AVATAR_TIERS: AvatarTier[] = [
  {
    minLevel: 20,
    borderColor: "#fbbf24",
    glow: "0 0 12px rgba(251,191,36,0.7), 0 0 24px rgba(251,191,36,0.3)",
  },
  {
    minLevel: 17,
    borderColor: "#a78bfa",
    glow: "0 0 10px rgba(167,139,250,0.6), 0 0 20px rgba(167,139,250,0.2)",
  },
  {
    minLevel: 14,
    borderColor: "#60a5fa",
    glow: "0 0 8px rgba(96,165,250,0.5), 0 0 16px rgba(96,165,250,0.2)",
  },
  {
    minLevel: 10,
    borderColor: "#34d399",
    glow: "0 0 6px rgba(52,211,153,0.4)",
  },
  {
    minLevel: 5,
    borderColor: "var(--accent)",
    glow: "0 0 4px var(--accent-glow)",
  },
  { minLevel: 0, borderColor: "var(--border)", glow: "none" },
];
