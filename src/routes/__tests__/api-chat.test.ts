import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "../api/chat";

describe("GET /api/chat", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("disables caching for the status probe and response", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ idle: false, model_loading: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ) as typeof fetch;

    const response = await GET();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/status",
      expect.objectContaining({ cache: "no-store" }),
    );
    expect(response.headers.get("Cache-Control")).toBe(
      "no-store, must-revalidate",
    );
    await expect(response.json()).resolves.toEqual({
      idle: false,
      model_loading: false,
    });
  });
});
