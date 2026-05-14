import de from "~/data/courses/data-engineering";
import mlSysDesign from "~/data/courses/ml-system-design";
import type { Course } from "~/utils/types";

const courses: Record<string, Course> = {
  "ml-system-design": mlSysDesign,
  "data-engineering": de,
};

export function loadCourse(slug?: string): Course | null {
  return courses[slug ?? ""] ?? null;
}
