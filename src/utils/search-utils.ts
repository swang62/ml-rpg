import { GITHUB_REPO_URL } from "~/utils/constants";
import type { SourceResult } from "~/utils/types";

/** Escape HTML special characters for safe innerHTML usage. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape special regex characters for use in RegExp constructor. */
export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Clean lesson HTML for display.
 * Performs JSX spacing cleanup and code tag unescaping.
 * No sanitization step — content comes from scraped lessons (trusted source).
 */
export function cleanLessonHtml(html?: string): string {
  if (!html) return "";
  return (
    html
      // Strip JSX {" "} spacing expressions left over from scraped .tsx files
      .replace(/\{" "\}/g, " ")
      .replace(/&lt;code[^&]*?&gt;/g, (m) =>
        m.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
      )
      .replaceAll("&lt;/code&gt;", "</code>")
  );
}

/**
 * Bold query terms in text.
 * The text should already be HTML-escaped before calling this function.
 * Returns HTML with <strong> tags wrapping matching terms.
 */
export function boldTerms(text: string, terms: string[]): string {
  let result = text;
  for (const term of terms) {
    result = result.replace(
      new RegExp(`(${escapeRegex(term)})`, "i"),
      "<strong>$1</strong>",
    );
  }
  return result;
}

// ---------------------------------------------------------------------------
// MiniSearch (full-text search)
// ---------------------------------------------------------------------------

export function shouldHideSources(
  answer: string,
  sources: SourceResult[],
): boolean {
  const isShortReply = answer.length < 40;
  const isCourseInfo = sources.some((s) => s.url === GITHUB_REPO_URL);
  const isInvalidReply =
    answer.includes("Bob") ||
    answer.includes("can't answer") ||
    answer.includes("can't help") ||
    answer.includes("here to help") ||
    answer.includes("happy to chat") ||
    answer.includes("not enough info") ||
    answer.includes("not enough context");
  return isInvalidReply || isShortReply || isCourseInfo;
}

export function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/&[a-z]+\d*;/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract search-relevant text from a lesson's HTML.
 * Based on legacy-shim.css: border-left boxes (definitions/callouts),
 * text-transform:uppercase headers, strong text, and key takeaways.
 * Strips non-alphanumeric characters for clean search indexing.
 */
export function extractRelevantText(html: string): string {
  const parts: string[] = [];

  // h1 title
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) parts.push(h1Match[1]);

  // Definition / callout boxes (border-left: 4px solid)
  const borderBoxRegex =
    /<(\w+)[^>]*border-left:\s*4px\s+solid[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of html.matchAll(borderBoxRegex)) {
    if (match[2].trim()) parts.push(match[2]);
  }

  // Section headers / labels (text-transform: uppercase, font-weight: 700)
  const headerRegex =
    /<(?:p|div)[^>]*text-transform:\s*upper[^>]*font-weight:\s*700[^>]*>([\s\S]*?)<\/(?:p|div)>/gi;
  for (const match of html.matchAll(headerRegex)) {
    if (match[1].trim()) parts.push(match[1]);
  }

  // <strong> elements
  const strongRegex = /<strong[^>]*>([\s\S]*?)<\/strong>/gi;
  for (const match of html.matchAll(strongRegex)) {
    if (match[1].trim()) parts.push(match[1]);
  }

  // Key takeaways — extract the full Learn_keyTakeaways block by div depth
  const takeawayStart = html.indexOf('class="Learn_keyTakeaways');
  if (takeawayStart !== -1) {
    // Find the opening <div tag start
    let tagOpen = takeawayStart;
    while (tagOpen > 0 && html[tagOpen] !== "<") tagOpen--;
    let depth = 0;
    let i = tagOpen;
    for (; i < html.length; i++) {
      if (html.slice(i, i + 4) === "<div") depth++;
      if (html.slice(i, i + 6) === "</div>") {
        depth--;
        if (depth === 0) break;
      }
    }
    if (depth === 0) {
      parts.push(html.slice(tagOpen, i + 6));
    }
  }

  // First paragraph after card-content-area (intro text)
  const cardStart = html.indexOf('class="card-content-area');
  if (cardStart !== -1) {
    const afterCard = html.slice(cardStart);
    const firstP = afterCard.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (firstP) parts.push(firstP[1]);
  }

  // Deduplicate
  const seen = new Set<string>();
  const unique = parts.filter((p) => {
    if (seen.has(p)) return false;
    seen.add(p);
    return true;
  });

  return stripHtmlTags(unique.join(" ")).replace(/[^a-zA-Z0-9\s]/g, " ");
}
