import Groq from "groq-sdk";
import {
  GITHUB_REPO_URL,
  RAG_MAX_HISTORY,
  RATE_LIMIT_CHAT,
} from "~/utils/constants";
import { getEnv } from "~/utils/env";
import { sanitizeHistory, sanitizeSearchQuery } from "~/utils/input-validation";
import type { ChunkResult, SourceResult } from "~/utils/types";
import { checkRateLimit } from "./rate-limiter";
import { getSession } from "./session";

const groq = new Groq({ apiKey: getEnv().GROQ_API_KEY });

export interface QueryRAGInput {
  query: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface QueryRAGResult {
  answer: string;
  sources: SourceResult[];
  keywords: string[];
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
      answer: `You're asking too fast! Try again in ${Math.ceil(rateResult.resetMs / 1000)}s`,
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

  // -- Source retrieval via rag-api --
  const ragUrl = getEnv().RAG_API_URL;
  const response = await fetch(`${ragUrl}/retrieve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: sanitized }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    throw new Error(`Retrieval API error: ${response.status}`);
  }
  const { chunks, sources, keywords } = (await response.json()) as {
    chunks: ChunkResult[];
    sources: SourceResult[];
    keywords: string[];
  };

  const systemPrompt = [
    "You are a helpful local guide named Bob in a gamified learning platform called 'Machine Learning (the RPG)'. ",
    "You exist to answer questions about machine learning and data engineering course material from context provided to you below. ",
    "Any questions not related to machine learning, data engineering, this learning platform/course, or who you are; just say sorry you can't help with that. ",
    "Use the provided context combined with your internal knowledge of machine learning and data engineering to answer the user's question. ",
    "Keep answers concise yet informative, summarize core ideas. Remain educational, yet friendly and informal. ",
    "If the question is about machine learning or data engineering, and there isn't any context, say so clearly and ask for additional clarification. ",
    "Do not mention the context or sources in your answer. ",
    "Answer in plain text without markdown formatting.",
  ].join("");

  const sanitizedHistory = sanitizeHistory(history, RAG_MAX_HISTORY);
  const context = chunks.map((c) => `[${c.title}]: ${c.text}`).join("\n\n");

  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...sanitizedHistory,
    { role: "user", content: `Context:\n${context}\n\nQuestion: ${sanitized}` },
  ];

  const llmUrl = getEnv().LLAMA_API_URL;

  let answer: string;
  if (llmUrl) {
    const response = await fetch(`${llmUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "bob",
        messages,
        temperature: 0.3,
        max_tokens: 512,
      }),
    });
    if (!response.ok) {
      throw new Error(`llama API error: ${response.status}`);
    }
    const llmData = (await response.json()) as {
      choices: { message: { content: string } }[];
    };
    answer = llmData.choices[0]?.message?.content ?? "";
  } else {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.3,
      max_completion_tokens: 512,
    });
    answer = completion.choices[0]?.message?.content ?? "";
  }

  // Filter out sources
  const isShortReply = answer.length <= 100;
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
