import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getEnv, resetEnv } from "~/utils/env";

// Store original env to restore after tests
const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  // Reset the env module cache before each test
  resetEnv();
});

afterEach(() => {
  // Restore original environment to avoid leaking across tests
  process.env = { ...ORIGINAL_ENV };
  resetEnv();
});

describe("getEnv", () => {
  it("returns validated env when all required vars are set", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);
    process.env.PORT = "4000";
    process.env.HOST = "127.0.0.1";
    process.env.NODE_ENV = "test";

    const env = getEnv();
    expect(env.COURSE_DB_PATH).toBe("/tmp/test.db");
    expect(env.LANCEDB_PATH).toBe("/tmp/search");
    expect(env.SESSION_SECRET).toBe("a".repeat(32));
    expect(env.PORT).toBe(4000);
    expect(env.HOST).toBe("127.0.0.1");
    expect(env.NODE_ENV).toBe("test");
  });

  it("uses defaults for PORT and HOST when not provided", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);
    delete process.env.PORT;
    delete process.env.HOST;

    const env = getEnv();
    expect(env.PORT).toBe(3333);
    expect(env.HOST).toBe("0.0.0.0");
  });

  it("coerces PORT from string to number", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);
    process.env.PORT = "8080";

    const env = getEnv();
    expect(env.PORT).toBe(8080);
    expect(typeof env.PORT).toBe("number");
  });

  it("accepts optional VOYAGE_API_KEY and GROQ_API_KEY", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);
    process.env.VOYAGE_API_KEY = "voy-key-123";
    process.env.GROQ_API_KEY = "groq-key-456";

    const env = getEnv();
    expect(env.VOYAGE_API_KEY).toBe("voy-key-123");
    expect(env.GROQ_API_KEY).toBe("groq-key-456");
  });

  it("defaults NODE_ENV to development when not set", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);
    delete process.env.NODE_ENV;

    const env = getEnv();
    expect(env.NODE_ENV).toBe("development");
  });

  it("caches the result after first successful call", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);

    const env1 = getEnv();
    // Modify env after first call
    process.env.COURSE_DB_PATH = "/tmp/changed.db";

    const env2 = getEnv();
    // Should still be the original cached value
    expect(env2.COURSE_DB_PATH).toBe("/tmp/test.db");
    // Same object reference
    expect(env1).toBe(env2);
  });

  it("throws when COURSE_DB_PATH is missing", () => {
    process.env.COURSE_DB_PATH = "";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);

    expect(() => getEnv()).toThrow("COURSE_DB_PATH");
  });

  it("throws when LANCEDB_PATH is missing", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "";
    process.env.SESSION_SECRET = "a".repeat(32);

    expect(() => getEnv()).toThrow("LANCEDB_PATH");
  });

  it("throws when SESSION_SECRET is too short", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "short";

    expect(() => getEnv()).toThrow("SESSION_SECRET");
  });

  it("throws when SESSION_SECRET is missing", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "";

    expect(() => getEnv()).toThrow("SESSION_SECRET");
  });

  it("throws when PORT is not a valid number", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);
    process.env.PORT = "not-a-number";

    expect(() => getEnv()).toThrow();
  });

  it("throws when NODE_ENV is invalid", () => {
    process.env.COURSE_DB_PATH = "/tmp/test.db";
    process.env.LANCEDB_PATH = "/tmp/search";
    process.env.SESSION_SECRET = "a".repeat(32);
    process.env.NODE_ENV = "staging";

    expect(() => getEnv()).toThrow("NODE_ENV");
  });
});
