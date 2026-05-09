import levenshtein from "fast-levenshtein";
import type { Category } from "~/data/site-data";
import { buildArticleUrl } from "~/data/site-data";

export interface SearchResult {
  articleSlug: string;
  articleTitle: string;
  categorySlug: string;
  categoryTitle: string;
  subsectionSlug: string;
  subsectionTitle: string;
  url: string;
}

function fuzzyMatch(text: string, term: string): boolean {
  const words = text.split(/\s+/);
  return words.some(
    (word) => word.includes(term) || levenshtein.get(word, term) <= 1,
  );
}

export function searchSiteData(
  data: Category[],
  query: string,
): SearchResult[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const category of data) {
    for (const subsection of category.subsections) {
      for (const article of subsection.articles) {
        // const searchable = [category.title, subsection.title, article.title]
        //   .join(" ")
        //   .toLowerCase();
        const searchable = article.title.toLowerCase();
        const matchesAllTerms = terms.every((term) =>
          fuzzyMatch(searchable, term),
        );
        if (matchesAllTerms) {
          results.push({
            articleSlug: article.slug,
            articleTitle: article.title,
            categorySlug: category.slug,
            categoryTitle: category.title,
            subsectionSlug: subsection.slug,
            subsectionTitle: subsection.title,
            url: buildArticleUrl(category.slug, subsection.slug, article.slug),
          });
        }
      }
    }
  }

  return results;
}
