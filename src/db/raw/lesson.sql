-- name: GetLessonHtml :one
SELECT lesson.html FROM lesson WHERE lesson.id = ?;

-- name: UpdateLessonHtml :exec
UPDATE lesson SET html = ? WHERE lesson.id = ?;

-- name: GetSearchLessons :many
SELECT lesson.slug, lesson.title, lesson.section_id AS sectionid, lesson.html FROM lesson WHERE lesson.html != '';
