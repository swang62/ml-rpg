import { query } from "@solidjs/router";
import {
  getAllReadLessons,
  getCategoriesByCourse,
  getCourseBySlug,
  getLessonCount,
  getLessonsByCategoryGrouped,
  getReadCountsByCourse,
  getReadLessonsBySection,
  getSectionIdToSlugByCourse,
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
  const { results: readLessons } = await getAllReadLessons(d1, { userId });
  const lessonCountRow = await getLessonCount(d1);

  const totalXp =
    readLessons.reduce((total, row) => total + row.lessonorder, 0) * XP_VALUE;
  const totalLessons = lessonCountRow?.lessoncount ?? 0;

  return {
    count: totalXp,
    percent: totalLessons > 0 ? readLessons.length / totalLessons : 0,
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
    return Boolean(result?.isread);
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

  const { results: sectionSlugs } = await getSectionIdToSlugByCourse(d1, {
    courseId: course.id,
  });
  const slugMap: Record<number, string> = {};
  for (const sec of sectionSlugs) {
    slugMap[sec.id] = sec.slug;
  }

  const { results: rows } = await getReadCountsByCourse(d1, {
    userId,
    courseId: course.id,
  });

  const result: Record<string, number> = {};
  for (const row of rows) {
    const slug = slugMap[row.sectionid];
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

  const { results: allRead } = await getAllReadLessons(d1, { userId });
  const readSet = new Set(allRead.map((row) => row.lessonid));

  const { results: categories } = await getCategoriesByCourse(d1, {
    courseId: course.id,
  });

  const result: Record<string, boolean[]> = {};
  for (const cat of categories) {
    const { results: grouped } = await getLessonsByCategoryGrouped(d1, {
      categoryId: cat.id,
    });

    const sectionLessons = new Map<string, number[]>();
    for (const row of grouped) {
      const lessonIds = sectionLessons.get(row.secslug) ?? [];
      lessonIds.push(row.id);
      sectionLessons.set(row.secslug, lessonIds);
    }

    const statuses: boolean[] = [];
    for (const lessonIds of sectionLessons.values()) {
      statuses.push(lessonIds.every((id) => readSet.has(id)));
    }
    result[cat.slug] = statuses;
  }

  return result;
}, "course-counts");
