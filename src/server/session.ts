import { useSession } from "vinxi/http";
import { SESSION_TIMEOUT_DAYS } from "~/utils/constants";
import { getEnv } from "~/utils/env";

export interface Session {
  id: number;
}

const env = getEnv();
const SESSION_SECRET = env.SESSION_SECRET;

export const getSession = () =>
  useSession<Session>({
    password: SESSION_SECRET,
    name: "session",
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * SESSION_TIMEOUT_DAYS, // seconds
    },
  });

// Password operations delegated to password.ts for Worker compatibility.
// Re-export for backward compatibility with existing callers.
export { checkPassword, createHash } from "~/server/password";
