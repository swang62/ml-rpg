import { query } from "@solidjs/router";
import {
  getCategoryReadCounts,
  getCourseReadStatusBySlug,
  getLessonCount,
  getLessonFromPathReadStatus,
  getSectionReadCounts,
  getUserXpSum,
} from "~/db/querier";
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
    const result = await getLessonFromPathReadStatus(d1, {
      userid: userId,
      courseslug: courseSlug,
      categoryslug: "",
      sectionslug: sectionSlug,
      lessonslug: lessonSlug,
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
    const { results: rows } = await getSectionReadCounts(d1, {
      userid: userId,
      courseslug: courseSlug,
      sectionslug: sectionSlug,
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
  const { results: rows } = await getCategoryReadCounts(d1, {
    userid: userId,
    courseslug: courseSlug,
  });

  const result: Record<string, number> = {};
  for (const row of rows) {
    result[row.sectionslug] = row.readcount;
  }
  return result;
}, "category-counts");

export const getCourseReadCountsQuery = query(async (courseSlug: string) => {
  "use server";
  const userId = await getSessionUserId();
  if (!userId) return {};

  const d1 = getDb();
  const { results: rows } = await getCourseReadStatusBySlug(d1, {
    userid: userId,
    courseslug: courseSlug,
  });

  const result: Record<string, boolean[]> = {};
  for (const row of rows) {
    const statuses = result[row.categoryslug] ?? [];
    statuses.push(row.readcount >= row.totallessons);
    result[row.categoryslug] = statuses;
  }
  return result;
}, "course-counts");
