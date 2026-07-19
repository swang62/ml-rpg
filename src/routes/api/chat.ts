import { getBackendAuthHeaders } from "~/server/backend-auth";
import { getEnv } from "~/utils/env";
import { sanitizeSearchQuery } from "~/utils/input-validation";
import { checkRateLimit, getClientIP } from "~/utils/rate-limit";

export async function POST(event: { request: Request }) {
  let body: { query?: unknown; history?: unknown };
  try {
    body = await event.request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { query, history } = body;

  if (typeof query !== "string" || query.length === 0) {
    return new Response(JSON.stringify({ error: "No query" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Rate limit by IP using Cloudflare Rate Limiting API
  const ip = getClientIP(event.request);
  const { allowed } = await checkRateLimit("RL_CHAT", `rag:${ip}`);
  if (!allowed) {
    return new Response(
      JSON.stringify({
        type: "skip",
        content: "You're asking too fast! Try again later.",
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Sanitize query
  const sanitized = sanitizeSearchQuery(query);
  if (!sanitized) {
    return new Response(
      JSON.stringify({ type: "skip", content: "Please ask a valid question." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const ragUrl = getEnv().RAG_API_URL;

  let ragResponse: Response;
  try {
    ragResponse = await fetch(`${ragUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getBackendAuthHeaders(),
      },
      body: JSON.stringify({
        query: sanitized,
        history: Array.isArray(history) ? history : [],
      }),
      signal: AbortSignal.timeout(60000),
    });
  } catch (err) {
    console.error("[chat] rag API fetch failed:", err);
    return new Response(
      JSON.stringify({
        type: "error",
        content: "Sorry, Bob is taking a nap right now.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!ragResponse.ok) {
    const bodyText = await ragResponse.text();
    console.error(
      "[chat] rag API returned %d: %s",
      ragResponse.status,
      bodyText,
    );
    return new Response(
      JSON.stringify({
        type: "error",
        content: "Sorry, Bob is taking a nap right now.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  // Proxy SSE stream from rag_api directly to browser
  return new Response(ragResponse.body, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
