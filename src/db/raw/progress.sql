-- name: GetReadLessonsBySection :many
SELECT lesson.slug FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.id WHERE progress.user_id = ? AND lesson.section_id = ?;

-- name: GetAllReadLessons :many
SELECT progress.lesson_id AS lessonid, lesson.lesson_order AS lessonorder FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.id WHERE progress.user_id = ?;

-- name: IsLessonRead :one
SELECT COUNT(*) > 0 AS isread FROM progress WHERE progress.lesson_id = ? AND progress.user_id = ?;

-- name: MarkLessonRead :exec
INSERT OR IGNORE INTO progress (lesson_id, user_id, read_at) VALUES (?, ?, datetime('now'));

-- name: ResetSectionProgress :exec
DELETE FROM progress WHERE progress.user_id = ? AND progress.lesson_id IN (SELECT lesson.id FROM lesson WHERE lesson.section_id = ?);

-- name: GetReadCountsByCourse :many
SELECT lesson.section_id AS sectionid, COUNT(*) AS readcount FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.id WHERE progress.user_id = ? AND lesson.course_id = ? GROUP BY lesson.section_id;

-- name: GetUserXpSum :one
SELECT COALESCE(SUM(lesson.lesson_order), 0) AS totalorder, COUNT(*) AS readcount FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.id WHERE progress.user_id = ?;

-- name: GetCourseSectionReadStatus :many
SELECT lesson.category_id AS categoryid, lesson.section_id AS sectionid, category.slug AS categoryslug, section.slug AS sectionslug, COUNT(progress.lesson_id) AS readcount, COUNT(lesson.id) AS totallessons FROM lesson INNER JOIN category ON lesson.category_id = category.id INNER JOIN section ON lesson.section_id = section.id LEFT JOIN progress ON progress.lesson_id = lesson.id AND progress.user_id = ? WHERE lesson.course_id = ? GROUP BY lesson.category_id, lesson.section_id ORDER BY lesson.category_id, lesson.section_id;



-- name: DeleteAllProgress :exec
DELETE FROM progress;

-- name: ResetUserProgress :exec
DELETE FROM progress WHERE user_id = ?;
