import { createMiddleware } from "@solidjs/start/middleware";
import { checkRateLimit } from "~/middleware/rate-limiter";
import { RATE_LIMIT_REGULAR } from "~/utils/constants";

if (!import.meta.env.VITE_SITE_URL) {
  throw new Error("VITE_SITE_URL is required.");
}

const STATIC_PREFIXES = [
  "/_assets/",
  "/_build/assets/",
  "/assets/",
  "/favicon",
  "/search-index",
];
const NO_CACHE_PREFIXES = ["/api/", "/auth/", "/_server/"];

export function isStaticAsset(url: string): boolean {
  return STATIC_PREFIXES.some((prefix) => url.startsWith(prefix));
}

function isAuthOrApi(pathname: string): boolean {
  return NO_CACHE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export default createMiddleware({
  onRequest: async (event) => {
    const url = event.request.url;
    const { pathname } = new URL(url);

    if (isStaticAsset(pathname)) {
      event.response.headers.set(
        "Cache-Control",
        "public, max-age=604800, immutable",
      );
      return;
    }

    // Prevent caching of dynamic/auth responses
    if (isAuthOrApi(pathname)) {
      event.response.headers.set("Cache-Control", "no-store, must-revalidate");
    } else {
      // Public course pages — cache at CDN edge for 1 hour
      event.response.headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=3600",
      );
    }

    const ip =
      event.clientAddress ??
      event.request.headers.get("cf-connecting-ip") ??
      event.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      event.request.headers.get("x-real-ip") ??
      "unknown";

    const result = checkRateLimit(`ratelimit:${ip}`, RATE_LIMIT_REGULAR);
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
            "Cache-Control": "no-store, must-revalidate",
            "Retry-After": String(retryAfter),
            "X-RateLimit-Limit": String(RATE_LIMIT_REGULAR.maxAttempts),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(
              Math.ceil((Date.now() + result.resetMs) / 1000),
            ),
          },
        },
      );
    }

    event.response.headers.set(
      "X-RateLimit-Limit",
      String(RATE_LIMIT_REGULAR.maxAttempts),
    );
    event.response.headers.set(
      "X-RateLimit-Remaining",
      String(result.remaining),
    );
    return;
  },
});
