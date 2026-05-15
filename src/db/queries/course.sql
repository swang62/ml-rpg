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
