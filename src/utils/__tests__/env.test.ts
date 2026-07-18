import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getEnv, resetEnv } from "~/utils/env";

// Store original env to restore after tests
const ORIGINAL_ENV = { ...process.env };

const BASE_ENV = {
  SESSION_SECRET: "a".repeat(32),
  RAG_API_URL: "http://rag-api:8000",
  LLAMA_API_URL: "http://llama-api:9876",
};

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
    process.env = { ...process.env, ...BASE_ENV };
    process.env.PORT = "4000";
    process.env.HOST = "127.0.0.1";
    process.env.NODE_ENV = "test";

    const env = getEnv();
    expect(env.SESSION_SECRET).toBe("a".repeat(32));
    expect(env.PORT).toBe(4000);
    expect(env.HOST).toBe("127.0.0.1");
    expect(env.NODE_ENV).toBe("test");
    expect(env.RAG_API_URL).toBe("http://rag-api:8000");
    expect(env.LLAMA_API_URL).toBe("http://llama-api:9876");
  });

  it("uses defaults for PORT and HOST when not provided", () => {
    process.env = { ...process.env, ...BASE_ENV };
    delete process.env.PORT;
    delete process.env.HOST;

    const env = getEnv();
    expect(env.PORT).toBe(3333);
    expect(env.HOST).toBe("0.0.0.0");
  });

  it("coerces PORT from string to number", () => {
    process.env = { ...process.env, ...BASE_ENV };
    process.env.PORT = "8080";

    const env = getEnv();
    expect(env.PORT).toBe(8080);
  });

  it("defaults NODE_ENV to development when not set", () => {
    process.env = { ...process.env, ...BASE_ENV };
    delete process.env.NODE_ENV;

    const env = getEnv();
    expect(env.NODE_ENV).toBe("development");
  });

  it("caches the result after first successful call", () => {
    process.env = { ...process.env, ...BASE_ENV };

    const env1 = getEnv();
    // Modify env after first call
    process.env.SESSION_SECRET = "changed".repeat(6);

    const env2 = getEnv();
    // Should still be the original cached value
    expect(env2.SESSION_SECRET).toBe("a".repeat(32));
    // Same object reference
    expect(env1).toBe(env2);
  });

  it("throws when SESSION_SECRET is too short", () => {
    process.env = { ...process.env, ...BASE_ENV };
    process.env.SESSION_SECRET = "short";

    expect(() => getEnv()).toThrow("SESSION_SECRET");
  });

  it("throws when SESSION_SECRET is missing", () => {
    process.env = { ...process.env, ...BASE_ENV };
    process.env.SESSION_SECRET = "";

    expect(() => getEnv()).toThrow("SESSION_SECRET");
  });

  it("throws when PORT is not a valid number", () => {
    process.env = { ...process.env, ...BASE_ENV };
    process.env.PORT = "not-a-number";

    expect(() => getEnv()).toThrow();
  });

  it("throws when NODE_ENV is invalid", () => {
    process.env = { ...process.env, ...BASE_ENV };
    process.env.NODE_ENV = "staging";

    expect(() => getEnv()).toThrow("NODE_ENV");
  });
});
