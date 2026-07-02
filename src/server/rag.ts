import { createStreamToken } from "~/server/stream-tokens";
import { RAG_MAX_HISTORY, RATE_LIMIT_CHAT } from "~/utils/constants";
import { getEnv } from "~/utils/env";
import { sanitizeHistory, sanitizeSearchQuery } from "~/utils/input-validation";
import type { ChunkResult, SourceResult } from "~/utils/types";
import { checkRateLimit } from "../middleware/rate-limiter";
import { getSession } from "./session";

export interface PrepareChatInput {
  query: string;
  history: { role: "user" | "assistant"; content: string }[];
}

export interface PrepareChatResult {
  systemPrompt: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  sources: SourceResult[];
  keywords: string[];
  streamToken: string;
  skipResponse?: string;
}

async function detectJailbreak(query: string): Promise<boolean> {
  try {
    const ragUrl = getEnv().RAG_API_URL;
    const response = await fetch(`${ragUrl}/guard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return false;
    const data = (await response.json()) as {
      jailbreak: boolean;
      score: number;
    };
    return data.jailbreak;
  } catch {
    return false;
  }
}

async function fetchSystemPrompt(query: string): Promise<{
  systemPrompt: string;
  sources: SourceResult[];
  keywords: string[];
}> {
  const ragUrl = getEnv().RAG_API_URL;
  const response = await fetch(`${ragUrl}/retrieve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
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
  const systemPrompt = [
    "You are a helpful local guide named Bob in a gamified learning platform called 'Machine Learning (the RPG)'. ",
    "Relevant context will be provided below when available. Use it to answer questions about machine learning and data engineering. ",
    "For questions about you or the world/course/platform itself (course structure, XP, ranks, navigation), answer from your knowledge and any available context. ",
    "If the question is outside machine learning, data engineering, system design, this course/platform, or who you are and your backstory, politely decline. ",
    "Keep answers friendly, warm, descriptive, and fun. You are in a mythical guide in a video game world, answer in character. ",
    "When the topic is about machine learning or data engineering or system design, be brief and summarize the core concepts. ",
    "Answer in plain text without markdown.\n",
    "Additional Context:\n",
    context,
  ].join("");

  return { systemPrompt, sources, keywords };
}

export async function warmupCheck(): Promise<boolean> {
  "use server";

  try {
    const ragUrl = getEnv().RAG_API_URL;
    const response = await fetch(`${ragUrl}/status`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return true;
    const data = (await response.json()) as { idle: boolean };
    return data.idle;
  } catch {
    return true;
  }
}

export async function prepareChat({
  query,
  history,
}: PrepareChatInput): Promise<PrepareChatResult> {
  "use server";

  const session = await getSession();
  const rateLimitKey = session.data.id ? `rag:${session.data.id}` : "rag:anon";
  const rateResult = checkRateLimit(rateLimitKey, RATE_LIMIT_CHAT);
  if (!rateResult.allowed) {
    return {
      systemPrompt: "",
      messages: [],
      sources: [],
      keywords: [],
      streamToken: "",
      skipResponse: `You're asking too fast! Try again in ${Math.ceil(rateResult.resetMs / 1000)}s`,
    };
  }

  const sanitized = sanitizeSearchQuery(query);
  if (!sanitized) {
    return {
      systemPrompt: "",
      messages: [],
      sources: [],
      keywords: [],
      streamToken: "",
      skipResponse: "Please ask a valid question.",
    };
  }

  if (await detectJailbreak(sanitized)) {
    return {
      systemPrompt: "",
      messages: [],
      sources: [],
      keywords: [],
      streamToken: "",
      skipResponse: "Sorry, I can't help with that.",
    };
  }

  const { systemPrompt, sources, keywords } =
    await fetchSystemPrompt(sanitized);

  const safeHistory = sanitizeHistory(history, RAG_MAX_HISTORY);

  const messages: { role: "system" | "user" | "assistant"; content: string }[] =
    [
      { role: "system", content: systemPrompt },
      ...safeHistory,
      { role: "user", content: sanitized },
    ];

  const streamToken = createStreamToken();

  return {
    systemPrompt,
    messages,
    sources,
    keywords,
    streamToken,
  };
}
