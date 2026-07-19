-- Users and progress tables for auth/signup support
-- Apply: wrangler d1 migrations apply D1_CONTENT --remote --env staging

CREATE TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  user_password TEXT NOT NULL,
  display_name TEXT,
  last_visited_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS progress (
  lesson_id INTEGER NOT NULL REFERENCES lesson(id),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (lesson_id, user_id)
);

-- Indexes for auth queries
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Index for per-user progress lookups
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
