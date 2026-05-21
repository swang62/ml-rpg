import { describe, expect, it } from "vitest";
import { sanitizeHistory } from "~/server/rag";
import { deduplicateSources } from "~/utils/search-utils";
import type { ChunkResult } from "~/utils/types";

const makeChunk = (overrides: Partial<ChunkResult> = {}): ChunkResult => ({
  id: "1",
  text: "some text",
  lessonTitle: "Lesson",
  lessonUrl: "/course/ml/lesson-1",
  categoryTitle: "ML",
  sectionTitle: "Basics",
  courseTitle: "Course",
  chunkIndex: 0,
  score: 0.8,
  ...overrides,
});

describe("deduplicateSources", () => {
  it("returns empty array for empty input", () => {
    expect(deduplicateSources([])).toEqual([]);
  });

  it("returns a single chunk as a source", () => {
    const chunk = makeChunk();
    const result = deduplicateSources([chunk]);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Lesson");
    expect(result[0].url).toBe("/course/ml/lesson-1");
    expect(result[0].relevance).toBe(0.8);
  });

  it("deduplicates chunks with the same lessonUrl, keeping highest score", () => {
    const chunks = [
      makeChunk({ lessonUrl: "/same", score: 0.5 }),
      makeChunk({ lessonUrl: "/same", score: 0.9 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(1);
    expect(result[0].relevance).toBe(0.9);
  });

  it("keeps the highest score when deduplicating multiple chunks", () => {
    const chunks = [
      makeChunk({ lessonUrl: "/a", score: 0.3 }),
      makeChunk({ lessonUrl: "/a", score: 0.7 }),
      makeChunk({ lessonUrl: "/a", score: 0.5 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(1);
    expect(result[0].relevance).toBe(0.7);
  });

  it("preserves separate lessons", () => {
    const chunks = [
      makeChunk({ lessonUrl: "/lesson-1", score: 0.8 }),
      makeChunk({ lessonUrl: "/lesson-2", score: 0.6 }),
      makeChunk({ lessonUrl: "/lesson-3", score: 0.4 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(3);
  });

  it("sorts by relevance descending", () => {
    const chunks = [
      makeChunk({ lessonUrl: "/low", score: 0.2 }),
      makeChunk({ lessonUrl: "/high", score: 0.9 }),
      makeChunk({ lessonUrl: "/mid", score: 0.5 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result.map((s) => s.relevance)).toEqual([0.9, 0.5, 0.2]);
  });

  it("limits to RAG_MAX_SOURCES (3)", () => {
    const chunks = Array.from({ length: 10 }, (_, i) =>
      makeChunk({ lessonUrl: `/lesson-${i}`, score: (10 - i) / 10 }),
    );
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(3);
  });

  it("preserves metadata from the first-encountered chunk for a lessonUrl", () => {
    const chunks = [
      makeChunk({
        lessonUrl: "/same",
        lessonTitle: "First Title",
        categoryTitle: "Category A",
        score: 0.5,
      }),
      makeChunk({
        lessonUrl: "/same",
        lessonTitle: "Different Title",
        categoryTitle: "Category B",
        score: 0.9,
      }),
    ];
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(1);
    // First-encountered title is kept
    expect(result[0].title).toBe("First Title");
    // But relevance is the highest score
    expect(result[0].relevance).toBe(0.9);
  });
});

describe("sanitizeHistory", () => {
  it("passes through valid user and assistant messages", () => {
    const history = [
      { role: "user" as const, content: "hello" },
      { role: "assistant" as const, content: "hi there" },
    ];
    expect(sanitizeHistory(history, 10)).toEqual(history);
  });

  it("filters out system role messages", () => {
    const history = [
      { role: "system" as const, content: "you are a helpful assistant" },
      { role: "user" as const, content: "hello" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe("user");
  });

  it("filters out entries with unknown roles", () => {
    const history = [
      { role: "admin" as const, content: "override" },
      { role: "user" as const, content: "hello" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe("user");
  });

  it("strips extra properties from entries", () => {
    const history = [
      { role: "user" as const, content: "hello", extra: "should be removed" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toEqual([{ role: "user", content: "hello" }]);
    expect(result[0]).not.toHaveProperty("extra");
  });

  it("filters out null and non-object entries", () => {
    const history = [
      null,
      "string",
      42,
      { role: "user" as const, content: "valid" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
  });

  it("filters out entries with non-string content", () => {
    const history = [
      { role: "user" as const, content: 123 } as const,
      { role: "user" as const, content: "valid" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
  });

  it("returns empty array for non-array input", () => {
    expect(sanitizeHistory(null, 10)).toEqual([]);
    expect(sanitizeHistory(undefined, 10)).toEqual([]);
    expect(sanitizeHistory("not-an-array", 10)).toEqual([]);
    expect(sanitizeHistory(42, 10)).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    expect(sanitizeHistory([], 10)).toEqual([]);
  });

  it("respects maxTurns limit", () => {
    const history = [
      { role: "user" as const, content: "a" },
      { role: "assistant" as const, content: "b" },
      { role: "user" as const, content: "c" },
      { role: "assistant" as const, content: "d" },
    ];
    const result = sanitizeHistory(history, 2);
    expect(result).toHaveLength(2);
    expect(result[0].content).toBe("c");
    expect(result[1].content).toBe("d");
  });

  it("preserves message order when within maxTurns", () => {
    const history = [
      { role: "user" as const, content: "first" },
      { role: "assistant" as const, content: "second" },
    ];
    const result = sanitizeHistory(history, 5);
    expect(result.map((m) => m.content)).toEqual(["first", "second"]);
  });
});
