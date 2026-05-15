import { query } from "@solidjs/router";
import MiniSearch from "minisearch";
import { COURSES } from "~/utils/constants";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "can",
  "for",
  "from",
  "had",
  "has",
  "have",
  "if",
  "in",
  "is",
  "it",
  "its",
  "may",
  "not",
  "of",
  "on",
  "or",
  "so",
  "that",
  "the",
  "their",
  "there",
  "these",
  "they",
  "this",
  "to",
  "was",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "will",
  "with",
  "would",
]);

interface LessonDoc {
  id: string;
  title: string;
  text: string;
  articleTitle: string;
  categoryTitle: string;
  subsectionTitle: string;
  url: string;
}

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

function lookupLessonMeta(
  courseKey: string,
  subsectionKey: string,
  lessonKey: string,
) {
  const course = COURSES[courseKey];
  if (!course) return null;

  const base = `/${courseKey}`;

  for (const category of course.categories) {
    for (const subsection of category.subsections) {
      if (subsection.subsection !== subsectionKey) continue;
      const lesson = subsection.lessons.find((l) => l.lesson === lessonKey);
      if (!lesson) continue;

      return {
        articleTitle: lesson.title,
        categoryTitle: category.title,
        subsectionTitle: subsection.title,
        url: `${base}/${category.category}/${subsection.subsection}/${lesson.lesson}`,
      };
    }
  }

  return null;
}

function buildIndex(): string {
  const start = performance.now();
  const lessonPaths = import.meta.glob<string>("~/data/lessons/**/*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  const docs: LessonDoc[] = [];
  let noTitle = 0;
  let noText = 0;
  let missingMeta = 0;

  for (const [filePath, content] of Object.entries(lessonPaths)) {
    const title = extractTitle(content);
    if (!title) {
      noTitle++;
      continue;
    }

    const text = extractText(content);
    if (!text) {
      noText++;
      continue;
    }

    const normalized = filePath.replace(/\\/g, "/");
    const parts = normalized.replace(/\.tsx$/, "").split("/");
    const srcIdx = parts.lastIndexOf("lessons");
    if (srcIdx === -1 || parts.length < srcIdx + 3) continue;

    const courseKey = parts[srcIdx + 1];
    const rest = parts.slice(srcIdx + 2).join("/");
    const delimIdx = rest.indexOf("__");
    if (delimIdx === -1) continue;

    const subsectionKey = rest.slice(0, delimIdx);
    const lessonKey = rest.slice(delimIdx + 2);

    const meta = lookupLessonMeta(courseKey, subsectionKey, lessonKey);
    if (!meta) {
      missingMeta++;
      continue;
    }

    docs.push({
      id: `${courseKey}/${subsectionKey}/${lessonKey}`,
      title,
      text,
      articleTitle: meta.articleTitle,
      categoryTitle: meta.categoryTitle,
      subsectionTitle: meta.subsectionTitle,
      url: meta.url,
    });
  }

  const miniSearch = new MiniSearch({
    fields: ["title", "text"],
    storeFields: ["articleTitle", "categoryTitle", "subsectionTitle", "url"],
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

  miniSearch.addAll(docs);

  const elapsed = ((performance.now() - start) / 1000).toFixed(2);
  console.log(`[search] indexed ${docs.length} lessons in ${elapsed}s`);
  if (noTitle) console.log(`[search] skipped (no title): ${noTitle}`);
  if (noText) console.log(`[search] skipped (no text): ${noText}`);
  if (missingMeta) console.log(`[search] skipped (no meta): ${missingMeta}`);

  return JSON.stringify(miniSearch);
}

let cached: string | null = null;

export function getSearchIndexJson(): string {
  if (!cached) {
    cached = buildIndex();
  }
  return cached;
}

export const getSearchIndexQuery = query(async () => {
  "use server";
  return getSearchIndexJson();
}, "search-index");
