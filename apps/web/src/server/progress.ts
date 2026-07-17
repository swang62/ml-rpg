import { query } from "@solidjs/router";
import { getCategoriesByCourse } from "~/db/category_sql";
import { getCourseBySlug } from "~/db/course_sql";
import { getAllLessons, getLessonsByCategoryGrouped } from "~/db/lesson_sql";
import {
  getAllReadLessons,
  getReadCountsByCourse,
  getReadLessonsBySection,
  isLessonRead,
} from "~/db/progress_sql";
import { getSectionIdToSlugByCourse } from "~/db/section_sql";
import { findLessonByPath, findSectionBySlugInCourse } from "~/server/course";
import { getSession } from "~/server/session";
import { getDb } from "~/server/storage";
import { XP_VALUE } from "~/utils/constants";

export const getTotalXpQuery = query(async () => {
  "use server";
  const userId = await getSessionUserId();
  if (!userId) return { count: 0, percent: 0 };

  const db = getDb();
  const totalLessons = await getAllLessons(db);
  const result = await getAllReadLessons(db, { userId });

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

    const db = getDb();
    const lesson = await findLessonByPath(
      db,
      courseSlug,
      sectionSlug,
      lessonSlug,
    );
    if (!lesson) return false;

    const result = await isLessonRead(db, {
      lessonId: lesson.id,
      userId,
    });
    return result?.isread ?? false;
  },
  "lesson-read-status",
);

export const getSectionReadCountsQuery = query(
  async (courseSlug: string, sectionSlug: string) => {
    "use server";
    const userId = await getSessionUserId();
    if (!userId) return [];

    const db = getDb();
    const sec = await findSectionBySlugInCourse(db, courseSlug, sectionSlug);
    if (!sec) return [];

    const rows = await getReadLessonsBySection(db, {
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

  const db = getDb();
  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return {};

  // Single JOIN query replaces loop over categories → sections
  const sectionSlugs = await getSectionIdToSlugByCourse(db, {
    courseId: course.id,
  });
  const slugMap: Record<number, string> = {};
  for (const sec of sectionSlugs) {
    slugMap[Number(sec.id)] = sec.slug;
  }

  const rows = await getReadCountsByCourse(db, {
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

  const db = getDb();
  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return {};

  const allRead = await getAllReadLessons(db, { userId });
  const readSet = new Set(allRead.map((r) => Number(r.lessonid)));

  // Single grouped query replaces nested loops over categories → sections → lessons
  const categories = await getCategoriesByCourse(db, { courseId: course.id });
  const result: Record<string, boolean[]> = {};

  for (const cat of categories) {
    const grouped = await getLessonsByCategoryGrouped(db, {
      categoryId: cat.id,
    });

    // Build a section-lesson map from the grouped results
    const sectionLessons = new Map<string, number[]>();
    for (const row of grouped) {
      const secSlug = row.secslug as string;
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
