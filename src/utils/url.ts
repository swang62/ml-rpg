import { BASE_URL } from "~/data/site-data";

export function getLessonUrl(
  category: string,
  subsection: string,
  lesson: string,
): string {
  return `${BASE_URL}/${category}/${subsection}/${lesson}`;
}
