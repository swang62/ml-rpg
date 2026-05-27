import { describe, expect, it } from "vitest";
import { extractKeywords } from "~/server/rag";
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
  _relevance_score: 0.8,
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
      makeChunk({ lessonUrl: "/same", _relevance_score: 0.5 }),
      makeChunk({ lessonUrl: "/same", _relevance_score: 0.9 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(1);
    expect(result[0].relevance).toBe(0.9);
  });

  it("keeps the highest score when deduplicating multiple chunks", () => {
    const chunks = [
      makeChunk({ lessonUrl: "/a", _relevance_score: 0.3 }),
      makeChunk({ lessonUrl: "/a", _relevance_score: 0.7 }),
      makeChunk({ lessonUrl: "/a", _relevance_score: 0.5 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(1);
    expect(result[0].relevance).toBe(0.7);
  });

  it("preserves separate lessons", () => {
    const chunks = [
      makeChunk({ lessonUrl: "/lesson-1", _relevance_score: 0.8 }),
      makeChunk({ lessonUrl: "/lesson-2", _relevance_score: 0.6 }),
      makeChunk({ lessonUrl: "/lesson-3", _relevance_score: 0.4 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result).toHaveLength(3);
  });

  it("sorts by relevance descending", () => {
    const chunks = [
      makeChunk({ lessonUrl: "/low", _relevance_score: 0.2 }),
      makeChunk({ lessonUrl: "/high", _relevance_score: 0.9 }),
      makeChunk({ lessonUrl: "/mid", _relevance_score: 0.5 }),
    ];
    const result = deduplicateSources(chunks);
    expect(result.map((s) => s.relevance)).toEqual([0.9, 0.5, 0.2]);
  });

  it("limits to RAG_MAX_SOURCES (3)", () => {
    const chunks = Array.from({ length: 10 }, (_, i) =>
      makeChunk({ lessonUrl: `/lesson-${i}`, _relevance_score: (10 - i) / 10 }),
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
        _relevance_score: 0.5,
      }),
      makeChunk({
        lessonUrl: "/same",
        lessonTitle: "Different Title",
        categoryTitle: "Category B",
        _relevance_score: 0.9,
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

describe("extractKeywords", () => {
  it("returns empty array when SPACY_API_URL is not set", async () => {
    const result = await extractKeywords("what is gradient descent");
    expect(result).toEqual([]);
  });
});
