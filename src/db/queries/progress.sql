-- name: GetTotalXp :one
SELECT COALESCE(SUM(lesson."order"), 0) AS total_order FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.lesson_id WHERE progress.user_id = ?;

-- name: GetReadLessonsBySection :many
SELECT lesson.lesson_id FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.lesson_id WHERE progress.user_id = ? AND lesson.section_id = ?;

-- name: IsLessonRead :one
SELECT COUNT(*) AS read_count FROM progress WHERE progress.lesson_id = ? AND progress.user_id = ?;

-- name: MarkLessonRead :exec
INSERT OR IGNORE INTO progress (lesson_id, user_id, read_at) VALUES (?, ?, datetime('now'));

-- name: ResetSectionProgress :exec
DELETE FROM progress WHERE progress.user_id = ? AND progress.lesson_id IN (SELECT lesson.lesson_id FROM lesson WHERE lesson.section_id = ?);

-- name: GetReadCountsByCourse :many
SELECT lesson.section_id, COUNT(*) AS read_count FROM progress INNER JOIN lesson ON progress.lesson_id = lesson.lesson_id WHERE progress.user_id = ? AND lesson.course_id = ? GROUP BY lesson.section_id;

-- name: GetAllReadLessons :many
SELECT progress.lesson_id FROM progress WHERE progress.user_id = ?;
