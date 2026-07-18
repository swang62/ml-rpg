import { query } from "@solidjs/router";
import {
  getAllLessons,
  getAllReadLessons,
  getCategoriesByCourse,
  getCourseBySlug,
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
  const { results: totalLessons } = await getAllLessons(d1);
  const { results: result } = await getAllReadLessons(d1, { userId });

  const totalCalculatedXP =
    result.map((r) => r.lessonorder).reduce((prev, curr) => prev + curr, 0) *
    XP_VALUE;

  return {
    count: totalCalculatedXP,
    percent: result.length / totalLessons.length,
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

  const { results: allRead } = await getAllReadLessons(d1, { userId });
  const readSet = new Set(allRead.map((r) => Number(r.lessonid)));

  // Single grouped query replaces nested loops over categories -> sections -> lessons
  const { results: categories } = await getCategoriesByCourse(d1, {
    courseId: course.id,
  });
  const result: Record<string, boolean[]> = {};

  for (const cat of categories) {
    const { results: grouped } = await getLessonsByCategoryGrouped(d1, {
      categoryId: cat.id,
    });

    // Build a section-lesson map from the grouped results
    const sectionLessons = new Map<string, number[]>();
    for (const row of grouped) {
      const secSlug = row.secslug;
      if (!sectionLessons.has(secSlug)) {
        sectionLessons.set(secSlug, []);
      }
      sectionLessons.get(secSlug)?.push(Number(row.id));
    }

    const statuses: boolean[] = [];
    for (const [, lessonIds] of sectionLessons) {
      statuses.push(lessonIds.every((id) => readSet.has(id)));
    }
    result[cat.slug] = statuses;
  }

  return result;
}, "course-counts");
