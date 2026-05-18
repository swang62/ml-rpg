"use server";

import MiniSearch, { type SearchResult } from "minisearch";

import { getAllCategories } from "~/db/category_sql";
import { getAllCourses } from "~/db/course_sql";
import { getSearchLessons } from "~/db/lesson_sql";
import { getAllSections } from "~/db/section_sql";
import { SEARCH_MAX_RESULTS, STOP_WORDS } from "~/utils/constants";
import { getDb } from "~/utils/storage";

function cleanHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Extract search-relevant text from a lesson's HTML.
 *
 * 1. Find elements with `border-left: 4px` in style (callout/highlight sections).
 *    If any exist, use only their content for indexing.
 * 2. If none found, extract text from all `<strong>` tags instead.
 * 3. If neither exist, extract the first `<p>` element with content.
 */
function extractSearchText(html: string): string {
  // Match any element with border-left: 4px in its style attribute
  const borderPattern = /<(\w+)[^>]*border-left:\s*4px[^"]*"[^>]*>.*?<\/\1>/gis;
  const borderSections = html.match(borderPattern);

  if (borderSections?.length) {
    const combined = borderSections.join(" ");
    return cleanHtml(combined);
  }

  // Fallback: extract all <strong> content
  const strongPattern = /<strong[^>]*>.*?<\/strong>/gis;
  const strongMatches = html.match(strongPattern);

  if (strongMatches?.length) {
    const combined = strongMatches.join(" ");
    return cleanHtml(combined);
  }

  // Fallback: extract the first <p> element with visible content
  const firstParagraph = html.match(/<div[^>]*>([\s\S]*?)<\/div>/i);
  if (firstParagraph?.length) {
    const cleaned = cleanHtml(firstParagraph[0]);
    if (cleaned.length > 0) return cleaned;
  }

  return "";
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

    const lessonContent = extractSearchText(lesson.html);
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
    filter: (result) => result.score >= 10,
  });

  if (!raw?.length) return [];

  return raw.slice(0, SEARCH_MAX_RESULTS) as MiniSearchResult[];
}
