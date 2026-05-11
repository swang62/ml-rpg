import MiniSearch from "minisearch";

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

  loadPromise = fetch("/search/index.json")
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
      });
    });

  return loadPromise;
}

export function searchSiteData(query: string): SearchResult[] {
  if (!index || query.trim().length < 3) return [];

  const raw = index.search(query);

  return raw.slice(0, 6).map((r) => ({
    articleTitle: r.articleTitle as string,
    categoryTitle: r.categoryTitle as string,
    subsectionTitle: r.subsectionTitle as string,
    url: r.url as string,
  }));
}
