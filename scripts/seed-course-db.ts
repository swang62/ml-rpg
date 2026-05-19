import { copyFileSync, globSync, readFileSync } from "node:fs";
import Database from "better-sqlite3";
import de from "../.data/scraped/courses/data-engineering.ts";
import mlSysDesign from "../.data/scraped/courses/ml-system-design.ts";
import {
  ensureCategoryTable,
  ensureCourseTable,
  ensureLessonTable,
  ensureProgressTable,
  ensureSectionTable,
  ensureUsersTable,
} from "../src/db/base_sql.ts";
import { createCategory, deleteAllCategories } from "../src/db/category_sql.ts";
import { createCourse, deleteAllCourses } from "../src/db/course_sql.ts";
import { createLesson, deleteAllLessons } from "../src/db/lesson_sql.ts";
import { deleteAllProgress } from "../src/db/progress_sql.ts";
import { createSection, deleteAllSections } from "../src/db/section_sql.ts";
import { deleteAllUsers } from "../src/db/users_sql.ts";
import { COURSE_DB_PATH, EMPTY_DB_PATH } from "../src/utils/constants";

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

// ENTRY POINT
async function main() {
  const db = new Database(COURSE_DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  await ensureCourseTable(db);
  await ensureCategoryTable(db);
  await ensureSectionTable(db);
  await ensureLessonTable(db);
  await ensureProgressTable(db);
  await ensureUsersTable(db);

  db.pragma("foreign_keys = OFF");
  await deleteAllUsers(db);
  await deleteAllProgress(db);
  await deleteAllLessons(db);
  await deleteAllSections(db);
  await deleteAllCategories(db);
  await deleteAllCourses(db);
  db.pragma("foreign_keys = ON");

  await seedCourseData(db);

  // Validation, lesson files must match imported unique lessons
  const lessonFiles = countLessonFiles();
  console.log(`Lesson files on disk: ${lessonFiles}`);

  const validLessons = (
    db
      .prepare("SELECT COUNT(*) AS lessoncount FROM lesson WHERE html != ''")
      .get() as {
      lessoncount: number;
    }
  ).lessoncount;
  if (validLessons !== lessonFiles) {
    throw new Error(
      `Lesson count mismatch: seeded ${validLessons}, expected ${lessonFiles}`,
    );
  }

  console.log(`Imported lessons: ${validLessons} containing valid HTML`);
  db.close();

  copyFileSync(COURSE_DB_PATH, EMPTY_DB_PATH);
  console.log("\nSeed complete.");
}

function countLessonFiles(): number {
  return globSync(".data/scraped/lessons/**/*.tsx").length;
}

function extractAllLessonHtml(): Map<string, string> {
  const files = globSync(".data/scraped/lessons/**/*.tsx");
  const result = new Map<string, string>();

  for (const file of files) {
    const normalized = file.replace(/\\/g, "/");
    const parts = normalized.replace(/\.tsx$/, "").split("/");
    const srcIdx = parts.lastIndexOf("lessons");
    if (srcIdx === -1) continue;
    const rest = parts.slice(srcIdx + 2).join("/");
    const delimIdx = rest.indexOf("__");
    if (delimIdx === -1) continue;
    const lessonSlug = rest.slice(delimIdx + 2);

    const html = extractHtmlFromTsx(file);
    if (html) {
      result.set(lessonSlug, html);
    }
  }

  return result;
}

function extractHtmlFromTsx(filePath: string): string {
  const source = readFileSync(filePath, "utf-8");

  // Find the return content: () => ( ... );
  let start = source.indexOf("=> (");
  if (start === -1) return "";

  start = source.indexOf("(", start + 3);
  if (start === -1) return "";

  // Match the outermost parentheses accounting for nesting
  let depth = 1;
  let pos = start + 1;
  while (depth > 0 && pos < source.length) {
    if (source[pos] === "(") depth++;
    else if (source[pos] === ")") depth--;
    pos++;
  }
  if (depth !== 0) return "";
  const inner = source.slice(start + 1, pos - 1);

  // Clean up JSX-specific syntax
  let html = inner
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();

  // Wrap bare text fragments in a container if needed
  if (!html.startsWith("<")) {
    html = `<div>${html}</div>`;
  }

  return html;
}

async function seedCourseData(db: Database.Database) {
  console.log("Extracting HTML from scraped files...");
  const rendered = extractAllLessonHtml();

  for (const [courseSlug, course] of Object.entries(COURSES)) {
    const cid = (
      await createCourse(db, {
        slug: courseSlug,
        title: course.title,
      })
    )?.id as string;

    for (const cat of course.categories) {
      const catid = (
        await createCategory(db, {
          slug: cat.category,
          title: cat.title,
          courseId: cid,
        })
      )?.id as string;

      for (const sub of cat.subsections) {
        const sid = (
          await createSection(db, {
            slug: sub.subsection,
            title: sub.title,
            courseId: cid,
            categoryId: catid,
          })
        )?.id as string;

        for (const lesson of sub.lessons) {
          const html = rendered.get(lesson.lesson) ?? "";
          await createLesson(db, {
            slug: lesson.lesson,
            title: lesson.title,
            html,
            lessonOrder: lesson.order,
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
