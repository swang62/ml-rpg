-- Drop redundant or unused explicit indexes.
-- Autoindexes from UNIQUE/PRIMARY KEY constraints remain.

DROP INDEX IF EXISTS idx_course_slug;
DROP INDEX IF EXISTS idx_users_username;
DROP INDEX IF EXISTS idx_section_course_id;
