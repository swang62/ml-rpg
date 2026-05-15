import { action, query } from "@solidjs/router";
import { USER_ID, XP_VALUE } from "~/utils/constants";
import { getDb } from "~/utils/storage";
import {
  getCourseBySlug,
  getCategoriesByCourse,
  getCategoryBySlug,
  getSectionsByCategory,
  getSectionBySlug,
  getLessonsBySection,
  getLessonBySlug,
  getAllCourses,
} from "~/db/course_sql";
import { getLessonHtml } from "~/db/lesson_sql";
import { getUserBySlug } from "~/db/user_sql";
import {
  getTotalXp as getTotalXpDb,
  getReadLessonsBySection,
  isLessonRead as isLessonReadDb,
  markLessonRead,
  resetSectionProgress,
  getReadCountsByCourse,
  getAllReadLessons,
} from "~/db/progress_sql";

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
          lessons: lessons.map((l) => ({
            lesson: l.slug,
            title: l.title,
            order: l.order,
          })),
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
      lessons: lessons.map((l) => ({
        lesson: l.slug,
        title: l.title,
        order: l.order,
      })),
    };
  },
  "subsection-meta",
);

export const getTotalXpQuery = query(async () => {
  "use server";
  const db = getDb();
  const user = await getUserBySlug(db, { slug: USER_ID });
  if (!user) return 0;

  const result = await getTotalXpDb(db, { userId: user.id });
  return (result?.totalorder ?? 0) * XP_VALUE;
}, "total-xp");

export const getReadLessonsQuery = query(
  async (courseSlug: string, subsectionSlug: string) => {
    "use server";
    const db = getDb();
    const user = await getUserBySlug(db, { slug: USER_ID });
    if (!user) return [];

    const sec = await findSectionBySlugInCourse(db, courseSlug, subsectionSlug);
    if (!sec) return [];

    const rows = await getReadLessonsBySection(db, {
      userId: user.id,
      sectionId: sec.id,
    });
    return rows.map((r) => r.slug);
  },
  "read-lessons",
);

export const isLessonReadQuery = query(
  async (courseSlug: string, subsectionSlug: string, lessonSlug: string) => {
    "use server";
    const db = getDb();
    const user = await getUserBySlug(db, { slug: USER_ID });
    if (!user) return false;

    const lesson = await findLessonByPath(
      db,
      courseSlug,
      subsectionSlug,
      lessonSlug,
    );
    if (!lesson) return false;

    const result = await isLessonReadDb(db, {
      lessonId: lesson.id,
      userId: user.id,
    });
    return (result?.readcount ?? 0) > 0;
  },
  "lesson-read",
);

export const getSectionReadStatusesQuery = query(
  async (courseSlug: string) => {
    "use server";
    const db = getDb();
    const user = await getUserBySlug(db, { slug: USER_ID });
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
  },
  "section-statuses",
);

export const getReadCountsQuery = query(async (courseSlug: string) => {
  "use server";
  const db = getDb();
  const user = await getUserBySlug(db, { slug: USER_ID });
  if (!user) return {};

  const course = await getCourseBySlug(db, { slug: courseSlug });
  if (!course) return {};

  const rows = await getReadCountsByCourse(db, {
    userId: user.id,
    courseId: course.id,
  });
  const result: Record<string, number> = {};
  for (const row of rows) {
    result[String(row.sectionid)] = row.readcount;
  }
  return result;
}, "read-counts");

export const getLessonNavQuery = query(
  async (
    courseSlug: string,
    categorySlug: string,
    subsectionSlug: string,
    lessonSlug: string,
  ) => {
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

    const mapLesson = (l: (typeof lessons)[number]) => ({
      lesson: l.slug,
      title: l.title,
      order: l.order,
    });

    return {
      currentLesson: mapLesson(lessons[idx]),
      prevLesson: idx > 0 ? mapLesson(lessons[idx - 1]) : null,
      nextLesson:
        idx < lessons.length - 1 ? mapLesson(lessons[idx + 1]) : null,
    };
  },
  "lesson-nav",
);

export const getLessonHTMLQuery = query(
  async (courseSlug: string, subsectionSlug: string, lessonSlug: string) => {
    "use server";
    const db = getDb();

    const lesson = await findLessonByPath(
      db,
      courseSlug,
      subsectionSlug,
      lessonSlug,
    );
    if (!lesson) return "";

    const htmlRow = await getLessonHtml(db, { id: lesson.id });
    return cleanLessonHtml(htmlRow?.html ?? "");
  },
  "lesson-html",
);

export const markLessonReadAction = action(
  async (
    courseSlug: string,
    subsectionSlug: string,
    lessonSlug: string,
    _order: number,
  ) => {
    "use server";
    const db = getDb();
    const user = await getUserBySlug(db, { slug: USER_ID });
    if (!user) return;

    const lesson = await findLessonByPath(
      db,
      courseSlug,
      subsectionSlug,
      lessonSlug,
    );
    if (!lesson) return;

    await markLessonRead(db, { lessonId: lesson.id, userId: user.id });
  },
  "mark-lesson-read",
);

export const resetSectionAction = action(
  async (courseSlug: string, subsectionSlug: string) => {
    "use server";
    const db = getDb();
    const user = await getUserBySlug(db, { slug: USER_ID });
    if (!user) return;

    const sec = await findSectionBySlugInCourse(db, courseSlug, subsectionSlug);
    if (!sec) return;

    await resetSectionProgress(db, { userId: user.id, sectionId: sec.id });
  },
  "reset-section",
);

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

export const getCoursesQuery = query(async () => {
  "use server";
  const db = getDb();
  const rows = await getAllCourses(db);
  return rows.map((r) => ({ slug: r.slug, title: r.title }));
}, "courses");

async function findSectionBySlugInCourse(
  db: import("better-sqlite3").Database,
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

async function findLessonByPath(
  db: import("better-sqlite3").Database,
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

function cleanLessonHtml(html: string): string {
  return html
    .replace(/&lt;code[^&]*?&gt;/g, (m) =>
      m.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
    )
    .replaceAll("&lt;/code&gt;", "</code>");
}
