-- name: GetTotalXp :one
SELECT COALESCE(SUM(lesson.lesson_order), 0) AS totalorder FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.id WHERE progress.user_id = ?;

-- name: GetReadLessonsBySection :many
SELECT lesson.slug FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.id WHERE progress.user_id = ? AND lesson.section_id = ?;

-- name: IsLessonRead :one
SELECT COUNT(*) AS readcount FROM progress WHERE progress.lesson_id = ? AND progress.user_id = ?;

-- name: MarkLessonRead :exec
INSERT OR IGNORE INTO progress (lesson_id, user_id, read_at) VALUES (?, ?, datetime('now'));

-- name: ResetSectionProgress :exec
DELETE FROM progress WHERE progress.user_id = ? AND progress.lesson_id IN (SELECT lesson.id FROM lesson WHERE lesson.section_id = ?);

-- name: GetReadCountsByCourse :many
SELECT lesson.section_id AS sectionid, COUNT(*) AS readcount FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.id WHERE progress.user_id = ? AND lesson.course_id = ? GROUP BY lesson.section_id;

-- name: DeleteAllProgress :exec
DELETE FROM progress;

-- name: GetAllReadLessons :many
SELECT progress.lesson_id AS lessonid FROM progress WHERE progress.user_id = ?;
