import fs from "node:fs";
import path from "node:path";

const filePath = path.join(process.cwd(), "src", "data", "site-data.ts");
let content = fs.readFileSync(filePath, "utf-8");

// 1. Remove `url: string;` from Article interface
content = content.replace(
  /export interface Article \{\n {2}slug: string;\n {2}title: string;\n {2}url: string;\n {2}order: number;\n\}/,
  `export interface Article {
  slug: string;
  title: string;
  order: number;
}`,
);

// 2. Add BASE_URL and helper after the interfaces, before siteData
const helper = `
export const BASE_URL = "https://www.systemoverflow.com/learn";

export function buildArticleUrl(
  groupSlug: string,
  subsectionSlug: string,
  articleSlug: string,
): string {
  return \`\${BASE_URL}/\${groupSlug}/\${subsectionSlug}/\${articleSlug}\`;
}
`;

content = content.replace(
  /export const siteData: Group\[\] = \[/,
  `${helper}\nexport const siteData: Group[] = [`,
);

// 3. Remove all lines matching `url: "...",` inside article objects
// Match lines that are indented with url property
content = content.replace(
  /\n {12}url: "https:\/\/www\.systemoverflow\.com\/learn\/[^"]+",/g,
  "",
);

fs.writeFileSync(filePath, content);
console.log("Updated site-data.ts");
