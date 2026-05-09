import json
import re
from pathlib import Path

ORDERS_JSON = "scripts/data-curriculum-with-orders.json"
SITE_DATA = "src/data/site-data.ts"

with open(ORDERS_JSON) as f:
    curriculum = json.load(f)

order_lookup = {}
for cat in curriculum:
    for sub in cat["subsections"]:
        for lesson in sub["lessons"]:
            order_lookup[lesson["lesson"]] = lesson["order"]

print(f"Loaded {len(order_lookup)} lesson orders")

content = Path(SITE_DATA).read_text()

# Find data-engineering section boundaries
de_start = content.index('"data-engineering"')
de_end = content.index("} as const;", de_start)

# Split into: before DE section, DE section, after DE section
before = content[:de_start]
de_section = content[de_start:de_end]
after = content[de_end:]

# Process DE section line by line, tracking lesson slugs
lines = de_section.split("\n")
current_lesson = None
updated_count = 0

for i, line in enumerate(lines):
    stripped = line.strip()

    # Check if this line has a lesson slug (single-line or multi-line start)
    lesson_match = re.search(r'lesson:\s*"([^"]+)"', stripped)
    if lesson_match:
        current_lesson = lesson_match.group(1)
        continue

    # Check if this is a continuation of multi-line lesson (lessons are on next line)
    if stripped == "lesson:" and current_lesson is None:
        # The slug should be on the next line
        if i + 1 < len(lines):
            next_match = re.search(r'"([^"]+)"', lines[i + 1])
            if next_match:
                current_lesson = next_match.group(1)
        continue

    # If we hit a line with just the slug (continuation of lesson:)
    if current_lesson is None:
        quote_match = re.search(r'"([^"]+)"', stripped)
        if quote_match:
            prev_line = lines[i - 1].strip() if i > 0 else ""
            if prev_line == "lesson:" or prev_line.rstrip(",") == "lesson":
                current_lesson = quote_match.group(1)

    # Replace order: 0 with actual order
    if "order: 0," in stripped and current_lesson and current_lesson in order_lookup:
        indent = line[: len(line) - len(line.lstrip())]
        lines[i] = f"{indent}order: {order_lookup[current_lesson]},"
        updated_count += 1
        current_lesson = None  # Reset after use

# Reassemble
de_section = "\n".join(lines)
content = before + de_section + after
Path(SITE_DATA).write_text(content)
print(f"Updated {updated_count} order values in {SITE_DATA}")
