import { action, query, redirect } from "@solidjs/router";
import { getUserById } from "~/db/users_sql";
import { checkPassword, createHash, getSession } from "~/server/session";
import { getDb } from "~/utils/storage";

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
