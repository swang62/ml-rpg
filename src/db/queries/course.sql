-- name: GetCourse :one
SELECT course.course_id, course.title FROM course WHERE course.course_id = ?;

-- name: GetCategoriesByCourse :many
SELECT category.category_id, category.title FROM category WHERE category.course_id = ?;

-- name: GetCategory :one
SELECT category.title FROM category WHERE category.category_id = ? AND category.course_id = ?;

-- name: GetSectionsByCategory :many
SELECT section.section_id, section.title FROM section WHERE section.category_id = ?;

-- name: GetSection :one
SELECT section.title FROM section WHERE section.section_id = ? AND section.category_id = ? AND section.course_id = ?;

-- name: GetLessonsBySection :many
SELECT lesson.lesson_id, lesson.title, lesson."order" FROM lesson WHERE lesson.section_id = ? ORDER BY lesson."order";

-- name: GetLessonById :one
SELECT lesson.lesson_id, lesson.title, lesson."order", lesson.section_id, lesson.category_id, lesson.course_id FROM lesson WHERE lesson.lesson_id = ?;

-- name: GetAllLessons :many
SELECT lesson.lesson_id, lesson.title, lesson."order", lesson.section_id, lesson.category_id, lesson.course_id FROM lesson;

-- name: CreateCourse :exec
INSERT INTO course (course_id, title) VALUES (?, ?);

-- name: CreateCategory :exec
INSERT INTO category (category_id, title, course_id) VALUES (?, ?, ?);

-- name: CreateSection :exec
INSERT INTO section (section_id, title, course_id, category_id) VALUES (?, ?, ?, ?);

-- name: CreateLesson :exec
INSERT INTO lesson (lesson_id, title, html, "order", course_id, category_id, section_id) VALUES (?, ?, ?, ?, ?, ?, ?);

-- name: DeleteAllCourses :exec
DELETE FROM course;

-- name: DeleteAllCategories :exec
DELETE FROM category;

-- name: DeleteAllSections :exec
DELETE FROM section;

-- name: DeleteAllLessons :exec
DELETE FROM lesson;
