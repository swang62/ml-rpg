-- name: GetLessonHtml :one
SELECT lesson.html FROM lesson WHERE lesson.id = ?;

-- name: UpdateLessonHtml :exec
UPDATE lesson SET html = ? WHERE lesson.id = ?;
