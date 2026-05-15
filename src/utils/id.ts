import { createHash } from "node:crypto";

function hash(parts: string[]): string {
  return createHash("sha256").update(parts.join("/")).digest("hex").slice(0, 8);
}

export function courseId(slug: string): string {
  return hash([slug]);
}

export function categoryId(course_slug: string, category_slug: string): string {
  return hash([course_slug, category_slug]);
}

export function sectionId(
  course_slug: string,
  category_slug: string,
  section_slug: string,
): string {
  return hash([course_slug, category_slug, section_slug]);
}

export function lessonId(
  course_slug: string,
  category_slug: string,
  section_slug: string,
  lesson_slug: string,
): string {
  return hash([course_slug, category_slug, section_slug, lesson_slug]);
}
