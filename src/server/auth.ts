import { action, query, redirect } from "@solidjs/router";
import {
  getUserById,
  getUserByUserNameWithPassword,
  getUserCount,
  upsertUser,
} from "~/db/users_sql";
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
    const row = await getUserByUserNameWithPassword(db, { username: trimmed });
    if (!row) return new Error("Invalid username");
    if (!row.userpassword)
      return new Error("Account exists via another method");
    await checkPassword(row.userpassword as string, password);
    userId = row.id as number;
  } else {
    // First user — auto-register
    const hashed = await createHash(password);
    const row = await upsertUser(db, {
      username: trimmed,
      userPassword: hashed,
      displayName: `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1).toLowerCase()}`,
    });
    if (!row) return new Error("Failed to create user");
    userId = row.id as number;
  }

  const session = await getSession();
  await session.update({ id: userId });
  return redirect("/", { revalidate: "session" });
});

export const logoutAction = action(async () => {
  "use server";
  const session = await getSession();
  await session.update({ id: undefined });
  return redirect("/", { revalidate: "session" });
});
