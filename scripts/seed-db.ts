import { type ChildProcess, spawn } from "node:child_process";

import { globSync, readFileSync } from "node:fs";
import Database from "better-sqlite3";
import de from "../.data/scraped/courses/data-engineering";
import fundamentals from "../.data/scraped/courses/fundamentals";
import mlSysDesign from "../.data/scraped/courses/ml-system-design";
import {
  ensureCategoryTable,
  ensureCourseTable,
  ensureLessonTable,
  ensureProgressTable,
  ensureSectionTable,
  ensureUsersTable,
} from "../src/db/base_sql";
import { createCategory, deleteAllCategories } from "../src/db/category_sql";
import { createCourse, deleteAllCourses } from "../src/db/course_sql";
import { createLesson, deleteAllLessons } from "../src/db/lesson_sql";
import { deleteAllProgress } from "../src/db/progress_sql";
import { createSection, deleteAllSections } from "../src/db/section_sql";
import { deleteAllUsers } from "../src/db/users_sql";
import { EMPTY_DB_PATH } from "../src/utils/constants";
import { extractRelevantText } from "../src/utils/search-utils";

type Course = {
  title: string;
  categories: {
    category: string;
    title: string;
    sections: {
      section: string;
      title: string;
      lessons: { lesson: string; title: string; order: number }[];
    }[];
  }[];
};

const COURSES: Record<string, Course> = {
  "data-engineering": de,
  "ml-system-design": mlSysDesign,
  fundamentals: fundamentals,
};

// ENTRY POINT
async function main() {
  const db = new Database(EMPTY_DB_PATH);
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
  // Reset auto-increment so IDs start from 1 — keeps INSERT OR REPLACE matching in sync
  db.exec("DELETE FROM sqlite_sequence");
  db.pragma("foreign_keys = ON");

  const keywordMap = await enrichKeywords();
  await seedCourseData(db, keywordMap);

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

  console.log(`\nSeed ${EMPTY_DB_PATH} complete.`);
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

async function seedCourseData(
  db: Database.Database,
  keywordMap: Map<string, string[]>,
) {
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

      for (const sub of cat.sections) {
        const sid = (
          await createSection(db, {
            slug: sub.section,
            title: sub.title,
            courseId: cid,
            categoryId: catid,
          })
        )?.id as string;

        for (const lesson of sub.lessons) {
          const html = rendered.get(lesson.lesson) ?? "";
          const keywords = JSON.stringify(keywordMap.get(lesson.lesson) ?? []);
          await createLesson(db, {
            slug: lesson.lesson,
            title: lesson.title,
            html,
            lessonOrder: lesson.order,
            courseId: cid,
            categoryId: catid,
            sectionId: sid,
            keywords,
          });
        }
      }
    }
  }
}

async function enrichKeywords(): Promise<Map<string, string[]>> {
  const port = process.env.RAG_ENRICH_PORT ?? "8001";

  const rendered = extractAllLessonHtml();
  const slugs = [...rendered.keys()];
  const texts = slugs.map((slug) =>
    extractRelevantText(rendered.get(slug) ?? ""),
  );

  console.log(`Enriching ${texts.length} lessons with TF-IDF keywords...`);
  console.log("Starting RAG API on port", port);

  const proc: ChildProcess = spawn(
    "uv",
    [
      "run",
      "uvicorn",
      "rag_api.app:app",
      "--host",
      "127.0.0.1",
      "--port",
      port,
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, LOG_LEVEL: "WARNING" },
    },
  );

  proc.stderr?.on("data", () => {});

  // Wait for health
  const baseUrl = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`${baseUrl}/health`);
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  if (!ready) {
    proc.kill();
    console.warn("Keyword enrichment skipped: RAG API not available");
    return new Map();
  }

  try {
    const res = await fetch(`${baseUrl}/extract_keywords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts }),
      signal: AbortSignal.timeout(120_000),
    });
    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }
    const { results } = (await res.json()) as { results: string[][] };
    const map = new Map<string, string[]>();
    for (let i = 0; i < slugs.length; i++) {
      map.set(slugs[i], results[i] ?? []);
    }
    console.log(`Enriched ${map.size} lessons with keywords`);
    return map;
  } catch (err) {
    console.warn("Keyword enrichment skipped:", err);
    return new Map();
  } finally {
    proc.kill();
  }
}

main();
