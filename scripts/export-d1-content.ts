#!/usr/bin/env tsx
/**
 * Generates a D1-compatible SQL seed file from the current empty.db.
 *
 * Reads all course, category, section, and lesson rows from empty.db,
 * outputs INSERT … ON CONFLICT DO UPDATE statements with explicit IDs,
 * and records a deterministic content version hash for idempotency.
 *
 * User/progress data is NOT exported.
 *
 * Usage:
 *   pnpm export:d1                    # writes d1-seed.sql
 *   wrangler d1 execute ml-rpg-content --local --file=d1-seed.sql
 */

import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import Database from "better-sqlite3";
import { EMPTY_DB_PATH } from "../src/utils/constants";

const OUTPUT_FILE = "d1-seed.sql";

function escapeSql(val: unknown): string {
  if (val === null || val === undefined) return "NULL";
  const str = String(val);
  return `'${str.replace(/'/g, "''")}'`;
}

function main() {
  console.log(`Reading content from ${EMPTY_DB_PATH}...`);
  const db = new Database(EMPTY_DB_PATH, { readonly: true });

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

  // Deterministic content hash: canonical JSON of all rows ordered by ID
  const canonical = JSON.stringify({ courses, categories, sections, lessons });
  const versionHash = createHash("sha256")
    .update(canonical, "utf-8")
    .digest("hex");

  // Short row-count hash for quick scan
  const rowCountHash = createHash("sha256")
    .update(
      `courses:${courses.length},categories:${categories.length},sections:${sections.length},lessons:${lessons.length}`,
      "utf-8",
    )
    .digest("hex")
    .slice(0, 16);

  const lines: string[] = [];
  const push = (s: string) => lines.push(s);

  push("-- D1 content seed — generated from empty.db");
  push(`-- Version: ${versionHash.slice(0, 12)}`);
  push(
    `-- Rows: ${courses.length} courses, ${categories.length} categories, ${sections.length} sections, ${lessons.length} lessons`,
  );
  push("");

  // Courses (no FK dependencies)
  push("-- Courses");
  for (const row of courses) {
    push(
      `INSERT INTO course (id, slug, title) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}) ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title;`,
    );
  }
  push("");

  // Categories (depend on course)
  push("-- Categories");
  for (const row of categories) {
    push(
      `INSERT INTO category (id, slug, title, course_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseid}) ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title, course_id = excluded.course_id;`,
    );
  }
  push("");

  // Sections (depend on course + category)
  push("-- Sections");
  for (const row of sections) {
    push(
      `INSERT INTO section (id, slug, title, course_id, category_id) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${row.courseid}, ${row.categoryid}) ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title, course_id = excluded.course_id, category_id = excluded.category_id;`,
    );
  }
  push("");

  // Lessons (depend on course + category + section)
  push("-- Lessons");
  for (const row of lessons) {
    push(
      `INSERT INTO lesson (id, slug, title, html, lesson_order, course_id, category_id, section_id, keywords) VALUES (${row.id}, ${escapeSql(row.slug)}, ${escapeSql(row.title)}, ${escapeSql(row.html)}, ${row.lessonorder}, ${row.courseid}, ${row.categoryid}, ${row.sectionid}, ${escapeSql(row.keywords)}) ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title, html = excluded.html, lesson_order = excluded.lesson_order, course_id = excluded.course_id, category_id = excluded.category_id, section_id = excluded.section_id, keywords = excluded.keywords;`,
    );
  }
  push("");

  // Content version
  push("-- Content version tracking");
  push(
    `INSERT OR REPLACE INTO content_version (id, version_hash, row_count_hash, applied_at) VALUES (1, ${escapeSql(versionHash)}, ${escapeSql(rowCountHash)}, datetime('now'));`,
  );

  push("");

  const sql = lines.join("\n");
  const sizeKb = (Buffer.byteLength(sql, "utf-8") / 1024).toFixed(1);
  writeFileSync(OUTPUT_FILE, sql, "utf-8");
  console.log(`Wrote ${OUTPUT_FILE} (${sizeKb} KB)`);
  console.log(`Content version: ${versionHash.slice(0, 12)}`);
}

main();
