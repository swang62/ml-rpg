"use server";

import MiniSearch from "minisearch";
import {
  getAllCategories,
  getAllCourses,
  getAllSections,
} from "~/db/course_sql";
import { getSearchLessons } from "~/db/lesson_sql";
import { SEARCH_MAX_RESULTS, type SearchResult } from "~/utils/constants";
import { getDb } from "~/utils/storage";

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

interface Document {
  id: string;
  lessonTitle: string;
  lessonContent: string;
  categoryTitle: string;
  sectionTitle: string;
  url: string;
}
let _engine: MiniSearch | null = null;
const _ready: boolean = false;

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

  const docs: Document[] = [];

  for (const lesson of lessonRows) {
    const sec = sections.get(lesson.sectionid);
    if (!sec) continue;

    const cat = categories.get(sec.categoryid);
    if (!cat) continue;

    const course = courses.get(cat.courseid);
    if (!course) continue;

    const lessonContent = plainText(lesson.html);
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

  const STOP_WORDS = new Set([
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

  const engine = new MiniSearch({
    fields: ["lessonTitle", "lessonContent"],
    storeFields: ["lessonTitle", "categoryTitle", "sectionTitle", "url"],
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
export async function searchLessons(
  searchQuery: string,
): Promise<SearchResult[]> {
  await buildIndex();

  const raw = _engine?.search(searchQuery, {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      lessonTitle: 1.5,
    },
  });
  const results: SearchResult[] = [];
  if (!raw?.length) return results;

  for (const r of raw.slice(0, SEARCH_MAX_RESULTS)) {
    results.push({
      lessonTitle: r.lessonTitle,
      categoryTitle: r.categoryTitle,
      subsectionTitle: `${r.sectionTitle}`,
      url: r.url,
    });
  }
  return results;
}
