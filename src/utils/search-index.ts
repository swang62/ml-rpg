import MiniSearch from "minisearch";
import { STOP_WORDS } from "./constants";

export interface SearchDocument {
  id: string;
  lessonTitle: string;
  lessonContent: string;
  categoryTitle: string;
  sectionTitle: string;
  url: string;
}

export function getSearchEngineOptions() {
  return {
    fields: ["lessonTitle", "lessonContent", "categoryTitle", "sectionTitle"],
    storeFields: [
      "lessonTitle",
      "lessonContent",
      "categoryTitle",
      "sectionTitle",
      "url",
    ],
    processTerm: (term: string) => {
      const normalizedTerm = term.toLowerCase();
      if (normalizedTerm.length < 3 || /^[0-9\s]+$/.test(normalizedTerm)) {
        return null;
      }
      if (STOP_WORDS.has(normalizedTerm)) {
        return null;
      }
      return normalizedTerm;
    },
  };
}

export function createSearchEngine(): MiniSearch<SearchDocument> {
  return new MiniSearch<SearchDocument>(getSearchEngineOptions());
}
