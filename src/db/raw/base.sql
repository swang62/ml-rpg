-- name: EnsureCourseTable :exec
CREATE TABLE IF NOT EXISTS course (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL
);

-- name: EnsureCategoryTable :exec
CREATE TABLE IF NOT EXISTS category (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  course_id INTEGER NOT NULL REFERENCES course(id),
  UNIQUE(course_id, slug)
);

-- name: EnsureSectionTable :exec
CREATE TABLE IF NOT EXISTS section (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  course_id INTEGER NOT NULL REFERENCES course(id),
  category_id INTEGER NOT NULL REFERENCES category(id),
  UNIQUE(course_id, category_id, slug)
);

-- name: EnsureLessonTable :exec
CREATE TABLE IF NOT EXISTS lesson (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  html TEXT NOT NULL DEFAULT '',
  lesson_order INTEGER NOT NULL DEFAULT 0,
  course_id INTEGER NOT NULL REFERENCES course(id),
  category_id INTEGER NOT NULL REFERENCES category(id),
  section_id INTEGER NOT NULL REFERENCES section(id),
  UNIQUE(course_id, category_id, section_id, slug)
);

-- name: EnsureUsersTable :exec
CREATE TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  user_password TEXT NOT NULL,
  display_name TEXT,
  last_visited_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- name: EnsureProgressTable :exec
CREATE TABLE IF NOT EXISTS progress (
  lesson_id INTEGER NOT NULL REFERENCES lesson(id),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (lesson_id, user_id)
);

-- name: EnsureSchemaVersionTable :exec
CREATE TABLE IF NOT EXISTS schema_version (
  version INTEGER NOT NULL PRIMARY KEY,
  description TEXT NOT NULL,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- name: GetCurrentSchemaVersion :one
SELECT version FROM schema_version ORDER BY version DESC LIMIT 1;

-- name: ApplyMigration :exec
INSERT INTO schema_version (version, description, applied_at) VALUES (?, ?, datetime('now'));
