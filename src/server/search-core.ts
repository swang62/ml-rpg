"use server";

import MiniSearch from "minisearch";
import {
  getAllCategories,
  getAllCourses,
  getAllSections,
} from "~/db/course_sql";
import { getSearchLessons } from "~/db/lesson_sql";
import { getDb } from "~/utils/storage";

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

let _engine: MiniSearch | null = null;
let _docs:
  | {
      id: string;
      title: string;
      courseSlug: string;
      categorySlug: string;
      sectionSlug: string;
      lessonSlug: string;
      text: string;
    }[]
  | null = null;

async function buildIndex() {
  if (_engine && _docs) return;

  const start = performance.now();
  const db = getDb();

  const courseRows = await getAllCourses(db);
  const categoryRows = await getAllCategories(db);
  const sectionRows = await getAllSections(db);
  const lessonRows = await getSearchLessons(db);

  const courses = new Map(courseRows.map((r) => [r.id, r]));
  const categories = new Map(categoryRows.map((r) => [r.id, r]));
  const sections = new Map(sectionRows.map((r) => [r.id, r]));

  const docs: typeof _docs = [];

  for (const lesson of lessonRows) {
    const sec = sections.get(lesson.sectionid);
    if (!sec) continue;

    const cat = categories.get(sec.categoryid);
    if (!cat) continue;

    const course = courses.get(cat.courseid);
    if (!course) continue;

    const text = plainText(lesson.html);
    if (!text) continue;

    docs.push({
      id: `${course.slug}/${sec.slug}/${lesson.slug}`,
      title: lesson.title.toLowerCase(),
      text,
      courseSlug: course.slug,
      categorySlug: cat.slug,
      sectionSlug: sec.slug,
      lessonSlug: lesson.slug,
    });
  }

  const engine = new MiniSearch({
    fields: ["title", "text"],
    storeFields: [],
    processTerm: (term) => {
      const t = term.toLowerCase();
      if (t.length < 3 || /^[0-9\s]+$/.test(t)) return null;
      return t;
    },
  });
  engine.addAll(docs);

  console.log(
    `[search] indexed ${docs.length} lessons in ${((performance.now() - start) / 1000).toFixed(2)}s`,
  );
  _engine = engine;
  _docs = docs;
}

export async function searchLessons(searchQuery: string): Promise<
  {
    articleTitle: string;
    categoryTitle: string;
    subsectionTitle: string;
    url: string;
  }[]
> {
  await buildIndex();

  const raw = _engine!.search(searchQuery, { prefix: true, fuzzy: 0.2 });
  const lookup = new Map(_docs!.map((d) => [d.id, d]));
  const results: {
    articleTitle: string;
    categoryTitle: string;
    subsectionTitle: string;
    url: string;
  }[] = [];

  for (const r of raw.slice(0, 6)) {
    const d = lookup.get(r.id);
    if (!d) continue;
    results.push({
      articleTitle: d.title,
      categoryTitle: d.categorySlug,
      subsectionTitle: d.sectionSlug,
      url: `/${d.courseSlug}/${d.categorySlug}/${d.sectionSlug}/${d.lessonSlug}`,
    });
  }
  return results;
}
