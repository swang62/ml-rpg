-- name: GetUserById :one
SELECT users.id, users.username, users.display_name AS displayname FROM users WHERE users.id = ?;

-- name: GetUserByUserName :one
SELECT users.id, users.username, users.display_name AS displayname FROM users WHERE users.username = ?;

-- name: GetUserByUserNameWithPassword :one
SELECT users.id, users.username, users.user_password AS userpassword, users.display_name AS displayname FROM users WHERE users.username = ?;

-- name: UpsertUser :one
INSERT INTO users (username, user_password, display_name) VALUES (?,?,?) RETURNING id;

-- name: UpdateDisplayName :exec
UPDATE users SET display_name = ? WHERE id = ?;

-- name: UpdateLastVisitedAt :exec
UPDATE users SET last_visited_at = datetime('now') WHERE id = ?;

-- name: DeleteStaleUsers :exec
DELETE FROM users WHERE last_visited_at < ?;

-- name: GetUserCount :one
SELECT COUNT(*) AS count FROM users;

-- name: DeleteAllUsers :exec
DELETE FROM users;
