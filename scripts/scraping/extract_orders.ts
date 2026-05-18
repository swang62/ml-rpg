import { readFileSync, writeFileSync } from "node:fs";

const CONCURRENCY = 20;

// Read the curriculum JSON
const curriculum: {
  category: string;
  title: string;
  subsections: {
    subsection: string;
    title: string;
    lessons: { lesson: string; title: string; order: number; url: string }[];
  }[];
}[] = JSON.parse(readFileSync("scripts/data-curriculum.json", "utf8"));

// Build list of all lesson URLs
const allLessons: {
  category: string;
  subsection: string;
  lesson: string;
  url: string;
}[] = [];
for (const cat of curriculum) {
  for (const sub of cat.subsections) {
    for (const lesson of sub.lessons) {
      allLessons.push({
        category: cat.category,
        subsection: sub.subsection,
        lesson: lesson.lesson,
        url: lesson.url,
      });
    }
  }
}

console.log(`Found ${allLessons.length} lessons to fetch`);

async function fetchOrder(url: string) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();

    // Look for pattern like: <span>6</span><span> of </span><span>6</span>
    const match = html.match(/>(\d+)<[^>]*>\s*of\s*<[^>]*>(\d+)</i);
    if (match) {
      return {
        url,
        order: parseInt(match[1], 10),
        total: parseInt(match[2], 10),
      };
    }

    // Try another pattern: text containing "X of Y"
    const textMatch = html.match(/(\d+)\s+of\s+(\d+)/);
    if (textMatch) {
      return {
        url,
        order: parseInt(textMatch[1], 10),
        total: parseInt(textMatch[2], 10),
      };
    }

    return { url, order: null, error: "No order pattern found" };
  } catch (err) {
    const error = err as Error;
    return { url, order: null, error: error.message };
  }
}

async function fetchAll() {
  const results: {
    url: string;
    order: number | null;
    total?: number;
    error?: string;
  }[] = [];
  for (let i = 0; i < allLessons.length; i += CONCURRENCY) {
    const batch = allLessons.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map((l) => fetchOrder(l.url)));
    results.push(...batchResults);
    console.log(
      `Progress: ${Math.min(i + CONCURRENCY, allLessons.length)} / ${allLessons.length}`,
    );
  }
  return results;
}

const results = await fetchAll();

// Build order map keyed by category/subsection/lesson
const orderMap = new Map<string, number>();
const errors: { url: string; error: string }[] = [];
for (const r of results) {
  if (r.order !== null) {
    orderMap.set(r.url, r.order);
  } else {
    errors.push({ url: r.url, error: r.error ?? "Unknown error" });
  }
}

console.log(`\nSuccessfully extracted orders for ${orderMap.size} URLs`);
if (errors.length > 0) {
  console.log(`Failed for ${errors.length} URLs:`);
  for (const e of errors.slice(0, 10)) {
    console.log(`  ${e.url}: ${e.error}`);
  }
  if (errors.length > 10) {
    console.log(`  ... and ${errors.length - 10} more`);
  }
}

// Enrich curriculum with order numbers and save
const enriched = curriculum.map((cat) => ({
  ...cat,
  subsections: cat.subsections.map((sub) => ({
    ...sub,
    lessons: sub.lessons.map((lesson) => ({
      ...lesson,
      order: orderMap.get(lesson.url) ?? 0,
    })),
  })),
}));

writeFileSync(
  "scripts/data-curriculum.json",
  JSON.stringify(enriched, null, 2),
);
console.log("\nSaved enriched curriculum");
