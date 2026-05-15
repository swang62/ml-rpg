-- name: GetUser :one
SELECT "user".user_id, "user".name FROM "user" WHERE "user".user_id = ?;

-- name: UpsertUser :exec
INSERT INTO "user" (user_id, name) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET name = excluded.name;
