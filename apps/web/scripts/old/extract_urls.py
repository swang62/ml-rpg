import json
import xml.etree.ElementTree as ET
from pathlib import Path

SITEMAP = "data/sitemap.xml"
OUTPUT_JSON = "scripts/data-curriculum.json"
SITE_DATA = "src/data/site-data.ts"
PREFIX = "https://www.systemoverflow.com/learn/data-"

ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

tree = ET.parse(SITEMAP)
root = tree.getroot()


def slug_to_title(slug: str) -> str:
    return slug.replace("-", " ").title()


# Collect all lesson URLs (4 segments) matching data- prefix
lessons = []
for url_elem in root.findall("sm:url", ns):
    loc = url_elem.find("sm:loc", ns)
    if loc is None or not loc.text:
        continue
    url = loc.text
    if not url.startswith(PREFIX):
        continue
    path = url.replace("https://www.systemoverflow.com/learn/", "")
    parts = path.split("/")
    if len(parts) == 3:
        category, section, lesson = parts
        lessons.append(
            {
                "category": category,
                "section": section,
                "lesson": lesson,
                "url": url,
            }
        )

print(f"Found {len(lessons)} lesson URLs")

# Group into hierarchy: category -> section -> lessons[]
categories = {}
for entry in lessons:
    cat = entry["category"]
    sub = entry["section"]
    if cat not in categories:
        categories[cat] = {"sections": {}}
    if sub not in categories[cat]["sections"]:
        categories[cat]["sections"][sub] = []
    categories[cat]["sections"][sub].append(entry["lesson"])

# Build full curriculum
curriculum = []
for cat_slug in sorted(categories.keys()):
    sections = []
    for sub_slug in sorted(categories[cat_slug]["sections"].keys()):
        lesson_list = categories[cat_slug]["sections"][sub_slug]
        lessons_out = []
        for i, lesson_slug in enumerate(lesson_list):
            lessons_out.append(
                {
                    "lesson": lesson_slug,
                    "title": slug_to_title(lesson_slug),
                    "order": 0,
                    "url": f"https://www.systemoverflow.com/learn/{cat_slug}/{sub_slug}/{lesson_slug}",
                }
            )
        sections.append(
            {
                "section": sub_slug,
                "title": slug_to_title(sub_slug),
                "lessons": lessons_out,
            }
        )
    curriculum.append(
        {
            "category": cat_slug,
            "title": slug_to_title(cat_slug),
            "sections": sections,
        }
    )

# Save JSON
with open(OUTPUT_JSON, "w") as f:
    json.dump(curriculum, f, indent=2)
print(f"Saved curriculum to {OUTPUT_JSON}")

# Generate TypeScript for the new course
ts_lines = []
ts_lines.append('  "data-engineering": {')
ts_lines.append('    base: "/data-engineering",')
ts_lines.append('    title: "Data Engineering",')
ts_lines.append("    getCategoryPath: (category: string) => `/data-engineering/${category}`,")
ts_lines.append("    getSectionPath: (category: string, section: string) =>")
ts_lines.append("      `/data-engineering/${category}/${section}`,")
ts_lines.append("    categories: [")

for cat in curriculum:
    ts_lines.append("      {")
    ts_lines.append(f'        category: "{cat["category"]}",')
    ts_lines.append(f'        title: "{cat["title"]}",')
    ts_lines.append("        sections: [")
    for sub in cat["sections"]:
        ts_lines.append("          {")
        ts_lines.append(f'            section: "{sub["section"]}",')
        ts_lines.append(f'            title: "{sub["title"]}",')
        ts_lines.append("            lessons: [")
        for lesson in sub["lessons"]:
            ts_lines.append("              {")
            ts_lines.append(f'                lesson: "{lesson["lesson"]}",')
            ts_lines.append(f'                title: "{lesson["title"]}",')
            ts_lines.append(f'                order: {lesson["order"]},')
            ts_lines.append("              },")
        ts_lines.append("            ],")
        ts_lines.append("          },")
    ts_lines.append("        ],")
    ts_lines.append("      },")

ts_lines.append("    ],")
ts_lines.append("  },")

generated_ts = "\n".join(ts_lines)

# Insert into site-data.ts before the closing line of COURSES
site_data_path = Path(SITE_DATA)
content = site_data_path.read_text()

lines = content.split("\n")
# Find the closing line: "} as const;" at end of COURSES
for i in range(len(lines) - 1, -1, -1):
    stripped = lines[i].strip()
    if stripped == "} as const;":
        lines.insert(i, generated_ts)
        content = "\n".join(lines)
        break

site_data_path.write_text(content)
print(f"Updated {SITE_DATA} with Data Engineering course")
