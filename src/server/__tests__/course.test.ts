import { describe, expect, it, vi } from "vitest";

// course.ts imports @solidjs/router which throws on server side, so we mock it.
// We only test the exported cleanLessonHtml function.
vi.mock("@solidjs/router", () => ({
  query: vi.fn(),
}));
const { cleanLessonHtml } = await import("~/server/course");

describe("cleanLessonHtml", () => {
  it("unescapes <code> tags", () => {
    const input = '&lt;code class="python"&gt;print("hello")&lt;/code&gt;';
    const result = cleanLessonHtml(input);
    expect(result).toBe('<code class="python">print("hello")</code>');
  });

  it("leaves non-code HTML unchanged", () => {
    const input = "<p>Hello <strong>world</strong></p>";
    expect(cleanLessonHtml(input)).toBe(input);
  });

  it("handles multiple code blocks", () => {
    const input =
      "&lt;code&gt;foo&lt;/code&gt; text &lt;code&gt;bar&lt;/code&gt;";
    const result = cleanLessonHtml(input);
    expect(result).toBe("<code>foo</code> text <code>bar</code>");
  });

  it("handles code with no attributes", () => {
    const input = "&lt;code&gt;simple&lt;/code&gt;";
    const result = cleanLessonHtml(input);
    expect(result).toBe("<code>simple</code>");
  });

  it("handles nested HTML entities inside code", () => {
    const input = "&lt;code&gt;&amp;lt;escaped&amp;gt;&lt;/code&gt;";
    const result = cleanLessonHtml(input);
    expect(result).toBe("<code>&amp;lt;escaped&amp;gt;</code>");
  });

  it("returns empty string for empty input", () => {
    expect(cleanLessonHtml("")).toBe("");
  });

  it("preserves regular HTML with mixed content", () => {
    const html = "<h1>Title</h1>&lt;code&gt;code block&lt;/code&gt;<p>end</p>";
    const result = cleanLessonHtml(html);
    expect(result).toBe("<h1>Title</h1><code>code block</code><p>end</p>");
  });
});
