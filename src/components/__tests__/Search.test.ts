import { describe, expect, it } from "vitest";
import { boldTerms, escapeHtml, escapeRegex } from "~/utils/search-utils";

describe("escapeHtml", () => {
  it("escapes &, <, >, and quotes", () => {
    expect(escapeHtml('& < > "')).toBe("&amp; &lt; &gt; &quot;");
  });

  it("passes through safe strings", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });

  it("escapes mixed content", () => {
    expect(escapeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert('xss')&lt;/script&gt;",
    );
  });
});

describe("escapeRegex", () => {
  it("escapes special regex characters", () => {
    expect(escapeRegex("hello.world")).toBe("hello\\.world");
    expect(escapeRegex("(test)")).toBe("\\(test\\)");
    expect(escapeRegex("[abc]")).toBe("\\[abc\\]");
    expect(escapeRegex("a+b?")).toBe("a\\+b\\?");
  });

  it("passes through safe strings", () => {
    expect(escapeRegex("hello")).toBe("hello");
    expect(escapeRegex("word")).toBe("word");
  });
});

describe("boldTerms", () => {
  it("wraps matching terms in <strong>", () => {
    const result = boldTerms("hello world", ["world"]);
    expect(result).toBe("hello <strong>world</strong>");
  });

  it("matches case-insensitively", () => {
    const result = boldTerms("Hello World", ["world"]);
    expect(result).toBe("Hello <strong>World</strong>");
  });

  it("works on pre-escaped HTML (caller is responsible for escaping)", () => {
    const escaped = "&lt;script&gt;alert(1)&lt;/script&gt;";
    const result = boldTerms(escaped, ["script"]);
    expect(result).toBe(
      "&lt;<strong>script</strong>&gt;alert(1)&lt;/script&gt;",
    );
  });

  it("highlights multiple terms", () => {
    const result = boldTerms("hello world", ["hello", "world"]);
    expect(result).toBe("<strong>hello</strong> <strong>world</strong>");
  });

  it("highlights words with dashes", () => {
    const result = boldTerms("hello-world", ["hello", "world"]);
    expect(result).toBe("<strong>hello</strong>-<strong>world</strong>");
  });

  it("handles terms not found in text", () => {
    const result = boldTerms("hello world", ["missing"]);
    expect(result).toBe("hello world");
  });

  it("handles empty terms array", () => {
    const result = boldTerms("hello world", []);
    expect(result).toBe("hello world");
  });

  it("escapes regex special chars in terms", () => {
    const result = boldTerms("hello.world", ["hello.world"]);
    expect(result).toBe("<strong>hello.world</strong>");
  });
});
