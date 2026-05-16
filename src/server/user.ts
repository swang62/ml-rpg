import { query } from "@solidjs/router";

import { getUserById } from "~/db/user_sql";
import { USER_ID } from "~/utils/constants";
import { getDb } from "~/utils/storage";

export const getUser = query(async () => {
  "use server";
  const db = getDb();
  const user = await getUserById(db, { id: USER_ID });
  if (!user) return null;

  return user;
}, "current-user");
