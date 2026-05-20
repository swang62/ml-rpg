import { describe, expect, it } from "vitest";
import { checkPassword, createHash } from "../session";

describe("createHash", () => {
  it("returns an Argon2id-format hash", async () => {
    const hash = await createHash("password123");
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("produces different hashes for the same password", async () => {
    const hash1 = await createHash("samepassword");
    const hash2 = await createHash("samepassword");
    expect(hash1).not.toBe(hash2); // salt is random
  });

  it("handles short passwords", async () => {
    const hash = await createHash("a");
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("handles long passwords", async () => {
    const long = "x".repeat(128);
    const hash = await createHash(long);
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("handles passwords with special characters", async () => {
    const hash = await createHash("p@ssw0rd! #$%^&*()");
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it("handles unicode characters", async () => {
    const hash = await createHash("héllo wörld 🎉");
    expect(hash).toMatch(/^\$argon2id\$/);
  });
});

describe("checkPassword", () => {
  it("validates a correct password", async () => {
    const hash = await createHash("correct-password");
    await expect(
      checkPassword(hash, "correct-password"),
    ).resolves.toBeUndefined();
  });

  it("rejects an incorrect password", async () => {
    const hash = await createHash("real-password");
    await expect(checkPassword(hash, "wrong-password")).rejects.toThrow(
      "Invalid password",
    );
  });

  it("round-trips multiple passwords", async () => {
    const passwords = ["abc", "password123", "very-long-password-here-123!"];
    for (const pw of passwords) {
      const hash = await createHash(pw);
      await expect(checkPassword(hash, pw)).resolves.toBeUndefined();
    }
  });
});
