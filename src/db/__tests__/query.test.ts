import { describe, it, expect } from "vitest";
import {
  ensureCourseTable,
  ensureCategoryTable,
  ensureSectionTable,
  ensureLessonTable,
  ensureUsersTable,
  ensureProgressTable,
} from "~/db/querier";
import { createCourse, getCourseBySlug, getAllCourses } from "~/db/querier";
import {
  createCategory,
  getCategoriesByCourse,
  getCategoryBySlug,
} from "~/db/querier";
import {
  createSection,
  getSectionsByCategory,
} from "~/db/querier";
import {
  createLesson,
  getLessonsBySection,
  getLessonBySlug,
  getLessonCount,
} from "~/db/querier";
import {
  upsertUser,
  getUserById,
  getUserCount,
  updateLastVisitedAt,
  deleteStaleUsers,
  getUserByUserNameWithPassword,
} from "~/db/querier";
import {
  markLessonRead,
  isLessonRead,
  getAllReadLessons,
  getReadLessonsBySection,
  resetUserProgress,
  getReadCountsByCourse,
} from "~/db/querier";

describe("Query function exports", () => {
  it("exports all DDL functions", () => {
    expect(ensureCourseTable).toBeInstanceOf(Function);
    expect(ensureCategoryTable).toBeInstanceOf(Function);
    expect(ensureSectionTable).toBeInstanceOf(Function);
    expect(ensureLessonTable).toBeInstanceOf(Function);
    expect(ensureUsersTable).toBeInstanceOf(Function);
    expect(ensureProgressTable).toBeInstanceOf(Function);
  });

  it("exports course query functions", () => {
    expect(createCourse).toBeInstanceOf(Function);
    expect(getCourseBySlug).toBeInstanceOf(Function);
    expect(getAllCourses).toBeInstanceOf(Function);
  });

  it("exports category query functions", () => {
    expect(createCategory).toBeInstanceOf(Function);
    expect(getCategoriesByCourse).toBeInstanceOf(Function);
    expect(getCategoryBySlug).toBeInstanceOf(Function);
  });

  it("exports section query functions", () => {
    expect(createSection).toBeInstanceOf(Function);
    expect(getSectionsByCategory).toBeInstanceOf(Function);
  });

  it("exports lesson query functions", () => {
    expect(createLesson).toBeInstanceOf(Function);
    expect(getLessonsBySection).toBeInstanceOf(Function);
    expect(getLessonBySlug).toBeInstanceOf(Function);
    expect(getLessonCount).toBeInstanceOf(Function);
  });

  it("exports user query functions", () => {
    expect(upsertUser).toBeInstanceOf(Function);
    expect(getUserById).toBeInstanceOf(Function);
    expect(getUserCount).toBeInstanceOf(Function);
    expect(updateLastVisitedAt).toBeInstanceOf(Function);
    expect(deleteStaleUsers).toBeInstanceOf(Function);
    expect(getUserByUserNameWithPassword).toBeInstanceOf(Function);
  });

  it("exports progress query functions", () => {
    expect(markLessonRead).toBeInstanceOf(Function);
    expect(isLessonRead).toBeInstanceOf(Function);
    expect(getAllReadLessons).toBeInstanceOf(Function);
    expect(getReadLessonsBySection).toBeInstanceOf(Function);
    expect(resetUserProgress).toBeInstanceOf(Function);
    expect(getReadCountsByCourse).toBeInstanceOf(Function);
  });
});

describe("Generated types", () => {
  it("returns Query objects from query functions (structural check)", () => {
    // Create a minimal D1Database mock to verify function shapes
    // Full integration tests require a Cloudflare Workers D1 environment
    // or Miniflare — covered by e2e tests.
    const mockD1 = {
      prepare: () => ({
        bind: () => ({
          all: async () => ({ results: [] }),
          first: async () => null,
          run: async () => ({ changes: 0, lastRowId: null }),
        }),
      }),
    } as unknown as D1Database;

    // Verify each function returns a Query (thenable) object
    const queries = [
      getAllCourses(mockD1),
      getCourseBySlug(mockD1, { slug: "test" }),
      createCourse(mockD1, { slug: "test", title: "Test" }),
      getCategoriesByCourse(mockD1, { courseId: 1 }),
      getCategoryBySlug(mockD1, { slug: "test", courseId: 1 }),
    ];

    for (const q of queries) {
      expect(q).toBeDefined();
      expect(typeof q.then).toBe("function");
    }
  });

  it("Query objects have batch() method", () => {
    const mockD1 = {
      prepare: () => ({
        bind: () => ({
          all: async () => ({ results: [] }),
          first: async () => null,
          run: async () => ({ changes: 0, lastRowId: null }),
        }),
      }),
    } as unknown as D1Database;

    const q = getAllCourses(mockD1);
    expect(typeof q.batch).toBe("function");
  });
});
