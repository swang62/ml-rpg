import { action, query } from "@solidjs/router";

import { getUserById, updateDisplayName } from "~/db/users_sql";
import { USER_ID } from "~/utils/constants";
import { getDb } from "~/utils/storage";

export const getUser = query(async () => {
  "use server";
  const db = getDb();
  const user = await getUserById(db, { id: USER_ID });
  if (!user) return null;

  return user;
}, "current-user");

export const updateUserNameAction = action(async (displayName: string) => {
  "use server";
  const db = getDb();
  await updateDisplayName(db, { displayName, id: USER_ID });
}, "update-display-name");
