CREATE TABLE IF NOT EXISTS course (
  course_id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
  category_id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES course(course_id)
);

CREATE TABLE IF NOT EXISTS section (
  section_id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  course_id TEXT NOT NULL REFERENCES course(course_id),
  category_id TEXT NOT NULL REFERENCES category(category_id)
);

CREATE TABLE IF NOT EXISTS lesson (
  lesson_id TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  html TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL,
  course_id TEXT NOT NULL REFERENCES course(course_id),
  category_id TEXT NOT NULL REFERENCES category(category_id),
  section_id TEXT NOT NULL REFERENCES section(section_id)
);

CREATE TABLE IF NOT EXISTS "user" (
  user_id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS progress (
  lesson_id TEXT NOT NULL REFERENCES lesson(lesson_id),
  user_id TEXT NOT NULL REFERENCES "user"(user_id),
  read_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (lesson_id, user_id)
);
