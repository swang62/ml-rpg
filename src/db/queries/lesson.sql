-- name: GetLessonHtml :one
SELECT lesson.html FROM lesson WHERE lesson.lesson_id = ?;

-- name: UpdateLessonHtml :exec
UPDATE lesson SET html = ? WHERE lesson.lesson_id = ?;
