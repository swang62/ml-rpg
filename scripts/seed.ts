/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import { globSync, readFileSync } from "node:fs";
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

  console.log("Extracting HTML from TSX files...");
  const rendered = extractAllLessonHtml();
  console.log(`  Extracted ${rendered.size} lesson HTML strings.`);

  await seedData(db, rendered);

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

  const htmlCount = (
    db.prepare("SELECT COUNT(*) AS c FROM lesson WHERE html != ''").get() as {
      c: number;
    }
  ).c;
  console.log(`  Lessons:    ${dbCount} (${htmlCount} with HTML)`);
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

function extractAllLessonHtml(): Map<string, string> {
  const files = globSync(".data/raw/lessons/**/*.tsx");
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
    // Remove JSX expression blocks: {expression}
    .replace(/\{[^}]+\}/g, "")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    // Remove whitespace around tag brackets
    .replace(/>\s+</g, "><")
    .trim();

  // Wrap bare text fragments in a container if needed
  if (!html.startsWith("<")) {
    html = `<div>${html}</div>`;
  }

  return html;
}

async function seedData(db: Database.Database, rendered: Map<string, string>) {
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
          const html = rendered.get(lesson.lesson) ?? "";
          await createLesson(db, {
            slug: lesson.lesson,
            title: lesson.title,
            html,
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
