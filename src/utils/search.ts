import MiniSearch from "minisearch";
import {
  SEARCH_INDEX_PATH,
  SEARCH_MAX_RESULTS,
  SEARCH_MIN_QUERY_LENGTH,
} from "~/utils/constants";

export interface SearchResult {
  articleTitle: string;
  categoryTitle: string;
  subsectionTitle: string;
  url: string;
}

let index: MiniSearch | null = null;
let loadPromise: Promise<void> | null = null;

export function loadSearchIndex(): Promise<void> {
  if (index) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = fetch(SEARCH_INDEX_PATH)
    .then((res) => res.json())
    .then((data) => {
      index = MiniSearch.loadJSON(JSON.stringify(data), {
        fields: ["title", "text"],
        storeFields: [
          "articleTitle",
          "categoryTitle",
          "subsectionTitle",
          "url",
        ],
        searchOptions: {
          boost: { title: 1.5 },
          fuzzy: 0.2,
          prefix: true,
          combineWith: "or",
        },
      });
    });

  return loadPromise;
}

export function searchSiteData(query: string): SearchResult[] {
  if (!index || query.trim().length < SEARCH_MIN_QUERY_LENGTH) return [];

  const raw = index.search(query);

  return raw.slice(0, SEARCH_MAX_RESULTS).map((r) => ({
    articleTitle: r.articleTitle as string,
    categoryTitle: r.categoryTitle as string,
    subsectionTitle: r.subsectionTitle as string,
    url: r.url as string,
  }));
}
