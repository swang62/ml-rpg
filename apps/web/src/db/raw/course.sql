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
