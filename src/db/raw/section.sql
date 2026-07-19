-- name: GetSectionsByCategory :many
SELECT section.id, section.slug, section.title FROM section WHERE section.category_id = ?;

-- name: GetAllSections :many
SELECT section.id, section.slug, section.title, section.category_id AS categoryid, section.course_id AS courseid FROM section;

-- name: GetSectionById :one
SELECT section.id, section.slug, section.title, section.course_id AS courseid, section.category_id AS categoryid FROM section WHERE section.id = ?;

-- name: GetSectionBySlug :one
SELECT section.id, section.slug, section.title, section.course_id AS courseid, section.category_id AS categoryid FROM section WHERE section.slug = ? AND section.category_id = ?;

-- name: CreateSection :one
INSERT INTO section (slug, title, course_id, category_id) VALUES (?, ?, ?, ?) RETURNING id;

-- name: DeleteAllSections :exec
DELETE FROM section;

-- name: GetSectionBySlugInCourse :one
SELECT section.id, section.slug, section.title, section.course_id AS courseid, section.category_id AS categoryid
FROM section
INNER JOIN category ON section.category_id = category.id
WHERE category.course_id = ? AND section.slug = ?;

-- name: GetSectionIdToSlugByCourse :many
SELECT section.id, section.slug
FROM section
INNER JOIN category ON section.category_id = category.id
WHERE category.course_id = ?;

-- name: GetCourseSectionLessonCounts :many
SELECT category.slug AS categoryslug, section.slug AS sectionslug, COUNT(lesson.id) AS lessoncount
FROM section
INNER JOIN category ON section.category_id = category.id
LEFT JOIN lesson ON lesson.section_id = section.id
WHERE category.course_id = ?
GROUP BY category.id, section.id
ORDER BY category.id, section.id;

-- name: GetSectionPageData :many
SELECT section.title AS sectitle,
       lesson.id, lesson.slug, lesson.title, lesson.lesson_order AS lessonorder
FROM section
INNER JOIN category ON section.category_id = category.id
INNER JOIN course ON category.course_id = course.id
INNER JOIN lesson ON lesson.section_id = section.id
WHERE course.slug = sqlc.arg(courseSlug)
  AND category.slug = sqlc.arg(categorySlug)
  AND section.slug = sqlc.arg(sectionSlug)
ORDER BY lesson.lesson_order;
