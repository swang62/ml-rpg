import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, resetRateLimitStore } from "~/server/rate-limiter";

const TEST_CONFIG = { maxAttempts: 3, windowMs: 60_000 };

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("allows requests within the limit", () => {
    const r1 = checkRateLimit("test-key", TEST_CONFIG);
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = checkRateLimit("test-key", TEST_CONFIG);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);
  });

  it("blocks requests past the limit", () => {
    checkRateLimit("test-key", TEST_CONFIG);
    checkRateLimit("test-key", TEST_CONFIG);
    checkRateLimit("test-key", TEST_CONFIG);

    const r4 = checkRateLimit("test-key", TEST_CONFIG);
    expect(r4.allowed).toBe(false);
    expect(r4.remaining).toBe(0);
    expect(r4.resetMs).toBeGreaterThan(0);
  });

  it("tracks keys independently", () => {
    checkRateLimit("key-a", TEST_CONFIG);
    checkRateLimit("key-a", TEST_CONFIG);
    checkRateLimit("key-a", TEST_CONFIG);

    // key-a is exhausted
    expect(checkRateLimit("key-a", TEST_CONFIG).allowed).toBe(false);

    // key-b should still have all 3 attempts
    const first = checkRateLimit("key-b", TEST_CONFIG);
    expect(first.allowed).toBe(true);
    expect(first.remaining).toBe(2); // consumed 1, 2 remaining
  });

  it("resets after store is cleared", () => {
    checkRateLimit("test-key", TEST_CONFIG);
    checkRateLimit("test-key", TEST_CONFIG);
    checkRateLimit("test-key", TEST_CONFIG);

    expect(checkRateLimit("test-key", TEST_CONFIG).allowed).toBe(false);

    resetRateLimitStore();

    expect(checkRateLimit("test-key", TEST_CONFIG).allowed).toBe(true);
  });

  it("uses the provided config", () => {
    const strictConfig = { maxAttempts: 1, windowMs: 60_000 };

    expect(checkRateLimit("strict", strictConfig).allowed).toBe(true);
    expect(checkRateLimit("strict", strictConfig).allowed).toBe(false);
  });
});
