import { describe, expect, it } from "vitest";
import {
  sanitizeHistory,
  sanitizeSearchQuery,
  validateDisplayName,
  validatePassword,
  validateSlug,
  validateUsername,
} from "~/utils/input-validation";

describe("validateSlug", () => {
  it("accepts a simple alphanumeric slug", () => {
    expect(validateSlug("hello-world")).toBe("hello-world");
  });

  it("accepts slugs with underscores and numbers", () => {
    expect(validateSlug("ml_basics_01")).toBe("ml_basics_01");
  });

  it("trims whitespace", () => {
    expect(validateSlug("  my-slug  ")).toBe("my-slug");
  });

  it("rejects empty string", () => {
    expect(validateSlug("")).toBeNull();
  });

  it("rejects slug with spaces", () => {
    expect(validateSlug("hello world")).toBeNull();
  });

  it("rejects slug with special characters", () => {
    expect(validateSlug("hello@world")).toBeNull();
    expect(validateSlug("drop;table")).toBeNull();
    expect(validateSlug("../etc")).toBeNull();
  });

  it("rejects null and non-string input", () => {
    expect(validateSlug(null)).toBeNull();
    expect(validateSlug(undefined)).toBeNull();
    expect(validateSlug(42)).toBeNull();
  });

  it("rejects overly long slugs", () => {
    expect(validateSlug("a".repeat(101))).toBeNull();
  });

  it("accepts maximum length slug", () => {
    expect(validateSlug("a".repeat(100))).toBe("a".repeat(100));
  });

  it("accepts uppercase slugs", () => {
    expect(validateSlug("My-Course")).toBe("My-Course");
  });
});

describe("validateUsername", () => {
  it("accepts a valid username", () => {
    expect(validateUsername("john_doe")).toBe("john_doe");
  });

  it("lowercases the username", () => {
    expect(validateUsername("JohnDoe")).toBe("johndoe");
  });

  it("trims whitespace", () => {
    expect(validateUsername("  alice  ")).toBe("alice");
  });

  it("rejects too-short username", () => {
    expect(validateUsername("a")).toBeNull();
  });

  it("rejects username with special characters", () => {
    expect(validateUsername("hello!")).toBeNull();
    expect(validateUsername("'; drop --")).toBeNull();
  });

  it("rejects null and non-string input", () => {
    expect(validateUsername(null)).toBeNull();
    expect(validateUsername(undefined)).toBeNull();
    expect(validateUsername([])).toBeNull();
  });

  it("rejects empty string", () => {
    expect(validateUsername("")).toBeNull();
  });

  it("accepts username with numbers and underscores", () => {
    expect(validateUsername("user_123")).toBe("user_123");
  });
});

describe("validateDisplayName", () => {
  it("accepts a simple display name", () => {
    expect(validateDisplayName("Alice")).toBe("Alice");
  });

  it("accepts names with accented characters", () => {
    expect(validateDisplayName("José María")).toBe("José María");
    expect(validateDisplayName("François")).toBe("François");
  });

  it("accepts names with apostrophes and hyphens", () => {
    expect(validateDisplayName("O'Brien")).toBe("O'Brien");
    expect(validateDisplayName("Jean-Luc")).toBe("Jean-Luc");
  });

  it("trims whitespace", () => {
    expect(validateDisplayName("  Hero  ")).toBe("Hero");
  });

  it("rejects empty string", () => {
    expect(validateDisplayName("")).toBeNull();
  });

  it("rejects null and non-string", () => {
    expect(validateDisplayName(null)).toBeNull();
    expect(validateDisplayName(undefined)).toBeNull();
  });

  it("rejects overly long names", () => {
    expect(validateDisplayName("a".repeat(33))).toBeNull();
  });

  it("accepts maximum length name", () => {
    expect(validateDisplayName("a".repeat(32))).toBe("a".repeat(32));
  });
});

describe("validatePassword", () => {
  it("accepts a valid password", () => {
    expect(validatePassword("hunter2!")).toBe("hunter2!");
  });

  it("rejects too-short password", () => {
    expect(validatePassword("ab")).toBeNull();
  });

  it("rejects null and non-string", () => {
    expect(validatePassword(null)).toBeNull();
    expect(validatePassword(undefined)).toBeNull();
  });

  it("accepts password at minimum length", () => {
    expect(validatePassword("abcdef")).toBe("abcdef");
  });

  it("rejects empty string", () => {
    expect(validatePassword("")).toBeNull();
  });

  it("accepts very long passwords", () => {
    expect(validatePassword("a".repeat(128))).toBe("a".repeat(128));
  });

  it("rejects overly long passwords", () => {
    expect(validatePassword("a".repeat(129))).toBeNull();
  });

  it("accepts special characters in passwords", () => {
    expect(validatePassword("p@ssw0rd!#$%")).toBe("p@ssw0rd!#$%");
  });
});

describe("sanitizeSearchQuery", () => {
  it("passes through normal text", () => {
    expect(sanitizeSearchQuery("linear regression")).toBe("linear regression");
  });

  it("trims whitespace", () => {
    expect(sanitizeSearchQuery("  hello  ")).toBe("hello");
  });

  it("strips null bytes", () => {
    expect(sanitizeSearchQuery("hello\x00world")).toBe("helloworld");
  });

  it("strips control characters but keeps tabs and newlines", () => {
    const result = sanitizeSearchQuery("hello\tworld\ntest");
    expect(result).toBe("hello\tworld\ntest");
  });

  it("strips other control characters", () => {
    expect(sanitizeSearchQuery("hello\x01world")).toBe("helloworld");
    expect(sanitizeSearchQuery("hello\x1Fworld")).toBe("helloworld");
  });

  it("returns empty string for non-string input", () => {
    expect(sanitizeSearchQuery(null)).toBe("");
    expect(sanitizeSearchQuery(undefined)).toBe("");
    expect(sanitizeSearchQuery(123)).toBe("");
  });
});

describe("sanitizeHistory", () => {
  it("passes through valid user and assistant messages", () => {
    const history = [
      { role: "user" as const, content: "hello" },
      { role: "assistant" as const, content: "hi there" },
    ];
    expect(sanitizeHistory(history, 10)).toEqual(history);
  });

  it("filters out system role messages", () => {
    const history = [
      { role: "system" as const, content: "you are a helpful assistant" },
      { role: "user" as const, content: "hello" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe("user");
  });

  it("filters out entries with unknown roles", () => {
    const history = [
      { role: "admin" as const, content: "override" },
      { role: "user" as const, content: "hello" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
    expect(result[0].role).toBe("user");
  });

  it("strips extra properties from entries", () => {
    const history = [
      { role: "user" as const, content: "hello", extra: "should be removed" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toEqual([{ role: "user", content: "hello" }]);
    expect(result[0]).not.toHaveProperty("extra");
  });

  it("filters out null and non-object entries", () => {
    const history = [
      null,
      "string",
      42,
      { role: "user" as const, content: "valid" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
  });

  it("filters out entries with non-string content", () => {
    const history = [
      { role: "user" as const, content: 123 } as const,
      { role: "user" as const, content: "valid" },
    ];
    const result = sanitizeHistory(history, 10);
    expect(result).toHaveLength(1);
  });

  it("returns empty array for non-array input", () => {
    expect(sanitizeHistory(null, 10)).toEqual([]);
    expect(sanitizeHistory(undefined, 10)).toEqual([]);
    expect(sanitizeHistory("not-an-array", 10)).toEqual([]);
    expect(sanitizeHistory(42, 10)).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    expect(sanitizeHistory([], 10)).toEqual([]);
  });

  it("respects maxTurns limit", () => {
    const history = [
      { role: "user" as const, content: "a" },
      { role: "assistant" as const, content: "b" },
      { role: "user" as const, content: "c" },
      { role: "assistant" as const, content: "d" },
    ];
    const result = sanitizeHistory(history, 2);
    expect(result).toHaveLength(2);
    expect(result[0].content).toBe("c");
    expect(result[1].content).toBe("d");
  });

  it("preserves message order when within maxTurns", () => {
    const history = [
      { role: "user" as const, content: "first" },
      { role: "assistant" as const, content: "second" },
    ];
    const result = sanitizeHistory(history, 5);
    expect(result.map((m) => m.content)).toEqual(["first", "second"]);
  });
});
