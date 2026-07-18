import { action } from "@solidjs/router";
import {
  markLessonRead,
  resetSectionProgress,
  resetUserProgress,
  updateDisplayName,
} from "~/db/querier";
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

    const d1 = getDb();
    const lesson = await findLessonByPath(
      d1,
      validatedCourse,
      validatedSection,
      validatedLesson,
    );
    if (!lesson) return;

    await markLessonRead(d1, { lessonId: lesson.id, userId: session.data.id });
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

    const d1 = getDb();
    const sec = await findSectionBySlugInCourse(
      d1,
      validatedCourse,
      validatedSection,
    );
    if (!sec) return;

    await resetSectionProgress(d1, {
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

  const d1 = getDb();
  await resetUserProgress(d1, { userId: session.data.id });
}, "reset-all-progress");

export const updateUserNameAction = action(async (displayName: string) => {
  "use server";
  const session = await getSession();
  if (!session.data.id) return;

  const validated = validateDisplayName(displayName);
  if (!validated) return;

  const d1 = getDb();
  await updateDisplayName(d1, { displayName: validated, id: session.data.id });
}, "update-display-name");
