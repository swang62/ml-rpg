import { describe, expect, it } from "vitest";

describe("shutdown module", () => {
  it("exports a module (no side effects in Worker mode)", async () => {
    // In Worker mode, shutdown.ts is a lightweight no-op module.
    // Verify it imports without errors.
    const mod = await import("~/server/shutdown");
    expect(mod).toBeDefined();
  });
});
