import { query } from "@solidjs/router";
import {
  getAllCourses,
  getBreadcrumbs,
  getCategoriesByCourse,
  getCategoryBySlug,
  getCourseBySlug,
  getCourseSectionLessonCounts,
  getLessonBySlug,
  getLessonHtml,
  getLessonsByCategoryGrouped,
  getLessonsBySection,
  getSectionBySlug,
  getSectionBySlugInCourse,
} from "~/db/querier";
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
  const { results: sectionCounts } = await getCourseSectionLessonCounts(d1, {
    courseId: course.id,
  });
  const sectionsByCategory: Record<
    string,
    { section: string; lessonCount: number }[]
  > = {};
  for (const row of sectionCounts) {
    const sections = sectionsByCategory[row.categoryslug] ?? [];
    sections.push({ section: row.sectionslug, lessonCount: row.lessoncount });
    sectionsByCategory[row.categoryslug] = sections;
  }
  return {
    title: course.title,
    categories: categories.map((cat) => ({
      category: cat.slug,
      title: cat.title,
      sections: sectionsByCategory[cat.slug] ?? [],
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
    const chain = await resolveCourseCategorySection(
      d1,
      courseSlug,
      categorySlug,
      sectionSlug,
    );
    if (!chain) return null;
    const { sec } = chain;

    const { results: lessons } = await getLessonsBySection(d1, {
      sectionId: sec.id,
    });
    return {
      title: sec.title,
      lessons,
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

async function resolveSection(
  d1: D1Database,
  categoryId: number,
  sectionSlug: string,
) {
  const sec = await getSectionBySlug(d1, {
    slug: sectionSlug,
    categoryId,
  });
  if (!sec) return null;
  return sec;
}

async function resolveCourseCategorySection(
  d1: D1Database,
  courseSlug: string,
  categorySlug: string,
  sectionSlug: string,
) {
  const course = await resolveCourse(d1, courseSlug);
  if (!course) return null;

  const cat = await resolveCategory(d1, course.id, categorySlug);
  if (!cat) return null;

  const sec = await resolveSection(d1, cat.id, sectionSlug);
  if (!sec) return null;

  return { course, cat, sec };
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

export async function getLessonNavQuery(
  courseSlug: string,
  categorySlug: string,
  sectionSlug: string,
  lessonSlug: string,
) {
  "use server";
  const d1 = getDb();

  const chain = await resolveCourseCategorySection(
    d1,
    courseSlug,
    categorySlug,
    sectionSlug,
  );
  if (!chain) return null;
  const { sec } = chain;

  const { results: lessons } = await getLessonsBySection(d1, {
    sectionId: sec.id,
  });
  const idx = lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  if (idx === -1) return null;

  return {
    currentLesson: lessons[idx],
    prevLesson: idx > 0 ? lessons[idx - 1] : null,
    nextLesson: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  };
}

export async function getLessonHTMLQuery(
  courseSlug: string,
  sectionSlug: string,
  lessonSlug: string,
) {
  "use server";
  const d1 = getDb();

  const lesson = await findLessonByPath(
    d1,
    courseSlug,
    sectionSlug,
    lessonSlug,
  );
  if (!lesson) return "";

  const htmlRow = await getLessonHtml(d1, { id: lesson.id });
  return cleanLessonHtml(htmlRow?.html ?? "");
}
