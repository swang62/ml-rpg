import levenshtein from "fast-levenshtein";
import { COURSES } from "~/data/site-data";
import { MAX_RESULTS } from "./constants";
import { getLessonUrl } from "./url";

export interface SearchResult {
  articleTitle: string;
  categoryTitle: string;
  subsectionTitle: string;
  url: string;
}

function fuzzyMatch(text: string, term: string): boolean {
  const words = text.split(/\s+/);
  return words.some(
    (word) => word.includes(term) || levenshtein.get(word, term) <= 1,
  );
}

export function searchSiteData(query: string): SearchResult[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  const courseKeys = Object.keys(COURSES);
  for (const key of courseKeys) {
    const course = COURSES[key];
    const categories = course.categories;

    for (const category of categories) {
      for (const subsection of category.subsections) {
        for (const article of subsection.lessons) {
          const searchable = article.title.toLowerCase();
          const matchesAllTerms = terms.every((term) =>
            fuzzyMatch(searchable, term),
          );
          if (matchesAllTerms) {
            results.push({
              articleTitle: article.title,
              categoryTitle: category.title,
              subsectionTitle: subsection.title,
              url: getLessonUrl(
                course.base,
                category.category,
                subsection.subsection,
                article.lesson,
              ),
            });
          }

          if (results.length >= MAX_RESULTS) {
            return results;
          }
        }
      }
    }
  }

  return results;
}
