-- name: GetCourseById :one
SELECT course.id, course.slug, course.title FROM course WHERE course.id = ?;

-- name: GetCourseBySlug :one
SELECT course.id, course.slug, course.title FROM course WHERE course.slug = ?;

-- name: GetAllCourses :many
SELECT course.id, course.slug, course.title FROM course;

-- name: GetCategoriesByCourse :many
SELECT category.id, category.slug, category.title FROM category WHERE category.course_id = ?;

-- name: GetAllCategories :many
SELECT category.id, category.slug, category.title, category.course_id AS courseid FROM category;

-- name: GetCategoryById :one
SELECT category.id, category.slug, category.title, category.course_id AS courseid FROM category WHERE category.id = ?;

-- name: GetCategoryBySlug :one
SELECT category.id, category.slug, category.title, category.course_id AS courseid FROM category WHERE category.slug = ? AND category.course_id = ?;

-- name: GetSectionsByCategory :many
SELECT section.id, section.slug, section.title FROM section WHERE section.category_id = ?;

-- name: GetAllSections :many
SELECT section.id, section.slug, section.title, section.category_id AS categoryid, section.course_id AS courseid FROM section;

-- name: GetSectionById :one
SELECT section.id, section.slug, section.title, section.course_id AS courseid, section.category_id AS categoryid FROM section WHERE section.id = ?;

-- name: GetSectionBySlug :one
SELECT section.id, section.slug, section.title, section.course_id AS courseid, section.category_id AS categoryid FROM section WHERE section.slug = ? AND section.category_id = ?;

-- name: GetLessonsBySection :many
SELECT lesson.id, lesson.slug, lesson.title, lesson."order" FROM lesson WHERE lesson.section_id = ? ORDER BY lesson."order";

-- name: GetLessonById :one
SELECT lesson.id, lesson.slug, lesson.title, lesson."order", lesson.section_id AS sectionid, lesson.category_id AS categoryid, lesson.course_id AS courseid FROM lesson WHERE lesson.id = ?;

-- name: GetLessonBySlug :one
SELECT lesson.id, lesson.slug, lesson.title, lesson."order", lesson.section_id AS sectionid, lesson.category_id AS categoryid, lesson.course_id AS courseid FROM lesson WHERE lesson.slug = ? AND lesson.section_id = ?;

-- name: GetAllLessons :many
SELECT lesson.id, lesson.slug, lesson.title, lesson."order", lesson.section_id AS sectionid, lesson.category_id AS categoryid, lesson.course_id AS courseid FROM lesson;

-- name: CreateCourse :one
INSERT INTO course (slug, title) VALUES (?, ?) RETURNING id;

-- name: CreateCategory :one
INSERT INTO category (slug, title, course_id) VALUES (?, ?, ?) RETURNING id;

-- name: CreateSection :one
INSERT INTO section (slug, title, course_id, category_id) VALUES (?, ?, ?, ?) RETURNING id;

-- name: CreateLesson :one
INSERT INTO lesson (slug, title, html, "order", course_id, category_id, section_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id;

-- name: DeleteAllCourses :exec
DELETE FROM course;

-- name: DeleteAllCategories :exec
DELETE FROM category;

-- name: DeleteAllSections :exec
DELETE FROM section;

-- name: DeleteAllLessons :exec
DELETE FROM lesson;

-- name: GetLessonCount :one
SELECT COUNT(*) AS lessoncount FROM lesson;
