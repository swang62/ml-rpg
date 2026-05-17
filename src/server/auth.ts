import { action, query, redirect } from "@solidjs/router";
import { getUserById, getUserCount } from "~/db/users_sql";
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

  const count = await getUserCount(db);
  const hasUsers = count !== null && count.count > 0;

  let userId: number;

  if (hasUsers) {
    // Existing system — require valid credentials
    const row = db
      .prepare("SELECT id, user_password FROM users WHERE username = ?")
      .get(trimmed) as { id: number; user_password: string | null } | undefined;
    if (!row) return new Error("Invalid username or password");
    if (!row.user_password)
      return new Error("Account exists via another method");
    await checkPassword(row.user_password, password);
    userId = row.id;
  } else {
    // First user — auto-register
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
  return redirect("/", { revalidate: "session" });
});

export const logoutAction = action(async () => {
  "use server";
  const session = await getSession();
  await session.update({ id: undefined });
  throw redirect("/", { revalidate: "session" });
});
