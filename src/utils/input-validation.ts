/**
 * Input validation and sanitization utilities.
 *
 * The app uses sqlc with parameterized queries for all database access,
 * which is the primary SQL injection defense. This module provides
 * defense-in-depth validation for user-supplied inputs at the
 * application boundary.
 *
 * All validators use Zod schemas for declarative, runtime-safe validation
 * with automatic type inference.
 */

import { z } from "zod";
import { MAX_DISPLAY_NAME_LENGTH } from "~/utils/constants";

// ---------------------------------------------------------------------------
// Slug validation
// ---------------------------------------------------------------------------

const SlugSchema = z
  .string()
  .trim()
  .min(1)
  .max(100)
  .regex(/^[a-zA-Z0-9_-]+$/);

/**
 * Validates a URL slug (course, category, section, lesson).
 * Slugs must be alphanumeric with hyphens/underscores, 1-100 chars.
 * Returns the trimmed slug if valid, or null if invalid.
 */
export function validateSlug(slug: unknown): string | null {
  const result = SlugSchema.safeParse(slug);
  return result.success ? result.data : null;
}

// ---------------------------------------------------------------------------
// Username validation
// ---------------------------------------------------------------------------

const UsernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(2)
  .max(32)
  .regex(/^[a-zA-Z0-9_]+$/);

/**
 * Validates a username. Allows alphanumeric + underscores, 2-32 chars.
 * Returns the trimmed + lowercased username if valid, or null if invalid.
 */
export function validateUsername(username: unknown): string | null {
  const result = UsernameSchema.safeParse(username);
  return result.success ? result.data : null;
}

// ---------------------------------------------------------------------------
// Display name validation
// ---------------------------------------------------------------------------

const DisplayNameSchema = z
  .string()
  .trim()
  .min(1)
  .max(MAX_DISPLAY_NAME_LENGTH)
  // eslint-disable-next-line no-misleading-character-class
  .regex(/^[a-zA-Z0-9 _\-'À-ÿ]+$/);

/**
 * Validates a display name. Must be 1-32 chars, allow letters, numbers,
 * spaces, underscores, hyphens, apostrophes, and common Latin accented chars.
 * Returns the trimmed name if valid, or null if invalid.
 */
export function validateDisplayName(name: unknown): string | null {
  const result = DisplayNameSchema.safeParse(name);
  return result.success ? result.data : null;
}

// ---------------------------------------------------------------------------
// Password validation
// ---------------------------------------------------------------------------

const PasswordSchema = z.string().min(6).max(128);

/**
 * Validates a password for sanity (min/max length).
 * Returns the password if valid, or null if invalid.
 */
export function validatePassword(password: unknown): string | null {
  const result = PasswordSchema.safeParse(password);
  return result.success ? result.data : null;
}

// ---------------------------------------------------------------------------
// Search / RAG query sanitization
// ---------------------------------------------------------------------------

function stripControlChars(val: string): string {
  let result = "";
  for (let i = 0; i < val.length; i++) {
    const code = val.charCodeAt(i);
    // Allow \t (0x09), \n (0x0A), \r (0x0D), and printable chars (0x20+)
    if (code === 0x09 || code === 0x0a || code === 0x0d || code >= 0x20) {
      result += val[i];
    }
  }
  return result.trim();
}

const SearchQuerySchema = z.string().transform(stripControlChars);

/**
 * Sanitizes a free-text search or RAG query by stripping characters
 * that could be used in SQL injection attempts (defense-in-depth).
 * This is NOT the primary SQL injection defense (parameterized queries are).
 */
export function sanitizeSearchQuery(query: unknown): string {
  const result = SearchQuerySchema.safeParse(query);
  return result.success ? result.data : "";
}

// -- History sanitization (prevent role spoofing) --

const HistoryEntrySchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export function sanitizeHistory(
  history: unknown,
  maxTurns: number,
): {
  role: "user" | "assistant";
  content: string;
}[] {
  if (!Array.isArray(history)) return [];
  return history
    .flatMap((item) => {
      const result = HistoryEntrySchema.safeParse(item);
      return result.success ? [result.data] : [];
    })
    .slice(-maxTurns);
}
