-- name: GetCategoriesByCourse :many
SELECT category.id, category.slug, category.title FROM category WHERE category.course_id = ?;

-- name: GetAllCategories :many
SELECT category.id, category.slug, category.title, category.course_id AS courseid FROM category;

-- name: GetCategoryById :one
SELECT category.id, category.slug, category.title, category.course_id AS courseid FROM category WHERE category.id = ?;

-- name: GetCategoryBySlug :one
SELECT category.id, category.slug, category.title, category.course_id AS courseid FROM category WHERE category.slug = ? AND category.course_id = ?;

-- name: CreateCategory :one
INSERT INTO category (slug, title, course_id) VALUES (?, ?, ?) RETURNING id;

-- name: DeleteAllCategories :exec
DELETE FROM category;
