import { getBackendAuthHeaders } from "~/server/backend-auth";
import { getEnv } from "~/utils/env";
import { sanitizeSearchQuery } from "~/utils/input-validation";
import { checkRateLimit, getClientIP } from "~/utils/rate-limit";

const STATUS_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store, must-revalidate",
};

/** Check if the RAG backend is idle (cold) and needs warmup. */
export async function GET() {
  try {
    const ragUrl = getEnv().RAG_API_URL;
    const response = await fetch(`${ragUrl}/api/status`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      return new Response(JSON.stringify({ idle: true }), {
        headers: STATUS_HEADERS,
      });
    }
    const data = (await response.json()) as {
      idle: boolean;
      model_loading: boolean;
    };
    return new Response(JSON.stringify(data), {
      headers: STATUS_HEADERS,
    });
  } catch {
    return new Response(JSON.stringify({ idle: true, model_loading: false }), {
      headers: STATUS_HEADERS,
    });
  }
}

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
