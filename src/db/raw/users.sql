-- name: GetUserById :one
SELECT users.id, users.username, users.display_name AS displayname FROM users WHERE users.id = ?;

-- name: GetUserByUserName :one
SELECT users.id, users.username, users.display_name AS displayname FROM users WHERE users.username = ?;

-- name: UpsertUser :one
INSERT INTO users (username, user_password, display_name) VALUES (?,?,?) RETURNING id;

-- name: UpdateDisplayName :exec
UPDATE users SET display_name = ? WHERE id = ?;

-- name: DeleteAllUsers :exec
DELETE FROM users;
