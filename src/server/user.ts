import { action } from "@solidjs/router";
import { updateDisplayName } from "~/db/users_sql";
import { getSession } from "~/server/session";
import { getDb } from "~/server/storage";

const MAX_DISPLAY_NAME_LENGTH = 32;
const DISPLAY_NAME_REGEX = /^[a-zA-Z0-9 _\-'À-ÿ]+$/;

export const updateUserNameAction = action(async (displayName: string) => {
  "use server";
  const session = await getSession();
  if (!session.data.id) return;

  const trimmed = displayName.trim();
  if (trimmed.length < 1 || trimmed.length > MAX_DISPLAY_NAME_LENGTH) return;
  if (!DISPLAY_NAME_REGEX.test(trimmed)) return;

  const db = getDb();
  await updateDisplayName(db, { displayName: trimmed, id: session.data.id });
}, "update-display-name");
