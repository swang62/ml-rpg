import { existsSync, readFileSync } from "node:fs";
import { connect, Index } from "@lancedb/lancedb";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { extractRelevantText } from "~/server/search";
import {
  COURSE_DB_PATH,
  GITHUB_REPO_URL,
  LANCEDB_PATH,
  VOYAGE_MODEL,
} from "~/utils/constants";
import { getDb } from "~/utils/storage";

const BATCH_SIZE = 100;
const CHUNK_SIZE = 512;
const CHUNK_OVERLAP = 0;

interface LessonRow {
  slug: string;
  title: string;
  html: string;
  section_id: number;
  category_id: number;
  course_id: number;
}

interface SectionRow {
  id: number;
  slug: string;
  title: string;
  category_id: number;
  course_id: number;
}

interface CategoryRow {
  id: number;
  slug: string;
  title: string;
  course_id: number;
}

interface CourseRow {
  id: number;
  slug: string;
  title: string;
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
}

// biome-ignore lint/suspicious/noExplicitAny: lance db data
type ChunkData = Record<string, any> & {
  id: string;
  vector: number[];
  text: string;
  lessonTitle: string;
  lessonUrl: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  chunkIndex: number;
};

let _buildPromise: Promise<void> | null = null;

export async function ensureVectorStore(): Promise<void> {
  if (existsSync(LANCEDB_PATH)) return;
  if (_buildPromise) return _buildPromise;
  _buildPromise = buildVectorIndex();
  return _buildPromise;
}

async function buildVectorIndex(): Promise<void> {
  console.log("[startup] Vector store missing, rebuilding...");
  console.log("[startup] Opening DB:", COURSE_DB_PATH);

  const db = getDb();

  console.log("[startup] Loading hierarchy data...");
  const courses = new Map<number, CourseRow>(
    (db.prepare("SELECT id, slug, title FROM course").all() as CourseRow[]).map(
      (r) => [r.id, r],
    ),
  );
  const categories = new Map<number, CategoryRow>(
    (
      db
        .prepare("SELECT id, slug, title, course_id FROM category")
        .all() as CategoryRow[]
    ).map((r) => [r.id, r]),
  );
  const sections = new Map<number, SectionRow>(
    (
      db
        .prepare("SELECT id, slug, title, category_id, course_id FROM section")
        .all() as SectionRow[]
    ).map((r) => [r.id, r]),
  );

  const lessonRows = db
    .prepare(
      "SELECT slug, title, html, section_id, category_id, course_id FROM lesson WHERE html != ''",
    )
    .all() as LessonRow[];

  console.log(`[startup] ${lessonRows.length} lessons found`);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  const lessonGroups: LessonGroup[] = [];
  let totalChunks = 0;

  for (const lesson of lessonRows) {
    const section = sections.get(lesson.section_id);
    const category = categories.get(lesson.category_id);
    const course = courses.get(lesson.course_id);
    if (!section || !category || !course) continue;

    const plainText = extractRelevantText(lesson.html);
    if (!plainText) continue;

    const lessonUrl = `/${course.slug}/${category.slug}/${section.slug}/${lesson.slug}`;
    const chunks = await splitter.splitText(plainText);
    if (chunks.length === 0) continue;

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
    });
    totalChunks += chunks.length;
  }

  try {
    const readmeText = readFileSync("./README.md", "utf-8");
    const readmeChunks = await splitter.splitText(readmeText);
    if (readmeChunks.length > 0) {
      lessonGroups.push({
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
      });
      totalChunks += readmeChunks.length;
    }
  } catch {
    console.warn("[startup] Could not read README.md, skipping");
  }

  console.log(
    `[startup] ${lessonGroups.length} lesson groups, ${totalChunks} total chunks`,
  );

  if (lessonGroups.length === 0) {
    console.log("[startup] No content to index. Skipping.");
    return;
  }

  console.log("[startup] Generating embeddings via Voyage AI...");
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) {
    console.error(
      "[startup] VOYAGE_API_KEY required, cannot build vector store",
    );
    return;
  }

  const lancedb = await connect(LANCEDB_PATH);
  const tableData: ChunkData[] = [];

  let embeddedCount = 0;

  for (let gi = 0; gi < lessonGroups.length; gi += BATCH_SIZE) {
    const batch = lessonGroups.slice(gi, gi + BATCH_SIZE);
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
          model: VOYAGE_MODEL,
          input_type: "document",
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(
        `[startup] Voyage API error (batch ${gi}): ${response.status} ${errText}`,
      );
      return;
    }
    const { data } = (await response.json()) as {
      data: { data: { embedding: number[] }[] }[];
    };

    batch.forEach((group, idx) => {
      const returnBatch: { embedding: number[] }[] = data[idx].data;
      returnBatch.forEach((embeddingGroup, ci) => {
        tableData.push({
          id: `${group.courseSlug}/${group.categorySlug}/${group.sectionSlug}/${group.lessonSlug}-chunk-${ci}`,
          vector: embeddingGroup.embedding,
          text: group.texts[ci],
          lessonTitle: group.lessonTitle,
          lessonUrl: group.lessonUrl,
          categoryTitle: group.categoryTitle,
          sectionTitle: group.sectionTitle,
          courseTitle: group.courseTitle,
          chunkIndex: ci,
        });
      });
    });

    embeddedCount += batch.reduce((sum, g) => sum + g.texts.length, 0);
    console.log(
      `[startup]   > embedded ${embeddedCount}/${totalChunks} chunks`,
    );
  }

  console.log("[startup] Writing to LanceDB...");
  const table = await lancedb.createTable("chunks", tableData);

  console.log("[startup] Creating FTS index for BM25...");
  await table.createIndex("text", { config: Index.fts() });

  const rowCount = await table.countRows();
  console.log(`[startup] Done. ${rowCount} chunks indexed.`);
}
