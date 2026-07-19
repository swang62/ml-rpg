-- name: GetCourseById :one
SELECT course.id, course.slug, course.title FROM course WHERE course.id = ?;

-- name: GetCourseBySlug :one
SELECT course.id, course.slug, course.title FROM course WHERE course.slug = ?;

-- name: GetAllCourses :many
SELECT course.id, course.slug, course.title FROM course;

-- name: CreateCourse :one
INSERT INTO course (slug, title) VALUES (?, ?) RETURNING id;

-- name: DeleteAllCourses :exec
DELETE FROM course;

-- name: GetBreadcrumbs :one
SELECT course.title AS coursetitle,
       category.title AS categorytitle,
       section.title AS sectiontitle
FROM course
LEFT JOIN category ON category.course_id = course.id AND category.slug = sqlc.arg(categorySlug)
LEFT JOIN section ON section.category_id = category.id AND section.slug = sqlc.arg(sectionSlug)
WHERE course.slug = sqlc.arg(courseSlug);
