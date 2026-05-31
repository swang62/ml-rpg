import { createMiddleware } from "@solidjs/start/middleware";
import { checkRateLimit } from "~/server/rate-limiter";
import { RATE_LIMIT_LOGIN, RATE_LIMIT_REGULAR } from "~/utils/constants";

if (!import.meta.env.VITE_SITE_URL) {
  throw new Error("VITE_SITE_URL is required.");
}

const STATIC_PREFIXES = ["/_assets/", "/assets/", "/favicon"];

export function isStaticAsset(url: string): boolean {
  return STATIC_PREFIXES.some((prefix) => url.startsWith(prefix));
}

export function isAuthEndpoint(url: string): boolean {
  const checkURL = url.toLowerCase();
  return checkURL.includes("login") || checkURL.includes("signup");
}

export default createMiddleware({
  onRequest: async (event) => {
    const url = event.request.url;
    const { pathname } = new URL(url);

    if (isStaticAsset(pathname)) {
      return;
    }

    const ip =
      event.clientAddress ??
      event.request.headers.get("cf-connecting-ip") ??
      event.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      event.request.headers.get("x-real-ip") ??
      "unknown";

    const config = isAuthEndpoint(pathname)
      ? RATE_LIMIT_LOGIN
      : RATE_LIMIT_REGULAR;

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

    event.response.headers.set("X-RateLimit-Limit", String(config.maxAttempts));
    event.response.headers.set(
      "X-RateLimit-Remaining",
      String(result.remaining),
    );
    return;
  },
});
