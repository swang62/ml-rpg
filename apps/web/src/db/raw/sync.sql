-- name: GetCourseSyncRows :many
SELECT id, slug, title FROM course;

-- name: GetCategorySyncRows :many
SELECT id, slug, title, course_id AS courseid FROM category;

-- name: GetSectionSyncRows :many
SELECT id, slug, title, course_id AS courseid, category_id AS categoryid FROM section;

-- name: GetLessonSyncRows :many
SELECT id, slug, title, html, lesson_order AS lessonorder, course_id AS courseid, category_id AS categoryid, section_id AS sectionid, keywords FROM lesson;

-- name: UpsertCourse :exec
INSERT INTO course (id, slug, title) VALUES (?, ?, ?)
ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title;

-- name: UpsertCategory :exec
INSERT INTO category (id, slug, title, course_id) VALUES (?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title, course_id = excluded.course_id;

-- name: UpsertSection :exec
INSERT INTO section (id, slug, title, course_id, category_id) VALUES (?, ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title, course_id = excluded.course_id, category_id = excluded.category_id;

-- name: UpsertLesson :exec
INSERT INTO lesson (id, slug, title, html, lesson_order, course_id, category_id, section_id, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, title = excluded.title, html = excluded.html, lesson_order = excluded.lesson_order, course_id = excluded.course_id, category_id = excluded.category_id, section_id = excluded.section_id, keywords = excluded.keywords;

-- name: GetLessonKeywordCount :one
SELECT COUNT(*) AS c FROM lesson WHERE keywords IS NOT NULL AND keywords != '[]';
