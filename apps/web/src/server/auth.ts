import { action, query, redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import {
  getUserById,
  getUserByUserName,
  getUserByUserNameWithPassword,
  updateLastVisitedAt,
  upsertUser,
} from "~/db/users_sql";
import { checkRateLimit } from "~/middleware/rate-limiter";
import { checkPassword, createHash, getSession } from "~/server/session";
import { getDb } from "~/server/storage";
import { RATE_LIMIT_LOGIN } from "~/utils/constants";
import { validatePassword, validateUsername } from "~/utils/input-validation";

export const querySession = query(async () => {
  "use server";
  const { data } = await getSession();
  if (!data.id) return null;

  const db = getDb();
  const user = await getUserById(db, { id: data.id });

  // Track page visit for signed-in users
  await updateLastVisitedAt(db, { id: data.id });

  return user ?? null;
}, "session");

export const formLogin = action(async (formData: FormData) => {
  "use server";
  const event = getRequestEvent();
  const ip = event?.clientAddress ?? "unknown";
  const rateResult = checkRateLimit(`ratelimit:auth:${ip}`, RATE_LIMIT_LOGIN);
  if (!rateResult.allowed) {
    throw new Error("Too many attempts. Try again later.");
  }

  const rawUsername = formData.get("username");
  const rawPassword = formData.get("password");

  const username = validateUsername(rawUsername);
  const password = validatePassword(rawPassword);
  if (!username || !password) {
    return new Error("Invalid username or password format");
  }

  const db = getDb();
  const row = await getUserByUserNameWithPassword(db, { username });
  if (!row) {
    throw new Error("Invalid username");
  }
  if (!row.userpassword) {
    throw new Error("Account exists via another method");
  }
  await checkPassword(row.userpassword as string, password);

  const session = await getSession();
  await session.update({ id: row.id as number });
  return redirect("/", { revalidate: "session" });
});

export const formSignup = action(async (formData: FormData) => {
  "use server";
  const event = getRequestEvent();
  const ip = event?.clientAddress ?? "unknown";
  const rateResult = checkRateLimit(`ratelimit:auth:${ip}`, RATE_LIMIT_LOGIN);
  if (!rateResult.allowed) {
    throw new Error("Too many attempts. Try again later.");
  }

  const rawUsername = formData.get("username");
  const rawPassword = formData.get("password");

  const username = validateUsername(rawUsername);
  const password = validatePassword(rawPassword);
  if (!username || !password) {
    throw new Error("Invalid username or password format");
  }

  const db = getDb();
  const existing = await getUserByUserName(db, { username });
  if (existing) {
    throw new Error("Username already taken");
  }

  const hashed = await createHash(password);
  const row = await upsertUser(db, {
    username,
    userPassword: hashed,
    displayName: `${username.charAt(0).toUpperCase()}${username.slice(1)}`,
  });
  if (!row) return new Error("Failed to create user");

  const session = await getSession();
  await session.update({ id: row.id as number });
  return redirect("/", { revalidate: "session" });
});

export const logoutAction = action(async () => {
  "use server";
  const session = await getSession();
  await session.update({ id: undefined });
  return redirect("/", { revalidate: "session" });
});
