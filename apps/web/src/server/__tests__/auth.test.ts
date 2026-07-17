import { describe, expect, it } from "vitest";
import { checkPassword, createHash } from "../session";

// Fast Argon2id parameters for tests — ~1ms per hash instead of ~55ms.
// Production code uses defaults (timeCost=3, memoryCost=65536, parallelism=4).
const FAST_OPTIONS = { timeCost: 1, memoryCost: 8, parallelism: 1 };

describe("createHash", () => {
  it("returns an Argon2id-format hash", async () => {
    const hash = await createHash("password123", FAST_OPTIONS);
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("produces different hashes for the same password", async () => {
    const hash1 = await createHash("samepassword", FAST_OPTIONS);
    const hash2 = await createHash("samepassword", FAST_OPTIONS);
    expect(hash1).not.toBe(hash2); // salt is random
  });

  it("handles short passwords", async () => {
    const hash = await createHash("a", FAST_OPTIONS);
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("handles long passwords", async () => {
    const long = "x".repeat(128);
    const hash = await createHash(long, FAST_OPTIONS);
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("handles passwords with special characters", async () => {
    const hash = await createHash("p@ssw0rd! #$%^&*()", FAST_OPTIONS);
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("handles unicode characters", async () => {
    const hash = await createHash("héllo wörld 🎉", FAST_OPTIONS);
    expect(hash).toMatch(/^\$argon2id\$/);
  });
});

describe("checkPassword", () => {
  it("validates a correct password", async () => {
    const hash = await createHash("correct-password", FAST_OPTIONS);
    await expect(
      checkPassword(hash, "correct-password"),
    ).resolves.toBeUndefined();
  });

  it("rejects an incorrect password", async () => {
    const hash = await createHash("real-password", FAST_OPTIONS);
    await expect(checkPassword(hash, "wrong-password")).rejects.toThrow(
      "Invalid password",
    );
  });

  it("round-trips multiple passwords", async () => {
    const passwords = ["abc", "password123", "very-long-password-here-123!"];
    for (const pw of passwords) {
      const hash = await createHash(pw, FAST_OPTIONS);
      await expect(checkPassword(hash, pw)).resolves.toBeUndefined();
    }
  });
});
