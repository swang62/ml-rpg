import DOMPurify from "isomorphic-dompurify";
import { RAG_MAX_SOURCES } from "./constants";
import type { ChunkResult, SourceResult } from "./types";

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

export function cleanLessonHtml(html?: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(
    html
      .replace(/&lt;code[^&]*?&gt;/g, (m) =>
        m.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
      )
      .replaceAll("&lt;/code&gt;", "</code>"),
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
      new RegExp(`(${escapeRegex(term)})`, "gi"),
      "<strong>$1</strong>",
    );
  }
  return result;
}

// ---------------------------------------------------------------------------
// MiniSearch (full-text search)
// ---------------------------------------------------------------------------

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
 * Builds content step by step: h1 → key takeaways → strong tags → border-left blocks.
 */
export function extractRelevantText(html: string): string {
  const parts: string[] = [];

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) parts.push(h1Match[1]);

  const strongPattern = /<strong[^>]*>([\s\S]*?)<\/strong>/gis;
  const strongMatches = [...html.matchAll(strongPattern)];
  for (const match of strongMatches) {
    if (match[1].trim()) parts.push(match[1]);
  }

  const cardContentPattern =
    /<span[^>]*class="[^"]*Learn_keyTakeaways[^"]*"[^>]*>([\s\S]*?)<\/span>/gi;
  const cardMatches = [...html.matchAll(cardContentPattern)];
  for (const match of cardMatches) {
    if (match[1].trim()) parts.push(match[1]);
  }

  const borderPattern =
    /<(\w+)[^>]*border-left:\s*4px[^>]*>([\s\S]*?)<\/\1>/gis;
  const borderMatches = [...html.matchAll(borderPattern)];
  for (const match of borderMatches) {
    if (match[2].trim()) parts.push(match[2]);
  }

  return stripHtmlTags(parts.join(" "));
}

// ---------------------------------------------------------------------------
// RAG (semantic vector search)
// ---------------------------------------------------------------------------

export function deduplicateSources(chunks: ChunkResult[]): SourceResult[] {
  const seen = new Map<string, SourceResult>();

  for (const chunk of chunks) {
    const existing = seen.get(chunk.lessonUrl);
    if (existing) {
      if (chunk.score > existing.relevance) {
        existing.relevance = chunk.score;
      }
    } else {
      seen.set(chunk.lessonUrl, {
        title: chunk.lessonTitle,
        url: chunk.lessonUrl,
        categoryTitle: chunk.categoryTitle,
        sectionTitle: chunk.sectionTitle,
        courseTitle: chunk.courseTitle,
        relevance: chunk.score,
      });
    }
  }

  return [...seen.values()]
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, RAG_MAX_SOURCES);
}
