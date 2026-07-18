#!/usr/bin/env tsx

/**
 * Seed script — reads raw lesson HTML files and course structure,
 * then emits:
 *   1. A D1-compatible SQL seed file (d1-seed.sql) for the frontend
 *   2. A standalone SQLite DB (rag_api/data/lessons.db) for rag_api ingestion
 *
 * Usage:
 *   pnpm seed
 *
 * The D1 seed file is applied via:
 *   wrangler d1 execute ml-rpg-content --local --file=d1-seed.sql
 *
 * The rag_api SQLite DB is picked up automatically by rag_api at startup.
 */

import { createHash } from "node:crypto";
import {
  existsSync,
  globSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import { cleanTitle } from "./acronyms";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SCRAPED_DIR = join(ROOT, ".data/scraped");
const D1_SEED_FILE = join(ROOT, "d1-seed.sql");
const RAG_DB_DIR = join(ROOT, "rag_api/data");
const RAG_DB_PATH = join(RAG_DB_DIR, "lessons.db");

// ---------------------------------------------------------------------------
// Course hierarchy types (matches .data/scraped/types.ts)
// ---------------------------------------------------------------------------

interface Lesson {
  lesson: string;
  title: string;
  order: number;
}

interface Section {
  section: string;
  title: string;
  lessons: Lesson[];
}

interface Category {
  category: string;
  title: string;
  sections: Section[];
}

interface Course {
  title: string;
  categories: Category[];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  // 1. Load course structures from scraped .ts files
  // Use eval + readFileSync + Function to avoid ESM import issues with .ts files
  const courseFiles: [string, string][] = [
    ["fundamentals", join(SCRAPED_DIR, "courses/fundamentals.ts")],
    ["data-engineering", join(SCRAPED_DIR, "courses/data-engineering.ts")],
    ["ml-system-design", join(SCRAPED_DIR, "courses/ml-system-design.ts")],
  ];

  const courses: Record<string, Course> = {};
  for (const [slug, filePath] of courseFiles) {
    const source = readFileSync(filePath, "utf-8");
    // Strip the import line and wrap as a module
    const cleanSource = source
      .replace(/^import type.*$/m, "")
      .replace(/^import .*$/m, "")
      .replace(/^export default .*/m, "")
      .replace(/\b(const|let|var)\s+(\w+)\s*:\s*\w+\s*=\s*/g, "$1 $2 = ");
    // eslint-disable-next-line no-new-func
    const mod = new Function(`${cleanSource}; return course;`)() as Course;
    courses[slug] = mod;
  }

  // 2. Extract all lesson HTML from scraped TSX files
  console.log("Extracting HTML from scraped lesson files...");
  const lessonHtml = extractAllLessonHtml();

  // 3. Build seed data with stable IDs
  console.log("Building seed data...");
  const seed = buildSeedData(courses, lessonHtml);

  // 4. Emit D1 SQL seed file
  console.log("Writing D1 SQL seed file...");
  writeD1Seed(seed);

  // 5. Emit rag_api SQLite DB
  console.log("Writing rag_api SQLite DB...");
  writeRagDb(seed);

  // 6. Validate lesson count
  const lessonFiles = countLessonFiles();
  if (seed.lessons.length !== lessonFiles) {
    throw new Error(
      `Lesson count mismatch: seeded ${seed.lessons.length}, expected ${lessonFiles}`,
    );
  }

  console.log(
    `\nSeed complete: ${seed.courses.length} courses, ${seed.categories.length} categories, ${seed.sections.length} sections, ${seed.lessons.length} lessons`,
  );
  console.log(`  D1 seed:  ${D1_SEED_FILE}`);
  console.log(`  RAG DB:   ${RAG_DB_PATH}`);
}

// ---------------------------------------------------------------------------
// Data extraction
// ---------------------------------------------------------------------------

function countLessonFiles(): number {
  return globSync(".data/scraped/lessons/**/*.tsx").length;
}

function extractAllLessonHtml(): Map<string, string> {
  const files = globSync(".data/scraped/lessons/**/*.tsx");
  const result = new Map<string, string>();

  // Track deduplication
  const seen = new Set<string>();

  for (const file of files) {
    const normalized = file.replace(/\\/g, "/");
    const parts = normalized.replace(/\.tsx$/, "").split("/");
    const srcIdx = parts.lastIndexOf("lessons");
    if (srcIdx === -1) continue;
    const rest = parts.slice(srcIdx + 2).join("/");
    const delimIdx = rest.indexOf("__");
    if (delimIdx === -1) continue;
    const lessonSlug = rest.slice(delimIdx + 2);

    // Skip duplicate slugs (last file wins)
    if (seen.has(lessonSlug)) continue;
    seen.add(lessonSlug);

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

// ---------------------------------------------------------------------------
// Seed data builder
// ---------------------------------------------------------------------------

interface SeedCourse {
  id: number;
  slug: string;
  title: string;
}

interface SeedCategory {
  id: number;
  slug: string;
  title: string;
  courseId: number;
}

interface SeedSection {
  id: number;
  slug: string;
  title: string;
  courseId: number;
  categoryId: number;
}

interface SeedLesson {
  id: number;
  slug: string;
  title: string;
  html: string;
  lessonOrder: number;
  courseId: number;
  categoryId: number;
  sectionId: number;
  keywords: string;
}

interface SeedData {
  courses: SeedCourse[];
  categories: SeedCategory[];
  sections: SeedSection[];
  lessons: SeedLesson[];
}

function buildSeedData(
  courses: Record<string, Course>,
  lessonHtml: Map<string, string>,
): SeedData {
  let nextId = 1;

  const seedCourses: SeedCourse[] = [];
  const seedCategories: SeedCategory[] = [];
  const seedSections: SeedSection[] = [];
  const seedLessons: SeedLesson[] = [];

  for (const [courseSlug, courseData] of Object.entries(courses)) {
    const courseId = nextId++;
    seedCourses.push({
      id: courseId,
      slug: courseSlug,
      title: cleanTitle(courseData.title),
    });

    for (const cat of courseData.categories) {
      const catId = nextId++;
      seedCategories.push({
        id: catId,
        slug: cat.category,
        title: cleanTitle(cat.title),
        courseId,
      });

      for (const sub of cat.sections) {
        const secId = nextId++;
        seedSections.push({
          id: secId,
          slug: sub.section,
          title: cleanTitle(sub.title),
          courseId,
          categoryId: catId,
        });

        for (const lesson of sub.lessons) {
          const html = lessonHtml.get(lesson.lesson) ?? "";
          seedLessons.push({
            id: nextId++,
            slug: lesson.lesson,
            title: cleanTitle(lesson.title),
            html,
            lessonOrder: lesson.order,
            courseId,
            categoryId: catId,
            sectionId: secId,
            keywords: "[]",
          });
        }
      }
    }
  }

  return {
    courses: seedCourses,
    categories: seedCategories,
    sections: seedSections,
    lessons: seedLessons,
  };
}

// ---------------------------------------------------------------------------
// D1 SQL seed emission
// ---------------------------------------------------------------------------

function escapeSql(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  const str = String(val);
  return `'${str.replace(/'/g, "''")}'`;
}

function writeD1Seed(seed: SeedData): void {
  // Compute deterministic content hash
  const canonical = JSON.stringify(seed);
  const versionHash = createHash("sha256")
    .update(canonical, "utf-8")
    .digest("hex");

  const lines: string[] = [];
  const push = (s: string) => lines.push(s);

  push("-- D1 content seed — generated from scraped lesson files");
  push(`-- Version: ${versionHash.slice(0, 12)}`);
  push(
    `-- Rows: ${seed.courses.length} courses, ${seed.categories.length} categories, ${seed.sections.length} sections, ${seed.lessons.length} lessons`,
  );
  push("");

  // Courses
  push("-- Courses");
  for (const row of seed.courses) {
    push(
      `INSERT OR REPLACE INTO course (id, slug, title) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)});`,
    );
  }
  push("");

  // Categories
  push("-- Categories");
  for (const row of seed.categories) {
    push(
      `INSERT OR REPLACE INTO category (id, slug, title, course_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseId});`,
    );
  }
  push("");

  // Sections
  push("-- Sections");
  for (const row of seed.sections) {
    push(
      `INSERT OR REPLACE INTO section (id, slug, title, course_id, category_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseId}, ${row.categoryId});`,
    );
  }
  push("");

  // Lessons
  push("-- Lessons");
  for (const row of seed.lessons) {
    push(
      `INSERT OR REPLACE INTO lesson (id, slug, title, html, lesson_order, course_id, category_id, section_id, keywords) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${escapeSql(row.html)}, ${row.lessonOrder}, ${row.courseId}, ${row.categoryId}, ${row.sectionId}, ${escapeSql(row.keywords)});`,
    );
  }
  push("");

  // Content version
  push("-- Content version tracking");
  push(
    "CREATE TABLE IF NOT EXISTS content_version (id INTEGER PRIMARY KEY, version_hash TEXT, row_count_hash TEXT, applied_at TEXT);",
  );
  push(
    `INSERT OR REPLACE INTO content_version (id, version_hash, row_count_hash, applied_at) VALUES (1, ${escapeSql(versionHash)}, ${escapeSql(versionHash.slice(0, 16))}, datetime('now'));`,
  );

  push("");

  writeFileSync(D1_SEED_FILE, lines.join("\n"), "utf-8");
  console.log(`  Wrote ${D1_SEED_FILE} (${lines.length} lines)`);
}

// ---------------------------------------------------------------------------
// rag_api SQLite DB emission
// ---------------------------------------------------------------------------

function writeRagDb(seed: SeedData): void {
  if (!existsSync(RAG_DB_DIR)) {
    mkdirSync(RAG_DB_DIR, { recursive: true });
  }

  // Remove existing DB if present
  try {
    if (existsSync(RAG_DB_PATH)) {
      const old = new Database(RAG_DB_PATH);
      old.close();
      // Remove it — will be rewritten
    }
  } catch {
    // Ignore
  }

  const db = new Database(RAG_DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  // Create schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS course (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS category (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      course_id INTEGER NOT NULL REFERENCES course(id),
      UNIQUE(course_id, slug)
    );
    CREATE TABLE IF NOT EXISTS section (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      course_id INTEGER NOT NULL REFERENCES course(id),
      category_id INTEGER NOT NULL REFERENCES category(id),
      UNIQUE(course_id, category_id, slug)
    );
    CREATE TABLE IF NOT EXISTS lesson (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      html TEXT NOT NULL DEFAULT '',
      lesson_order INTEGER NOT NULL DEFAULT 0,
      course_id INTEGER NOT NULL REFERENCES course(id),
      category_id INTEGER NOT NULL REFERENCES category(id),
      section_id INTEGER NOT NULL REFERENCES section(id),
      keywords TEXT NOT NULL DEFAULT '[]',
      UNIQUE(course_id, category_id, section_id, slug)
    );
  `);

  // Clear existing data
  db.exec("DELETE FROM lesson");
  db.exec("DELETE FROM section");
  db.exec("DELETE FROM category");
  db.exec("DELETE FROM course");

  // Insert data
  const insertCourse = db.prepare(
    "INSERT INTO course (id, slug, title) VALUES (?, ?, ?)",
  );
  const insertCategory = db.prepare(
    "INSERT INTO category (id, slug, title, course_id) VALUES (?, ?, ?, ?)",
  );
  const insertSection = db.prepare(
    "INSERT INTO section (id, slug, title, course_id, category_id) VALUES (?, ?, ?, ?, ?)",
  );
  const insertLesson = db.prepare(
    "INSERT INTO lesson (id, slug, title, html, lesson_order, course_id, category_id, section_id, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );

  const tx = db.transaction(() => {
    for (const row of seed.courses) {
      insertCourse.run(row.id, row.slug, row.title);
    }
    for (const row of seed.categories) {
      insertCategory.run(row.id, row.slug, row.title, row.courseId);
    }
    for (const row of seed.sections) {
      insertSection.run(
        row.id,
        row.slug,
        row.title,
        row.courseId,
        row.categoryId,
      );
    }
    for (const row of seed.lessons) {
      insertLesson.run(
        row.id,
        row.slug,
        row.title,
        row.html,
        row.lessonOrder,
        row.courseId,
        row.categoryId,
        row.sectionId,
        row.keywords,
      );
    }
  });

  tx();
  db.close();

  const sizeKb = (() => {
    try {
      const st = statSync(RAG_DB_PATH);
      return (st.size / 1024).toFixed(1);
    } catch {
      return "unknown";
    }
  })();
  console.log(`  Wrote ${RAG_DB_PATH} (${sizeKb} KB)`);
}

main();
