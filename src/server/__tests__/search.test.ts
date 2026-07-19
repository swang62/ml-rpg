import { describe, expect, it } from "vitest";
import { extractRelevantText, stripHtmlTags } from "~/utils/search-utils";

describe("extractRelevantText", () => {
  it("extracts h1 content", () => {
    const html = "<h1>What is Machine Learning?</h1><p>Some text</p>";
    const result = extractRelevantText(html);
    expect(result).toContain("What is Machine Learning");
  });

  it("extracts strong tag content", () => {
    const html = "<p><strong>Key insight:</strong> models learn from data.</p>";
    const result = extractRelevantText(html);
    expect(result).toContain("Key insight");
  });

  it("extracts key takeaways card content", () => {
    const html = '<span class="Learn_keyTakeaways">This is important</span>';
    const result = extractRelevantText(html);
    expect(result).toContain("This is important");
  });

  it("extracts border-left styled blocks", () => {
    const html = '<div style="border-left: 4px solid #ccc">Note this</div>';
    const result = extractRelevantText(html);
    expect(result).toContain("Note this");
  });

  it("combines multiple sources and strips HTML", () => {
    const html = `
      <h1>Title Here</h1>
      <p><strong>Bold word</strong></p>
      <div style="border-left: 4px solid">Side note</div>
    `;
    const result = extractRelevantText(html);
    expect(result).toContain("Title Here");
    expect(result).toContain("Side note");
    expect(result).toContain("Bold word");
    // No HTML tags remain
    expect(result).not.toMatch(/<[^>]+>/);
  });

  it("handles empty HTML", () => {
    expect(extractRelevantText("")).toBe("");
  });

  it("handles HTML with no extractable content", () => {
    expect(extractRelevantText("<div>just text</div>")).toBe("");
  });

  it("handles multiple strong tags", () => {
    const html = "<p><strong>First</strong> and <strong>Second</strong></p>";
    const result = extractRelevantText(html);
    expect(result).toContain("First");
    expect(result).toContain("Second");
  });

  it("collapses whitespace", () => {
    const html = `<h1>  Spaced   Title  </h1>`;
    const result = extractRelevantText(html);
    expect(result).toBe("Spaced Title");
  });

  it("strips HTML entities", () => {
    const html = "<h1>foo &amp; bar</h1>";
    const result = extractRelevantText(html);
    expect(result).not.toContain("&amp;");
  });
});

describe("stripHtmlTags", () => {
  it("removes HTML tags", () => {
    expect(stripHtmlTags("<p>hello</p>")).toBe("hello");
  });

  it("replaces tags with spaces so words don't merge", () => {
    expect(stripHtmlTags("<p>hello</p><p>world</p>")).toBe("hello world");
  });

  it("strips HTML entities like &amp;", () => {
    expect(stripHtmlTags("foo &amp; bar")).toBe("foo bar");
  });

  it("collapses multiple whitespace", () => {
    expect(stripHtmlTags("hello    world")).toBe("hello world");
  });

  it("trims leading and trailing whitespace", () => {
    expect(stripHtmlTags("  hello  ")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(stripHtmlTags("")).toBe("");
  });

  it("handles string with no HTML", () => {
    expect(stripHtmlTags("plain text")).toBe("plain text");
  });

  it("replaces numeric HTML entities with a space then trims", () => {
    // &#100; → space → collapsed by \s+ → trimmed to ""
    expect(stripHtmlTags("&#100;")).toBe("");
  });

  it("handles mixed content with tags and text", () => {
    expect(stripHtmlTags("<div>hello <b>world</b></div>")).toBe("hello world");
  });
});
