import { createMiddleware } from "@solidjs/start/middleware";
import { checkRateLimitWithBinding, getClientIP } from "~/utils/rate-limit";

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
const NO_CACHE_PREFIXES = ["/api/", "/auth/"];
const PUBLIC_SERVER_QUERY_SUFFIXES = [
  "getCoursesQuery_query",
  "getCourseMetaQuery_query",
  "getCategoryMetaQuery_query",
  "getSectionMetaQuery_query",
  "getBreadcrumbsQuery_query",
  "getLessonNavQuery_query",
  "getLessonHTMLQuery_query",
];

export function isStaticAsset(url: string): boolean {
  return STATIC_PREFIXES.some((prefix) => url.startsWith(prefix));
}

function isAuthOrApi(pathname: string): boolean {
  return NO_CACHE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isPublicServerQuery(url: URL): boolean {
  if (url.pathname !== "/_server/" && url.pathname !== "/_server") return false;
  const id = url.searchParams.get("id");
  return id
    ? PUBLIC_SERVER_QUERY_SUFFIXES.some((suffix) => id.endsWith(suffix))
    : false;
}

export default createMiddleware({
  onRequest: async (event) => {
    const url = new URL(event.request.url);
    const { pathname } = url;

    if (isStaticAsset(pathname)) {
      event.response.headers.set("Cache-Control", "public, max-age=2592000");
      return;
    }

    if (isPublicServerQuery(url)) {
      event.response.headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=2592000",
      );
    } else if (
      pathname === "/_server/" ||
      pathname === "/_server" ||
      isAuthOrApi(pathname)
    ) {
      event.response.headers.set("Cache-Control", "no-store, must-revalidate");
    } else {
      // Public course pages — cache at CDN edge for 30 days
      event.response.headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=2592000",
      );
    }

    const ip = getClientIP(event.request);

    // Cloudflare Rate Limiting API — enforce at edge via env bindings
    const ne = event.nativeEvent as {
      req?: { runtime?: { cloudflare?: { env?: Record<string, unknown> } } };
      context?: {
        cloudflare?: { env?: Record<string, unknown> };
        _platform?: { cloudflare?: { env?: Record<string, unknown> } };
      };
    };
    const rl = (ne.context?.cloudflare?.env?.RL_GENERAL ??
      ne.context?._platform?.cloudflare?.env?.RL_GENERAL ??
      ne.req?.runtime?.cloudflare?.env?.RL_GENERAL) as RateLimit | undefined;
    const { allowed } = await checkRateLimitWithBinding(rl, `ratelimit:${ip}`);
    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Try again later.",
        }),
        {
          status: 429,
          statusText: "Too Many Requests",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, must-revalidate",
            "Retry-After": "60",
          },
        },
      );
    }

    return;
  },
});
