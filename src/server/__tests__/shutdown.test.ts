import { afterAll, describe, expect, it } from "vitest";

describe("shutdown module", () => {
  afterAll(() => {
    // Remove any handlers our import registered so we don't pollute
    process.removeAllListeners("SIGTERM");
    process.removeAllListeners("SIGINT");
    process.removeAllListeners("unhandledRejection");
  });

  it("registers SIGTERM and SIGINT handlers on import", async () => {
    const sigtermBefore = process.listenerCount("SIGTERM");

    // Import triggers side-effect registration
    await import("~/server/shutdown");

    const sigtermAfter = process.listenerCount("SIGTERM");
    const sigintAfter = process.listenerCount("SIGINT");

    // At least one handler was added for each signal
    expect(sigtermAfter).toBeGreaterThan(sigtermBefore);
    expect(sigintAfter).toBeGreaterThan(0);

    // unhandledRejection handler should also be registered
    expect(process.listenerCount("unhandledRejection")).toBeGreaterThan(0);
  });
});
