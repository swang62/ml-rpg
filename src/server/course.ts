import de from "~/data/courses/data-engineering";
import mlSysDesign from "~/data/courses/ml-system-design";
import type { Course } from "~/data/types";

const courses: Record<string, Course> = {
  "ml-system-design": mlSysDesign,
  "data-engineering": de,
};

export function loadCourse(slug?: string): Course | null {
  return courses[slug ?? ""] ?? null;
}

export interface SiteStats {
  worlds: number;
  levels: number;
  quests: number;
  missions: number;
}

export function getSiteStats(): SiteStats {
  const worldList = Object.values(courses);
  let levels = 0;
  let quests = 0;
  let missions = 0;

  for (const course of worldList) {
    levels += course.categories.length;
    for (const category of course.categories) {
      quests += category.subsections.length;
      for (const subsection of category.subsections) {
        missions += subsection.lessons.length;
      }
    }
  }

  return {
    worlds: worldList.length,
    levels,
    quests,
    missions,
  };
}
