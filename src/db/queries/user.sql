-- name: GetUserBySlug :one
SELECT "user".id, "user".slug, "user".name FROM "user" WHERE "user".slug = ?;

-- name: GetUserById :one
SELECT "user".id, "user".slug, "user".name FROM "user" WHERE "user".id = ?;

-- name: UpsertUser :one
INSERT INTO "user" (slug, name) VALUES (?, ?) ON CONFLICT(slug) DO UPDATE SET name = excluded.name RETURNING id;
