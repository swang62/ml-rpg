import { globSync } from "node:fs";
import Database from "better-sqlite3";
import de from "../.data/raw/courses/data-engineering.ts";
import mlSysDesign from "../.data/raw/courses/ml-system-design.ts";
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

  await seedData(db);

  const dbCount = (
    db.prepare("SELECT COUNT(*) AS lessoncount FROM lesson").get() as {
      lessoncount: number;
    }
  ).lessoncount;
  if (dbCount !== lessonFiles) {
    throw new Error(
      `Lesson count mismatch: seeded ${dbCount}, expected ${lessonFiles}`,
    );
  }

  await upsertUser(db, { slug: USER_ID, name: "Player" });

  console.log(`  Lessons:    ${dbCount} (HTML rendered lazily on first access)`);
  db.close();
  console.log("\nSeed complete.");
}

function countLessonFiles(): number {
  return globSync(".data/raw/lessons/**/*.tsx").length;
}

async function createTables(db: Database.Database) {
  await ensureCourseTable(db);
  await ensureCategoryTable(db);
  await ensureSectionTable(db);
  await ensureLessonTable(db);
  await ensureUserTable(db);
  await ensureProgressTable(db);
}

async function seedData(db: Database.Database) {
  for (const [courseSlug, course] of Object.entries(COURSES)) {
    const { id: cid } = (await createCourse(db, {
      slug: courseSlug,
      title: course.title,
    }))!;

    for (const cat of course.categories) {
      const { id: catid } = (await createCategory(db, {
        slug: cat.category,
        title: cat.title,
        courseId: cid,
      }))!;

      for (const sub of cat.subsections) {
        const { id: sid } = (await createSection(db, {
          slug: sub.subsection,
          title: sub.title,
          courseId: cid,
          categoryId: catid,
        }))!;

        for (const lesson of sub.lessons) {
          await createLesson(db, {
            slug: lesson.lesson,
            title: lesson.title,
            html: "",
            order: lesson.order,
            courseId: cid,
            categoryId: catid,
            sectionId: sid,
          });
        }
      }
    }
  }
}

main();
