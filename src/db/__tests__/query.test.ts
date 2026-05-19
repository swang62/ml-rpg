import { describe, it, expect, beforeAll } from "vitest";
import Database from "better-sqlite3";
import {
  ensureCourseTable,
  ensureCategoryTable,
  ensureSectionTable,
  ensureLessonTable,
  ensureUsersTable,
  ensureProgressTable,
} from "~/db/base_sql";
import { createCourse, getCourseBySlug, getAllCourses } from "~/db/course_sql";
import {
  createCategory,
  getCategoriesByCourse,
  getCategoryBySlug,
} from "~/db/category_sql";
import {
  createSection,
  getSectionsByCategory,
} from "~/db/section_sql";
import {
  createLesson,
  getLessonsBySection,
  getLessonBySlug,
  getLessonCount,
} from "~/db/lesson_sql";
import { upsertUser, getUserById, getUserCount } from "~/db/users_sql";
import {
  markLessonRead,
  isLessonRead,
  getAllReadLessons,
  getReadLessonsBySection,
  resetUserProgress,
  getReadCountsByCourse,
} from "~/db/progress_sql";

let db: Database.Database;

beforeAll(async () => {
  db = new Database(":memory:");
  await ensureCourseTable(db);
  await ensureCategoryTable(db);
  await ensureSectionTable(db);
  await ensureLessonTable(db);
  await ensureUsersTable(db);
  await ensureProgressTable(db);
});

function makeRows<T>(result: T | T[]): T[] {
  return Array.isArray(result) ? result : [result];
}

describe("User CRUD", () => {
  it("creates and retrieves a user", async () => {
    const created = await upsertUser(db, {
      username: "testuser",
      userPassword: "argon2hash",
      displayName: "Test User",
    });
    expect(created).not.toBeNull();
    expect(created!.id).toBeGreaterThan(0);

    const fetched = await getUserById(db, { id: created!.id });
    expect(fetched).not.toBeNull();
    expect(fetched!.username).toBe("testuser");
    expect(fetched!.displayname).toBe("Test User");
  });

  it("counts users", async () => {
    const count = await getUserCount(db);
    expect(count!.count).toBeGreaterThanOrEqual(1);
  });
});

describe("Course hierarchy CRUD", () => {
  let courseId: number;
  let categoryId: number;
  let sectionId: number;
  let lessonId: number;

  it("creates a course", async () => {
    const created = await createCourse(db, {
      slug: "test-course",
      title: "Test Course",
    });
    expect(created).not.toBeNull();
    courseId = created!.id;
  });

  it("queries course by slug", async () => {
    const course = await getCourseBySlug(db, { slug: "test-course" });
    expect(course).not.toBeNull();
    expect(course!.title).toBe("Test Course");
  });

  it("lists all courses", async () => {
    const courses = await getAllCourses(db);
    expect(courses.length).toBeGreaterThanOrEqual(1);
  });

  it("creates a category", async () => {
    const created = await createCategory(db, {
      slug: "test-category",
      title: "Test Category",
      courseId,
    });
    expect(created).not.toBeNull();
    categoryId = created!.id;
  });

  it("queries categories by course", async () => {
    const cats = await getCategoriesByCourse(db, { courseId });
    expect(cats.length).toBe(1);
    expect(cats[0].slug).toBe("test-category");
  });

  it("creates a section", async () => {
    const created = await createSection(db, {
      slug: "test-section",
      title: "Test Section",
      courseId,
      categoryId,
    });
    expect(created).not.toBeNull();
    sectionId = created!.id;
  });

  it("queries sections by category", async () => {
    const sections = await getSectionsByCategory(db, { categoryId });
    expect(sections.length).toBe(1);
    expect(sections[0].slug).toBe("test-section");
  });

  it("creates a lesson with HTML content", async () => {
    const created = await createLesson(db, {
      slug: "test-lesson",
      title: "Test Lesson",
      html: "<h1>Hello</h1>",
      lessonOrder: 1,
      courseId,
      categoryId,
      sectionId,
    });
    expect(created).not.toBeNull();
    lessonId = created!.id;
  });

  it("queries lessons by section", async () => {
    const lessons = await getLessonsBySection(db, { sectionId });
    expect(lessons.length).toBe(1);
    expect(lessons[0].slug).toBe("test-lesson");
    expect(lessons[0].lessonorder).toBe(1);
  });

  it("queries lesson by slug", async () => {
    const lesson = await getLessonBySlug(db, {
      slug: "test-lesson",
      sectionId,
    });
    expect(lesson).not.toBeNull();
    expect(lesson!.title).toBe("Test Lesson");
  });

  it("counts lessons", async () => {
    const count = await getLessonCount(db);
    expect(count!.lessoncount).toBeGreaterThanOrEqual(1);
  });

  it("creates a second category, section, and lesson for count tests", async () => {
    const cat2 = await createCategory(db, {
      slug: "test-category-2",
      title: "Test Category 2",
      courseId,
    });
    const sec2 = await createSection(db, {
      slug: "test-section-2",
      title: "Test Section 2",
      courseId,
      categoryId: cat2!.id,
    });
    await createLesson(db, {
      slug: "test-lesson-2",
      title: "Test Lesson 2",
      html: "<p>Content</p>",
      lessonOrder: 2,
      courseId,
      categoryId: cat2!.id,
      sectionId: sec2!.id,
    });

    const lessons = await getLessonsBySection(db, { sectionId: sec2!.id });
    expect(lessons.length).toBe(1);
  });
});

describe("Progress tracking", () => {
  let userId: number;
  let firstSectionId: number;
  let firstLessonId: number;

  beforeAll(async () => {
    // Get the first user
    const user = await upsertUser(db, {
      username: "progress-user",
      userPassword: "hash",
      displayName: "Progress",
    });
    userId = user!.id;

    // Get the first section and lesson
    const cats = await getCategoriesByCourse(db, { courseId: 1 });
    const sections = await getSectionsByCategory(db, {
      categoryId: cats[0].id,
    });
    firstSectionId = sections[0].id;
    const lessons = await getLessonsBySection(db, {
      sectionId: firstSectionId,
    });
    firstLessonId = lessons[0].id;
  });

  it("lesson is initially unread", async () => {
    const status = await isLessonRead(db, {
      lessonId: firstLessonId,
      userId,
    });
    expect(Boolean(status?.isread)).toBe(false);
  });

  it("marks a lesson read", async () => {
    await markLessonRead(db, {
      lessonId: firstLessonId,
      userId,
    });
    const status = await isLessonRead(db, {
      lessonId: firstLessonId,
      userId,
    });
    expect(Boolean(status?.isread)).toBe(true);
  });

  it("marks duplicate read idempotently", async () => {
    await markLessonRead(db, {
      lessonId: firstLessonId,
      userId,
    });
    const all = await getAllReadLessons(db, { userId });
    const matching = all.filter((r) => Number(r.lessonid) === firstLessonId);
    expect(matching.length).toBe(1);
  });

  it("lists read lessons by section", async () => {
    const read = await getReadLessonsBySection(db, {
      userId,
      sectionId: firstSectionId,
    });
    expect(read.length).toBe(1);
    expect(read[0].slug).toBe("test-lesson");
  });

  it("gets all read lessons with lesson order", async () => {
    const all = await getAllReadLessons(db, { userId });
    expect(all.length).toBeGreaterThanOrEqual(1);
    expect(all[0].lessonorder).toBe(1);
  });

  it("counts reads by course", async () => {
    const counts = await getReadCountsByCourse(db, {
      userId,
      courseId: 1,
    });
    expect(counts.length).toBe(1);
    expect(counts[0].readcount).toBe(1);
    expect(Number(counts[0].sectionid)).toBe(firstSectionId);
  });

  it("resets user progress", async () => {
    await resetUserProgress(db, { userId });
    const all = await getAllReadLessons(db, { userId });
    expect(all.length).toBe(0);
  });
});
