/**
 * Stateless stream token auth using HMAC-SHA256.
 *
 * Both server functions and API routes read the signing key from
 * SESSION_SECRET (available via process.env in both contexts).
 * No shared mutable state needed — tokens are self-validating.
 */

import { createHmac, randomUUID } from "node:crypto";
import { getEnv } from "~/utils/env";

const TOKEN_TTL_MS = 30000;

function getKey(): string {
  return getEnv().SESSION_SECRET;
}

/**
 * Token format:  nonce:timestamp:base64url(hmac)
 *
 * The HMAC covers the nonce and timestamp so neither can be tampered with.
 */
export function createStreamToken(): string {
  const nonce = randomUUID();
  const timestamp = Date.now().toString();
  const payload = `${nonce}:${timestamp}`;
  const hmac = createHmac("sha256", getKey())
    .update(payload)
    .digest("base64url");
  return `${payload}:${hmac}`;
}

export function consumeStreamToken(token: string): boolean {
  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [nonce, timestamp, hmac] = parts;

  const age = Date.now() - Number.parseInt(timestamp, 10);
  if (Number.isNaN(age) || age > TOKEN_TTL_MS || age < 0) return false;

  const payload = `${nonce}:${timestamp}`;
  const expected = createHmac("sha256", getKey())
    .update(payload)
    .digest("base64url");
  return hmac === expected;
}
