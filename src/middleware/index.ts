import { createMiddleware } from "@solidjs/start/middleware";
import { updateLastVisitedAt } from "~/db/users_sql";
import { checkRateLimit } from "~/server/rate-limiter";
import { getSession } from "~/server/session";
import { getDb } from "~/server/storage";
import { checkThrottle } from "~/utils/throttle";

// Register graceful shutdown signal handlers at server startup
import "~/server/shutdown";

const STATIC_PREFIXES = ["/_assets/", "/assets/", "/favicon"];
const VISIT_THROTTLE_MS = 5 * 60 * 1000;
const visitThrottleCache = new Map<string, number>();

function isStaticAsset(url: string): boolean {
  return STATIC_PREFIXES.some((prefix) => url.startsWith(prefix));
}

function isLoginEndpoint(url: string): boolean {
  return url.startsWith("/_action/formLogin");
}

async function trackLastVisited(): Promise<void> {
  const { data } = await getSession();
  if (!data.id) return;

  const key = `visit:${data.id}`;
  if (!checkThrottle(visitThrottleCache, key, VISIT_THROTTLE_MS, Date.now()))
    return;

  const db = getDb();
  await updateLastVisitedAt(db, { id: data.id });
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

    event.response.headers.set("X-RateLimit-Limit", String(config.maxAttempts));
    event.response.headers.set(
      "X-RateLimit-Remaining",
      String(result.remaining),
    );

    await trackLastVisited();
    return;
  },
});
