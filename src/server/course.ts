import { query } from "@solidjs/router";
import type { Database } from "better-sqlite3";
import { getCategoriesByCourse, getCategoryBySlug } from "~/db/category_sql";
import { getAllCourses, getCourseBySlug } from "~/db/course_sql";
import {
  getLessonBySlug,
  getLessonCountByCategory,
  getLessonsBySection,
} from "~/db/lesson_sql";
import { getSectionBySlug, getSectionsByCategory } from "~/db/section_sql";
import { getDb } from "~/utils/storage";

export const getCourseMetaQuery = query(async (courseSlug: string) => {
  "use server";
  const db = getDb();
  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return null;

  const categories = await getCategoriesByCourse(db, { courseId: course.id });
  return {
    title: course.title,
    categories: categories.map((cat) => ({
      category: cat.slug,
      title: cat.title,
    })),
  };
}, "course-meta");

export const getCourseLessonCountsQuery = query(async (courseSlug: string) => {
  "use server";
  const db = getDb();
  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return {};

  const rows = await getLessonCountByCategory(db, { courseId: course.id });
  const result: Record<string, number> = {};
  for (const row of rows) {
    result[row.categoryslug as string] = row.lessoncount;
  }
  return result;
}, "course-lesson-counts");

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

    const sections = await getSectionsByCategory(db, { categoryId: cat.id });
    const subsections = await Promise.all(
      sections.map(async (sec) => {
        const lessons = await getLessonsBySection(db, { sectionId: sec.id });
        return {
          subsection: sec.slug,
          title: sec.title,
          lessons,
        };
      }),
    );

    return { title: cat.title, subsections };
  },
  "category-meta",
);

export const getSubsectionMetaQuery = query(
  async (courseSlug: string, categorySlug: string, subsectionSlug: string) => {
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
      slug: subsectionSlug,
      categoryId: cat.id,
    });
    if (!sec) return null;

    const lessons = await getLessonsBySection(db, { sectionId: sec.id });
    return {
      title: sec.title,
      lessons,
    };
  },
  "subsection-meta",
);

export const getCoursesQuery = query(async () => {
  "use server";
  const db = getDb();
  const rows = await getAllCourses(db);
  return rows;
}, "courses");

export const getBreadcrumbsQuery = query(
  async (
    courseSlug: string,
    categorySlug?: string,
    subsectionSlug?: string,
  ) => {
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

    if (!subsectionSlug) return crumbs;

    const sec = await getSectionBySlug(db, {
      slug: subsectionSlug,
      categoryId: cat.id,
    });
    if (!sec) return crumbs;

    crumbs.push({
      label: sec.title,
      href: `/${courseSlug}/${categorySlug}/${subsectionSlug}`,
    });

    return crumbs;
  },
  "breadcrumbs",
);

export async function getLessonNavQuery(
  courseSlug: string,
  categorySlug: string,
  subsectionSlug: string,
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
    slug: subsectionSlug,
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
  subsectionSlug: string,
  lessonSlug: string,
) {
  const sec = await findSectionBySlugInCourse(db, courseSlug, subsectionSlug);
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
