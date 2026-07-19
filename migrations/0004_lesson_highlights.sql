-- Add lessonHighlights column for pre-extracted relevant text
-- Apply: wrangler d1 migrations apply ml-rpg-content --local

ALTER TABLE lesson ADD COLUMN lesson_highlights TEXT NOT NULL DEFAULT '';
