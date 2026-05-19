import { createMiddleware } from "@solidjs/start/middleware";
import { checkRateLimit } from "~/server/rate-limiter";

/**
 * Global rate limiting middleware for all SSR requests.
 *
 * - Applies per-IP rate limiting using cf-connecting-ip (Cloudflare) or
 *   x-forwarded-for / x-real-ip headers.
 * - Stricter limits on the login endpoint.
 * - Serves static assets (/_assets, /assets, /favicon.ico) without rate limiting.
 * - Returns HTTP 429 with a Retry-After header when exceeded.
 */

const STATIC_PREFIXES = ["/_assets/", "/assets/", "/favicon"];

function isStaticAsset(url: string): boolean {
  return STATIC_PREFIXES.some((prefix) => url.startsWith(prefix));
}

function isLoginEndpoint(url: string): boolean {
  return url.startsWith("/_action/formLogin");
}

export default createMiddleware({
  onRequest: (event) => {
    const url = event.request.url;
    const { pathname } = new URL(url);

    // Skip rate limiting for static assets
    if (isStaticAsset(pathname)) {
      return;
    }

    // Determine client IP from request
    const ip =
      event.clientAddress ??
      event.request.headers.get("cf-connecting-ip") ??
      event.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      event.request.headers.get("x-real-ip") ??
      "unknown";

    // Stricter limits for login; more lenient for general SSR
    const config = isLoginEndpoint(pathname)
      ? { maxAttempts: 10, windowMs: 60_000 }
      : { maxAttempts: 200, windowMs: 60_000 };

    const result = checkRateLimit(`ratelimit:${ip}`, config);
    if (!result.allowed) {
      const retryAfter = Math.ceil(result.resetMs / 1000);
      return new Response(
        JSON.stringify({
          error: "Too Many Requests",
          message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
          retryAfter,
        }),
        {
          status: 429,
          statusText: "Too Many Requests",
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(config.maxAttempts),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(
              Math.ceil((Date.now() + result.resetMs) / 1000),
            ),
          },
        },
      );
    }

    // Set rate limit headers on all responses
    event.response.headers.set("X-RateLimit-Limit", String(config.maxAttempts));
    event.response.headers.set(
      "X-RateLimit-Remaining",
      String(result.remaining),
    );
    return;
  },
});
