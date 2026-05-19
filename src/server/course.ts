import { query } from "@solidjs/router";
import type { Database } from "better-sqlite3";
import {
  getCategoriesByCourse,
  getCategoryBySlug,
  getCategoryLessonCounts,
} from "~/db/category_sql";
import { getAllCourses, getCourseBySlug } from "~/db/course_sql";
import { getLessonBySlug, getLessonsBySection } from "~/db/lesson_sql";
import { getSectionBySlug, getSectionsByCategory } from "~/db/section_sql";
import { getDb } from "~/utils/storage";

export const getCourseMetaQuery = query(async (courseSlug: string) => {
  "use server";
  const db = getDb();
  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return null;

  const categories = await getCategoriesByCourse(db, { courseId: course.id });
  const counts = await getCategoryLessonCounts(db, { courseId: course.id });
  const countMap: Record<string, number> = {};
  for (const row of counts) {
    countMap[row.categoryslug as string] = row.lessoncount;
  }
  return {
    title: course.title,
    categories: categories.map((cat) => ({
      category: cat.slug,
      title: cat.title,
      lessonCount: countMap[cat.slug as string] ?? 0,
    })),
  };
}, "course-meta");

export const getCategoryMetaQuery = query(
  async (courseSlug: string, categorySlug: string) => {
    "use server";
    const db = getDb();
    const course = await getCourseBySlug(db, { slug: courseSlug });
    if (!course) return null;

    const cat = await getCategoryBySlug(db, {
      slug: categorySlug,
      courseId: course.id,
    });
    if (!cat) return null;

    const sectionsRaw = await getSectionsByCategory(db, { categoryId: cat.id });
    const sections = await Promise.all(
      sectionsRaw.map(async (sec) => {
        const lessons = await getLessonsBySection(db, { sectionId: sec.id });
        return {
          section: sec.slug,
          title: sec.title,
          lessons,
        };
      }),
    );

    return { title: cat.title, sections };
  },
  "category-meta",
);

export const getSectionMetaQuery = query(
  async (courseSlug: string, categorySlug: string, sectionSlug: string) => {
    "use server";
    const db = getDb();
    const course = await getCourseBySlug(db, { slug: courseSlug });
    if (!course) return null;

    const cat = await getCategoryBySlug(db, {
      slug: categorySlug,
      courseId: course.id,
    });
    if (!cat) return null;

    const sec = await getSectionBySlug(db, {
      slug: sectionSlug,
      categoryId: cat.id,
    });
    if (!sec) return null;

    const lessons = await getLessonsBySection(db, { sectionId: sec.id });
    return {
      title: sec.title,
      lessons,
    };
  },
  "section-meta",
);

export const getCoursesQuery = query(async () => {
  "use server";
  const db = getDb();
  const rows = await getAllCourses(db);
  return rows;
}, "courses");

export const getBreadcrumbsQuery = query(
  async (courseSlug: string, categorySlug?: string, sectionSlug?: string) => {
    "use server";
    const db = getDb();
    const crumbs: { label: string; href: string }[] = [];

    const course = await getCourseBySlug(db, { slug: courseSlug });
    if (!course) return crumbs;

    crumbs.push({ label: course.title, href: `/${courseSlug}` });

    if (!categorySlug) return crumbs;

    const cat = await getCategoryBySlug(db, {
      slug: categorySlug,
      courseId: course.id,
    });
    if (!cat) return crumbs;

    crumbs.push({
      label: cat.title,
      href: `/${courseSlug}/${categorySlug}`,
    });

    if (!sectionSlug) return crumbs;

    const sec = await getSectionBySlug(db, {
      slug: sectionSlug,
      categoryId: cat.id,
    });
    if (!sec) return crumbs;

    crumbs.push({
      label: sec.title,
      href: `/${courseSlug}/${categorySlug}/${sectionSlug}`,
    });

    return crumbs;
  },
  "breadcrumbs",
);

export async function getLessonNavQuery(
  courseSlug: string,
  categorySlug: string,
  sectionSlug: string,
  lessonSlug: string,
) {
  "use server";
  const db = getDb();

  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return null;

  const cat = await getCategoryBySlug(db, {
    slug: categorySlug,
    courseId: course.id,
  });
  if (!cat) return null;

  const sec = await getSectionBySlug(db, {
    slug: sectionSlug,
    categoryId: cat.id,
  });
  if (!sec) return null;

  const lessons = await getLessonsBySection(db, { sectionId: sec.id });
  const idx = lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1) return null;

  return {
    currentLesson: lessons[idx],
    prevLesson: idx > 0 ? lessons[idx - 1] : null,
    nextLesson: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers (shared across other server modules)
// ---------------------------------------------------------------------------

export async function findSectionBySlugInCourse(
  db: Database,
  courseSlug: string,
  sectionSlug: string,
) {
  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return null;

  const categories = await getCategoriesByCourse(db, { courseId: course.id });
  for (const cat of categories) {
    const sec = await getSectionBySlug(db, {
      slug: sectionSlug,
      categoryId: cat.id,
    });
    if (sec) return sec;
  }
  return null;
}

export async function findLessonByPath(
  db: Database,
  courseSlug: string,
  sectionSlug: string,
  lessonSlug: string,
) {
  const sec = await findSectionBySlugInCourse(db, courseSlug, sectionSlug);
  if (!sec) return null;

  const lesson = await getLessonBySlug(db, {
    slug: lessonSlug,
    sectionId: sec.id,
  });
  return lesson ?? null;
}

export function cleanLessonHtml(html: string): string {
  return html
    .replace(/&lt;code[^&]*?&gt;/g, (m) =>
      m.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
    )
    .replaceAll("&lt;/code&gt;", "</code>");
}
