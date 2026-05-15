"use server";

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

function lookupMeta(
  courseKey: string,
  subsectionKey: string,
  lessonKey: string,
) {
  const course = COURSES[courseKey];
  if (!course) return null;
  for (const category of course.categories) {
    for (const subsection of category.subsections) {
      if (subsection.subsection !== subsectionKey) continue;
      const lesson = subsection.lessons.find((l) => l.lesson === lessonKey);
      if (!lesson) continue;
      return {
        articleTitle: lesson.title,
        categoryTitle: category.title,
        subsectionTitle: subsection.title,
        url: `/${courseKey}/${category.category}/${subsection.subsection}/${lesson.lesson}`,
      };
    }
  }
  return null;
}

const lessonContents = import.meta.glob<string>("~/data/lessons/**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

let _engine: MiniSearch | null = null;

function getEngine(): MiniSearch {
  if (_engine) return _engine;

  const start = performance.now();
  const docs: { id: string; title: string; text: string }[] = [];

  for (const [filePath, content] of Object.entries(lessonContents)) {
    const title = extractTitle(content);
    if (!title) continue;

    const text = extractText(content);
    if (!text) continue;

    const normalized = filePath.replace(/\\/g, "/");
    const parts = normalized.replace(/\.tsx$/, "").split("/");
    const srcIdx = parts.lastIndexOf("lessons");
    if (srcIdx === -1 || parts.length < srcIdx + 3) continue;

    const courseKey = parts[srcIdx + 1];
    const rest = parts.slice(srcIdx + 2).join("/");
    const delimIdx = rest.indexOf("__");
    if (delimIdx === -1) continue;

    const meta = lookupMeta(
      courseKey,
      rest.slice(0, delimIdx),
      rest.slice(delimIdx + 2),
    );
    if (!meta) continue;

    docs.push({
      id: `${courseKey}/${rest.slice(0, delimIdx)}/${rest.slice(delimIdx + 2)}`,
      title,
      text,
    });
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
  return engine;
}

export function searchLessons(searchQuery: string): {
  articleTitle: string;
  categoryTitle: string;
  subsectionTitle: string;
  url: string;
}[] {
  const engine = getEngine();
  const raw = engine.search(searchQuery, { prefix: true, fuzzy: 0.2 });
  const results: {
    articleTitle: string;
    categoryTitle: string;
    subsectionTitle: string;
    url: string;
  }[] = [];

  for (const r of raw.slice(0, 6)) {
    const meta = lookupMeta(
      r.id.split("/")[0],
      r.id.split("/")[1],
      r.id.split("/")[2],
    );
    if (meta) results.push(meta);
  }
  return results;
}
