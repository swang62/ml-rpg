-- Restores user progress from slug-based backup after reseeding.
-- Lessons that were removed between seed runs are silently skipped.

INSERT OR IGNORE INTO progress (lesson_id, user_id, read_at)
SELECT l.id, b.user_id, b.read_at
FROM _seed_progress_backup b
INNER JOIN course c ON c.slug = b.course_slug
INNER JOIN category cat ON cat.slug = b.category_slug AND cat.course_id = c.id
INNER JOIN section s ON s.slug = b.section_slug AND s.category_id = cat.id AND s.course_id = c.id
INNER JOIN lesson l ON l.slug = b.lesson_slug AND l.section_id = s.id AND l.category_id = cat.id AND l.course_id = c.id;

DROP TABLE IF EXISTS _seed_progress_backup;
