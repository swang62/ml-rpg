import { getLessonHtml } from "~/db/lesson_sql";
import { cleanLessonHtml, findLessonByPath } from "~/server/course";
import { getDb } from "~/utils/storage";

export async function getLessonHTMLQuery(
  courseSlug: string,
  sectionSlug: string,
  lessonSlug: string,
) {
  "use server";
  const db = getDb();

  const lesson = await findLessonByPath(
    db,
    courseSlug,
    sectionSlug,
    lessonSlug,
  );
  if (!lesson) return "";

  const htmlRow = await getLessonHtml(db, { id: lesson.id });
  return cleanLessonHtml(htmlRow?.html ?? "");
}
