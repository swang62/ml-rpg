"use server";

import MiniSearch, { type SearchResult } from "minisearch";

import { getAllCategories } from "~/db/category_sql";
import { getAllCourses } from "~/db/course_sql";
import { getSearchLessons } from "~/db/lesson_sql";
import { getAllSections } from "~/db/section_sql";
import { getDb } from "~/server/storage";
import { SEARCH_MAX_RESULTS } from "~/utils/constants";

function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/&[a-z]+\d*;/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract search-relevant text from a lesson's HTML.
 * Builds content step by step: h1 → key takeaways → strong tags → border-left blocks.
 */
export function extractRelevantText(html: string): string {
  const parts: string[] = [];

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) parts.push(h1Match[1]);

  const strongPattern = /<strong[^>]*>([\s\S]*?)<\/strong>/gis;
  const strongMatches = [...html.matchAll(strongPattern)];
  for (const match of strongMatches) {
    if (match[1].trim()) parts.push(match[1]);
  }

  const cardContentPattern =
    /<span[^>]*class="[^"]*Learn_keyTakeaways[^"]*"[^>]*>([\s\S]*?)<\/span>/gi;
  const cardMatches = [...html.matchAll(cardContentPattern)];
  for (const match of cardMatches) {
    if (match[1].trim()) parts.push(match[1]);
  }

  const borderPattern =
    /<(\w+)[^>]*border-left:\s*4px[^>]*>([\s\S]*?)<\/\1>/gis;
  const borderMatches = [...html.matchAll(borderPattern)];
  for (const match of borderMatches) {
    if (match[2].trim()) parts.push(match[2]);
  }

  return stripHtmlTags(parts.join(" "));
}

interface SearchDocument {
  id: string;
  lessonTitle: string;
  lessonContent: string;
  categoryTitle: string;
  sectionTitle: string;
  url: string;
}

export type MiniSearchResult = SearchResult & Omit<SearchDocument, "id">;

let _engine: MiniSearch<SearchDocument> | null = null;

async function buildIndex() {
  if (_engine) return true;

  const start = performance.now();
  const db = getDb();

  const courseRows = await getAllCourses(db);
  const categoryRows = await getAllCategories(db);
  const sectionRows = await getAllSections(db);
  const lessonRows = await getSearchLessons(db);

  const courses = new Map(courseRows.map((r) => [r.id, r]));
  const categories = new Map(categoryRows.map((r) => [r.id, r]));
  const sections = new Map(sectionRows.map((r) => [r.id, r]));

  const docs: SearchDocument[] = [];

  for (const lesson of lessonRows) {
    const sec = sections.get(lesson.sectionid);
    if (!sec) continue;

    const cat = categories.get(sec.categoryid);
    if (!cat) continue;

    const course = courses.get(cat.courseid);
    if (!course) continue;

    const lessonContent = extractRelevantText(lesson.html);
    if (!lessonContent) continue;

    docs.push({
      id: `${course.slug}/${sec.slug}/${lesson.slug}`,
      lessonTitle: lesson.title,
      lessonContent,
      categoryTitle: cat.title,
      sectionTitle: sec.title,
      url: `/${course.slug}/${cat.slug}/${sec.slug}/${lesson.slug}`,
    });
  }

  const engine = new MiniSearch<SearchDocument>({
    fields: ["lessonTitle", "lessonContent"],
    storeFields: [
      "lessonTitle",
      "lessonContent",
      "categoryTitle",
      "sectionTitle",
      "url",
    ],
    processTerm: (term) => {
      const t = term.toLowerCase();
      if (t.length < 3 || /^[0-9\s]+$/.test(t)) return null;
      if (STOP_WORDS.has(t)) return null;
      return t;
    },
  });
  engine.addAll(docs);

  console.log(
    `[search] indexed ${docs.length} lessons in ${((performance.now() - start) / 1000).toFixed(2)}s`,
  );
  _engine = engine;
  return true;
}
export async function searchLessons(searchQuery: string) {
  await buildIndex();

  const raw = _engine?.search(searchQuery, {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      lessonTitle: 1.2,
    },
  });

  if (!raw?.length) return [];

  return raw.slice(0, SEARCH_MAX_RESULTS) as MiniSearchResult[];
}

export const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "nor",
  "not",
  "if",
  "so",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "by",
  "with",
  "up",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "can",
  "could",
  "shall",
  "should",
  "may",
  "might",
  "must",
  "this",
  "that",
  "these",
  "those",
  "it",
  "its",
  "they",
  "them",
  "their",
  "we",
  "us",
  "our",
  "you",
  "your",
  "he",
  "she",
  "him",
  "her",
  "his",
  "my",
  "me",
  "no",
  "nor",
  "also",
  "than",
  "all",
  "any",
  "each",
  "few",
  "some",
  "every",
  "about",
  "above",
  "after",
  "again",
  "before",
  "between",
  "both",
  "because",
  "into",
  "more",
  "most",
  "much",
  "now",
  "only",
  "other",
  "own",
  "over",
  "same",
  "such",
  "through",
  "until",
  "very",
  "just",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "why",
  "how",
]);
