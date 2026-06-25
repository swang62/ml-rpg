import { execSync } from "node:child_process";
import { globSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type HTMLElement, parse } from "node-html-parser";
import { cleanTitle } from "./acronyms";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Config ────────────────────────────────────────────────────────────────
// Change these values to scrape a different course / set of sections.

const COURSE_KEY = "fundamentals";
const COURSE_TITLE = "System Design";
const TARGET_CATEGORIES = [
  "caching",
  "database-design",
  "design-fundamentals",
  "distributed-processing",
  "distributed-primitives",
  "geospatial",
  "load-balancing",
  "message-queues",
  "networking-protocols",
  "os-systems-fundamentals",
  "partitioning-sharding",
  "rate-limiting",
  "replication-consistency",
  "resilience-patterns",
];

// ─── Derived paths ─────────────────────────────────────────────────────────
// (no need to change these unless your repo layout differs)

const SCRAPED_DIR = join(ROOT, ".data/scraped");
const LESSONS_DIR = join(SCRAPED_DIR, "lessons", COURSE_KEY);
const COURSES_DIR = join(SCRAPED_DIR, "courses");
const SITEMAP_PATH = join(ROOT, ".data/urls/sitemap.xml");
const SEED_DB_PATH = join(ROOT, "scripts/seed-db.ts");
const BIOME_GLOB = `.data/scraped/courses/${COURSE_KEY}.ts .data/scraped/lessons/${COURSE_KEY}`;

// ─── agent-browser helper ─────────────────────────────────────────────────

function ab(args: string[], timeout = 120): string {
  const result = execSync(`agent-browser ${args.join(" ")}`, {
    encoding: "utf-8",
    timeout: timeout * 1000,
    maxBuffer: 10 * 1024 * 1024,
  });
  return result.trim();
}

// ─── Sitemap parsing ───────────────────────────────────────────────────────

interface RawLesson {
  category: string;
  section: string;
  slug: string;
  url: string;
}

function parseLessonUrls(categories: string[]): RawLesson[] {
  const sitemap = readFileSync(SITEMAP_PATH, "utf-8");
  const lessons: RawLesson[] = [];
  const targetCats = new Set(categories);

  const urlRegex =
    /<loc>(https:\/\/www\.systemoverflow\.com\/learn\/([^/]+)\/([^/]+)\/([^/<]+))<\/loc>/g;
  for (const match of sitemap.matchAll(urlRegex)) {
    const [, url, category, section, slug] = match;
    if (!targetCats.has(category)) continue;
    lessons.push({ category, section, slug, url });
  }
  return lessons;
}

// ─── Slug helpers ──────────────────────────────────────────────────────────

function slugToComponentName(slug: string): string {
  return (
    "Lesson" +
    slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")
  );
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildSectionCategoryMap(
  sitemapPath: string,
  categories: string[],
): Map<string, string> {
  const sitemap = readFileSync(sitemapPath, "utf-8");
  const map = new Map<string, string>();
  const targetSet = new Set(categories);
  const urlRegex =
    /<loc>https:\/\/www\.systemoverflow\.com\/learn\/([^/]+)\/([^/]+)\/([^/<]+)<\/loc>/g;
  for (const match of sitemap.matchAll(urlRegex)) {
    const [, category, section] = match;
    if (targetSet.has(category)) {
      map.set(section, category);
    }
  }
  return map;
}

function loadExistingLessons(
  lessonsDir: string,
  sectionToCategory: Map<string, string>,
): ScrapedLesson[] {
  const files = globSync(`${lessonsDir}/**/*.tsx`);
  const lessons: ScrapedLesson[] = [];
  for (const file of files) {
    const normalized = file.replace(/\\/g, "/");
    const basename = normalized.split("/").pop() || "";
    const name = basename.replace(/\.tsx$/, "");
    const delimIdx = name.indexOf("__");
    if (delimIdx === -1) continue;
    const section = name.slice(0, delimIdx);
    const slug = name.slice(delimIdx + 2);
    const category = sectionToCategory.get(section);
    if (!category) continue;
    const content = readFileSync(file, "utf-8");
    const orderMatch = content.match(/\/\* order: (\d+) \*\//);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 0;
    lessons.push({ category, section, slug, order, title: slugToTitle(slug) });
  }
  return lessons;
}

function slugToTitle(slug: string): string {
  return cleanTitle(
    slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "),
  );
}

// ─── HTML cleaning ─────────────────────────────────────────────────────────

function cleanLessonHtml(
  html: string,
): { order: number; total: number; content: string } | null {
  const root = parse(html);
  if (!root) return null;

  // Find the inner max-width:800px content div (same as Python)
  const innerDivs = root.querySelectorAll(
    '[style*="max-width: 800px"], [style*="max-width:800px"]',
  );
  let lessonCol: HTMLElement = root;
  if (innerDivs.length > 0) {
    lessonCol = innerDivs[0];
  } else {
    console.warn(
      "  WARN: max-width:800px content div not found, falling back to root",
    );
  }

  // 1. Extract lesson order from breadcrumb span: "X of Y"
  let order = 0;
  let total = 0;
  let orderSpan: HTMLElement | null = null;

  const allSpans = lessonCol.querySelectorAll("span");
  for (const span of allSpans) {
    const raw = span.textContent?.replace(/\s+/g, " ").trim() || "";
    const m = raw.match(/^(\d+)\s+of\s+(\d+)$/);
    if (m) {
      order = parseInt(m[1], 10);
      total = parseInt(m[2], 10);
      orderSpan = span;
      break;
    }
  }

  if (!orderSpan || order === 0) {
    return null;
  }

  // -- Remove breadcrumb container --
  // Walk up to find the mb-3 d-flex flex-wrap div that wraps the breadcrumb
  let cursor: HTMLElement | null = orderSpan.parentNode as HTMLElement | null;
  while (cursor) {
    const cls = cursor.getAttribute("class") || "";
    if (
      cls.includes("mb-3") &&
      cls.includes("d-flex") &&
      cls.includes("flex-wrap")
    ) {
      cursor.remove();
      break;
    }
    cursor = cursor.parentNode as HTMLElement | null;
  }

  // -- Remove progress bar (height:8px) --
  const progressEls = lessonCol.querySelectorAll(
    '[style*="height:8px"], [style*="height: 8px"]',
  );
  for (const el of progressEls) {
    const parent = el.closest("div.mb-3");
    if (parent) parent.remove();
    else el.remove();
  }

  // -- Remove badges row (mb-3 d-flex flex-wrap gap-2 align-items-center) --
  const badgeEls = lessonCol.querySelectorAll("div");
  for (const div of badgeEls) {
    const cls = div.getAttribute("class") || "";
    if (
      cls.includes("mb-3") &&
      cls.includes("d-flex") &&
      cls.includes("flex-wrap") &&
      cls.includes("gap-2") &&
      cls.includes("align-items-center")
    ) {
      // Only match the badges row (has badge spans inside)
      const hasBadge = div.querySelector("span.badge");
      if (hasBadge) {
        div.remove();
        break;
      }
    }
  }

  // -- Remove gating button + its container (Sign in to View More) --
  const allButtons = lessonCol.querySelectorAll("button");
  for (const btn of allButtons) {
    const text = btn.textContent || "";
    if (text.includes("Sign in to View More")) {
      const container = btn.closest('[style*="flex-direction"]');
      if (container) container.remove();
      else btn.remove();
      break;
    }
  }

  // -- Remove Previous / Next buttons --
  for (const btn of allButtons) {
    const text = (btn.textContent || "").trim();
    if (text === "Previous" || text === "Next") {
      btn.remove();
    }
  }

  // -- Remove "Back to" link --
  const allLinks = lessonCol.querySelectorAll("a");
  for (const link of allLinks) {
    if ((link.textContent || "").includes("Back to")) {
      link.remove();
      break;
    }
  }

  // -- Fix card border: remove border/border-2/border-dark/rounded from mb-4 cards --
  const cardDivs = lessonCol.querySelectorAll("div");
  for (const div of cardDivs) {
    const cls = div.getAttribute("class") || "";
    if (cls.includes("mb-4") && cls.includes("border")) {
      const kept = cls
        .split(/\s+/)
        .filter(
          (c: string) =>
            !["border", "border-2", "border-dark", "rounded"].includes(c),
        );
      if (kept.length > 0) div.setAttribute("class", kept.join(" "));
      else div.removeAttribute("class");
    }
  }

  // -- Strip Learn_ prefix: same regex as Python (Learn_\w+)__\w+ -> \1 --
  const classedEls = lessonCol.querySelectorAll("*");
  for (const el of classedEls) {
    const cls = el.getAttribute("class");
    if (cls) {
      const cleaned = cls
        .split(/\s+/)
        .map((c: string) => c.replace(/(Learn_\w+)__\w+/g, "$1"))
        .filter(Boolean)
        .join(" ");
      if (cleaned) el.setAttribute("class", cleaned);
      else el.removeAttribute("class");
    }
  }

  // -- Clean inline styles --
  const REMOVE_PROPS = new Set([
    "background",
    "background-color",
    "background-image",
    "box-shadow",
    "color",
    "border-color",
  ]);
  const styledEls = lessonCol.querySelectorAll("[style]");
  for (const el of styledEls) {
    const raw = el.getAttribute("style") || "";
    const parts = raw.split(";").filter(Boolean);
    const cleaned = parts
      .map((part: string) => {
        const idx = part.indexOf(":");
        if (idx === -1) return "";
        const prop = part.slice(0, idx).trim().toLowerCase();
        const val = part.slice(idx + 1).trim();
        if (REMOVE_PROPS.has(prop)) return "";
        if (
          [
            "border",
            "border-left",
            "border-right",
            "border-top",
            "border-bottom",
          ].includes(prop)
        ) {
          const stripped = val
            .replace(/\s+(#[0-9a-fA-F]{3,8}\b|var\([^)]+\)|[a-zA-Z]+)$/, "")
            .trim();
          return stripped ? `${prop}: ${stripped}` : "";
        }
        return `${prop}: ${val}`;
      })
      .filter(Boolean)
      .join("; ");
    if (cleaned) el.setAttribute("style", cleaned);
    else el.removeAttribute("style");
  }

  // -- Remove HTML comments --
  const content =
    lessonCol.innerHTML?.replace(/<!--[\s\S]*?-->/g, "").trim() || "";
  return { order, total, content };
}

// ─── Course structure generation ──────────────────────────────────────────

interface ScrapedLesson {
  category: string;
  section: string;
  slug: string;
  order: number;
  title: string;
}

interface CategoryStructure {
  category: string;
  title: string;
  sections: {
    section: string;
    title: string;
    lessons: { lesson: string; title: string; order: number }[];
  }[];
}

function buildCourseStructure(
  scraped: ScrapedLesson[],
  categories: string[],
): { categories: CategoryStructure[] } {
  // Group lessons by category -> section
  const catMap = new Map<
    string,
    Map<string, { lesson: string; title: string; order: number }[]>
  >();
  for (const s of scraped) {
    if (!catMap.has(s.category)) {
      catMap.set(s.category, new Map());
    }
    const secMap = catMap.get(s.category)!;
    if (!secMap.has(s.section)) {
      secMap.set(s.section, []);
    }
    secMap
      .get(s.section)
      ?.push({ lesson: s.slug, title: s.title, order: s.order });
  }

  // Sort lessons within each section by order
  for (const secMap of catMap.values()) {
    for (const lessons of secMap.values()) {
      lessons.sort((a, b) => a.order - b.order);
    }
  }

  // Build output in category order
  const result: CategoryStructure[] = [];
  for (const catSlug of categories) {
    const secMap = catMap.get(catSlug);
    if (!secMap) continue;
    const sections = Array.from(secMap.entries()).map(([section, lessons]) => ({
      section,
      title: slugToTitle(section),
      lessons,
    }));
    result.push({
      category: catSlug,
      title: slugToTitle(catSlug),
      sections,
    });
  }

  return { categories: result };
}

// ─── TSX generation ────────────────────────────────────────────────────────

function formatHtml(html: string): string {
  const blockTags = new Set([
    "div",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "table",
    "tr",
    "td",
    "th",
    "thead",
    "tbody",
    "section",
    "article",
    "header",
    "footer",
    "nav",
    "aside",
    "blockquote",
    "pre",
    "figure",
    "figcaption",
    "dl",
    "dt",
    "dd",
    "br",
    "hr",
  ]);
  const indent = "  ";
  // HTML void elements that don't contain content and should not affect depth
  const VOID_ELEMENTS = new Set([
    "br",
    "hr",
    "img",
    "input",
    "meta",
    "link",
    "area",
    "base",
    "col",
    "embed",
    "source",
    "track",
    "wbr",
  ]);
  let result = "";
  let depth = 1;
  let i = 0;
  while (i < html.length) {
    const tagStart = html.indexOf("<", i);
    if (tagStart === -1) {
      result += html.slice(i);
      break;
    }
    // Emit text before tag
    const text = html.slice(i, tagStart);
    if (text.trim()) {
      result += text;
    }
    // Find end of tag
    const tagEnd = html.indexOf(">", tagStart);
    if (tagEnd === -1) {
      result += html.slice(i);
      break;
    }
    const tag = html.slice(tagStart, tagEnd + 1);
    const isClosing = tag.startsWith("</");
    const isSelfClosing = tag.endsWith("/>");
    const tagNameMatch = tag.match(/^<\/?(\w+)/);
    const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : "";
    const isBlock = blockTags.has(tagName);

    if (isClosing && isBlock) {
      depth = Math.max(0, depth - 1);
    }

    if (isBlock && !isSelfClosing) {
      result += `\n${indent.repeat(depth)}`;
    }

    result += tag;

    if (
      !isClosing &&
      !isSelfClosing &&
      isBlock &&
      !VOID_ELEMENTS.has(tagName)
    ) {
      depth++;
    }

    // For void/self-closing block elements, add a newline after to keep content flowing
    if ((VOID_ELEMENTS.has(tagName) || isSelfClosing) && isBlock) {
      result += `\n${indent.repeat(depth)}`;
    }

    i = tagEnd + 1;
  }
  return result.replace(/\n{3,}/g, "\n\n").trim();
}

function generateTsx(
  slug: string,
  section: string,
  htmlContent: string,
  order: number,
): string {
  const componentName = slugToComponentName(`${section}-${slug}`);
  const formatted = formatHtml(htmlContent)
    .replace(/<br>/g, "<br/>")
    .replace(/<br \/>/g, "<br/>");
  const escaped = formatted.replace(/[{}]/g, (m) =>
    m === "{" ? "&#123;" : "&#125;",
  );
  const indented = escaped
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
  return `// @ts-nocheck
/* order: ${order} */
import type { Component } from "solid-js";

const ${componentName}: Component = () => (
  <div class="lesson-content">
${indented}
  </div>
);
export default ${componentName};
`;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();
  console.log("=== scrape_new.ts ===\n");

  // 1. Parse sitemap
  const lessons = parseLessonUrls(TARGET_CATEGORIES);
  if (lessons.length === 0) {
    console.log("No lessons found in sitemap for the configured targets.");
    process.exit(1);
  }
  console.log(`Found ${lessons.length} lessons in sitemap\n`);

  // 2. Create output dirs
  mkdirSync(LESSONS_DIR, { recursive: true });
  mkdirSync(COURSES_DIR, { recursive: true });

  // 3. Pre-populate scraped from existing TSX files on disk
  const sectionToCategory = buildSectionCategoryMap(
    SITEMAP_PATH,
    TARGET_CATEGORIES,
  );
  const scraped: ScrapedLesson[] = loadExistingLessons(
    LESSONS_DIR,
    sectionToCategory,
  );
  const existingSet = new Set(scraped.map((s) => `${s.section}__${s.slug}`));
  const coursePath = join(COURSES_DIR, `${COURSE_KEY}.ts`);

  function writeCourseStructure() {
    const structure = buildCourseStructure(scraped, TARGET_CATEGORIES);
    const courseTs = `import type { Course } from "../types";

const course: Course = ${JSON.stringify({ title: COURSE_TITLE, categories: structure.categories }, null, 2)};

export default course;
`;
    writeFileSync(coursePath, courseTs);
  }

  // Write initial structure with whatever exists on disk
  writeCourseStructure();

  // 4. Scrape each lesson
  let idx = 0;
  const MAX_RETRIES = 2;
  const RETRY_DELAY_MS = 500;

  for (const lesson of lessons) {
    idx++;
    const key = `${lesson.section}__${lesson.slug}`;

    // Skip if already exists on disk (loaded in step 3)
    if (existingSet.has(key)) {
      console.log(`[${idx}/${lessons.length}] ${lesson.slug}  SKIP (exists)`);
      continue;
    }

    const outputPath = join(
      LESSONS_DIR,
      `${lesson.section}__${lesson.slug}.tsx`,
    );

    let lastError: string | null = null;
    let success = false;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 0) {
        console.log(`  RETRY ${attempt}/${MAX_RETRIES}...`);
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }

      console.log(
        `[${idx}/${lessons.length}] ${lesson.slug}${attempt > 0 ? ` (attempt ${attempt + 1})` : ""}`,
      );

      let html: string;
      try {
        ab(["open", lesson.url]);
        ab(["wait", "--load", "networkidle"], 90);
        html = ab(["get", "html", "main"]);
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        console.log(`  FAIL (agent-browser): ${lastError}`);
        continue;
      }

      const result = cleanLessonHtml(html);
      if (!result) {
        lastError = "could not extract content/order";
        console.log(`  FAIL (clean): ${lastError}`);
        continue;
      }

      const title = slugToTitle(lesson.slug);
      const tsx = generateTsx(
        lesson.slug,
        lesson.section,
        result.content,
        result.order,
      );
      writeFileSync(outputPath, tsx);

      scraped.push({
        category: lesson.category,
        section: lesson.section,
        slug: lesson.slug,
        order: result.order,
        title,
      });

      // Update course structure incrementally so a crash never leaves it stale
      writeCourseStructure();

      console.log(
        `  OK  order=${result.order}/${result.total}  (${tsx.length} bytes)  (${scraped.length} total)`,
      );
      success = true;
      break;
    }

    if (!success) {
      console.log(`  GIVING UP ${lesson.slug}: ${lastError}`);
    }
  }

  if (scraped.length === 0) {
    console.log("\nNo lessons scraped successfully. Aborting.");
    process.exit(1);
  }

  // 5. Update seed-db.ts
  const importLine = `import ${COURSE_KEY} from "../.data/scraped/courses/${COURSE_KEY}";`;
  const courseEntryLine = `  "${COURSE_KEY}": ${COURSE_KEY},`;
  const _typeKey = `"${COURSE_KEY}"`;
  const seedContent = readFileSync(SEED_DB_PATH, "utf-8");
  const lines = seedContent.split("\n");
  let seedModified = false;

  // 5a. Add import if missing
  if (lines.some((l) => l.includes(importLine))) {
    console.log("seed-db.ts already has the import");
  } else {
    // Find the first course import line and insert after it
    const insertIdx = lines.findIndex((l) =>
      /^import .+ from ["']\.\.\/\.data\/scraped\/courses\/.+["'];$/.test(l),
    );
    if (insertIdx === -1) {
      console.log("ERROR: could not find course imports section in seed-db.ts");
      process.exit(1);
    }
    lines.splice(insertIdx + 1, 0, importLine);
    seedModified = true;
    console.log(`Added import for ${COURSE_KEY} in seed-db.ts`);
  }

  // 5b. Add COURSES map entry if missing
  // Match both quoted and unquoted keys (e.g. `fundamentals:` or `"fundamentals":`)
  const courseEntryRegex = new RegExp(
    `^\\s*"?${escapeRegex(COURSE_KEY)}"?:\\s*${escapeRegex(COURSE_KEY)},\\s*$`,
  );
  if (lines.some((l) => courseEntryRegex.test(l.trim()))) {
    console.log("seed-db.ts already has the COURSES entry");
  } else {
    // Find the COURSES map closing `};` — look for it after the `const COURSES:` line
    const coursesDeclIdx = lines.findIndex((l) => /^const COURSES:/.test(l));
    if (coursesDeclIdx === -1) {
      console.log("ERROR: could not find COURSES declaration in seed-db.ts");
      process.exit(1);
    }
    const coursesCloseIdx = lines.findIndex(
      (l, i) => l.trim() === "};" && i > coursesDeclIdx,
    );
    if (coursesCloseIdx === -1) {
      console.log("ERROR: could not find COURSES closing in seed-db.ts");
      process.exit(1);
    }
    lines.splice(coursesCloseIdx, 0, courseEntryLine);
    seedModified = true;
    console.log(`Added COURSES entry for ${COURSE_KEY} in seed-db.ts`);
  }

  if (seedModified) {
    writeFileSync(SEED_DB_PATH, lines.join("\n"));
    console.log("Updated seed-db.ts");
  }

  // 6. Run biome formatting on the generated files
  try {
    console.log("\nRunning biome formatter...");
    execSync(
      `pnpm biome format --write --vcs-use-ignore-file=false ${BIOME_GLOB}`,
      {
        encoding: "utf-8",
        timeout: 30000,
      },
    );
    console.log("Formatted generated files");
  } catch {
    console.log("(biome formatting skipped or failed)");
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n=== Done (${elapsed}s) ===`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
