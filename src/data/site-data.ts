// Re-export types and course index from the split structure.
// The per-course data files (courses/*.ts) are loaded lazily at runtime
// via utils/course-data.ts — they are NOT eagerly imported here.

export type { CourseIndexEntry } from "~/data/course-index";
export { COURSE_INDEX } from "~/data/course-index";
export type { Category, Course, Lesson, Subsection } from "~/utils/types";
