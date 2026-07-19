-- Indexes for content tables (applied after initial schema)
-- Apply: wrangler d1 migrations apply ml-rpg-content --local

CREATE INDEX IF NOT EXISTS idx_course_slug ON course(slug);
CREATE INDEX IF NOT EXISTS idx_category_course_id ON category(course_id);
CREATE INDEX IF NOT EXISTS idx_section_category_id ON section(category_id);
CREATE INDEX IF NOT EXISTS idx_section_course_id ON section(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_section_id ON lesson(section_id);
CREATE INDEX IF NOT EXISTS idx_lesson_category_id ON lesson(category_id);
CREATE INDEX IF NOT EXISTS idx_lesson_course_id ON lesson(course_id);
