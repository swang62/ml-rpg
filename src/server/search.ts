import { existsSync, readFileSync } from "node:fs";
import { connect, Index } from "@lancedb/lancedb";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import MiniSearch, { type SearchResult } from "minisearch";
import { getAllCategories } from "~/db/category_sql";
import { getAllCourses } from "~/db/course_sql";
import { getSearchLessons } from "~/db/lesson_sql";
import { getAllSections } from "~/db/section_sql";
import { getDb } from "~/server/storage";
import {
  COURSE_INFO_PATH,
  GITHUB_REPO_URL,
  RAG_BATCH_SIZE,
  RAG_CHUNK_OVERLAP,
  RAG_CHUNK_SIZE,
  RAG_EMBEDDING_MODEL,
  SEARCH_MAX_RESULTS,
  STOP_WORDS,
} from "~/utils/constants";
import { getEnv } from "~/utils/env";
import { sanitizeSearchQuery } from "~/utils/input-validation";
import { extractRelevantText } from "~/utils/search-utils";
import type { ChunkData } from "~/utils/types";

let _engine: MiniSearch<SearchDocument> | null = null;
let _vectorStoreExists: boolean | undefined;
let _rebuildPromise: Promise<void> | null = null;

interface SearchDocument {
  id: string;
  lessonTitle: string;
  lessonContent: string;
  categoryTitle: string;
  sectionTitle: string;
  url: string;
}

export type MiniSearchResult = SearchResult & Omit<SearchDocument, "id">;

export async function searchLessons(searchQuery: string) {
  "use server";

  const sanitized = sanitizeSearchQuery(searchQuery);
  if (sanitized.length < 3 || sanitized.length > 200) return [];

  await buildIndex();

  const raw = _engine?.search(sanitized, {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      lessonTitle: 1.2,
      categoryTitle: 1.1,
      sectionTitle: 1.05,
    },
  });

  if (!raw?.length) return [];

  return raw.slice(0, SEARCH_MAX_RESULTS) as MiniSearchResult[];
}

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
    fields: ["lessonTitle", "lessonContent", "categoryTitle", "sectionTitle"],
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

interface LessonGroup {
  lessonTitle: string;
  lessonUrl: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  courseSlug: string;
  categorySlug: string;
  sectionSlug: string;
  lessonSlug: string;
  texts: string[];
  tags: string[];
}

export async function ensureVectorStore(): Promise<void> {
  "use server";
  const tablePath = `${getEnv().LANCEDB_PATH}/chunks.lance`;

  if (_vectorStoreExists || existsSync(tablePath)) {
    if (existsSync(tablePath)) {
      _vectorStoreExists = true;
      await updateReadmeChunks();
      await ensureFtsIndexes();
    }
    return;
  }

  // Deduplicate concurrent rebuilds — only one build at a time.
  // Without this guard, concurrent calls (e.g. from CSR + SSR) both see
  // _vectorStoreExists=false + table missing, and both start expensive
  // Voyage AI embedding + LanceDB writes, causing double cost and a
  // "Table 'chunks' already exists" crash from whichever finishes second.
  if (!_rebuildPromise) {
    _rebuildPromise = (async () => {
      try {
        _vectorStoreExists = await buildVectorDB();
        if (_vectorStoreExists) {
          await ensureFtsIndexes();
        }
      } finally {
        _rebuildPromise = null;
      }
    })();
  }
  await _rebuildPromise;
}

async function ensureFtsIndexes(): Promise<void> {
  try {
    const lancedb = await connect(getEnv().LANCEDB_PATH);
    const table = await lancedb.openTable("chunks");
    await table.createIndex("lessonTitle", { config: Index.fts() });
  } catch (err) {
    console.warn("[lancedb] Could not create FTS index on lessonTitle:", err);
  }
}

async function buildVectorDB() {
  console.log("[lancedb] Vector store missing, rebuilding...");
  console.log("[lancedb] Opening DB:", getEnv().COURSE_DB_PATH);

  const db = getDb();

  console.log("[lancedb] Loading course data...");
  const courseRows = await getAllCourses(db);
  const courses = new Map(courseRows.map((r) => [r.id, r]));
  const categoryRows = await getAllCategories(db);
  const categories = new Map(categoryRows.map((r) => [r.id, r]));
  const sectionRows = await getAllSections(db);
  const sections = new Map(sectionRows.map((r) => [r.id, r]));

  const lessonRows = await getSearchLessons(db);

  console.log(`[lancedb] ${lessonRows.length} lessons found`);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: RAG_CHUNK_SIZE,
    chunkOverlap: RAG_CHUNK_OVERLAP,
  });

  const lessonGroups: LessonGroup[] = [];
  let totalChunks = 0;

  for (const lesson of lessonRows) {
    const section = sections.get(lesson.sectionid);
    const category = categories.get(lesson.categoryid);
    const course = courses.get(lesson.courseid);
    if (!section || !category || !course) continue;

    const plainText = extractRelevantText(lesson.html);
    if (!plainText) continue;

    const lessonUrl = `/${course.slug}/${category.slug}/${section.slug}/${lesson.slug}`;
    const chunks = await splitter.splitText(plainText);
    if (chunks.length === 0) continue;

    const tags: string[] = (() => {
      try {
        return JSON.parse(lesson.keywords ?? "[]");
      } catch {
        return [];
      }
    })();

    for (const token of extractWordTokens(
      `${category.title} ${section.title}`,
    )) {
      if (!STOP_WORDS.has(token) && !tags.includes(token)) {
        tags.push(token);
      }
    }

    lessonGroups.push({
      lessonTitle: lesson.title,
      lessonUrl,
      categoryTitle: category.title,
      sectionTitle: section.title,
      courseTitle: course.title,
      courseSlug: course.slug,
      categorySlug: category.slug,
      sectionSlug: section.slug,
      lessonSlug: lesson.slug,
      texts: chunks,
      tags,
    });
    totalChunks += chunks.length;
  }

  const readmeGroup = await getReadmeLessonGroup(splitter);
  if (readmeGroup) {
    lessonGroups.push(readmeGroup);
    totalChunks += readmeGroup.texts.length;
  }

  console.log(
    `[lancedb] ${lessonGroups.length} lesson groups, ${totalChunks} total chunks`,
  );

  if (lessonGroups.length === 0) {
    console.log("[lancedb] No content to index, error!");
    return;
  }

  console.log("[voyage] Generating embeddings via Voyage AI...");
  let tableData: ChunkData[];
  try {
    tableData = await embedLessonGroups(lessonGroups);
  } catch (err) {
    console.error("[lancedb] Failed to embed:", err);
    return;
  }

  const lancedb = await connect(getEnv().LANCEDB_PATH);
  console.log("[lancedb] Writing to LanceDB...");
  const table = await lancedb.createTable("chunks", tableData);

  console.log("[lancedb] Creating FTS index for BM25...");
  await table.createIndex("text", { config: Index.fts() });

  const rowCount = await table.countRows();
  console.log(`[lancedb] Done. ${rowCount} chunks indexed.`);

  return true;
}

async function embedLessonGroups(groups: LessonGroup[]): Promise<ChunkData[]> {
  const apiKey = getEnv().VOYAGE_API_KEY;
  if (!apiKey) throw new Error("VOYAGE_API_KEY required");

  const chunks: ChunkData[] = [];
  let embeddedCount = 0;
  const totalChunks = groups.reduce((sum, g) => sum + g.texts.length, 0);

  for (let gi = 0; gi < groups.length; gi += RAG_BATCH_SIZE) {
    const batch = groups.slice(gi, gi + RAG_BATCH_SIZE);
    const inputs = batch.map((g) => g.texts);

    const response = await fetch(
      "https://api.voyageai.com/v1/contextualizedembeddings",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs,
          model: RAG_EMBEDDING_MODEL,
          input_type: "document",
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(
        `Voyage API error (batch ${gi}): ${response.status} ${errText}`,
      );
    }

    const { data } = (await response.json()) as {
      data: { data: { embedding: number[] }[] }[];
    };

    batch.forEach((group, idx) => {
      const returnBatch: { embedding: number[] }[] = data[idx].data;
      returnBatch.forEach((embeddingGroup, ci) => {
        chunks.push({
          id: `${group.courseSlug}/${group.categorySlug}/${group.sectionSlug}/${group.lessonSlug}-chunk-${ci}`,
          vector: embeddingGroup.embedding,
          text: group.texts[ci],
          lessonTitle: group.lessonTitle,
          lessonUrl: group.lessonUrl,
          categoryTitle: group.categoryTitle,
          sectionTitle: group.sectionTitle,
          courseTitle: group.courseTitle,
          chunkIndex: ci,
          tags: group.tags,
        });
      });
    });

    embeddedCount += batch.reduce((sum, g) => sum + g.texts.length, 0);
    console.log(`[voyage]   > embedded ${embeddedCount}/${totalChunks} chunks`);
  }

  return chunks;
}

function extractWordTokens(text: string): string[] {
  const matches = text.toLowerCase().match(/\b[a-z]{5,}\b/g);
  return [...new Set(matches ?? [])];
}

async function getReadmeLessonGroup(
  splitter: RecursiveCharacterTextSplitter,
): Promise<LessonGroup | null> {
  try {
    const readmeText = readFileSync(COURSE_INFO_PATH, "utf-8");
    const readmeChunks = await splitter.splitText(readmeText);
    if (readmeChunks.length === 0) return null;

    return {
      lessonTitle: "Site Information",
      lessonUrl: GITHUB_REPO_URL,
      categoryTitle: "About",
      sectionTitle: "README",
      courseTitle: "Machine Learning (the RPG)",
      courseSlug: "ml-rpg",
      categorySlug: "about",
      sectionSlug: "readme",
      lessonSlug: "site-information",
      texts: readmeChunks,
      tags: [],
    };
  } catch {
    console.warn("[lancedb] Could not read README.md, skipping");
    return null;
  }
}

async function updateReadmeChunks(): Promise<void> {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: RAG_CHUNK_SIZE,
      chunkOverlap: RAG_CHUNK_OVERLAP,
    });

    const group = await getReadmeLessonGroup(splitter);
    if (!group) return;

    const newChunks = await embedLessonGroups([group]);

    const lancedb = await connect(getEnv().LANCEDB_PATH);
    const table = await lancedb.openTable("chunks");

    await table.delete(`lessonUrl = '${GITHUB_REPO_URL}'`);
    await table.add(newChunks);
    await table.createIndex("text", { config: Index.fts(), replace: true });
  } catch (err) {
    console.warn(
      "[lancedb] Could not update README chunks (schema mismatch, skipping):",
      err,
    );
  }
}
