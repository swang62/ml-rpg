import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock isServer to false so localStorage is accessible in node.
// Hoisted by Vitest before import statements resolve.
vi.mock("solid-js/web", async (importOriginal) => {
  const mod = await importOriginal();
  return { ...(mod as Record<string, unknown>), isServer: false } as Record<
    string,
    unknown
  >;
});

import {
  getAnonCategoryReadCounts,
  getAnonDisplayName,
  getAnonSectionReadSlugs,
  getAnonTotalXp,
  isAnonLessonRead,
  markAnonLessonRead,
  resetAnonAllProgress,
  resetAnonSection,
  setAnonDisplayName,
} from "~/utils/local-storage";

// Shared in-memory store backing the mock localStorage.
// All functions read/write the same store — true integration-style testing.
let store: Record<string, string>;

beforeEach(() => {
  store = {};
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      key: (index: number) => Object.keys(store)[index] ?? null,
      get length() {
        return Object.keys(store).length;
      },
    },
    configurable: true,
    writable: true,
  });
});

describe("anonymous local storage integration", () => {
  it("full lifecycle: display name, read tracking, XP, reset", () => {
    // ── Display name ──────────────────────────────────────────────
    // Defaults to "Anon" and writes it into storage
    expect(getAnonDisplayName()).toBe("Anon");
    expect(store["user:displayName"]).toBe("Anon");

    // Changing display name persists
    setAnonDisplayName("Hero");
    expect(getAnonDisplayName()).toBe("Hero");

    // ── No progress initially ─────────────────────────────────────
    expect(getAnonTotalXp().count).toBe(0);
    expect(getAnonCategoryReadCounts("ml")).toEqual({});

    // ── Mark lessons as read across multiple courses ─────────────
    markAnonLessonRead("ml", "basics", "intro", "what-is-ml", 1);
    markAnonLessonRead("ml", "basics", "intro", "history", 2);
    markAnonLessonRead("ml", "basics", "advanced", "neural-nets", 3);
    markAnonLessonRead("de", "fundamentals", "data", "pipelines", 4);

    // ── Individual read status ────────────────────────────────────
    expect(isAnonLessonRead("ml", "basics", "intro", "what-is-ml")).toBe(true);
    expect(isAnonLessonRead("ml", "basics", "intro", "history")).toBe(true);
    expect(isAnonLessonRead("ml", "basics", "advanced", "neural-nets")).toBe(
      true,
    );
    expect(isAnonLessonRead("de", "fundamentals", "data", "pipelines")).toBe(
      true,
    );
    expect(isAnonLessonRead("ml", "basics", "intro", "unread-lesson")).toBe(
      false,
    );

    // ── Section read slugs (scoped to course + section) ──────────
    const introSlugs = getAnonSectionReadSlugs("ml", "intro");
    expect(introSlugs).toHaveLength(2);
    expect(introSlugs).toContain("what-is-ml");
    expect(introSlugs).toContain("history");

    const advancedSlugs = getAnonSectionReadSlugs("ml", "advanced");
    expect(advancedSlugs).toEqual(["neural-nets"]);

    // Other course's section is isolated
    expect(getAnonSectionReadSlugs("de", "data")).toEqual(["pipelines"]);

    // ── Category read counts ──────────────────────────────────────
    expect(getAnonCategoryReadCounts("ml")).toEqual({ basics: 3 });
    expect(getAnonCategoryReadCounts("de")).toEqual({ fundamentals: 1 });

    // ── Total XP calculation ──────────────────────────────────────
    // (1 + 2 + 3 + 4) * 25 = 250
    expect(getAnonTotalXp().count).toBe(250);

    // ── Reset a single section ────────────────────────────────────
    resetAnonSection("ml", "intro");

    expect(isAnonLessonRead("ml", "basics", "intro", "what-is-ml")).toBe(false);
    expect(isAnonLessonRead("ml", "basics", "intro", "history")).toBe(false);
    // Lessons in other sections / courses preserved
    expect(isAnonLessonRead("ml", "basics", "advanced", "neural-nets")).toBe(
      true,
    );
    expect(isAnonLessonRead("de", "fundamentals", "data", "pipelines")).toBe(
      true,
    );

    expect(getAnonTotalXp().count).toBe(175); // (3 + 4) * 25

    // ── Re-read a previously reset lesson ─────────────────────────
    markAnonLessonRead("ml", "basics", "intro", "what-is-ml", 1);
    expect(isAnonLessonRead("ml", "basics", "intro", "what-is-ml")).toBe(true);
    expect(getAnonTotalXp().count).toBe(200); // (1 + 3 + 4) * 25

    // ── Reset all progress ────────────────────────────────────────
    resetAnonAllProgress();

    expect(isAnonLessonRead("ml", "basics", "intro", "what-is-ml")).toBe(false);
    expect(isAnonLessonRead("ml", "basics", "advanced", "neural-nets")).toBe(
      false,
    );
    expect(isAnonLessonRead("de", "fundamentals", "data", "pipelines")).toBe(
      false,
    );
    expect(getAnonTotalXp().count).toBe(0);
    expect(getAnonCategoryReadCounts("ml")).toEqual({});
    expect(getAnonCategoryReadCounts("de")).toEqual({});

    // Display name uses a different key prefix — unaffected by progress reset
    expect(getAnonDisplayName()).toBe("Hero");
  });

  it("getAnonSectionReadSlugs handles slugs with colons", () => {
    // The key format is read:{course}:{category}:{section}:{lesson}.
    // Colons in the lesson slug are preserved via join(":") on the tail.
    markAnonLessonRead("ml", "cat", "sec", "lesson:with:colons", 5);
    const slugs = getAnonSectionReadSlugs("ml", "sec");
    expect(slugs).toEqual(["lesson:with:colons"]);
  });

  it("getAnonTotalXp handles non-numeric stored values gracefully", () => {
    // Simulate corrupted data in storage
    store["read:ml:cat:sec:bad"] = "not-a-number";
    store["read:ml:cat:sec:good"] = "3";
    const result = getAnonTotalXp();
    expect(result.count).toBe(75); // 3 * 25, NaN entries are skipped
  });

  it("getAnonTotalXp returns 0 when no lessons are read", () => {
    const result = getAnonTotalXp();
    expect(result.count).toBe(0);
  });

  it("setAnonDisplayName overwrites the previous name", () => {
    setAnonDisplayName("First");
    expect(getAnonDisplayName()).toBe("First");
    setAnonDisplayName("Second");
    expect(getAnonDisplayName()).toBe("Second");
  });

  it("resetAnonSection with non-existent section is a no-op", () => {
    markAnonLessonRead("ml", "cat", "sec", "lesson1", 1);
    resetAnonSection("ml", "nonexistent");
    expect(isAnonLessonRead("ml", "cat", "sec", "lesson1")).toBe(true);
  });
});
