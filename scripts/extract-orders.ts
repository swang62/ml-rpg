import { readFileSync, writeFileSync } from "node:fs";

const CONCURRENCY = 20;

// Extract URLs from site-data.ts
const siteDataContent = readFileSync("src/data/site-data.ts", "utf8");

const urlRegex = /url: "(https:\/\/www\.systemoverflow\.com[^"]+)"/g;
const urls = [...siteDataContent.matchAll(urlRegex)].map((m) => m[1]);

console.log(`Found ${urls.length} URLs to fetch`);

async function fetchOrder(url: string) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();

    // Look for pattern like: <span>6</span><span> of </span><span>6</span>
    // or just text "6 of 6"
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

async function fetchAll(urls: string[]) {
  const results = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(fetchOrder));
    results.push(...batchResults);
    console.log(
      `Progress: ${Math.min(i + CONCURRENCY, urls.length)} / ${urls.length}`,
    );
  }
  return results;
}

const results = await fetchAll(urls);

// Build order map
const orderMap = new Map();
const errors = [];
for (const r of results) {
  if (r.order !== null) {
    orderMap.set(r.url, r.order);
  } else {
    errors.push(r);
  }
}

console.log(`\nSuccessfully extracted orders for ${orderMap.size} URLs`);
if (errors.length > 0) {
  console.log(`Failed for ${errors.length} URLs:`);
  for (const e of errors) {
    console.log(`  ${e.url}: ${e.error}`);
  }
}

// Update site-data.ts: add order: N after each url line
let updated = siteDataContent;
for (const [url, order] of orderMap) {
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(url: "${escapedUrl}",)\\n`, "g");
  updated = updated.replace(
    regex,
    `url: "${url}",\n            order: ${order},\n`,
  );
}

writeFileSync("src/data/site-data.ts", updated);
console.log("\nUpdated src/data/site-data.ts with order numbers");
