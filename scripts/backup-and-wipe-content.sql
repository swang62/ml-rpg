-- Backs up progress by slug path, then wipes content tables in FK-safe order.
-- Child rows deleted before parent rows -- no FK violation needed.
-- Progress is restored after reseeding via restore-progress.sql.

CREATE TABLE IF NOT EXISTS _seed_progress_backup (
  user_id INTEGER NOT NULL,
  course_slug TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  section_slug TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  read_at TEXT NOT NULL
);

DELETE FROM _seed_progress_backup;

INSERT INTO _seed_progress_backup (user_id, course_slug, category_slug, section_slug, lesson_slug, read_at)
SELECT p.user_id, c.slug, cat.slug, s.slug, l.slug, p.read_at
FROM progress p
INNER JOIN lesson l ON p.lesson_id = l.id
INNER JOIN section s ON l.section_id = s.id
INNER JOIN category cat ON l.category_id = cat.id
INNER JOIN course c ON l.course_id = c.id;

DELETE FROM progress;
DELETE FROM lesson;
DELETE FROM section;
DELETE FROM category;
DELETE FROM course;
