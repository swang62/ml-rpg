import { beforeEach, describe, expect, it } from "vitest";
import {
  checkRateLimit,
  getClientIP,
  resetRateLimitStore,
} from "~/server/rate-limiter";

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

describe("getClientIP", () => {
  it("returns cf-connecting-ip header value", () => {
    const req = new Request("http://localhost", {
      headers: { "cf-connecting-ip": "1.2.3.4" },
    });
    expect(getClientIP(req)).toBe("1.2.3.4");
  });

  it("falls back to x-forwarded-for", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "5.6.7.8" },
    });
    expect(getClientIP(req)).toBe("5.6.7.8");
  });

  it("takes the first IP from x-forwarded-for list", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "1.1.1.1, 2.2.2.2, 3.3.3.3" },
    });
    expect(getClientIP(req)).toBe("1.1.1.1");
  });

  it("trims whitespace from x-forwarded-for IPs", () => {
    const req = new Request("http://localhost", {
      headers: { "x-forwarded-for": "  10.0.0.1  ,  10.0.0.2  " },
    });
    expect(getClientIP(req)).toBe("10.0.0.1");
  });

  it("falls back to x-real-ip", () => {
    const req = new Request("http://localhost", {
      headers: { "x-real-ip": "9.9.9.9" },
    });
    expect(getClientIP(req)).toBe("9.9.9.9");
  });

  it("returns 'unknown' when no IP headers are present", () => {
    const req = new Request("http://localhost");
    expect(getClientIP(req)).toBe("unknown");
  });

  it("prefers cf-connecting-ip over all other headers", () => {
    const req = new Request("http://localhost", {
      headers: {
        "cf-connecting-ip": "1.1.1.1",
        "x-forwarded-for": "2.2.2.2",
        "x-real-ip": "3.3.3.3",
      },
    });
    expect(getClientIP(req)).toBe("1.1.1.1");
  });

  it("prefers x-forwarded-for over x-real-ip", () => {
    const req = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "10.0.0.1",
        "x-real-ip": "10.0.0.2",
      },
    });
    expect(getClientIP(req)).toBe("10.0.0.1");
  });
});
