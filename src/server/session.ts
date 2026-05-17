import { getRandomValues, subtle, timingSafeEqual } from "node:crypto";
import { useSession } from "vinxi/http";

export interface Session {
  id: number;
}

export const getSession = () =>
  useSession<Session>({
    password:
      process.env.SESSION_SECRET ??
      "default_password_which_should_be_long_enough",
    name: "session",
  });

export async function createHash(password: string) {
  const salt = getRandomValues(new Uint8Array(16));
  const saltHex = Buffer.from(salt).toString("hex");
  const key = await subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-512",
    },
    await subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveBits"],
    ),
    512,
  );
  return `${saltHex}:${Buffer.from(key).toString("hex")}`;
}

export async function checkPassword(
  storedPassword: string,
  providedPassword: string,
) {
  const [storedSalt, storedHash] = storedPassword.split(":");
  if (!storedSalt || !storedHash)
    throw new Error("Invalid stored password format");
  const key = await subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: Buffer.from(storedSalt, "hex"),
      iterations: 100_000,
      hash: "SHA-512",
    },
    await subtle.importKey(
      "raw",
      new TextEncoder().encode(providedPassword),
      "PBKDF2",
      false,
      ["deriveBits"],
    ),
    512,
  );
  const hash = Buffer.from(key);
  const stored = Buffer.from(storedHash, "hex");
  if (stored.length !== hash.length || !timingSafeEqual(stored, hash))
    throw new Error("Invalid username or password");
}
