-- name: GetUserById :one
SELECT "user".id, "user".name FROM "user" WHERE "user".id = ?;

-- name: UpsertUser :one
INSERT INTO "user" (name) VALUES (?) RETURNING id;
