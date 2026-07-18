import { createHmac, randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { consumeStreamToken, createStreamToken } from "../stream-tokens";

describe("stream-tokens (Worker-compatible HMAC)", () => {
  it("creates a valid token", () => {
    const token = createStreamToken();
    expect(token).toBeTruthy();
    expect(token.split(":").length).toBe(3);
  });

  it("consumes a token it just created", () => {
    const token = createStreamToken();
    expect(consumeStreamToken(token)).toBe(true);
  });

  it("rejects an expired token", () => {
    // Create a token with an artificially old timestamp
    const oldTimestamp = (Date.now() - 60000).toString();
    const payload = `${randomUUID()}:${oldTimestamp}`;
    const hmac = createHmac(
      "sha256",
      "test-secret-that-is-long-enough-for-testing",
    )
      .update(payload)
      .digest("base64url");
    const expiredToken = `${payload}:${hmac}`;
    expect(consumeStreamToken(expiredToken)).toBe(false);
  });

  it("rejects a tampered token", () => {
    const token = createStreamToken();
    const parts = token.split(":");
    // Tamper with the nonce
    const tampered = `tampered:${parts[1]}:${parts[2]}`;
    expect(consumeStreamToken(tampered)).toBe(false);
  });

  it("rejects malformed token", () => {
    expect(consumeStreamToken("")).toBe(false);
    expect(consumeStreamToken("only-one-part")).toBe(false);
    expect(consumeStreamToken("a:b")).toBe(false);
  });
});
