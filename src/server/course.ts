"use server";

import de from "~/data/courses/data-engineering";
import mlSysDesign from "~/data/courses/ml-system-design";
import type { Course } from "~/data/types";

const courses: Record<string, Course> = {
  "ml-system-design": mlSysDesign,
  "data-engineering": de,
};

export async function loadCourse(slug?: string): Promise<Course | null> {
  return courses[slug ?? ""] ?? null;
}
