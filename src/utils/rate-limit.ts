import { getRequestEvent } from "solid-js/web";

/**
 * Access a Cloudflare Rate Limiting binding from a "use server" context.
 * Follows the same event-navigation pattern as getDb() in storage.ts.
 * Returns null when the binding is unavailable (e.g. local dev or tests).
 */
function getRateLimitBinding(bindingName: string): RateLimit | null {
  const event = getRequestEvent();
  if (!event) return null;

  const requestEvent = event as {
    platform?: { env?: Record<string, unknown> };
    nativeEvent?: {
      req?: {
        runtime?: {
          cloudflare?: { env?: Record<string, unknown> };
        };
      };
      context?: {
        cloudflare?: { env?: Record<string, unknown> };
        _platform?: {
          cloudflare?: { env?: Record<string, unknown> };
        };
      };
    };
  };

  const binding =
    (requestEvent.platform?.env?.[bindingName] as RateLimit | undefined) ??
    (requestEvent.nativeEvent?.req?.runtime?.cloudflare?.env?.[bindingName] as
      | RateLimit
      | undefined) ??
    (requestEvent.nativeEvent?.context?.cloudflare?.env?.[bindingName] as
      | RateLimit
      | undefined) ??
    (requestEvent.nativeEvent?.context?._platform?.cloudflare?.env?.[
      bindingName
    ] as RateLimit | undefined);

  return binding ?? null;
}

/**
 * Check rate limit using a Cloudflare Rate Limiting binding.
 * Resolves from the current request event (for "use server" functions).
 * Returns allowed=true when the binding is not configured (fail-open).
 */
export async function checkRateLimit(
  bindingName: string,
  key: string,
): Promise<{ allowed: boolean }> {
  try {
    const binding = getRateLimitBinding(bindingName);
    if (!binding) return { allowed: true };
    const { success } = await binding.limit({ key });
    return { allowed: success };
  } catch {
    return { allowed: true };
  }
}

/**
 * Check rate limit using a binding that has already been resolved
 * (for middleware where getRequestEvent() is not available).
 * Returns allowed=true when the binding is null (fail-open).
 */
export async function checkRateLimitWithBinding(
  binding: RateLimit | null | undefined,
  key: string,
): Promise<{ allowed: boolean }> {
  if (!binding) return { allowed: true };
  try {
    const { success } = await binding.limit({ key });
    return { allowed: success };
  } catch {
    return { allowed: true };
  }
}

/**
 * Extract client IP from request headers, checking Cloudflare-specific headers first.
 */
export function getClientIP(request: Request): string {
  const cfIp = request.headers.get("cf-connecting-ip");
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return cfIp ?? forwarded?.split(",")[0]?.trim() ?? realIp ?? "unknown";
}
