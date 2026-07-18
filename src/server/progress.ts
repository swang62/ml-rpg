import { query } from "@solidjs/router";
import {
  getCourseBySlug,
  getCourseSectionReadStatus,
  getLessonCount,
  getReadCountsByCourse,
  getReadLessonsBySection,
  getSectionIdToSlugByCourse,
  getUserXpSum,
  isLessonRead,
} from "~/db/querier";
import { findLessonByPath, findSectionBySlugInCourse } from "~/server/course";
import { getSession } from "~/server/session";
import { getDb } from "~/server/storage";
import { XP_VALUE } from "~/utils/constants";

export const getTotalXpQuery = query(async () => {
  "use server";
  const userId = await getSessionUserId();
  if (!userId) return { count: 0, percent: 0 };

  const d1 = getDb();
  const sumRow = await getUserXpSum(d1, { userId });
  const lessonCountRow = await getLessonCount(d1);

  const totalXp = Number(sumRow?.totalorder ?? 0) * XP_VALUE;
  const readCount = sumRow?.readcount ?? 0;
  const totalLessons = lessonCountRow?.lessoncount ?? 0;

  return {
    count: totalXp,
    percent: totalLessons > 0 ? readCount / totalLessons : 0,
  };
}, "total-xp");

export const getLessonReadStatusQuery = query(
  async (courseSlug: string, sectionSlug: string, lessonSlug: string) => {
    "use server";
    const userId = await getSessionUserId();
    if (!userId) return false;

    const d1 = getDb();
    const lesson = await findLessonByPath(
      d1,
      courseSlug,
      sectionSlug,
      lessonSlug,
    );
    if (!lesson) return false;

    const result = await isLessonRead(d1, {
      lessonId: lesson.id,
      userId,
    });
    return result?.isread ? Boolean(result.isread) : false;
  },
  "lesson-read-status",
);

export const getSectionReadCountsQuery = query(
  async (courseSlug: string, sectionSlug: string) => {
    "use server";
    const userId = await getSessionUserId();
    if (!userId) return [];

    const d1 = getDb();
    const sec = await findSectionBySlugInCourse(d1, courseSlug, sectionSlug);
    if (!sec) return [];

    const { results: rows } = await getReadLessonsBySection(d1, {
      userId,
      sectionId: sec.id,
    });
    return rows.map((r) => r.slug);
  },
  "section-counts",
);

async function getSessionUserId(): Promise<number | null> {
  const session = await getSession();
  return session.data.id ?? null;
}

export const getCategoryReadCountsQuery = query(async (courseSlug: string) => {
  "use server";
  const userId = await getSessionUserId();
  if (!userId) return {};

  const d1 = getDb();
  const course = await getCourseBySlug(d1, { slug: courseSlug });
  if (!course) return {};

  // Single JOIN query replaces loop over categories -> sections
  const { results: sectionSlugs } = await getSectionIdToSlugByCourse(d1, {
    courseId: course.id,
  });
  const slugMap: Record<number, string> = {};
  for (const sec of sectionSlugs) {
    slugMap[Number(sec.id)] = sec.slug;
  }

  const { results: rows } = await getReadCountsByCourse(d1, {
    userId,
    courseId: course.id,
  });

  const result: Record<string, number> = {};
  for (const row of rows) {
    const slug = slugMap[Number(row.sectionid)];
    if (slug) {
      result[slug] = row.readcount;
    }
  }
  return result;
}, "category-counts");

export const getCourseReadCountsQuery = query(async (courseSlug: string) => {
  "use server";
  const userId = await getSessionUserId();
  if (!userId) return {};

  const d1 = getDb();
  const course = await getCourseBySlug(d1, { slug: courseSlug });
  if (!course) return {};

  const { results } = await getCourseSectionReadStatus(d1, {
    userId,
    courseId: course.id,
  });

  // Single JS pass over one flat result set — no N+1
  const result: Record<string, boolean[]> = {};
  for (const row of results) {
    const statuses = result[row.categoryslug] ?? [];
    statuses.push(row.readcount >= row.totallessons);
    result[row.categoryslug] = statuses;
  }

  return result;
}, "course-counts");
