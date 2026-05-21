/**
 * Input validation and sanitization utilities.
 *
 * The app uses sqlc with parameterized queries for all database access,
 * which is the primary SQL injection defense. This module provides
 * defense-in-depth validation for user-supplied inputs at the
 * application boundary.
 */

import { MAX_DISPLAY_NAME_LENGTH } from "~/utils/constants";

// ---------------------------------------------------------------------------
// Slug validation
// ---------------------------------------------------------------------------

const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;
const SLUG_MAX_LENGTH = 100;

/**
 * Validates a URL slug (course, category, section, lesson).
 * Slugs must be alphanumeric with hyphens/underscores, 1-100 chars.
 * Returns the trimmed slug if valid, or null if invalid.
 */
export function validateSlug(slug: unknown): string | null {
  if (typeof slug !== "string") return null;
  const trimmed = slug.trim();
  if (trimmed.length < 1 || trimmed.length > SLUG_MAX_LENGTH) return null;
  if (!SLUG_PATTERN.test(trimmed)) return null;
  return trimmed;
}

// ---------------------------------------------------------------------------
// Username validation
// ---------------------------------------------------------------------------

const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/;
const USERNAME_MIN_LENGTH = 1;
const USERNAME_MAX_LENGTH = 32;

/**
 * Validates a username. Allows alphanumeric + underscores, 2-32 chars.
 * Returns the trimmed + lowercased username if valid, or null if invalid.
 */
export function validateUsername(username: unknown): string | null {
  if (typeof username !== "string") return null;
  const trimmed = username.trim().toLowerCase();
  if (
    trimmed.length <= USERNAME_MIN_LENGTH ||
    trimmed.length > USERNAME_MAX_LENGTH
  ) {
    return null;
  }
  if (!USERNAME_PATTERN.test(trimmed)) return null;
  return trimmed;
}

// ---------------------------------------------------------------------------
// Display name validation
// ---------------------------------------------------------------------------

/**
 * Validates a display name. Must be 1-32 chars, allow letters, numbers,
 * spaces, underscores, hyphens, apostrophes, and common Latin accented chars.
 * Returns the trimmed name if valid, or null if invalid.
 */
export function validateDisplayName(name: unknown): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.trim();
  if (trimmed.length < 1 || trimmed.length > MAX_DISPLAY_NAME_LENGTH) {
    return null;
  }
  // eslint-disable-next-line no-misleading-character-class
  if (!/^[a-zA-Z0-9 _\-'À-ÿ]+$/.test(trimmed)) return null;
  return trimmed;
}

// ---------------------------------------------------------------------------
// Password validation
// ---------------------------------------------------------------------------

const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 128;

/**
 * Validates a password for sanity (min/max length).
 * Returns the password if valid, or null if invalid.
 */
export function validatePassword(password: unknown): string | null {
  if (typeof password !== "string") return null;
  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return null;
  }
  return password;
}

// ---------------------------------------------------------------------------
// Search / RAG query sanitization
// ---------------------------------------------------------------------------

/**
 * Sanitizes a free-text search or RAG query by stripping characters
 * that could be used in SQL injection attempts (defense-in-depth).
 * This is NOT the primary SQL injection defense (parameterized queries are).
 */
export function sanitizeSearchQuery(query: unknown): string {
  if (typeof query !== "string") return "";
  // Strip null bytes and ASCII control characters (0x00-0x1F minus allowed whitespace)
  let result = "";
  for (let i = 0; i < query.length; i++) {
    const code = query.charCodeAt(i);
    // Allow \t (0x09), \n (0x0A), \r (0x0D), and printable chars (0x20+)
    if (code === 0x09 || code === 0x0a || code === 0x0d || code >= 0x20) {
      result += query[i];
    }
  }
  return result.trim();
}
