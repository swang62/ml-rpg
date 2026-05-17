import { getRandomValues, subtle, timingSafeEqual } from "node:crypto";
import { action, query, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";

import { getUserById } from "~/db/users_sql";
import { getDb } from "~/utils/storage";

export interface SessionUser {
  id: number;
}

const SESSION_CONFIG = {
  password: process.env.SESSION_SECRET ?? "change_me_in_production",
  name: "session",
};

export const getSession = () => useSession<SessionUser>(SESSION_CONFIG);

async function createHash(password: string): Promise<string> {
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
  const hash = Buffer.from(key).toString("hex");
  return `${saltHex}:${hash}`;
}

async function checkPassword(
  storedPassword: string,
  providedPassword: string,
): Promise<void> {
  const parts = storedPassword.split(":");
  const storedSaltValue = parts[0];
  const storedHashValue = parts[1];
  if (!storedSaltValue || !storedHashValue)
    throw new Error("Invalid stored password format");
  const key = await subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: Buffer.from(storedSaltValue, "hex"),
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
  const stored = Buffer.from(storedHashValue, "hex");
  if (stored.length !== hash.length || !timingSafeEqual(stored, hash))
    throw new Error("Invalid username or password");
}

export const querySession = query(async () => {
  "use server";
  const { data } = await getSession();
  if (!data.id) return null;

  const db = getDb();
  const user = await getUserById(db, { id: data.id });
  return user ?? null;
}, "session");

export const formLogin = action(async (formData: FormData) => {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");
  if (typeof username !== "string" || typeof password !== "string")
    return new Error("Username and password are required");

  const db = getDb();
  const trimmed = username.trim().toLowerCase();

  const allUsers = db
    .prepare("SELECT id, username, user_password FROM users")
    .all() as { id: number; username: string; user_password: string | null }[];
  const existing = allUsers.find((u) => u.username === trimmed);
  let userId: number;
  if (existing) {
    if (!existing.user_password)
      return new Error("Account exists via another method");
    await checkPassword(existing.user_password, password);
    userId = existing.id;
  } else {
    const hashed = await createHash(password);
    const stmt = db.prepare(
      "INSERT INTO users (username, user_password, display_name) VALUES (?, ?, ?) RETURNING id",
    );
    const row = stmt.get(trimmed, hashed, trimmed) as
      | { id: number }
      | undefined;
    if (!row) return new Error("Failed to create user");
    userId = row.id;
  }

  const session = await getSession();
  await session.update({ id: userId });
  return null;
});

export const logoutAction = action(async () => {
  "use server";
  const session = await getSession();
  await session.clear();
  throw redirect("/");
});
