"use server";

import { connect, rerankers, type Table } from "@lancedb/lancedb";
import Groq from "groq-sdk";
import { ensureVectorStore } from "~/server/startup";
import {
  AI_BOT_NAME,
  GITHUB_REPO_URL,
  LANCEDB_PATH,
  RAG_EMBEDDING_MODEL,
  RAG_MAX_HISTORY,
  RAG_MAX_SOURCES,
} from "~/utils/constants";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

let _table: Table | null = null;
async function getChunksTable() {
  if (!_table) {
    await ensureVectorStore();
    const db = await connect(LANCEDB_PATH);
    _table = await db.openTable("chunks");
  }
  return _table;
}

let _reranker: rerankers.RRFReranker | null = null;
async function getReranker() {
  if (!_reranker) {
    _reranker = await rerankers.RRFReranker.create();
  }
  return _reranker;
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
        model: RAG_EMBEDDING_MODEL,
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
  const reranker = await getReranker();

  const results = await table
    .query()
    .fullTextSearch(query)
    .nearestTo(embedding)
    .rerank(reranker)
    .limit(RAG_MAX_SOURCES)
    .toArray();

  return results.map((r) => {
    const row = r as Record<string, unknown>;
    return {
      id: row.id as string,
      text: row.text as string,
      lessonTitle: row.lessonTitle as string,
      lessonUrl: row.lessonUrl as string,
      categoryTitle: row.categoryTitle as string,
      sectionTitle: row.sectionTitle as string,
      courseTitle: row.courseTitle as string,
      chunkIndex: row.chunkIndex as number,
      score: row._relevance_score as number,
    };
  });
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

// Entrypoint

async function detectJailbreak(query: string): Promise<boolean> {
  try {
    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-prompt-guard-2-22m",
      messages: [{ role: "user", content: query }],
    });
    const raw = completion.choices[0]?.message?.content?.trim() ?? "0";
    const score = Number.parseFloat(raw);
    return !Number.isNaN(score) && score > 0.5;
  } catch {
    return false;
  }
}

export async function queryRAG({
  query,
  history = [],
}: QueryRAGInput): Promise<QueryRAGResult> {
  if (await detectJailbreak(query)) {
    return { answer: "Sorry, I can't help with that.", sources: [] };
  }

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
    "Keep answers concise yet informative, summarize core ideas. Remain educational yet friendly and informal.",
    "If there is not enough context, or the question doesn't match the context, say so clearly and concisely.",
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
  const isNoResponse =
    answer.includes("Bob") ||
    answer.includes("can't answer") ||
    answer.includes("can't help") ||
    answer.includes("here to help") ||
    answer.includes("happy to chat") ||
    answer.includes("not enough context");

  return {
    answer,
    sources: isNoResponse || isShortReply || isCourseInfo ? [] : sources,
  };
}
