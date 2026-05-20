import argon2 from "argon2";
import { useSession } from "vinxi/http";

export interface Session {
  id: number;
}

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET environment variable is required. Generate one with: openssl rand -hex 32",
  );
}

export const getSession = () =>
  useSession<Session>({
    password: SESSION_SECRET,
    name: "session",
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 90, // 90 days — session is a signed cookie, no server-side store; users shouldn't re-login daily
    },
  });

/** Hash a password using Argon2id (OWASP recommended). */
export async function createHash(
  password: string,
  options?: Partial<argon2.Options>,
): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    ...options,
  });
}

/** Verify a password against an Argon2id hash. */
export async function checkPassword(
  storedPassword: string,
  providedPassword: string,
): Promise<void> {
  const valid = await argon2.verify(storedPassword, providedPassword);
  if (!valid) throw new Error("Invalid password");
}
