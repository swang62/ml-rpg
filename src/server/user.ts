import { action } from "@solidjs/router";

import { updateDisplayName } from "~/db/users_sql";
import { getSession } from "~/server/auth";
import { getDb } from "~/utils/storage";

export const updateUserNameAction = action(async (displayName: string) => {
  "use server";
  const session = await getSession();
  if (!session.data.id) return;

  const db = getDb();
  await updateDisplayName(db, { displayName, id: session.data.id });
}, "update-display-name");
