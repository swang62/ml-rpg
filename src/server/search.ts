import MiniSearch, { type SearchResult } from "minisearch";
import { getRequestEvent } from "solid-js/web";
import { SEARCH_MAX_RESULTS } from "~/utils/constants";
import { sanitizeSearchQuery } from "~/utils/input-validation";
import {
  getSearchEngineOptions,
  type SearchDocument,
} from "~/utils/search-index";

let _engine: MiniSearch<SearchDocument> | null = null;
let _enginePromise: Promise<MiniSearch<SearchDocument>> | null = null;

export type MiniSearchResult = SearchResult & Omit<SearchDocument, "id">;

export async function searchLessons(searchQuery: string) {
  "use server";

  const sanitized = sanitizeSearchQuery(searchQuery);
  if (sanitized.length < 3 || sanitized.length > 200) return [];

  await loadIndex();

  const raw = _engine?.search(sanitized, {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      lessonTitle: 1.2,
      categoryTitle: 1.1,
      sectionTitle: 1.05,
    },
  });

  if (!raw?.length) return [];

  return raw.slice(0, SEARCH_MAX_RESULTS) as MiniSearchResult[];
}

async function loadIndex() {
  if (_engine) return _engine;
  if (_enginePromise) return _enginePromise;

  const requestEvent = getRequestEvent();
  const requestUrl = requestEvent?.request?.url;
  if (!requestUrl) {
    throw new Error("Search index requires an active request URL");
  }

  _enginePromise = (async () => {
    const start = performance.now();
    const response = await fetch(new URL("/search-index.json", requestUrl));
    if (!response.ok) {
      throw new Error(`Failed to load search index: ${response.status}`);
    }

    const serializedIndex = await response.text();
    const engine = await MiniSearch.loadJSONAsync<SearchDocument>(
      serializedIndex,
      getSearchEngineOptions(),
    );

    console.log(
      `[search] loaded static index in ${((performance.now() - start) / 1000).toFixed(2)}s`,
    );
    _engine = engine;
    _enginePromise = null;
    return engine;
  })();

  return _enginePromise;
}
