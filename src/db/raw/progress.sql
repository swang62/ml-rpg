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

-- name: GetLessonFromPathReadStatus :one
SELECT (SELECT COUNT(*) > 0 FROM progress WHERE progress.lesson_id = lesson.id AND progress.user_id = sqlc.arg(userId)) AS isread
FROM lesson
INNER JOIN section ON lesson.section_id = section.id
INNER JOIN category ON section.category_id = category.id
INNER JOIN course ON category.course_id = course.id
WHERE course.slug = sqlc.arg(courseSlug)
  AND category.slug = sqlc.arg(categorySlug)
  AND section.slug = sqlc.arg(sectionSlug)
  AND lesson.slug = sqlc.arg(lessonSlug)
LIMIT 1;

-- name: GetSectionReadCounts :many
SELECT lesson.slug
FROM lesson
INNER JOIN section ON lesson.section_id = section.id
INNER JOIN category ON section.category_id = category.id
INNER JOIN course ON category.course_id = course.id
INNER JOIN progress ON progress.lesson_id = lesson.id AND progress.user_id = sqlc.arg(userId)
WHERE course.slug = sqlc.arg(courseSlug) AND section.slug = sqlc.arg(sectionSlug);

-- name: GetCourseReadStatusBySlug :many
SELECT lesson.category_id AS categoryid, lesson.section_id AS sectionid,
  category.slug AS categoryslug, section.slug AS sectionslug,
  COUNT(progress.lesson_id) AS readcount, COUNT(lesson.id) AS totallessons
FROM lesson
INNER JOIN category ON lesson.category_id = category.id
INNER JOIN section ON lesson.section_id = section.id
INNER JOIN course ON lesson.course_id = course.id
LEFT JOIN progress ON progress.lesson_id = lesson.id AND progress.user_id = sqlc.arg(userId)
WHERE course.slug = sqlc.arg(courseSlug)
GROUP BY lesson.category_id, lesson.section_id
ORDER BY lesson.category_id, lesson.section_id;



-- name: DeleteAllProgress :exec
DELETE FROM progress;

-- name: ResetUserProgress :exec
DELETE FROM progress WHERE user_id = ?;
