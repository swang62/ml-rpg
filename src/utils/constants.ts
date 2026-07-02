export const SITE_NAME = "Machine Learning (the RPG)";
export const SITE_DESCRIPTION =
  "A gamified RPG-style learning platform for Machine Learning and Data Engineering. Level up, complete quests, and master ML concepts.";
export const SITE_URL = import.meta.env?.VITE_SITE_URL;
export const SITE_ID = import.meta.env?.VITE_SITE_ID;

export const GITHUB_REPO_URL = "https://github.com/swang62/ml-rpg";
export const EXTERNAL_URL = "https://www.systemoverflow.com/learn";

export const XP_VALUE = 25;
export const XP_TOAST_TIMEOUT = 3000;
export const CLEANUP_INTERVAL_DAYS = 1;
export const SESSION_TIMEOUT_DAYS = 90;

export const SEARCH_BLUR_CLOSE_MS = 200;
export const SEARCH_DEBOUNCE_MS = 200;
export const SEARCH_MAX_RESULTS = 5;
export const SEARCH_MIN_QUERY_LENGTH = 3;

export const RAG_BOT_NAME = "Bob";
export const RAG_BATCH_SIZE = 256;
export const RAG_CHUNK_OVERLAP = 0;
export const RAG_CHUNK_SIZE = 512;
export const RAG_MAX_HISTORY = 2;
export const RAG_MAX_SOURCES = 3;

export const RATE_LIMIT_LOGIN = { maxAttempts: 10, windowMs: 60_000 } as const;
export const RATE_LIMIT_CHAT = { maxAttempts: 30, windowMs: 60_000 } as const;
export const RATE_LIMIT_REGULAR = {
  maxAttempts: 200,
  windowMs: 60_000,
} as const;

export const EMPTY_DB_PATH = "src/db/empty.db";
export const COURSE_INFO_PATH = "README.md";

// Global keyboard shortcuts — centralized so components stay in sync
export const SHORTCUTS = {
  SEARCH: "f",
  ASK_AI: "h",
  PROFILE: "p",
  SIGNUP: "s",
  LOGIN: "l",
  RESET: "r",
} as const;

export interface LevelDef {
  level: number;
  title: string;
  xpRequired: number;
}

/**
 * 20 levels with smoothly increasing XP thresholds.
 * Early diffs (200, 300) are singles; mid diffs repeat in pairs (500,500, 1000,1000, 1500,1500);
 * later diffs increase stepwise to 7000. Level 20 requires 62,000 XP.
 */
export const LEVELS: LevelDef[] = [
  { level: 0, title: "Novice", xpRequired: 0 },
  { level: 1, title: "Villager", xpRequired: 200 },
  { level: 2, title: "Squire", xpRequired: 500 },
  { level: 3, title: "Knight", xpRequired: 1000 },
  { level: 4, title: "Mage", xpRequired: 1500 },
  { level: 5, title: "Warlord", xpRequired: 2500 },
  { level: 6, title: "Champion", xpRequired: 3500 },
  { level: 7, title: "Legend", xpRequired: 5000 },
  { level: 8, title: "Mythic", xpRequired: 6500 },
  { level: 9, title: "Sage", xpRequired: 8500 },
  { level: 10, title: "Hero", xpRequired: 11000 },
  { level: 11, title: "Paladin", xpRequired: 14000 },
  { level: 12, title: "Warden", xpRequired: 17500 },
  { level: 13, title: "Overlord", xpRequired: 22000 },
  { level: 14, title: "Titan", xpRequired: 27000 },
  { level: 15, title: "Elder", xpRequired: 32000 },
  { level: 16, title: "Guardian", xpRequired: 38000 },
  { level: 17, title: "Sovereign", xpRequired: 45000 },
  { level: 18, title: "Celestial", xpRequired: 52000 },
  { level: 19, title: "Divine", xpRequired: 60000 },
  { level: 20, title: "Eternal", xpRequired: 70000 },
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
    glow: "0 0 12px rgba(251,191,36,0.6), 0 0 24px rgba(251,191,36,0.3)",
  },
  {
    minLevel: 15,
    borderColor: "#a78bfa",
    glow: "0 0 10px rgba(167,139,250,0.6), 0 0 20px rgba(167,139,250,0.2)",
  },
  {
    minLevel: 10,
    borderColor: "#60a5fa",
    glow: "0 0 8px rgba(96,165,250,0.5), 0 0 16px rgba(96,165,250,0.2)",
  },
  {
    minLevel: 5,
    borderColor: "#34d399",
    glow: "0 0 6px rgba(52,211,153,0.4)",
  },
  {
    minLevel: 0,
    borderColor: "var(--text-muted)",
    glow: "0 0 4px var(--accent-glow)",
  },
];
export const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "nor",
  "not",
  "if",
  "so",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "by",
  "with",
  "up",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "can",
  "could",
  "shall",
  "should",
  "may",
  "might",
  "must",
  "this",
  "that",
  "these",
  "those",
  "it",
  "its",
  "they",
  "them",
  "their",
  "we",
  "us",
  "our",
  "you",
  "your",
  "he",
  "she",
  "him",
  "her",
  "his",
  "my",
  "me",
  "no",
  "nor",
  "also",
  "than",
  "all",
  "any",
  "each",
  "few",
  "some",
  "every",
  "about",
  "above",
  "after",
  "again",
  "before",
  "between",
  "both",
  "because",
  "into",
  "more",
  "most",
  "much",
  "now",
  "only",
  "other",
  "own",
  "over",
  "same",
  "such",
  "through",
  "until",
  "very",
  "just",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "why",
  "how",
]);
