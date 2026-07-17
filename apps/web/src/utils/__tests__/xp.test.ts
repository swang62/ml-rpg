import { describe, expect, it } from "vitest";
import { formatXP, getAvatarStyle, getLevel, xpToNextLevel } from "../xp";

describe("formatXP", () => {
  it("formats numbers under 1000 as-is", () => {
    expect(formatXP(0)).toBe("0");
    expect(formatXP(25)).toBe("25");
    expect(formatXP(999)).toBe("999");
  });

  it("formats exact thousands with no decimal", () => {
    expect(formatXP(1000)).toBe("1k");
    expect(formatXP(5000)).toBe("5k");
    expect(formatXP(70000)).toBe("70k");
  });

  it("formats non-exact thousands with one decimal", () => {
    expect(formatXP(1500)).toBe("1.5k");
    expect(formatXP(1250)).toBe("1.3k");
    expect(formatXP(1234)).toBe("1.2k");
  });

  it("strips trailing .0", () => {
    expect(formatXP(1100)).toBe("1.1k");
    expect(formatXP(100)).toBe("100");
  });
});

describe("getLevel", () => {
  it("returns Novice (level 0) for 0 XP", () => {
    const level = getLevel(0);
    expect(level.level).toBe(0);
    expect(level.title).toBe("Novice");
  });

  it("returns correct level at exact thresholds", () => {
    expect(getLevel(200).title).toBe("Villager");
    expect(getLevel(1000).title).toBe("Knight");
    expect(getLevel(70000).title).toBe("Eternal");
  });

  it("returns correct level between thresholds", () => {
    expect(getLevel(250).title).toBe("Villager");
    expect(getLevel(3499).title).toBe("Warlord");
    expect(getLevel(45000).title).toBe("Sovereign");
  });

  it("returns Eternal for XP beyond max", () => {
    const level = getLevel(999999);
    expect(level.level).toBe(20);
    expect(level.title).toBe("Eternal");
  });
});

describe("xpToNextLevel", () => {
  it("shows 0% at start of level 0", () => {
    const result = xpToNextLevel(0);
    expect(result.currentXp).toBe(0);
    expect(result.xpNeeded).toBe(200);
    expect(result.pct).toBe(0);
  });

  it("shows 100% at max level", () => {
    const result = xpToNextLevel(70000);
    expect(result.xpNeeded).toBe(0);
    expect(result.pct).toBe(100);
    expect(result.nextLevelXp).toBe(Infinity);
  });

  it("calculates percentage correctly mid-level", () => {
    const result = xpToNextLevel(100); // halfway through level 0 (200 XP needed)
    expect(result.currentXp).toBe(100);
    expect(result.xpNeeded).toBe(200);
    expect(result.pct).toBe(50);
  });

  it("shows next level info correctly", () => {
    const result = xpToNextLevel(200); // at Villager threshold
    expect(result.currentXp).toBe(0);
    expect(result.nextLevelXp).toBe(500);
    expect(result.xpNeeded).toBe(300);
    expect(result.pct).toBe(0);
  });
});

describe("getAvatarStyle", () => {
  it("returns Eternal tier for level 20", () => {
    const style = getAvatarStyle(20);
    expect(style.border).toContain("#fbbf24");
    expect(style["box-shadow"]).toContain("rgba(251,191,36");
  });

  it("returns highest applicable tier", () => {
    const style = getAvatarStyle(16); // Guardian — tier starts at 15
    expect(style.border).toContain("#a78bfa");
  });

  it("returns default tier for level 0", () => {
    const style = getAvatarStyle(0);
    expect(style.border).toContain("var(--text-muted)");
  });

  it("returns correct tier for each boundary", () => {
    expect(getAvatarStyle(5).border).toContain("#34d399");
    expect(getAvatarStyle(10).border).toContain("#60a5fa");
    expect(getAvatarStyle(15).border).toContain("#a78bfa");
    expect(getAvatarStyle(20).border).toContain("#fbbf24");
  });
});
