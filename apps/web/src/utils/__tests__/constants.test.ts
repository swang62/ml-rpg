import { describe, expect, it } from "vitest";
import { AVATAR_TIERS, LEVELS, SHORTCUTS, STOP_WORDS } from "../constants";

describe("LEVELS", () => {
  it("has 21 levels (0–20 inclusive)", () => {
    expect(LEVELS.length).toBe(21);
    expect(LEVELS[0].level).toBe(0);
    expect(LEVELS[LEVELS.length - 1].level).toBe(20);
  });

  it("has sequential level numbers", () => {
    for (let i = 0; i < LEVELS.length; i++) {
      expect(LEVELS[i].level).toBe(i);
    }
  });

  it("has strictly increasing xpRequired", () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(LEVELS[i].xpRequired).toBeGreaterThan(LEVELS[i - 1].xpRequired);
    }
  });

  it("starts at 0 XP and ends at 70k XP", () => {
    expect(LEVELS[0].xpRequired).toBe(0);
    expect(LEVELS[LEVELS.length - 1].xpRequired).toBe(70000);
  });

  it("has non-empty unique titles", () => {
    const titles = LEVELS.map((l) => l.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const title of titles) {
      expect(title).toBeTruthy();
    }
  });
});

describe("AVATAR_TIERS", () => {
  it("is sorted by minLevel descending", () => {
    for (let i = 1; i < AVATAR_TIERS.length; i++) {
      expect(AVATAR_TIERS[i].minLevel).toBeLessThan(
        AVATAR_TIERS[i - 1].minLevel,
      );
    }
  });

  it("has level 0 as the fallback tier", () => {
    expect(AVATAR_TIERS[AVATAR_TIERS.length - 1].minLevel).toBe(0);
  });

  it("has no duplicate minLevel values", () => {
    const levels = AVATAR_TIERS.map((t) => t.minLevel);
    expect(new Set(levels).size).toBe(levels.length);
  });

  it("has valid borderColor format", () => {
    for (const tier of AVATAR_TIERS) {
      expect(tier.borderColor).toBeTruthy();
      if (tier.borderColor.startsWith("#")) {
        expect(tier.borderColor).toMatch(/^#[0-9a-fA-F]{6}$/);
      }
    }
  });

  it("has non-empty glow strings", () => {
    for (const tier of AVATAR_TIERS) {
      expect(tier.glow).toBeTruthy();
    }
  });
});

describe("SHORTCUTS", () => {
  const shortcuts = Object.values(SHORTCUTS);

  it("all values are single lowercase characters", () => {
    for (const key of shortcuts) {
      expect(key).toMatch(/^[a-z]$/);
    }
  });

  it("has no duplicate values", () => {
    expect(new Set(shortcuts).size).toBe(shortcuts.length);
  });

  it("has all expected keys", () => {
    expect(SHORTCUTS).toHaveProperty("SEARCH");
    expect(SHORTCUTS).toHaveProperty("ASK_AI");
    expect(SHORTCUTS).toHaveProperty("PROFILE");
    expect(SHORTCUTS).toHaveProperty("SIGNUP");
    expect(SHORTCUTS).toHaveProperty("LOGIN");
    expect(SHORTCUTS).toHaveProperty("RESET");
  });
});

describe("STOP_WORDS", () => {
  const words = [...STOP_WORDS];

  it("all entries are lowercase", () => {
    for (const word of words) {
      expect(word).toBe(word.toLowerCase());
    }
  });

  it("has no entries containing spaces", () => {
    for (const word of words) {
      expect(word).not.toContain(" ");
    }
  });

  it("has no empty strings", () => {
    expect(words.every((w) => w.length > 0)).toBe(true);
  });
});
