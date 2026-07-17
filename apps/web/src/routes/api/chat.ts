import { consumeStreamToken } from "~/server/stream-tokens";
import { getEnv } from "~/utils/env";

export async function POST(event: { request: Request }) {
  let body: { messages?: unknown; streamToken?: unknown };
  try {
    body = await event.request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { messages, streamToken } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (typeof streamToken !== "string" || !consumeStreamToken(streamToken)) {
    console.error("[chat] invalid stream token");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const llamaUrl = getEnv().LLAMA_API_URL;

  let llmResponse: Response;
  try {
    llmResponse = await fetch(`${llamaUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "bob",
        messages,
        temperature: 1.0,
        max_tokens: 1024,
        stream: true,
      }),
      signal: AbortSignal.timeout(60000),
    });
  } catch (err) {
    console.error("[chat] llama API fetch failed:", err);
    const encoder = new TextEncoder();
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", content: "Sorry, Bob is taking a nap right now." })}\n\n`,
          ),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return new Response(errorStream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  if (!llmResponse.ok) {
    const bodyText = await llmResponse.text();
    console.error(
      `[chat] llama API returned ${llmResponse.status}: ${bodyText}`,
    );
    const encoder = new TextEncoder();
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", content: "Sorry, Bob is taking a nap right now." })}\n\n`,
          ),
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return new Response(errorStream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  return new Response(llmResponse.body, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
