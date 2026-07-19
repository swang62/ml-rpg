-- D1 schema for course content (no user/progress tables)
-- Apply: wrangler d1 migrations apply ml-rpg-content --local

CREATE TABLE IF NOT EXISTS course (
  id INTEGER NOT NULL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  id INTEGER NOT NULL PRIMARY KEY,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  course_id INTEGER NOT NULL,
  UNIQUE(course_id, slug)
);

CREATE TABLE IF NOT EXISTS section (
  id INTEGER NOT NULL PRIMARY KEY,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  course_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  UNIQUE(course_id, category_id, slug)
);

CREATE TABLE IF NOT EXISTS lesson (
  id INTEGER NOT NULL PRIMARY KEY,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  html TEXT NOT NULL DEFAULT '',
  lesson_order INTEGER NOT NULL DEFAULT 0,
  course_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  keywords TEXT NOT NULL DEFAULT '[]',
  UNIQUE(course_id, category_id, section_id, slug)
);

CREATE TABLE IF NOT EXISTS content_version (
  id INTEGER NOT NULL PRIMARY KEY,
  version_hash TEXT NOT NULL,
  row_count_hash TEXT NOT NULL,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);
