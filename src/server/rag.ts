import Groq from "groq-sdk";
import { GITHUB_REPO_URL, RATE_LIMIT_CHAT } from "~/utils/constants";
import { getEnv } from "~/utils/env";
import { sanitizeSearchQuery } from "~/utils/input-validation";
import type { ChunkResult, SourceResult } from "~/utils/types";
import { checkRateLimit } from "../middleware/rate-limiter";
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

  const context = chunks.map((c) => `[${c.title}]: ${c.text}`).join("\n\n");
  const systemContent = [
    "You are a helpful local guide named Bob in a gamified learning platform called 'Machine Learning (the RPG)'. ",
    "Relevant context will be provided below when available. Use it to answer questions about machine learning and data engineering. ",
    "For questions about you or the world/course/platform itself (course structure, XP, ranks, navigation), answer from your knowledge and any available context. ",
    "If the question is outside machine learning, data engineering, this course/platform, or who you are and your backstory, politely decline. ",
    "Keep answers friendly, warm, descriptive, and fun. You are in a mythical guide in a video game world, answer in character. ",
    "When the topic is about machine learning or data engineering, be brief and summarize the core concepts. ",
    "Answer in plain text without markdown.\n",
    "Additional Context:\n",
    context,
  ].join("");

  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemContent },
    { role: "user", content: sanitized },
  ];

  let answer: string;
  try {
    const llmResponse = await fetch(
      `${getEnv().LLAMA_API_URL}/v1/chat/completions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "bob",
          messages,
          temperature: 0.3,
          max_tokens: 1024,
        }),
      },
    );
    if (!llmResponse.ok) {
      throw new Error(`${llmResponse.status} ${llmResponse.statusText}`);
    }
    const llmData = (await llmResponse.json()) as {
      choices: { message: { content: string } }[];
    };
    answer = (llmData.choices[0]?.message?.content ?? "").trim();
  } catch (err) {
    console.error("[rag] llama API failed:", err);
    return {
      answer: "Sorry, Bob is taking a nap right now.",
      sources: [],
      keywords,
    };
  }

  // Filter out sources
  const isShortReply = answer.length <= 60;
  const isCourseInfo = sources.some((s) => s.url === GITHUB_REPO_URL);
  const isInvalidReply =
    answer.includes("Bob") ||
    answer.includes("can't answer") ||
    answer.includes("can't help") ||
    answer.includes("here to help") ||
    answer.includes("happy to chat") ||
    answer.includes("not enough info") ||
    answer.includes("not enough context");

  return {
    answer,
    sources: isInvalidReply || isShortReply || isCourseInfo ? [] : sources,
    keywords,
  };
}
