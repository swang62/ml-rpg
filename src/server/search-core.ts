"use server";

import MiniSearch from "minisearch";
import { getDb } from "~/utils/storage";

const STOP_WORDS = new Set([
  "a", "an", "are", "as", "at", "be", "but", "by", "can", "for", "from",
  "had", "has", "have", "if", "in", "is", "it", "its", "may", "not", "of",
  "on", "or", "so", "that", "the", "their", "there", "these", "they",
  "this", "to", "was", "were", "what", "when", "where", "which", "who",
  "will", "with", "would",
]);

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

let _engine: MiniSearch | null = null;
let _meta: Map<string, { title: string; categoryTitle: string; sectionTitle: string; courseSlug: string; categorySlug: string; sectionSlug: string }> | null = null;

function buildIndex() {
  if (_engine && _meta) return { engine: _engine, meta: _meta };

  const start = performance.now();
  const db = getDb();

  // Load all entity maps in bulk
  const courses = new Map(
    (db.prepare("SELECT id, slug, title FROM course").all() as { id: number; slug: string; title: string }[])
      .map((r) => [r.id, r]),
  );
  const categories = new Map(
    (db.prepare("SELECT id, slug, title, course_id AS courseId FROM category").all() as { id: number; slug: string; title: string; courseId: number }[])
      .map((r) => [r.id, r]),
  );
  const sections = new Map(
    (db.prepare("SELECT id, slug, title, category_id AS categoryId, course_id AS courseId FROM section").all() as { id: number; slug: string; title: string; categoryId: number; courseId: number }[])
      .map((r) => [r.id, r]),
  );

  // Load all lessons with HTML
  const lessons = db
    .prepare("SELECT id, slug, title, section_id AS sectionId, html FROM lesson WHERE html != ''")
    .all() as { id: number; slug: string; title: string; sectionId: number; html: string }[];

  const docs: { id: string; title: string; text: string }[] = [];
  const meta = new Map<string, { title: string; categoryTitle: string; sectionTitle: string; courseSlug: string; categorySlug: string; sectionSlug: string }>();

  for (const lesson of lessons) {
    const sec = sections.get(lesson.sectionId);
    if (!sec) continue;

    const cat = categories.get(sec.categoryId);
    const course = courses.get(sec.courseId);
    if (!cat || !course) continue;

    const text = stripHtml(lesson.html);
    if (!text) continue;

    const docId = `${course.slug}/${sec.slug}/${lesson.slug}`;
    docs.push({ id: docId, title: lesson.title, text });
    meta.set(docId, {
      title: lesson.title,
      categoryTitle: cat.title,
      sectionTitle: sec.title,
      courseSlug: course.slug,
      categorySlug: cat.slug,
      sectionSlug: sec.slug,
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
  _meta = meta;
  return { engine, meta };
}

export function searchLessons(searchQuery: string): {
  articleTitle: string;
  categoryTitle: string;
  subsectionTitle: string;
  url: string;
}[] {
  const { engine, meta } = buildIndex();
  const m = meta!;
  const raw = engine.search(searchQuery, { prefix: true, fuzzy: 0.2 });
  const results: {
    articleTitle: string;
    categoryTitle: string;
    subsectionTitle: string;
    url: string;
  }[] = [];

  for (const r of raw.slice(0, 6)) {
    const docMeta = m.get(r.id);
    if (!docMeta) continue;
    results.push({
      articleTitle: docMeta.title,
      categoryTitle: docMeta.categoryTitle,
      subsectionTitle: docMeta.sectionTitle,
      url: `/${docMeta.courseSlug}/${docMeta.categorySlug}/${docMeta.sectionSlug}/${r.id.split("/").pop()}`,
    });
  }
  return results;
}
