import { connect, rerankers, type Table } from "@lancedb/lancedb";
import Groq from "groq-sdk";
import {
  GITHUB_REPO_URL,
  RAG_BOT_NAME,
  RAG_EMBEDDING_MODEL,
  RAG_MAX_HISTORY,
  RAG_MAX_SOURCES,
  RATE_LIMIT_CHAT,
} from "~/utils/constants";
import { getEnv } from "~/utils/env";
import { sanitizeHistory, sanitizeSearchQuery } from "~/utils/input-validation";
import { deduplicateSources } from "~/utils/search-utils";
import type { ChunkData, ChunkResult, SourceResult } from "~/utils/types";
import { checkRateLimit } from "./rate-limiter";
import { ensureVectorStore } from "./search";
import { getSession } from "./session";

const groq = new Groq({ apiKey: getEnv().GROQ_API_KEY });

let _vectorDB: Table | null = null;
async function getChunksTable() {
  if (!_vectorDB) {
    await ensureVectorStore();
    const db = await connect(getEnv().LANCEDB_PATH);
    _vectorDB = await db.openTable("chunks");
  }
  return _vectorDB;
}

let _reranker: rerankers.RRFReranker | null = null;
async function getReranker() {
  if (!_reranker) {
    _reranker = await rerankers.RRFReranker.create();
  }
  return _reranker;
}

export interface QueryRAGInput {
  query: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface QueryRAGResult {
  answer: string;
  sources: SourceResult[];
  keywords: string[];
}

async function embedQuery(query: string): Promise<number[]> {
  const apiKey = getEnv().VOYAGE_API_KEY;
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
  embedding: number[],
  keywords: string[],
): Promise<ChunkResult[]> {
  const table = await getChunksTable();
  const reranker = await getReranker();
  const textQuery = keywords.join(" ");

  // Don't search if no keywords/nouns are detected
  if (!textQuery.length) return [];

  const results = (await table
    .query()
    .fullTextSearch(textQuery)
    .nearestTo(embedding)
    .rerank(reranker)
    .limit(RAG_MAX_SOURCES)
    .toArray()) as ChunkResult[];

  // If course data is detected, just return the course info
  const courseInfo = results.find((r) => r.lessonUrl === GITHUB_REPO_URL);
  if (courseInfo) return [courseInfo];

  return results;
}

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

export async function extractKeywords(query: string): Promise<string[]> {
  const url = getEnv().SPACY_API_URL;
  if (!url) return [];

  try {
    const response = await fetch(`${url}/extract-keywords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return [];
    const data = (await response.json()) as { keywords: string[] };
    return data.keywords ?? [];
  } catch {
    return [];
  }
}

// Main entrypoint

export async function queryRAG({
  query,
  history = [],
}: QueryRAGInput): Promise<QueryRAGResult> {
  "use server";

  // -- Rate limiting --
  const session = await getSession();
  const rateLimitKey = session.data.id ? `rag:${session.data.id}` : "rag:anon";
  const rateResult = checkRateLimit(rateLimitKey, RATE_LIMIT_CHAT);
  if (!rateResult.allowed) {
    return {
      answer: "You're asking too fast! Try again in a minute.",
      sources: [],
      keywords: [],
    };
  }

  // -- Input sanitization --
  const sanitized = sanitizeSearchQuery(query);
  if (!sanitized) {
    return {
      answer: "Please ask a valid question.",
      sources: [],
      keywords: [],
    };
  }
  if (await detectJailbreak(sanitized)) {
    return {
      answer: "Sorry, I can't help with that.",
      sources: [],
      keywords: [],
    };
  }

  // -- keyword extraction --
  const keywords = await extractKeywords(sanitized);

  // -- Vector DB + keyword search --
  const embedding = await embedQuery(sanitized);
  const chunks = await hybridSearch(embedding, keywords);
  const sources = deduplicateSources(chunks);

  const systemPrompt = [
    `You are a helpful local guide named ${RAG_BOT_NAME} in a gamified learning platform called 'Machine Learning (the RPG)'.`,
    "You exist to answer questions about machine learning and data engineering course material from context provided to you below.",
    "Any questions not related to machine learning, data engineering, this learning platform/course, or who you are, do not answer, just say sorry you can't help with that.",
    "If you are explaining who you are or details about this course/platform, be extermely brief, no more than a single sentence.",
    "Use the provided context combined with your knowledge of machine learning and data engineering to answer the user's question accurately.",
    "Keep answers concise yet informative, summarize core ideas. Remain educational yet friendly and informal.",
    "If there is not enough context, or the question doesn't match the context, say so clearly and concisely.",
    "Do not mention the context or sources in your answer.",
    "Answer in plain text without markdown formatting.",
  ].join(" ");

  const sanitizedHistory = sanitizeHistory(history, RAG_MAX_HISTORY * 2);
  const context = sources.map((c) => `[${c.title}]: ${c.text}`).join("\n\n");

  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...sanitizedHistory,
    { role: "user", content: `Context:\n${context}\n\nQuestion: ${sanitized}` },
  ];

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    temperature: 0.3,
    max_completion_tokens: 512,
  });

  const answer = completion.choices[0]?.message?.content ?? "";

  // Filter out sources
  const isShortReply = answer.split(/[.!?]/).filter(Boolean).length <= 1;
  const isCourseInfo = sources.some((s) => s.url === GITHUB_REPO_URL);
  const isInvalidReply =
    answer.includes("Bob") ||
    answer.includes("can't answer") ||
    answer.includes("can't help") ||
    answer.includes("here to help") ||
    answer.includes("happy to chat") ||
    answer.includes("machine learning or data engineering") ||
    answer.includes("not enough context");

  return {
    answer,
    sources: isInvalidReply || isShortReply || isCourseInfo ? [] : sources,
    keywords,
  };
}
