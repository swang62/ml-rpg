#!/usr/bin/env tsx
/**
 * Generates a D1-compatible SQL seed file from the rag_api SQLite DB.
 *
 * This is a fallback/reference — the primary seed flow is `pnpm generate`
 * which reads directly from scraped lesson files.
 *
 * Usage:
 *   pnpm export:d1                    # writes d1-seed.sql
 *   wrangler d1 execute ml-rpg-content --local --file=d1-seed.sql
 */

import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RAG_DB_PATH = join(ROOT, "rag_api/data/lessons.db");
const OUTPUT_FILE = join(ROOT, "d1-seed.sql");

function escapeSql(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  const str = String(val);
  return `'${str.replace(/'/g, "''")}'`;
}

function main() {
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
      "SELECT id, slug, title, html, lesson_order AS lessonorder, course_id AS courseid, category_id AS categoryid, section_id AS sectionid, keywords FROM lesson ORDER BY id",
    )
    .all() as {
    id: number;
    slug: string;
    title: string;
    html: string;
    lessonorder: number;
    courseid: number;
    categoryid: number;
    sectionid: number;
    keywords: string;
  }[];

  db.close();

  const canonical = JSON.stringify({ courses, categories, sections, lessons });
  const versionHash = createHash("sha256")
    .update(canonical, "utf-8")
    .digest("hex");

  const lines: string[] = [];
  const push = (s: string) => lines.push(s);

  push("-- D1 content seed — generated from rag_api lessons.db");
  push(`-- Version: ${versionHash.slice(0, 12)}`);
  push(
    `-- Rows: ${courses.length} courses, ${categories.length} categories, ${sections.length} sections, ${lessons.length} lessons`,
  );
  push("");

  push("-- Courses");
  for (const row of courses) {
    push(
      `INSERT OR REPLACE INTO course (id, slug, title) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)});`,
    );
  }
  push("");

  push("-- Categories");
  for (const row of categories) {
    push(
      `INSERT OR REPLACE INTO category (id, slug, title, course_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseid});`,
    );
  }
  push("");

  push("-- Sections");
  for (const row of sections) {
    push(
      `INSERT OR REPLACE INTO section (id, slug, title, course_id, category_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseid}, ${row.categoryid});`,
    );
  }
  push("");

  push("-- Lessons");
  for (const row of lessons) {
    push(
      `INSERT OR REPLACE INTO lesson (id, slug, title, html, lesson_order, course_id, category_id, section_id, keywords) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${escapeSql(row.html)}, ${row.lessonorder}, ${row.courseid}, ${row.categoryid}, ${row.sectionid}, ${escapeSql(row.keywords)})`,
    );
  }
  push("");

  push("-- Content version tracking");
  push(
    `INSERT OR REPLACE INTO content_version (id, version_hash, row_count_hash, applied_at) VALUES (1, ${escapeSql(versionHash)}, ${escapeSql(versionHash.slice(0, 16))}, datetime('now'));`,
  );

  push("");

  const sql = lines.join("\n");
  const sizeKb = (Buffer.byteLength(sql, "utf-8") / 1024).toFixed(1);
  writeFileSync(OUTPUT_FILE, sql, "utf-8");
  console.log(`Wrote ${OUTPUT_FILE} (${sizeKb} KB)`);
  console.log(`Content version: ${versionHash.slice(0, 12)}`);
}

main();
