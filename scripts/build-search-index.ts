import {
  existsSync,
  globSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import MiniSearch from "minisearch";
import { COURSE_INDEX } from "../src/data/course-index";
import type { Category } from "../src/utils/types";

// Dynamic-load each course data file — must be updated when a new course is added
async function loadCourseData(slug: string): Promise<Category[]> {
  const mod = await import(`../src/data/courses/${slug}.ts`);
  return (mod.default as { title: string; categories: Category[] }).categories;
}

async function buildCourseLookup(): Promise<
  Record<string, { title: string; base: string; categories: Category[] }>
> {
  const courses: Record<
    string,
    { title: string; base: string; categories: Category[] }
  > = {};
  for (const slug of Object.keys(COURSE_INDEX)) {
    courses[slug] = {
      ...COURSE_INDEX[slug],
      categories: await loadCourseData(slug),
    };
  }
  return courses;
}

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
  courses: Record<
    string,
    { title: string; base: string; categories: Category[] }
  >,
  courseKey: string,
  subsectionKey: string,
  lessonKey: string,
) {
  const course = courses[courseKey];
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
        url: `${course.base}/${category.category}/${subsection.subsection}/${lesson.lesson}`,
      };
    }
  }

  return null;
}

async function main() {
  const courses = await buildCourseLookup();
  const lessonsDir = join(import.meta.dirname, "..", "src", "data", "lessons");
  const allFiles = globSync("**/*.tsx", { cwd: lessonsDir });

  const docs: LessonDoc[] = [];
  let missingMeta = 0;
  let noTitle = 0;
  let noText = 0;

  for (const filePath of allFiles) {
    const fullPath = join(lessonsDir, filePath);
    const content = readFileSync(fullPath, "utf-8");

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

    const parts = filePath.replace(/\.tsx$/, "").split("/");
    if (parts.length < 2) continue;

    const courseKey = parts[0];
    const rest = parts.slice(1).join("/");
    const delimIdx = rest.indexOf("__");
    if (delimIdx === -1) continue;

    const subsectionKey = rest.slice(0, delimIdx);
    const lessonKey = rest.slice(delimIdx + 2);

    const meta = lookupLessonMeta(courses, courseKey, subsectionKey, lessonKey);
    if (!meta) {
      missingMeta++;
      continue;
    }

    const id = `${courseKey}/${subsectionKey}/${lessonKey}`;

    docs.push({
      id,
      title,
      text,
      articleTitle: meta.articleTitle,
      categoryTitle: meta.categoryTitle,
      subsectionTitle: meta.subsectionTitle,
      url: meta.url,
    });
  }

  console.log(`Files found: ${allFiles.length}`);
  console.log(`Indexed:      ${docs.length}`);
  if (noTitle) console.log(`  skipped (no title): ${noTitle}`);
  if (noText) console.log(`  skipped (no text):  ${noText}`);
  if (missingMeta) console.log(`  skipped (no meta):  ${missingMeta}`);

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

  const outDir = join(import.meta.dirname, "..", "public", "search");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const json = JSON.stringify(miniSearch);
  writeFileSync(join(outDir, "index.json"), json, "utf-8");

  const sizeKb = (Buffer.byteLength(json, "utf-8") / 1024).toFixed(1);
  console.log(`Written: public/search/index.json (${sizeKb} KB)`);
}

main();
