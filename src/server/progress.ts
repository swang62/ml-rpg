import { query } from "@solidjs/router";
import { getCategoriesByCourse } from "~/db/category_sql";
import { getCourseBySlug } from "~/db/course_sql";
import { getLessonsBySection } from "~/db/lesson_sql";
import {
  getAllReadLessons,
  getReadCountsByCourse,
  getReadLessonsBySection,
  getTotalXp,
  isLessonRead,
} from "~/db/progress_sql";
import { getSectionsByCategory } from "~/db/section_sql";
import { getUserById } from "~/db/users_sql";
import { findLessonByPath, findSectionBySlugInCourse } from "~/server/course";
import { USER_ID, XP_VALUE } from "~/utils/constants";
import { getDb } from "~/utils/storage";

export const getTotalXpQuery = query(async () => {
  "use server";
  const db = getDb();
  const user = await getUserById(db, { id: USER_ID });
  if (!user) return 0;

  const result = await getTotalXp(db, { userId: user.id });
  return (result?.totalorder ?? 0) * XP_VALUE;
}, "total-xp");

export const getLessonReadStatusQuery = query(
  async (courseSlug: string, subsectionSlug: string, lessonSlug: string) => {
    "use server";
    const db = getDb();
    const user = await getUserById(db, { id: USER_ID });
    if (!user) return false;

    const lesson = await findLessonByPath(
      db,
      courseSlug,
      subsectionSlug,
      lessonSlug,
    );
    if (!lesson) return false;

    const result = await isLessonRead(db, {
      lessonId: lesson.id,
      userId: user.id,
    });
    return (result?.readcount ?? 0) > 0;
  },
  "lesson-read-status",
);

export const getSectionReadCountsQuery = query(
  async (courseSlug: string, subsectionSlug: string) => {
    "use server";
    const db = getDb();
    const user = await getUserById(db, { id: USER_ID });
    if (!user) return [];

    const sec = await findSectionBySlugInCourse(db, courseSlug, subsectionSlug);
    if (!sec) return [];

    const rows = await getReadLessonsBySection(db, {
      userId: user.id,
      sectionId: sec.id,
    });
    return rows.map((r) => r.slug);
  },
  "section-counts",
);

export const getCategoryReadCountsQuery = query(async (courseSlug: string) => {
  "use server";
  const db = getDb();
  const user = await getUserById(db, { id: USER_ID });
  if (!user) return {};

  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return {};

  const rows = await getReadCountsByCourse(db, {
    userId: user.id,
    courseId: course.id,
  });

  // Build a map of sectionid -> slug for lookups
  const categories = await getCategoriesByCourse(db, { courseId: course.id });
  const sectionIdToSlug: Record<number, string> = {};
  for (const cat of categories) {
    const sections = await getSectionsByCategory(db, { categoryId: cat.id });
    for (const sec of sections) {
      sectionIdToSlug[sec.id] = sec.slug;
    }
  }

  const result: Record<string, number> = {};
  for (const row of rows) {
    const slug = sectionIdToSlug[Number(row.sectionid)];
    if (slug) {
      result[slug] = row.readcount;
    }
  }
  return result;
}, "category-counts");

export const getCourseReadCountsQuery = query(async (courseSlug: string) => {
  "use server";
  const db = getDb();
  const user = await getUserById(db, { id: USER_ID });
  if (!user) return {};

  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return {};

  const allRead = await getAllReadLessons(db, { userId: user.id });
  const readSet = new Set(allRead.map((r) => r.lessonid));

  const categories = await getCategoriesByCourse(db, { courseId: course.id });
  const result: Record<string, boolean[]> = {};

  for (const cat of categories) {
    const sections = await getSectionsByCategory(db, { categoryId: cat.id });
    const statuses = await Promise.all(
      sections.map(async (sec) => {
        const lessons = await getLessonsBySection(db, { sectionId: sec.id });
        return lessons.every((l) => readSet.has(l.id));
      }),
    );
    result[cat.slug] = statuses;
  }

  return result;
}, "course-counts");
