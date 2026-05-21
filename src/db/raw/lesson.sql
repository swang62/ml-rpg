-- name: GetLessonsBySection :many
SELECT lesson.id, lesson.slug, lesson.title, lesson.lesson_order AS lessonorder FROM lesson WHERE lesson.section_id = ? ORDER BY lesson.lesson_order;

-- name: GetLessonById :one
SELECT lesson.id, lesson.slug, lesson.title, lesson.lesson_order AS lessonorder, lesson.section_id AS sectionid, lesson.category_id AS categoryid, lesson.course_id AS courseid FROM lesson WHERE lesson.id = ?;

-- name: GetLessonBySlug :one
SELECT lesson.id, lesson.slug, lesson.title, lesson.lesson_order AS lessonorder, lesson.section_id AS sectionid, lesson.category_id AS categoryid, lesson.course_id AS courseid FROM lesson WHERE lesson.slug = ? AND lesson.section_id = ?;

-- name: GetAllLessons :many
SELECT lesson.id, lesson.slug, lesson.title, lesson.lesson_order AS lessonorder, lesson.section_id AS sectionid, lesson.category_id AS categoryid, lesson.course_id AS courseid FROM lesson;

-- name: CreateLesson :one
INSERT INTO lesson (slug, title, html, lesson_order, course_id, category_id, section_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id;

-- name: DeleteAllLessons :exec
DELETE FROM lesson;

-- name: GetLessonCount :one
SELECT COUNT(*) AS lessoncount FROM lesson;

-- name: GetLessonHtml :one
SELECT lesson.html FROM lesson WHERE lesson.id = ?;

-- name: UpdateLessonHtml :exec
UPDATE lesson SET html = ? WHERE lesson.id = ?;

-- name: GetSearchLessons :many
SELECT lesson.slug, lesson.title, lesson.html, lesson.section_id AS sectionid, lesson.category_id AS categoryid, lesson.course_id AS courseid FROM lesson WHERE lesson.html != '';

-- name: GetLessonsByCategoryGrouped :many
SELECT lesson.id, lesson.slug, lesson.title, lesson.lesson_order AS lessonorder,
       lesson.section_id AS sectionid, section.slug AS secslug,
       section.title AS sectitle
FROM lesson
INNER JOIN section ON lesson.section_id = section.id
WHERE lesson.category_id = ?
ORDER BY section.id, lesson.lesson_order;
