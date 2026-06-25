/**
 * Known acronyms that appear in lesson/category/section titles.
 * Every entry here will be uppercased when found as a whole word
 * in any title.
 *
 * Add new acronyms here as you encounter them. Keep the list
 * alphabetically sorted for easy scanning.
 */
const ACRONYM_SET = new Set([
  "ab",
  "ai",
  "ann",
  "ap",
  "api",
  "beir",
  "bert",
  "cdc",
  "cdn",
  "cnn",
  "cqrs",
  "cv",
  "dag",
  "etl",
  "faiss",
  "fgac",
  "gdpr",
  "gpu",
  "hnsw",
  "io",
  "iou",
  "ivf",
  "lfu",
  "lru",
  "lsm",
  "map",
  "ml",
  "mteb",
  "nlp",
  "nms",
  "olap",
  "oltp",
  "pca",
  "pit",
  "pq",
  "rcnn",
  "scann",
  "scd",
  "sla",
  "smote",
  "sql",
  "srm",
  "ssd",
  "swr",
  "ttl",
  "ucb",
  "umap",
  "vs",
  "yolo",
]);

/**
 * Build a single regex that matches any acronym as a whole word.
 * Case-insensitive — matches "ttl", "Ttl", "TTL" etc.
 */
const ACRONYM_PATTERN = new RegExp(
  `(?<=^|[^a-zA-Z0-9])(${[...ACRONYM_SET].map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?=$|[^a-zA-Z0-9])`,
  "gi",
);

/**
 * Fix acronym casing in a title string.
 *
 * Turns "Ttl Vs Swr And Io Bounds" → "TTL VS SWR And IO Bounds".
 * Only touches title fields — never slugs or lesson IDs.
 */
export function cleanTitle(title: string): string {
  return title.replace(ACRONYM_PATTERN, (match) => match.toUpperCase());
}
