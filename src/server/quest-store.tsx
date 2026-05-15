import { action, query } from "@solidjs/router";
import type { Component } from "solid-js";
import { renderToString } from "solid-js/web";
import { USER_ID, XP_VALUE } from "~/utils/constants";
import type { Category, Subsection } from "~/utils/types";
import { getStorage } from "./storage";

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
function coursePrefix(course: string) {
  return `${USER_ID}:${course}:`;
}

export const getTotalXpQuery = query(async () => {
  "use server";
  const storage = getStorage();
  const keys = await storage.getKeys();
  let total = 0;
  for (const key of keys) {
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
    const item = await storage.getItem(lessonKey(course, subsection, lesson));
    return item !== null && item !== undefined;
  },
  "lesson-read",
);

export const getSectionReadStatusesQuery = query(
  async (course: string, cats: Category[]) => {
    "use server";
    if (!cats.length) return new Map<string, boolean[]>();
    const storage = getStorage();
    const prefix = coursePrefix(course);
    const keys = await storage.getKeys();
    const prefixed = keys.filter((k) => k.startsWith(prefix));

    return new Map(
      cats.map((cat) => {
        const statuses = cat.subsections.map((sub) => {
          const sp = sectionPrefix(course, sub.subsection);
          const readCount = prefixed.filter((k) => k.startsWith(sp)).length;
          return readCount >= sub.lessons.length;
        });
        return [cat.category, statuses];
      }),
    );
  },
  "section-statuses",
);

export const getReadCountsQuery = query(
  async (course: string, subs: Subsection[]) => {
    "use server";
    if (!subs.length) return new Map<string, number>();
    const storage = getStorage();
    const prefix = coursePrefix(course);
    const keys = await storage.getKeys();
    const prefixed = keys.filter((k) => k.startsWith(prefix));

    return new Map(
      subs.map((sub) => {
        const sp = sectionPrefix(course, sub.subsection);
        const readCount = prefixed.filter((k) => k.startsWith(sp)).length;
        return [sub.subsection, readCount];
      }),
    );
  },
  "read-counts",
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
    const exists = await storage.getItem(key);
    if (exists === null || exists === undefined) {
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
