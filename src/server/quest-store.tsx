import { action, query } from "@solidjs/router";
import type { Component } from "solid-js";
import { renderToString } from "solid-js/web";
import { COURSES, USER_ID, XP_VALUE } from "~/utils/constants";
import { getStorage } from "~/utils/storage";

const lessonComponents = import.meta.glob<Component>(
  "~/data/lessons/**/*.tsx",
  { import: "default" },
);

function lessonKey(course: string, subsection: string, lesson: string) {
  return `${USER_ID}:${course}:${subsection}:${lesson}`;
}
function sectionPrefix(course: string, subsection: string) {
  return `${USER_ID}:${course}:${subsection}:`;
}
function userPrefix() {
  return `${USER_ID}:`;
}

export interface CourseMeta {
  title: string;
  categories: { category: string; title: string }[];
}

export const getCourseMetaQuery = query(async (courseSlug: string) => {
  "use server";
  const c = COURSES[courseSlug];
  if (!c) return null;
  return {
    title: c.title,
    categories: c.categories.map((cat) => ({
      category: cat.category,
      title: cat.title,
    })),
  };
}, "course-meta");

export const getCategoryMetaQuery = query(
  async (courseSlug: string, categorySlug: string) => {
    "use server";
    const c = COURSES[courseSlug];
    const cat = c?.categories.find((cat) => cat.category === categorySlug);
    if (!cat) return null;
    return { title: cat.title, subsections: cat.subsections };
  },
  "category-meta",
);

export const getSubsectionMetaQuery = query(
  async (courseSlug: string, categorySlug: string, subsectionSlug: string) => {
    "use server";
    const c = COURSES[courseSlug];
    const cat = c?.categories.find((cat) => cat.category === categorySlug);
    const sub = cat?.subsections.find((s) => s.subsection === subsectionSlug);
    if (!sub) return null;
    return { title: sub.title, lessons: sub.lessons };
  },
  "subsection-meta",
);

export const getTotalXpQuery = query(async () => {
  "use server";
  const storage = getStorage();
  const prefix = userPrefix();
  const keys = await storage.getKeys();
  let total = 0;
  for (const key of keys) {
    if (!key.startsWith(prefix)) continue;
    const order = await storage.getItem<number>(key);
    if (order) total += order;
  }
  return total * XP_VALUE;
}, "total-xp");

export const getReadLessonsQuery = query(
  async (course: string, subsection: string) => {
    "use server";
    const storage = getStorage();
    const prefix = sectionPrefix(course, subsection);
    const keys = await storage.getKeys();
    return keys
      .filter((k) => k.startsWith(prefix))
      .map((k) => k.slice(prefix.length));
  },
  "read-lessons",
);

export const isLessonReadQuery = query(
  async (course: string, subsection: string, lesson: string) => {
    "use server";
    const storage = getStorage();
    return await storage.hasItem(lessonKey(course, subsection, lesson));
  },
  "lesson-read",
);

export const getSectionReadStatusesQuery = query(async (course: string) => {
  "use server";
  const c = COURSES[course];
  if (!c) return {};

  const storage = getStorage();
  const prefix = userPrefix();
  const keys = await storage.getKeys();
  const prefixed = keys.filter((k) => k.startsWith(prefix));

  const result: Record<string, boolean[]> = {};
  for (const cat of c.categories) {
    result[cat.category] = cat.subsections.map((sub) => {
      const sp = sectionPrefix(course, sub.subsection);
      const readCount = prefixed.filter((k) => k.startsWith(sp)).length;
      return readCount >= sub.lessons.length;
    });
  }
  return result;
}, "section-statuses");

export const getReadCountsQuery = query(async (course: string) => {
  "use server";
  const c = COURSES[course];
  if (!c) return {};

  const storage = getStorage();
  const prefix = userPrefix();
  const keys = await storage.getKeys();
  const prefixed = keys.filter((k) => k.startsWith(prefix));

  const result: Record<string, number> = {};
  for (const cat of c.categories) {
    for (const sub of cat.subsections) {
      const sp = sectionPrefix(course, sub.subsection);
      result[sub.subsection] = prefixed.filter((k) => k.startsWith(sp)).length;
    }
  }
  return result;
}, "read-counts");

export const getLessonNavQuery = query(
  async (
    course: string,
    category: string,
    subsection: string,
    lesson: string,
  ) => {
    "use server";
    const c = COURSES[course];
    const cat = c?.categories.find((cat) => cat.category === category);
    const sub = cat?.subsections.find((s) => s.subsection === subsection);
    if (!sub) return null;
    const sorted = [...sub.lessons].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((l) => l.lesson === lesson);
    return {
      currentLesson: sorted[idx] ?? null,
      prevLesson: idx > 0 ? sorted[idx - 1] : null,
      nextLesson: idx < sorted.length - 1 ? sorted[idx + 1] : null,
    };
  },
  "lesson-nav",
);

export const getLessonHTMLQuery = query(
  async (course: string, subsection: string, lesson: string) => {
    "use server";
    const key = Object.keys(lessonComponents).find((k) =>
      k.endsWith(`/${course}/${subsection}__${lesson}.tsx`),
    );
    if (!key) return "";
    const Comp = await lessonComponents[key]();
    return renderToString(() => <Comp />);
  },
  "lesson-html",
);

export const markLessonReadAction = action(
  async (course: string, subsection: string, lesson: string, order: number) => {
    "use server";
    const storage = getStorage();
    const key = lessonKey(course, subsection, lesson);
    const exists = await storage.hasItem(key);
    if (!exists) {
      await storage.setItem(key, order);
    }
  },
  "mark-lesson-read",
);

export const resetSectionAction = action(
  async (course: string, subsection: string) => {
    "use server";
    const storage = getStorage();
    const prefix = sectionPrefix(course, subsection);
    const keys = await storage.getKeys();
    const toRemove = keys.filter((k) => k.startsWith(prefix));
    await Promise.all(toRemove.map((k) => storage.removeItem(k)));
  },
  "reset-section",
);
