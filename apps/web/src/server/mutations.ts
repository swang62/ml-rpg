import { action } from "@solidjs/router";
import {
  markLessonRead,
  resetSectionProgress,
  resetUserProgress,
} from "~/db/progress_sql";
import { updateDisplayName } from "~/db/users_sql";
import { findLessonByPath, findSectionBySlugInCourse } from "~/server/course";
import { getSession } from "~/server/session";
import { getDb } from "~/server/storage";
import { validateDisplayName, validateSlug } from "~/utils/input-validation";

export const markLessonReadAction = action(
  async (courseSlug: string, sectionSlug: string, lessonSlug: string) => {
    "use server";
    const session = await getSession();
    if (!session.data.id) return;

    const validatedCourse = validateSlug(courseSlug);
    const validatedSection = validateSlug(sectionSlug);
    const validatedLesson = validateSlug(lessonSlug);
    if (!validatedCourse || !validatedSection || !validatedLesson) return;

    const db = getDb();
    const lesson = await findLessonByPath(
      db,
      validatedCourse,
      validatedSection,
      validatedLesson,
    );
    if (!lesson) return;

    await markLessonRead(db, { lessonId: lesson.id, userId: session.data.id });
  },
  "mark-lesson-read",
);

export const resetSectionAction = action(
  async (courseSlug: string, sectionSlug: string) => {
    "use server";
    const session = await getSession();
    if (!session.data.id) return;

    const validatedCourse = validateSlug(courseSlug);
    const validatedSection = validateSlug(sectionSlug);
    if (!validatedCourse || !validatedSection) return;

    const db = getDb();
    const sec = await findSectionBySlugInCourse(
      db,
      validatedCourse,
      validatedSection,
    );
    if (!sec) return;

    await resetSectionProgress(db, {
      userId: session.data.id,
      sectionId: sec.id,
    });
  },
  "reset-section",
);

export const resetAllProgressAction = action(async () => {
  "use server";
  const session = await getSession();
  if (!session.data.id) return;

  const db = getDb();
  await resetUserProgress(db, { userId: session.data.id });
}, "reset-all-progress");

export const updateUserNameAction = action(async (displayName: string) => {
  "use server";
  const session = await getSession();
  if (!session.data.id) return;

  const validated = validateDisplayName(displayName);
  if (!validated) return;

  const db = getDb();
  await updateDisplayName(db, { displayName: validated, id: session.data.id });
}, "update-display-name");
