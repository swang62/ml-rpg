import { describe, expect, it } from "vitest";
import { validateCloudflareEnv } from "~/utils/env.cloudflare";

describe("validateCloudflareEnv", () => {
  it("returns validated env when all required vars are set", () => {
    const env = validateCloudflareEnv({
      RAG_API_URL: "http://rag-api:8000",
      LLAMA_API_URL: "http://llama-api:9876",
      SESSION_SECRET: "a".repeat(32),
      NODE_ENV: "development",
    });
    expect(env.RAG_API_URL).toBe("http://rag-api:8000");
    expect(env.LLAMA_API_URL).toBe("http://llama-api:9876");
    expect(env.SESSION_SECRET).toBe("a".repeat(32));
    expect(env.NODE_ENV).toBe("development");
  });

  it("defaults NODE_ENV to production when not set", () => {
    const env = validateCloudflareEnv({
      RAG_API_URL: "http://rag-api:8000",
      LLAMA_API_URL: "http://llama-api:9876",
      SESSION_SECRET: "x".repeat(32),
    });
    expect(env.NODE_ENV).toBe("production");
  });

  it("accepts D1_CONTENT binding", () => {
    const env = validateCloudflareEnv({
      D1_CONTENT: {} as unknown,
      RAG_API_URL: "http://rag-api:8000",
      LLAMA_API_URL: "http://llama-api:9876",
      SESSION_SECRET: "y".repeat(32),
    });
    expect(env.D1_CONTENT).toBeDefined();
  });

  it("throws when RAG_API_URL is missing", () => {
    expect(() =>
      validateCloudflareEnv({
        LLAMA_API_URL: "http://llama-api:9876",
        SESSION_SECRET: "z".repeat(32),
      }),
    ).toThrow("RAG_API_URL");
  });

  it("throws when LLAMA_API_URL is missing", () => {
    expect(() =>
      validateCloudflareEnv({
        RAG_API_URL: "http://rag-api:8000",
        SESSION_SECRET: "z".repeat(32),
      }),
    ).toThrow("LLAMA_API_URL");
  });

  it("throws when SESSION_SECRET is too short", () => {
    expect(() =>
      validateCloudflareEnv({
        RAG_API_URL: "http://rag-api:8000",
        LLAMA_API_URL: "http://llama-api:9876",
        SESSION_SECRET: "short",
      }),
    ).toThrow("SESSION_SECRET");
  });

  it("throws when SESSION_SECRET is missing", () => {
    expect(() =>
      validateCloudflareEnv({
        RAG_API_URL: "http://rag-api:8000",
        LLAMA_API_URL: "http://llama-api:9876",
      }),
    ).toThrow("SESSION_SECRET");
  });

  it("throws when RAG_API_URL is not a valid URL", () => {
    expect(() =>
      validateCloudflareEnv({
        RAG_API_URL: "not-a-url",
        LLAMA_API_URL: "http://llama-api:9876",
        SESSION_SECRET: "z".repeat(32),
      }),
    ).toThrow("RAG_API_URL");
  });

  it("throws when NODE_ENV is invalid", () => {
    expect(() =>
      validateCloudflareEnv({
        RAG_API_URL: "http://rag-api:8000",
        LLAMA_API_URL: "http://llama-api:9876",
        SESSION_SECRET: "z".repeat(32),
        NODE_ENV: "staging",
      }),
    ).toThrow("NODE_ENV");
  });
});
