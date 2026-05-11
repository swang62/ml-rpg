import type { Course } from "~/data/types";

const courseModules = import.meta.glob<{ default: Course }>(
  "~/data/courses/*.ts",
  { import: "default" },
);

const COURSE_MODULE_PREFIX = "/src/data/courses/";

export async function loadCourse(slug: string): Promise<Course | null> {
  const key = `${COURSE_MODULE_PREFIX}${slug}.ts`;
  const loader = courseModules[key];
  if (!loader) return null;
  return await loader();
}
