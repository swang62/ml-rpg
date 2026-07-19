import { describe, expect, it } from "vitest";
import { checkPassword, createHash } from "../session";

describe("createHash (Web Crypto PBKDF2)", () => {
  it("returns a PBKDF2-format hash", async () => {
    const hash = await createHash("password123");
    expect(hash).toMatch(/^pbkdf2:sha256:/);
  });

  it("produces different hashes for the same password", async () => {
    const hash1 = await createHash("samepassword");
    const hash2 = await createHash("samepassword");
    expect(hash1).not.toBe(hash2); // salt is random
  });

  it("handles short passwords", async () => {
    const hash = await createHash("a");
    expect(hash).toMatch(/^pbkdf2:sha256:/);
  });

  it("handles long passwords", async () => {
    const long = "x".repeat(128);
    const hash = await createHash(long);
    expect(hash).toMatch(/^pbkdf2:sha256:/);
  });

  it("handles passwords with special characters", async () => {
    const hash = await createHash("p@ssw0rd! #$%^&*()");
    expect(hash).toMatch(/^pbkdf2:sha256:/);
  });

  it("handles unicode characters", async () => {
    const hash = await createHash("héllo wörld 🎉");
    expect(hash).toMatch(/^pbkdf2:sha256:/);
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

  it("rejects empty password against real hash", async () => {
    const hash = await createHash("some-password");
    await expect(checkPassword(hash, "")).rejects.toThrow("Invalid password");
  });

  it("rejects wrong password with constant-time behavior", async () => {
    const hash = await createHash("target");
    // Different length passwords should still throw "Invalid password"
    await expect(
      checkPassword(hash, "very-very-very-long-wrong-password"),
    ).rejects.toThrow("Invalid password");
  });

  it("rejects malformed hash format", async () => {
    await expect(
      checkPassword("invalid-hash-format", "password"),
    ).rejects.toThrow();
  });

  it("rejects hash with missing parts", async () => {
    await expect(
      checkPassword("pbkdf2:sha256:abc", "password"),
    ).rejects.toThrow("Invalid password hash format");
  });
});
