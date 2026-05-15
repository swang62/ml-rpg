"use server";

import MiniSearch from "minisearch";
import { getDb } from "~/utils/storage";
import { getCourseBySlug } from "~/db/course_sql";
import { getCategoriesByCourse } from "~/db/course_sql";
import { getSectionsByCategory } from "~/db/course_sql";

const STOP_WORDS = new Set([
  "a", "an", "are", "as", "at", "be", "but", "by", "can", "for", "from",
  "had", "has", "have", "if", "in", "is", "it", "its", "may", "not", "of",
  "on", "or", "so", "that", "the", "their", "there", "these", "they",
  "this", "to", "was", "were", "what", "when", "where", "which", "who",
  "will", "with", "would",
]);

function extractTitle(content: string): string {
  const match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  return match ? match[1].trim() : "";
}

function extractDivContent(content: string, startIdx: number): string {
  let depth = 1;
  let pos = startIdx;
  while (depth > 0 && pos < content.length) {
    const nextOpen = content.indexOf("<div", pos);
    const nextClose = content.indexOf("</div>", pos);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      pos = nextClose + 6;
    }
  }
  return content.slice(startIdx, pos - 6);
}

function stripTags(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/{"|"}|{'|'}|{/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractBorderDivText(content: string): string[] {
  const results: string[] = [];
  const regex = /<div[^>]*border-left:\s*4\s*px\s*solid[^>]*>/gi;
  let match: RegExpExecArray | null = regex.exec(content);
  while (match !== null) {
    const inner = extractDivContent(content, match.index + match[0].length);
    const text = stripTags(inner);
    if (text) results.push(text);
    match = regex.exec(content);
  }
  return results;
}

function extractCardContentArea(content: string): string {
  const match = content.match(/class="card-content-area"[^>]*>/i);
  if (!match?.index) return "";
  const inner = extractDivContent(content, match.index + match[0].length);
  return stripTags(inner);
}

function extractText(content: string): string {
  const borderTexts = extractBorderDivText(content);
  if (borderTexts.length > 0) return borderTexts.join(" ");
  return extractCardContentArea(content);
}

const lessonContents = import.meta.glob<string>(
  "./.data/raw/lessons/**/*.tsx",
  {
    query: "?raw",
    import: "default",
    eager: true,
  },
);

let _engine: MiniSearch | null = null;
let _docs: { id: string; title: string; text: string; categoryTitle: string; sectionTitle: string; courseSlug: string; categorySlug: string; sectionSlug: string; lessonSlug: string }[] | null = null;

let _courseRows: { id: number; slug: string; title: string }[] = [];
let _categoryRows: { id: number; slug: string; title: string; courseId: number }[] = [];
let _sectionRows: { id: number; slug: string; title: string; categoryId: number; courseId: number }[] = [];

function loadCache() {
  const db = getDb();
  _courseRows = db.prepare("SELECT id, slug, title FROM course").all() as typeof _courseRows;
  _categoryRows = db.prepare("SELECT id, slug, title, course_id AS courseId FROM category").all() as typeof _categoryRows;
  _sectionRows = db.prepare("SELECT id, slug, title, category_id AS categoryId, course_id AS courseId FROM section").all() as typeof _sectionRows;
}

function lookupMeta(
  courseSlug: string,
  sectionSlug: string,
  lessonSlug: string,
): { categoryTitle: string; sectionTitle: string; courseSlug: string; categorySlug: string; sectionSlug: string; lessonSlug: string } | null {
  const course = _courseRows.find((c) => c.slug === courseSlug);
  if (!course) return null;

  const cats = _categoryRows.filter((c) => c.courseId === course.id);
  for (const cat of cats) {
    const secs = _sectionRows.filter((s) => s.categoryId === cat.id);
    const sec = secs.find((s) => s.slug === sectionSlug);
    if (sec) {
      return {
        categoryTitle: cat.title,
        sectionTitle: sec.title,
        courseSlug,
        categorySlug: cat.slug,
        sectionSlug: sec.slug,
        lessonSlug,
      };
    }
  }
  return null;
}

function getEngine(): { engine: MiniSearch; docs: typeof _docs } {
  if (_engine && _docs) return { engine: _engine, docs: _docs };

  const start = performance.now();
  loadCache();

  const docs: typeof _docs = [];

  for (const [filePath, content] of Object.entries(lessonContents)) {
    const title = extractTitle(content);
    if (!title) continue;

    const text = extractText(content);
    if (!text) continue;

    const normalized = filePath.replace(/\\/g, "/");
    const parts = normalized.replace(/\.tsx$/, "").split("/");
    const srcIdx = parts.lastIndexOf("lessons");
    if (srcIdx === -1 || parts.length < srcIdx + 3) continue;

    const courseSlug = parts[srcIdx + 1];
    const rest = parts.slice(srcIdx + 2).join("/");
    const delimIdx = rest.indexOf("__");
    if (delimIdx === -1) continue;

    const sectionSlug = rest.slice(0, delimIdx);
    const lessonSlug = rest.slice(delimIdx + 2);

    const meta = lookupMeta(courseSlug, sectionSlug, lessonSlug);
    if (!meta) continue;

    docs.push({ id: `${courseSlug}/${sectionSlug}/${lessonSlug}`, title, text, ...meta });
  }

  const engine = new MiniSearch({
    fields: ["title", "text"],
    storeFields: [],
    searchOptions: {
      boost: { title: 1.5 },
      fuzzy: 0.2,
      prefix: true,
      combineWith: "or",
    },
    processTerm: (term) => {
      const t = term.toLowerCase();
      if (STOP_WORDS.has(t)) return null;
      return t;
    },
  });
  engine.addAll(docs);

  console.log(
    `[search] indexed ${docs.length} lessons in ${((performance.now() - start) / 1000).toFixed(2)}s`,
  );
  _engine = engine;
  _docs = docs;
  return { engine, docs };
}

export function searchLessons(searchQuery: string): {
  articleTitle: string;
  categoryTitle: string;
  subsectionTitle: string;
  url: string;
}[] {
  const { engine, docs } = getEngine();
  const raw = engine.search(searchQuery, { prefix: true, fuzzy: 0.2 });
  const docMap = new Map(docs?.map((d) => [d.id, d]) ?? []);

  const results: {
    articleTitle: string;
    categoryTitle: string;
    subsectionTitle: string;
    url: string;
  }[] = [];

  for (const r of raw.slice(0, 6)) {
    const doc = docMap.get(r.id);
    if (!doc) continue;
    results.push({
      articleTitle: doc.title,
      categoryTitle: doc.categoryTitle,
      subsectionTitle: doc.sectionTitle,
      url: `/${doc.courseSlug}/${doc.categorySlug}/${doc.sectionSlug}/${doc.lessonSlug}`,
    });
  }
  return results;
}
