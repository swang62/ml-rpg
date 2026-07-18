/**
 * D1 database accessor for the frontend runtime.
 *
 * In Cloudflare Workers, D1 is provided as a binding via the platform env.
 * This module abstracts access so server functions get the D1 handle
 * without knowing about the runtime environment.
 */

import { getRequestEvent } from "solid-js/web";

let _d1: D1Database | null = null;

/**
 * Get the D1 database instance for the current request.
 *
 * In Workers: reads from the platform env bindings (D1_CONTENT).
 * Caches the instance for the lifetime of the isolate.
 */
export function getDb(): D1Database {
  if (_d1) return _d1;

  const event = getRequestEvent();
  const platform = (event as { platform?: { env?: Record<string, unknown> } })
    ?.platform;
  const d1 = platform?.env?.D1_CONTENT as D1Database | undefined;

  if (!d1) {
    throw new Error(
      "D1_CONTENT binding not available. Ensure the Worker has a D1 binding configured and is running in a Cloudflare Workers environment.",
    );
  }

  _d1 = d1;
  return _d1;
}

/**
 * Reset the cached D1 instance (used in tests).
 */
export function resetDb(): void {
  _d1 = null;
}
