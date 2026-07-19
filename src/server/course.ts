import { query } from "@solidjs/router";
import {
  getAllCourses,
  getBreadcrumbs,
  getCategoriesByCourse,
  getCategoryBySlug,
  getCategoryLessonCounts,
  getCourseBySlug,
  getLessonBySlug,
  getLessonFromPathReadStatus,
  getLessonPageData,
  getLessonsByCategoryGrouped,
  getSectionBySlugInCourse,
  getSectionPageData,
} from "~/db/querier";
import { getSession } from "~/server/session";
import { getDb } from "~/server/storage";
import { cleanLessonHtml } from "~/utils/search-utils";

export const getCourseMetaQuery = query(async (courseSlug: string) => {
  "use server";
  const d1 = getDb();
  const course = await getCourseBySlug(d1, { slug: courseSlug });
  if (!course) return null;

  const { results: categories } = await getCategoriesByCourse(d1, {
    courseId: course.id,
  });
  const { results: counts } = await getCategoryLessonCounts(d1, {
    courseId: course.id,
  });
  const countMap: Record<string, number> = {};
  for (const row of counts) {
    countMap[row.categoryslug] = row.lessoncount;
  }
  return {
    title: course.title,
    categories: categories.map((cat) => ({
      category: cat.slug,
      title: cat.title,
      lessonCount: countMap[cat.slug] ?? 0,
    })),
  };
}, "course-meta");

export const getCategoryMetaQuery = query(
  async (courseSlug: string, categorySlug: string) => {
    "use server";
    const d1 = getDb();
    const course = await resolveCourse(d1, courseSlug);
    if (!course) return null;

    const cat = await resolveCategory(d1, course.id, categorySlug);
    if (!cat) return null;

    // Single JOIN query replaces N+1: one call instead of per-section queries
    const { results: grouped } = await getLessonsByCategoryGrouped(d1, {
      categoryId: cat.id,
    });

    // Group lessons by section in JS (single query instead of N+1)
    interface LessonEntry {
      id: number;
      slug: string;
      title: string;
      lessonorder: number;
    }
    const sectionMap = new Map<
      string,
      { section: string; title: string; lessons: LessonEntry[] }
    >();
    for (const row of grouped) {
      const secSlug = row.secslug;
      let entry = sectionMap.get(secSlug);
      if (!entry) {
        entry = {
          section: secSlug,
          title: row.sectitle,
          lessons: [],
        };
        sectionMap.set(secSlug, entry);
      }
      entry.lessons.push({
        id: row.id,
        slug: row.slug,
        title: row.title,
        lessonorder: row.lessonorder,
      });
    }

    return { title: cat.title, sections: [...sectionMap.values()] };
  },
  "category-meta",
);

export const getSectionMetaQuery = query(
  async (courseSlug: string, categorySlug: string, sectionSlug: string) => {
    "use server";
    const d1 = getDb();
    const { results: rows } = await getSectionPageData(d1, {
      courseslug: courseSlug,
      categoryslug: categorySlug,
      sectionslug: sectionSlug,
    });
    if (rows.length === 0) return null;
    return {
      title: rows[0].sectitle,
      lessons: rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        lessonorder: r.lessonorder,
      })),
    };
  },
  "section-meta",
);

export const getCoursesQuery = query(async () => {
  "use server";
  const d1 = getDb();
  const { results: rows } = await getAllCourses(d1);
  return rows;
}, "courses");

export const getBreadcrumbsQuery = query(
  async (courseSlug: string, categorySlug?: string, sectionSlug?: string) => {
    "use server";
    const d1 = getDb();

    const row = await getBreadcrumbs(d1, {
      courseslug: courseSlug,
      categoryslug: categorySlug ?? "",
      sectionslug: sectionSlug ?? "",
    });
    if (!row) return [];

    const crumbs: { label: string; href: string }[] = [
      { label: row.coursetitle, href: `/${courseSlug}` },
    ];
    if (row.categorytitle && categorySlug) {
      crumbs.push({
        label: row.categorytitle,
        href: `/${courseSlug}/${categorySlug}`,
      });
    }
    if (row.sectiontitle && sectionSlug) {
      crumbs.push({
        label: row.sectiontitle,
        href: `/${courseSlug}/${categorySlug}/${sectionSlug}`,
      });
    }
    return crumbs;
  },
  "breadcrumbs",
);

// ---------------------------------------------------------------------------
// Internal helpers (shared across other server modules)
// ---------------------------------------------------------------------------

async function resolveCourse(d1: D1Database, courseSlug: string) {
  const course = await getCourseBySlug(d1, { slug: courseSlug });
  if (!course) return null;
  return course;
}

async function resolveCategory(
  d1: D1Database,
  courseId: number,
  categorySlug: string,
) {
  const cat = await getCategoryBySlug(d1, {
    slug: categorySlug,
    courseId,
  });
  if (!cat) return null;
  return cat;
}

export async function findSectionBySlugInCourse(
  d1: D1Database,
  courseSlug: string,
  sectionSlug: string,
) {
  const course = await getCourseBySlug(d1, { slug: courseSlug });
  if (!course) return null;

  // Single JOIN query instead of iterating categories
  return (
    (await getSectionBySlugInCourse(d1, {
      courseId: course.id,
      slug: sectionSlug,
    })) ?? null
  );
}

export async function findLessonByPath(
  d1: D1Database,
  courseSlug: string,
  sectionSlug: string,
  lessonSlug: string,
) {
  const sec = await findSectionBySlugInCourse(d1, courseSlug, sectionSlug);
  if (!sec) return null;

  const lesson = await getLessonBySlug(d1, {
    slug: lessonSlug,
    sectionId: sec.id,
  });
  return lesson ?? null;
}

/** Lesson page content (nav + HTML) for a whole section. Cached by section — navigating between lessons in the same section is instant. */
export const getLessonPageContentQuery = query(
  async (courseSlug: string, categorySlug: string, sectionSlug: string) => {
    "use server";
    const d1 = getDb();

    const { results: rows } = await getLessonPageData(d1, {
      userid: 0, // unused — we only need nav + html
      courseslug: courseSlug,
      categoryslug: categorySlug,
      sectionslug: sectionSlug,
    });

    if (rows.length === 0) return null;

    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      lessonorder: r.lessonorder,
      html: cleanLessonHtml(r.html ?? ""),
    }));
  },
  "lesson-content",
);

/** Read status only — always fresh, never cached. */
export async function getLessonReadStatusFresh(
  courseSlug: string,
  categorySlug: string,
  sectionSlug: string,
  lessonSlug: string,
) {
  "use server";
  const d1 = getDb();
  const session = await getSession();
  const userId = session.data.id ?? 0;
  if (!userId) return false;

  const result = await getLessonFromPathReadStatus(d1, {
    userid: userId,
    courseslug: courseSlug,
    categoryslug: categorySlug,
    sectionslug: sectionSlug,
    lessonslug: lessonSlug,
  });
  return result?.isread ? Boolean(result.isread) : false;
}
