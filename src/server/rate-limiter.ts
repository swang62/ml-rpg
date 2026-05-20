/**
 * Simple in-memory rate limiter for Vinxi/SolidStart middleware.
 * Tracks request timestamps per key (IP address) and enforces
 * configurable limits within sliding windows.
 *
 * NOTE: No "use server" directive here — this module is only called from
 * server-side middleware, not from client code. The RPC wrapper would
 * fail outside a valid request context (e.g., API routes).
 */

import { deleteStaleUsers } from "~/db/users_sql";
import { getDb } from "~/server/storage";
import { CLEANUP_INTERVAL_DAYS, MAX_SESSION_DAYS } from "~/utils/constants";

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Sweep stale entries and inactive users once a day
setInterval(
  () => {
    const now = Date.now();

    // Clean rate limit store
    for (const [key, entry] of store) {
      entry.timestamps = entry.timestamps.filter((t) => now - t < 60_000);
      if (entry.timestamps.length === 0) {
        store.delete(key);
      }
    }

    // Sweep users inactive past MAX_SESSION_DAYS (ON DELETE CASCADE removes their progress)
    try {
      const db = getDb();
      const staleUserCutoff = new Date(
        Date.now() - MAX_SESSION_DAYS * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      deleteStaleUsers(db, { lastVisitedAt: staleUserCutoff });
    } catch (error) {
      console.error("[cleanup] Failed to sweep stale users:", error);
    }
  },
  60 * 60 * 24 * CLEANUP_INTERVAL_DAYS,
).unref();

export interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

/** Check if a key is within its rate limit. Returns result with remaining/reset info. */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now();
  let entry = store.get(key);

  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  entry.timestamps = entry.timestamps.filter((t) => now - t < config.windowMs);

  if (entry.timestamps.length >= config.maxAttempts) {
    const oldestInWindow = entry.timestamps[0];
    const resetMs = oldestInWindow + config.windowMs - now;
    return { allowed: false, remaining: 0, resetMs: Math.max(resetMs, 0) };
  }

  entry.timestamps.push(now);
  return {
    allowed: true,
    remaining: config.maxAttempts - entry.timestamps.length,
    resetMs: 0,
  };
}

/** Extract client IP from request headers, checking proxy headers in order. */
export function getClientIP(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return cfIp ?? forwarded?.split(",")[0]?.trim() ?? realIp ?? "unknown";
}

/** Reset the rate limit store (for tests). */
export function resetRateLimitStore(): void {
  store.clear();
}
