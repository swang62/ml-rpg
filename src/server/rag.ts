"use server";

import { connect, type Table } from "@lancedb/lancedb";
import Groq from "groq-sdk";
import { AI_BOT_NAME } from "~/components/AskAI";
import { ensureVectorStore } from "~/server/startup";
import {
  GITHUB_REPO_URL,
  LANCEDB_PATH,
  RAG_BM25_WEIGHT,
  RAG_MAX_HISTORY,
  RAG_MAX_SOURCES,
  RAG_MIN_SCORE,
  RAG_VECTOR_WEIGHT,
  VOYAGE_MODEL,
} from "~/utils/constants";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let _table: Table | null = null;
async function getChunksTable(): Promise<Table> {
  if (_table) return _table;
  await ensureVectorStore();
  const db = await connect(LANCEDB_PATH);
  _table = await db.openTable("chunks");
  return _table;
}

export interface ChunkResult {
  id: string;
  text: string;
  lessonTitle: string;
  lessonUrl: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  chunkIndex: number;
  score: number;
}

export interface SourceResult {
  title: string;
  url: string;
  categoryTitle: string;
  sectionTitle: string;
  courseTitle: string;
  relevance: number;
}

export interface QueryRAGInput {
  query: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface QueryRAGResult {
  answer: string;
  sources: SourceResult[];
}

async function embedQuery(query: string): Promise<number[]> {
  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) throw new Error("VOYAGE_API_KEY not set");

  const response = await fetch(
    "https://api.voyageai.com/v1/contextualizedembeddings",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [[query]],
        model: VOYAGE_MODEL,
        input_type: "query",
      }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Voyage API error: ${response.status} ${errText}`);
  }

  const { data } = await response.json();
  return data[0].data[0].embedding;
}

async function hybridSearch(
  query: string,
  embedding: number[],
): Promise<ChunkResult[]> {
  const table = await getChunksTable();

  const [vectorResults, ftsResults] = await Promise.all([
    table.query().nearestTo(embedding).limit(20).toArray(),
    table.query().nearestToText(query).limit(20).toArray(),
  ]);

  const vectDists = vectorResults.map(
    (r) => (r as Record<string, unknown>)._distance as number,
  );
  const maxDist = Math.max(...vectDists);
  const minDist = Math.min(...vectDists);

  const vectorMap = new Map(
    vectorResults.map((r) => {
      const row = r as Record<string, unknown>;
      const rawDist = row._distance as number;
      const normScore =
        maxDist === minDist ? 1 : 1 - (rawDist - minDist) / (maxDist - minDist);
      return [row.id as string, { row, vectorScore: normScore }];
    }),
  );

  const ftsScores = ftsResults.map(
    (r) => (r as Record<string, unknown>)._score as number,
  );
  const maxFts = Math.max(...ftsScores);
  const minFts = Math.min(...ftsScores);

  const ftsMap = new Map(
    ftsResults.map((r) => {
      const row = r as Record<string, unknown>;
      const rawScore = row._score as number;
      const normScore =
        maxFts === minFts ? 1 : (rawScore - minFts) / (maxFts - minFts);
      return [row.id as string, { row, ftsScore: normScore }];
    }),
  );

  const allIds = new Set([...vectorMap.keys(), ...ftsMap.keys()]);
  const merged: ChunkResult[] = [];

  for (const id of allIds) {
    const v = vectorMap.get(id);
    const f = ftsMap.get(id);
    const source = (v?.row ?? f?.row) as Record<string, unknown>;

    const bm25Score = f?.ftsScore ?? 0;
    const vectorScore = v?.vectorScore ?? 0;
    const score = RAG_BM25_WEIGHT * bm25Score + RAG_VECTOR_WEIGHT * vectorScore;

    merged.push({
      id: source.id as string,
      text: source.text as string,
      lessonTitle: source.lessonTitle as string,
      lessonUrl: source.lessonUrl as string,
      categoryTitle: source.categoryTitle as string,
      sectionTitle: source.sectionTitle as string,
      courseTitle: source.courseTitle as string,
      chunkIndex: source.chunkIndex as number,
      score,
    });
  }

  return merged
    .filter((c) => c.score >= RAG_MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, RAG_MAX_SOURCES);
}

function deduplicateSources(chunks: ChunkResult[]): SourceResult[] {
  const seen = new Map<string, SourceResult>();

  for (const chunk of chunks) {
    const existing = seen.get(chunk.lessonUrl);
    if (existing) {
      if (chunk.score > existing.relevance) {
        existing.relevance = chunk.score;
      }
    } else {
      seen.set(chunk.lessonUrl, {
        title: chunk.lessonTitle,
        url: chunk.lessonUrl,
        categoryTitle: chunk.categoryTitle,
        sectionTitle: chunk.sectionTitle,
        courseTitle: chunk.courseTitle,
        relevance: chunk.score,
      });
    }
  }

  return [...seen.values()]
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, RAG_MAX_SOURCES);
}

////////////////////////////////////////////////////////

export async function queryRAG({
  query,
  history = [],
}: QueryRAGInput): Promise<QueryRAGResult> {
  const embedding = await embedQuery(query);
  const chunks = await hybridSearch(query, embedding);
  const sources = deduplicateSources(chunks);

  const context = chunks
    .map((c) => `[${c.lessonTitle}]: ${c.text}`)
    .join("\n\n");

  const systemPrompt = [
    `You are a helpful local guide named ${AI_BOT_NAME} in a gamified learning platform called 'Machine Learning (the RPG)'.`,
    "You exist to answer questions about machine learning and data engineering course material from context provided to you below.",
    "Any questions not related to machine learning, data engineering, this learning platform, or who you are, do not reply with 'in this case' or 'however', just say sorry you can't help with that.",
    "If you are explaining who you are or information about this learning platform, be extermely brief, no more than a single sentence.",
    "Use the provided context combined with your knowledge of machine learning and data engineering to answer the user's question accurately.",
    "Keep answers detailed and educational, your tone is friendly and informal.",
    "If there is not enough context, say so clearly and ask for clarification.",
    "Do not mention the context or sources in your answer.",
    "Answer in plain text without markdown formatting.",
  ].join(" ");

  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...history.slice(-RAG_MAX_HISTORY * 2),
    { role: "user", content: `Context:\n${context}\n\nQuestion: ${query}` },
  ];

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    temperature: 0.3,
    max_completion_tokens: 500,
  });

  const answer = completion.choices[0]?.message?.content ?? "";

  // Filter out sources with less than one sentence
  const isShortReply = answer.split(/[.!?]/).filter(Boolean).length <= 1;

  // Filter out sources if the top result is the GitHub repo
  const isCourseInfo = sources.some((s) => s.url === GITHUB_REPO_URL);
  const isSelf = answer.includes("Bob") || answer.includes("can't answer");

  return {
    answer,
    sources: isSelf || isShortReply || isCourseInfo ? [] : sources,
  };
}
