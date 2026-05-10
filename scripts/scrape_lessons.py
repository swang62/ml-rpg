"""Scrape lesson content from systemoverflow.com.

Usage:
  Single URL via agent-browser (recommended):
    agent-browser open <URL>
    agent-browser wait --load networkidle
    agent-browser get html "main" > /tmp/lesson.html
    python scripts/scrape_lessons.py --from-file /tmp/lesson.html --slug <slug>

  Batch via httpx (no JS, may miss diagrams):
    python scripts/scrape_lessons.py [--batch N] [--rate N] [--cookies FILE]

Output: .tsx SolidJS component with raw HTML in the JSX return.
"""

import argparse
import asyncio
import json
import re
import sys
from pathlib import Path

import httpx
from bs4 import BeautifulSoup, Comment

LESSONS_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "lessons"
SITE_DATA = Path(__file__).resolve().parent.parent / "src" / "data" / "site-data.ts"
BASE_URL = "https://www.systemoverflow.com/learn"


# ─── helpers ───────────────────────────────────────────────────────────────────


def slug_to_component_name(slug: str) -> str:
    return "Lesson" + "".join(p.capitalize() for p in slug.replace("-", " ").split())


def parse_lessons_from_ts(filepath: Path) -> list[dict]:
    text = filepath.read_text()
    lessons = []
    course_pat = re.compile(r'"(?P<slug>[^"]+)":\s*\{')
    cat_pat = re.compile(r'category:\s*"(?P<slug>[^"]+)"')
    sub_pat = re.compile(r'subsection:\s*"(?P<slug>[^"]+)"')
    les_pat = re.compile(r'lesson:\s*"(?P<slug>[^"]+)"')
    lines = text.split("\n")

    current_course = current_category = current_subsection = None
    for line in lines:
        line = line.strip()
        m = course_pat.search(line)
        if m and "base" not in line and "title" not in line:
            current_course = m.group("slug")
            current_category = current_subsection = None
            continue
        m = cat_pat.search(line)
        if m:
            current_category = m.group("slug")
            current_subsection = None
            continue
        m = sub_pat.search(line)
        if m:
            current_subsection = m.group("slug")
            continue
        m = les_pat.search(line)
        if m and current_course and current_category and current_subsection:
            slug = m.group("slug")
            lessons.append(
                {
                    "course": current_course,
                    "category": current_category,
                    "subsection": current_subsection,
                    "slug": slug,
                    "url": f"{BASE_URL}/{current_category}/{current_subsection}/{slug}",
                }
            )
    return lessons


# ─── extraction (works on rendered DOM) ────────────────────────────────────────


def extract_lesson_html(raw_html: str) -> str | None:
    """Extract clean lesson HTML from a rendered page.

    Takes everything from <main>, only removes:
      - Sign-in gate button + its container
      - "Previous" button + its container
      - "← Back to ..." link
      - HTML comments
      - Sidebar / nav elements
    """
    soup = BeautifulSoup(raw_html, "html.parser")

    lesson_col = soup.find("main")
    if not lesson_col:
        # Fallback: content may not have <main> wrapper
        # (agent-browser get html "main" returns inner HTML)
        lesson_col = soup.find("div", style=re.compile(r"max-width:\s*800px"))
    if not lesson_col:
        lesson_col = soup.find("div", class_=re.compile(r"app-layout__content"))
    if not lesson_col:
        return None

    # Navigate deeper to find the actual lesson content column
    inner = lesson_col.find("div", style=re.compile(r"max-width:\s*800px"))
    if inner:
        lesson_col = inner

    # Remove sign-in gate
    gate_btn = lesson_col.find(
        "button", string=re.compile(r"Sign in to View More", re.I)
    )
    if gate_btn:
        container = gate_btn.find_parent("div", style=re.compile(r"flex-direction"))
        if container:
            container.decompose()

    # Remove "Previous" button
    prev_btn = lesson_col.find("button", string=re.compile(r"^Previous$", re.I))
    if prev_btn:
        container = prev_btn.find_parent("div", style=re.compile(r"flex-direction"))
        if container:
            container.decompose()

    # Remove "← Back to ..." link
    for a_tag in lesson_col.find_all("a"):
        text = a_tag.get_text(" ", strip=True)
        if "Back to" in text:
            a_tag.decompose()
            break

    # Remove progress bar
    pb = lesson_col.find("div", style=re.compile(r"height:\s*8px"))
    if pb:
        parent = pb.find_parent("div", class_=re.compile(r"mb-3"))
        if parent:
            parent.decompose()
        else:
            pb.decompose()

    # Remove breadcrumb row
    bc = lesson_col.find("div", class_=re.compile(r"mb-3 d-flex flex-wrap"))
    if bc:
        bc.decompose()

    # Remove topic/difficulty/time badges row
    badges = lesson_col.find(
        "div",
        class_=re.compile(r"mb-3 d-flex flex-wrap gap-2 align-items-center"),
    )
    if badges:
        badges.decompose()

    # Remove Bootstrap border classes from the main card wrapper div.
    # This prevents a visible border artifact on our dark theme.
    card = lesson_col.find(
        "div",
        class_=re.compile(r"\bmb-4\b.*\bborder\b"),
    )
    if card and card.has_attr("class"):
        keep = [
            c
            for c in card["class"]
            if c not in ("border", "border-2", "border-dark", "rounded")
        ]
        card["class"] = keep

    # Strip hashed suffixes from CSS module classes
    # e.g. "Learn_keyTakeaways__D57eJ" -> "Learn_keyTakeaways"
    for el in lesson_col.find_all(True):  # True = all elements
        if el.has_attr("class"):
            el["class"] = [re.sub(r"(Learn_\w+)__\w+", r"\1", c) for c in el["class"]]

    # Normalize inline styles for our dark theme.
    # Parses each style as proper property:value pairs to avoid malformed CSS.
    REMOVE_PROPS = {
        "background",
        "background-color",
        "background-image",
        "box-shadow",
        "color",
        "border-color",
    }
    for el in lesson_col.find_all(True, style=True):
        raw = el["style"]
        pairs = []
        for part in raw.split(";"):
            part = part.strip()
            if not part or ":" not in part:
                continue
            prop, _, val = part.partition(":")
            prop = prop.strip().lower()
            val = val.strip()

            # Remove unwanted properties entirely
            if prop in REMOVE_PROPS:
                continue

            # Strip color token from border shorthand values
            # e.g. "2px solid #000" -> "2px solid"
            # e.g. "2px solid var(--x)" -> "2px solid"
            if prop in (
                "border",
                "border-left",
                "border-right",
                "border-top",
                "border-bottom",
            ):
                val = re.sub(
                    r"\s+(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b|var\([^)]+\)|[a-zA-Z]+)$",
                    "",
                    val,
                ).strip()
                if val:
                    pairs.append(f"{prop}: {val}")
                continue

            # Keep everything else as-is
            pairs.append(f"{prop}: {val}")

        rebuilt = "; ".join(pairs).strip()
        if rebuilt:
            el["style"] = rebuilt
        else:
            del el["style"]

    # Remove all HTML comments
    for comment in soup.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()

    result = str(lesson_col)
    return result if result.strip() else None


# ─── .tsx generation ────────────────────────────────────────────────────────────


def html_to_tsx(raw_html: str, slug: str) -> str:
    """Wrap cleaned HTML in a .tsx component with raw HTML in JSX return."""
    component_name = slug_to_component_name(slug)
    cleaned = re.sub(r"\n\s*\n+", "\n", raw_html).strip()

    return f"""import type {{ Component }} from "solid-js";

const {component_name}: Component = () => (
  <div class="lesson-content">
    {cleaned}
  </div>
);
export default {component_name};
"""


# ─── batch scraping (httpx) ───────────────────────────────────────────────────


async def scrape_lesson_httpx(client, lesson, output_dir) -> bool:
    output_path = output_dir / f"{lesson['slug']}.tsx"
    if output_path.exists():
        return True
    try:
        resp = await client.get(lesson["url"], follow_redirects=True, timeout=60)
        resp.raise_for_status()
    except Exception as e:
        print(f"  FAIL {lesson['slug']}: {e}")
        return False

    content = extract_lesson_html(resp.text)
    if not content:
        print(f"  EMPTY {lesson['slug']}")
        return False

    tsx = html_to_tsx(content, lesson["slug"])
    output_path.write_text(tsx)
    print(f"  OK   {lesson['slug']} ({len(tsx)} bytes)")
    return True


async def main_httpx(args):
    if not httpx:
        print("httpx not installed. Run: pip install httpx")
        sys.exit(1)

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    all_lessons = parse_lessons_from_ts(SITE_DATA)
    lessons = all_lessons[: args.batch] if args.batch > 0 else all_lessons
    print(f"Found {len(all_lessons)} total, scraping {len(lessons)} this run")
    print("NOTE: httpx skips JS-rendered content (diagrams, extras).")
    print("      Use agent-browser for full content: see --help")

    cookies = None
    if args.cookies:
        cookies = json.loads(Path(args.cookies).read_text())

    rate = args.rate
    semaphore = asyncio.Semaphore(rate)

    async def rate_limited(client, lesson):
        async with semaphore:
            result = await scrape_lesson_httpx(client, lesson, output_dir)
            await asyncio.sleep(1.0 / rate)
            return result

    async with httpx.AsyncClient(
        cookies={c["name"]: c["value"] for c in cookies} if cookies else None,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/131.0.0.0 Safari/537.36"
            ),
        },
    ) as client:
        tasks = [rate_limited(client, lesson) for lesson in lessons]
        results = await asyncio.gather(*tasks)

    success = sum(1 for r in results if r)
    print(f"\nDone: {success}/{len(lessons)} lessons -> {output_dir}")


# ─── from-file mode (for agent-browser output) ────────────────────────────────


def main_from_file(args):
    slug = args.slug
    if not slug:
        print("--slug is required with --from-file")
        sys.exit(1)

    html = Path(args.from_file).read_text()
    content = extract_lesson_html(html)
    if not content:
        print(f"EMPTY: could not extract lesson content from {args.from_file}")
        sys.exit(1)

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{slug}.tsx"
    tsx = html_to_tsx(content, slug)
    output_path.write_text(tsx)
    print(f"OK   {slug} ({len(tsx)} bytes) -> {output_path}")


# ─── CSS fetching ────────────────────────────────────────────────────────────────


CSS_DIR = Path(__file__).resolve().parent.parent / "src" / "components"
CSS_FILES = [
    "/_next/static/css/b804ca877387b40b.css",
    "/_next/static/css/20c3739ef53daf7c.css",
    "/_next/static/css/fc1de445cd522fc9.css",
]


def fetch_and_save_css(output_path: Path):
    """Download CSS files from systemoverflow.com and concatenate them."""
    print("Fetching lesson CSS from systemoverflow.com...")
    combined = []
    for path in CSS_FILES:
        url = f"https://www.systemoverflow.com{path}"
        try:
            resp = httpx.get(url, timeout=30, follow_redirects=True)
            resp.raise_for_status()
            combined.append(resp.text)
            print(f"  OK   {path} ({len(resp.text)} bytes)")
        except Exception as e:
            print(f"  FAIL {path}: {e}")
            return False

    css = re.sub(r'@charset\s+"[^"]*";', "", "\n".join(combined))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(css)
    print(f"Saved lesson CSS ({len(css)} bytes) to {output_path}")
    return True


# ─── main ──────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(
        description="Scrape lesson content from systemoverflow.com"
    )
    parser.add_argument(
        "--from-file", help="Read rendered HTML from file (use with agent-browser)"
    )
    parser.add_argument("--slug", help="Lesson slug (required with --from-file)")
    parser.add_argument("--output-dir", default=str(LESSONS_DIR))
    parser.add_argument("--rate", type=int, default=10)
    parser.add_argument("--batch", type=int, default=0)
    parser.add_argument("--cookies")
    parser.add_argument(
        "--fetch-css", action="store_true", help="Download and save lesson CSS"
    )
    parser.add_argument(
        "--css-output",
        default=str(CSS_DIR / "lesson-content.css"),
        help="CSS output path",
    )
    args = parser.parse_args()

    if args.fetch_css:
        fetch_and_save_css(Path(args.css_output))

    if args.from_file:
        main_from_file(args)
    else:
        asyncio.run(main_httpx(args))


if __name__ == "__main__":
    main()
