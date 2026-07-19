import { useSession } from "vinxi/http";
import { SESSION_TIMEOUT_DAYS } from "~/utils/constants";
import { getEnv } from "~/utils/env";

export interface Session {
  id: number;
}

// Lazy init — avoid env validation at module level (Cloudflare Workers
// forbids async I/O, crypto, or process.env access in global scope).
let _secret: string | null = null;
let _isProduction: boolean | null = null;
function getSessionSecret(): string {
  if (!_secret) {
    const env = getEnv();
    _secret = env.SESSION_SECRET;
    _isProduction = env.NODE_ENV === "production";
  }
  return _secret;
}

export const getSession = () =>
  useSession<Session>({
    password: getSessionSecret(),
    name: "session",
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: _isProduction ?? false,
      maxAge: 60 * 60 * 24 * SESSION_TIMEOUT_DAYS, // seconds
    },
  });

// Password operations delegated to password.ts for Worker compatibility.
// Re-export for backward compatibility with existing callers.
export { checkPassword, createHash } from "~/server/password";
