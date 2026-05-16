import { action } from "@solidjs/router";
import { markLessonRead, resetSectionProgress } from "~/db/progress_sql";
import { getUserById } from "~/db/user_sql";
import { findLessonByPath, findSectionBySlugInCourse } from "~/server/course";
import { USER_ID } from "~/utils/constants";
import { getDb } from "~/utils/storage";

export const markLessonReadAction = action(
  async (
    courseSlug: string,
    subsectionSlug: string,
    lessonSlug: string,
    _order: number,
  ) => {
    "use server";
    const db = getDb();
    const user = await getUserById(db, { id: USER_ID });
    if (!user) return;

    const lesson = await findLessonByPath(
      db,
      courseSlug,
      subsectionSlug,
      lessonSlug,
    );
    if (!lesson) return;

    await markLessonRead(db, { lessonId: lesson.id, userId: user.id });
  },
  "mark-lesson-read",
);

export const resetSectionAction = action(
  async (courseSlug: string, subsectionSlug: string) => {
    "use server";
    const db = getDb();
    const user = await getUserById(db, { id: USER_ID });
    if (!user) return;

    const sec = await findSectionBySlugInCourse(db, courseSlug, subsectionSlug);
    if (!sec) return;

    await resetSectionProgress(db, { userId: user.id, sectionId: sec.id });
  },
  "reset-section",
);
