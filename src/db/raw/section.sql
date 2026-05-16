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
