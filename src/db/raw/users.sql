-- name: GetUserById :one
SELECT users.id, users.username, users.display_name AS displayname FROM users WHERE users.id = ?;

-- name: GetUserByUserName :one
SELECT users.id, users.username, users.display_name AS displayname FROM users WHERE users.username = ?;

-- name: GetUserByUserNameWithPassword :one
SELECT users.id, users.username, users.user_password, users.display_name AS displayname FROM users WHERE users.username = ?;

-- name: UpsertUser :one
INSERT INTO users (username, user_password, display_name) VALUES (?,?,?) RETURNING id;

-- name: UpdateDisplayName :exec
UPDATE users SET display_name = ? WHERE id = ?;

-- name: GetUserCount :one
SELECT COUNT(*) AS count FROM users;

-- name: DeleteAllUsers :exec
DELETE FROM users;
