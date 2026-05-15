import Database from "better-sqlite3";
import { globSync } from "node:fs";
import de from "../src/data/courses/data-engineering";
import mlSysDesign from "../src/data/courses/ml-system-design";
import { courseId, categoryId, sectionId, lessonId } from "../src/utils/id";
import {
  ensureCourseTable,
  ensureCategoryTable,
  ensureSectionTable,
  ensureLessonTable,
  ensureUserTable,
  ensureProgressTable,
} from "../src/db/schema_sql";
import {
  deleteAllProgress,
} from "../src/db/progress_sql";
import {
  deleteAllLessons,
  deleteAllSections,
  deleteAllCategories,
  deleteAllCourses,
  createCourse,
  createCategory,
  createSection,
  createLesson,
} from "../src/db/course_sql";
import { upsertUser } from "../src/db/user_sql";

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

  if (counts.lessons !== lessonFiles) {
    throw new Error(
      `Mismatch: seeded ${counts.lessons} lessons, expected ${lessonFiles} files`,
    );
  }

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
    await createCourse(db, { courseId: cid, title: course.title });
    courses++;

    for (const cat of course.categories) {
      const catid = categoryId(courseSlug, cat.category);
      await createCategory(db, {
        categoryId: catid,
        title: cat.title,
        courseId: cid,
      });
      categories++;

      for (const sub of cat.subsections) {
        const sid = sectionId(courseSlug, cat.category, sub.subsection);
        await createSection(db, {
          sectionId: sid,
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

main();
