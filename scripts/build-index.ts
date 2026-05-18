import { existsSync, rmSync } from "node:fs";
import { connect, Index } from "@lancedb/lancedb";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import Database from "better-sqlite3";

const COURSE_DB = "./src/db/empty.db";
const LANCEDB_PATH = "./.data/search";

const VOYAGE_MODEL = "voyage-context-3";

const BATCH_SIZE = 100;
const CHUNK_OVERLAP = 0;
const CHUNK_SIZE = 512;

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

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/&[a-z]+\d*;/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function buildIndex() {
  console.log("[index] Opening DB:", COURSE_DB);
  const db = new Database(COURSE_DB);
  db.pragma("journal_mode = WAL");

  console.log("[index] Loading hierarchy data...");
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

  console.log(`[index] ${lessonRows.length} lessons found`);

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

    const plainText = stripHtml(lesson.html);
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

  console.log(
    `[index] ${lessonGroups.length} lesson groups, ${totalChunks} total chunks`,
  );

  if (lessonGroups.length === 0) {
    console.log("[index] No content to index. Exiting.");
    db.close();
    return;
  }

  console.log("[index] Generating contextualized embeddings via Voyage AI...");
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) {
    console.error("[index] VOYAGE_API_KEY environment variable required");
    process.exit(1);
  }

  if (existsSync(LANCEDB_PATH)) {
    rmSync(LANCEDB_PATH, { recursive: true });
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
        `[index] Voyage API error (batch ${gi}): ${response.status} ${errText}`,
      );
      process.exit(1);
    }
    const { data } = await response.json();

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
    console.log(`[index]   > embedded ${embeddedCount}/${totalChunks} chunks`);
  }

  console.log("[index] Writing to LanceDB...");

  const table = await lancedb.createTable("chunks", tableData);

  console.log("[index] Creating FTS index for BM25...");
  await table.createIndex("text", { config: Index.fts() });

  const rowCount = await table.countRows();
  console.log(
    `[index] Done. ${rowCount} chunks indexed and stored at ${LANCEDB_PATH}`,
  );

  db.close();
}

buildIndex().catch((err) => {
  console.error("[index] Fatal error:", err);
  process.exit(1);
});
