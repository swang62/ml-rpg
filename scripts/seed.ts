import { globSync } from "node:fs";
import Database from "better-sqlite3";
import de from "../src/data/courses/data-engineering";
import mlSysDesign from "../src/data/courses/ml-system-design";
import {
  createCategory,
  createCourse,
  createLesson,
  createSection,
  deleteAllCategories,
  deleteAllCourses,
  deleteAllLessons,
  deleteAllSections,
} from "../src/db/course_sql";
import { deleteAllProgress } from "../src/db/progress_sql";
import {
  ensureCategoryTable,
  ensureCourseTable,
  ensureLessonTable,
  ensureProgressTable,
  ensureSectionTable,
  ensureUserTable,
} from "../src/db/schema_sql";
import { upsertUser } from "../src/db/user_sql";
import { categoryId, courseId, lessonId, sectionId } from "../src/utils/id";

const DB_PATH = ".data/dev.db";
const USER_ID = "default";

const COURSES: Record<
  string,
  {
    title: string;
    categories: {
      category: string;
      title: string;
      subsections: {
        subsection: string;
        title: string;
        lessons: { lesson: string; title: string; order: number }[];
      }[];
    }[];
  }
> = {
  "data-engineering": de,
  "ml-system-design": mlSysDesign,
};

async function main() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  await createTables(db);

  const lessonFiles = countLessonFiles();
  console.log(`Lesson files on disk: ${lessonFiles}`);

  db.pragma("foreign_keys = OFF");
  await deleteAllProgress(db);
  await deleteAllLessons(db);
  await deleteAllSections(db);
  await deleteAllCategories(db);
  await deleteAllCourses(db);
  db.pragma("foreign_keys = ON");

  const counts = await seedData(db);

  await validateData(db);

  await upsertUser(db, { userId: USER_ID, name: "Player" });

  console.log("\n=== Summary ===");
  console.log(`  Courses:    ${counts.courses}`);
  console.log(`  Categories: ${counts.categories}`);
  console.log(`  Sections:   ${counts.sections}`);
  console.log(`  Lessons:    ${counts.lessons}`);
  console.log(`  Users:      1`);

  db.close();
  console.log("\nSeed complete.");
}

function countLessonFiles(): number {
  return globSync("src/data/lessons/**/*.tsx").length;
}

async function createTables(db: Database.Database) {
  await ensureCourseTable(db);
  await ensureCategoryTable(db);
  await ensureSectionTable(db);
  await ensureLessonTable(db);
  await ensureUserTable(db);
  await ensureProgressTable(db);
}

interface SeedCounts {
  courses: number;
  categories: number;
  sections: number;
  lessons: number;
}

async function seedData(db: Database.Database): Promise<SeedCounts> {
  let courses = 0;
  let categories = 0;
  let sections = 0;
  let lessons = 0;

  for (const [courseSlug, course] of Object.entries(COURSES)) {
    const cid = courseId(courseSlug);
    await createCourse(db, { courseId: cid, slug: courseSlug, title: course.title });
    courses++;

    for (const cat of course.categories) {
      const catid = categoryId(courseSlug, cat.category);
      await createCategory(db, {
        categoryId: catid,
        slug: cat.category,
        title: cat.title,
        courseId: cid,
      });
      categories++;

      for (const sub of cat.subsections) {
        const sid = sectionId(courseSlug, cat.category, sub.subsection);
        await createSection(db, {
          sectionId: sid,
          slug: sub.subsection,
          title: sub.title,
          courseId: cid,
          categoryId: catid,
        });
        sections++;

        for (const lesson of sub.lessons) {
          const lid = lessonId(
            courseSlug,
            cat.category,
            sub.subsection,
            lesson.lesson,
          );
          await createLesson(db, {
            lessonId: lid,
            slug: lesson.lesson,
            title: lesson.title,
            html: "",
            order: lesson.order,
            courseId: cid,
            categoryId: catid,
            sectionId: sid,
          });
          lessons++;
        }
      }
    }
  }

  return { courses, categories, sections, lessons };
}

async function validateData(db: Database.Database) {
  const dbCount = (
    db.prepare("SELECT COUNT(*) AS c FROM lesson").get() as { c: number }
  ).c;
  const fileCount = countLessonFiles();
  if (dbCount !== fileCount) {
    throw new Error(
      `Lesson count mismatch: DB has ${dbCount}, filesystem has ${fileCount}`,
    );
  }

  // Validate each lesson file maps to a seeded lesson
  const filePaths = globSync("src/data/lessons/**/*.tsx");
  for (const filePath of filePaths) {
    const normalized = filePath.replace(/\\/g, "/");
    const parts = normalized.replace(".tsx", "").split("/");
    const srcIdx = parts.lastIndexOf("lessons");
    const courseSlug = parts[srcIdx + 1];
    const rest = parts.slice(srcIdx + 2).join("/");
    const delimIdx = rest.indexOf("__");
    if (delimIdx === -1) continue;

    const subsectionSlug = rest.slice(0, delimIdx);

    // Find which category this subsection belongs to
    const course = COURSES[courseSlug];
    if (!course) {
      throw new Error(`Unknown course ${courseSlug} for ${filePath}`);
    }

    let found = false;
    for (const cat of course.categories) {
      if (cat.subsections.some((s) => s.subsection === subsectionSlug)) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error(
        `Subsection ${subsectionSlug} not found in course ${courseSlug} for ${filePath}`,
      );
    }
  }

  // Validate expected counts per hierarchy level
  let expectedCourses = 0;
  let expectedCategories = 0;
  let expectedSections = 0;
  let expectedLessons = 0;
  for (const [, course] of Object.entries(COURSES)) {
    expectedCourses++;
    for (const cat of course.categories) {
      expectedCategories++;
      for (const sub of cat.subsections) {
        expectedSections++;
        expectedLessons += sub.lessons.length;
      }
    }
  }

  const actualCourses = (
    db.prepare("SELECT COUNT(*) AS c FROM course").get() as { c: number }
  ).c;
  const actualCategories = (
    db.prepare("SELECT COUNT(*) AS c FROM category").get() as { c: number }
  ).c;
  const actualSections = (
    db.prepare("SELECT COUNT(*) AS c FROM section").get() as { c: number }
  ).c;
  const actualLessons = (
    db.prepare("SELECT COUNT(*) AS c FROM lesson").get() as { c: number }
  ).c;

  const checks: [string, number, number][] = [
    ["courses", expectedCourses, actualCourses],
    ["categories", expectedCategories, actualCategories],
    ["sections", expectedSections, actualSections],
    ["lessons", expectedLessons, actualLessons],
  ];

  for (const [label, expected, actual] of checks) {
    if (expected !== actual) {
      throw new Error(
        `Validation failed: expected ${expected} ${label}, got ${actual}`,
      );
    }
  }

  console.log(`  All ${fileCount} lessons validated against filesystem.`);
}

main();
