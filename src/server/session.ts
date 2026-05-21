import argon2 from "argon2";
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
