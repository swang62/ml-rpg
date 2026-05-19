import { action } from "@solidjs/router";
import {
  markLessonRead,
  resetSectionProgress,
  resetUserProgress,
} from "~/db/progress_sql";
import { findLessonByPath, findSectionBySlugInCourse } from "~/server/course";
import { getSession } from "~/server/session";
import { getDb } from "~/utils/storage";

export const markLessonReadAction = action(
  async (courseSlug: string, subsectionSlug: string, lessonSlug: string) => {
    "use server";
    const session = await getSession();
    if (!session.data.id) return;

    const db = getDb();
    const lesson = await findLessonByPath(
      db,
      courseSlug,
      subsectionSlug,
      lessonSlug,
    );
    if (!lesson) return;

    await markLessonRead(db, { lessonId: lesson.id, userId: session.data.id });
  },
  "mark-lesson-read",
);

export const resetSectionAction = action(
  async (courseSlug: string, subsectionSlug: string) => {
    "use server";
    const session = await getSession();
    if (!session.data.id) return;

    const db = getDb();
    const sec = await findSectionBySlugInCourse(db, courseSlug, subsectionSlug);
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
