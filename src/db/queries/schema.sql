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
  course_id INTEGER NOT NULL REFERENCES course(id)
);

-- name: EnsureSectionTable :exec
CREATE TABLE IF NOT EXISTS section (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  course_id INTEGER NOT NULL REFERENCES course(id),
  category_id INTEGER NOT NULL REFERENCES category(id)
);

-- name: EnsureLessonTable :exec
CREATE TABLE IF NOT EXISTS lesson (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  html TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL,
  course_id INTEGER NOT NULL REFERENCES course(id),
  category_id INTEGER NOT NULL REFERENCES category(id),
  section_id INTEGER NOT NULL REFERENCES section(id)
);

-- name: EnsureUserTable :exec
CREATE TABLE IF NOT EXISTS "user" (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL
);

-- name: EnsureProgressTable :exec
CREATE TABLE IF NOT EXISTS progress (
  lesson_id INTEGER NOT NULL REFERENCES lesson(id),
  user_id INTEGER NOT NULL REFERENCES "user"(id),
  read_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (lesson_id, user_id)
);
