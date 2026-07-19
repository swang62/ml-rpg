#!/usr/bin/env tsx
/**
 * Generates chunked D1-compatible SQL seed files from the rag_api lessons.db.
 *
 * lessons.db is version-controlled, so this works in CI without .data/scraped/.
 *
 * Usage:
 *   pnpm export:d1
 *   ./scripts/seed-staging.sh   (calls this internally before uploading)
 */

import { globSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAG_DB_PATH = join(ROOT, "rag_api/data/lessons.db");
const SEED_PREFIX = join(ROOT, ".data/d1-seed-");
const MAX_LESSONS_PER_CHUNK = 600;

function escapeSql(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  const str = String(val);
  return `'${str.replace(/'/g, "''")}'`;
}

function main() {
  mkdirSync(join(ROOT, ".data"), { recursive: true });

  // Clean old chunks
  for (const old of globSync(".data/d1-seed-*.sql")) {
    rmSync(join(ROOT, old));
  }

  console.log(`Reading content from ${RAG_DB_PATH}...`);
  const db = new Database(RAG_DB_PATH, { readonly: true });

  const courses = db
    .prepare("SELECT id, slug, title FROM course ORDER BY id")
    .all() as { id: number; slug: string; title: string }[];

  const categories = db
    .prepare(
      "SELECT id, slug, title, course_id AS courseid FROM category ORDER BY id",
    )
    .all() as {
    id: number;
    slug: string;
    title: string;
    courseid: number;
  }[];

  const sections = db
    .prepare(
      "SELECT id, slug, title, course_id AS courseid, category_id AS categoryid FROM section ORDER BY id",
    )
    .all() as {
    id: number;
    slug: string;
    title: string;
    courseid: number;
    categoryid: number;
  }[];

  const lessons = db
    .prepare(
      "SELECT id, slug, title, html, lesson_highlights AS lessonhighlights, lesson_order AS lessonorder, course_id AS courseid, category_id AS categoryid, section_id AS sectionid, keywords FROM lesson ORDER BY id",
    )
    .all() as {
    id: number;
    slug: string;
    title: string;
    html: string;
    lessonhighlights: string;
    lessonorder: number;
    courseid: number;
    categoryid: number;
    sectionid: number;
    keywords: string;
  }[];

  db.close();

  // Build header (reused in every chunk)
  const header: string[] = [];
  header.push("-- D1 content seed — exported from rag_api lessons.db");
  header.push("");

  header.push("-- Courses");
  for (const row of courses) {
    header.push(
      `INSERT OR REPLACE INTO course (id, slug, title) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)});`,
    );
  }
  header.push("");

  header.push("-- Categories");
  for (const row of categories) {
    header.push(
      `INSERT OR REPLACE INTO category (id, slug, title, course_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseid});`,
    );
  }
  header.push("");

  header.push("-- Sections");
  for (const row of sections) {
    header.push(
      `INSERT OR REPLACE INTO section (id, slug, title, course_id, category_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseid}, ${row.categoryid});`,
    );
  }
  header.push("");

  const totalChunks = Math.ceil(lessons.length / MAX_LESSONS_PER_CHUNK);
  for (let chunkIdx = 0; chunkIdx < totalChunks; chunkIdx++) {
    const chunk = lessons.slice(
      chunkIdx * MAX_LESSONS_PER_CHUNK,
      (chunkIdx + 1) * MAX_LESSONS_PER_CHUNK,
    );

    const lines = [...header];
    lines.push(`-- Lessons (chunk ${chunkIdx + 1}/${totalChunks})`);
    for (const row of chunk) {
      lines.push(
        `INSERT OR REPLACE INTO lesson (id, slug, title, html, lesson_highlights, lesson_order, course_id, category_id, section_id, keywords) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${escapeSql(row.html)}, ${escapeSql(row.lessonhighlights)}, ${row.lessonorder}, ${row.courseid}, ${row.categoryid}, ${row.sectionid}, ${escapeSql(row.keywords)});`,
      );
    }
    lines.push("");

    const file = `${SEED_PREFIX}${String(chunkIdx).padStart(2, "0")}.sql`;
    writeFileSync(file, lines.join("\n"), "utf-8");
  }

  console.log(`Wrote ${totalChunks} seed chunk(s) (${lessons.length} lessons)`);
}

main();
