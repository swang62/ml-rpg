export interface CourseIndexEntry {
  title: string;
  base: string;
}

export const COURSE_INDEX: Record<string, CourseIndexEntry> = {
  "ml-system-design": {
    title: "ML System Design",
    base: "/ml-system-design",
  },
  "data-engineering": {
    title: "Data Engineering",
    base: "/data-engineering",
  },
};
