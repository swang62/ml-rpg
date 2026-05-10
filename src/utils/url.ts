import { BASE_URL } from "~/data/site-data";

export function getLessonUrl(
  course: string,
  category: string,
  subsection: string,
  lesson: string,
): string {
  return `${course}/${category}/${subsection}/${lesson}`;
}

export function getOriginalLessonUrl(
  category: string,
  subsection: string,
  lesson: string,
): string {
  return `${BASE_URL}/${category}/${subsection}/${lesson}`;
}
