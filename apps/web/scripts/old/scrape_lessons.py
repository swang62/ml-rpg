"""Scrape lesson content from systemoverflow.com using agent-browser.

Usage:
  Automated scraping (recommended, needs JS rendering for diagrams):
    python scripts/scrape_lessons.py --agent-browser

  Single URL from agent-browser output:
    agent-browser open <URL>
    agent-browser wait --load networkidle
    agent-browser get html "main" > /tmp/lesson.html
    python scripts/scrape_lessons.py --from-file /tmp/lesson.html --slug <slug>

Output: .tsx SolidJS component with raw HTML in the JSX return.
"""

import argparse
import json
import re
import subprocess
import sys
import time
from pathlib import Path

from bs4 import BeautifulSoup, Comment

LESSONS_DIR = Path(__file__).resolve().parent.parent / "src" / ".data" / "lessons"
SITE_DATA = Path(__file__).resolve().parent.parent / "src" / ".data" / "site-data.ts"
TRACKER_PATH = LESSONS_DIR / ".scrape_progress.json"
BASE_URL = "https://www.systemoverflow.com/learn"

MAX_RETRIES = 2
DELAY_BETWEEN = 0.1


# ─── helpers ───────────────────────────────────────────────────────────────────


def slug_to_component_name(slug: str) -> str:
    return "Lesson" + "".join(p.capitalize() for p in slug.replace("-", " ").split())


def parse_lessons_from_ts(filepath: Path) -> list[dict]:
    text = filepath.read_text()
    lessons = []
    course_pat = re.compile(r'"(?P<slug>[^"]+)":\s*\{')
    cat_pat = re.compile(r'category:\s*"(?P<slug>[^"]+)"')
    sub_pat = re.compile(r'section:\s*"(?P<slug>[^"]+)"')
    les_single = re.compile(r'lesson:\s*"(?P<slug>[^"]+)"')
    les_bare = re.compile(r"\blesson:\s*$")
    slug_pat = re.compile(r'"(?P<slug>[^"]+)"')
    lines = text.split("\n")

    current_course = current_category = current_section = None
    pending = False

    for line in lines:
        stripped = line.strip()

        m = course_pat.search(stripped)
        if m and "base" not in line and "title" not in line:
            current_course = m.group("slug")
            current_category = current_section = None
            pending = False
            continue

        m = cat_pat.search(stripped)
        if m:
            current_category = m.group("slug")
            current_section = None
            pending = False
            continue

        m = sub_pat.search(stripped)
        if m:
            current_section = m.group("slug")
            pending = False
            continue

        if pending:
            slug_m = slug_pat.search(stripped)
            if slug_m and current_course and current_category and current_section:
                lessons.append(
                    {
                        "course": current_course,
                        "category": current_category,
                        "section": current_section,
                        "slug": slug_m.group("slug"),
                        "url": f"{BASE_URL}/{current_category}/{current_section}/{slug_m.group('slug')}",
                    }
                )
            pending = False
            continue

        m = les_single.search(stripped)
        if m:
            if current_course and current_category and current_section:
                lessons.append(
                    {
                        "course": current_course,
                        "category": current_category,
                        "section": current_section,
                        "slug": m.group("slug"),
                        "url": f"{BASE_URL}/{current_category}/{current_section}/{m.group('slug')}",
                    }
                )
            continue

        if les_bare.search(stripped):
            pending = True
            continue

    return lessons


# ─── extraction (works on rendered DOM) ────────────────────────────────────────


def extract_lesson_html(raw_html: str) -> str | None:
    soup = BeautifulSoup(raw_html, "html.parser")

    lesson_col = soup.find("main")
    if not lesson_col:
        lesson_col = soup.find("div", style=re.compile(r"max-width:\s*800px"))
    if not lesson_col:
        lesson_col = soup.find("div", class_=re.compile(r"app-layout__content"))
    if not lesson_col:
        return None

    inner = lesson_col.find("div", style=re.compile(r"max-width:\s*800px"))
    if inner:
        lesson_col = inner

    gate_btn = lesson_col.find("button", string=re.compile(r"Sign in to View More", re.I))
    if gate_btn:
        container = gate_btn.find_parent("div", style=re.compile(r"flex-direction"))
        if container:
            container.decompose()

    prev_btn = lesson_col.find("button", string=re.compile(r"^Previous$", re.I))
    if prev_btn:
        container = prev_btn.find_parent("div", style=re.compile(r"flex-direction"))
        if container:
            container.decompose()

    for a_tag in lesson_col.find_all("a"):
        text = a_tag.get_text(" ", strip=True)
        if "Back to" in text:
            a_tag.decompose()
            break

    pb = lesson_col.find("div", style=re.compile(r"height:\s*8px"))
    if pb:
        parent = pb.find_parent("div", class_=re.compile(r"mb-3"))
        if parent:
            parent.decompose()
        else:
            pb.decompose()

    bc = lesson_col.find("div", class_=re.compile(r"mb-3 d-flex flex-wrap"))
    if bc:
        bc.decompose()

    badges = lesson_col.find(
        "div", class_=re.compile(r"mb-3 d-flex flex-wrap gap-2 align-items-center")
    )
    if badges:
        badges.decompose()

    card = lesson_col.find("div", class_=re.compile(r"\bmb-4\b.*\bborder\b"))
    if card and card.has_attr("class"):
        keep = [
            c for c in card["class"] if c not in ("border", "border-2", "border-dark", "rounded")
        ]
        card["class"] = keep

    for el in lesson_col.find_all(True):
        if el.has_attr("class"):
            el["class"] = [re.sub(r"(Learn_\w+)__\w+", r"\1", c) for c in el["class"]]

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

            if prop in REMOVE_PROPS:
                continue

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

            pairs.append(f"{prop}: {val}")

        rebuilt = "; ".join(pairs).strip()
        if rebuilt:
            el["style"] = rebuilt
        else:
            del el["style"]

    for comment in soup.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()

    result = str(lesson_col)
    return result if result.strip() else None


# ─── .tsx generation ────────────────────────────────────────────────────────────


def html_to_tsx(raw_html: str, slug: str, section: str) -> str:
    component_name = slug_to_component_name(f"{section}-{slug}")
    cleaned = re.sub(r"\n\s*\n+", "\n", raw_html).strip()
    escaped = cleaned.replace("{", "&#123;").replace("}", "&#125;")
    return f"""import type {{ Component }} from "solid-js";

const {component_name}: Component = () => (
  <div class="lesson-content">
    {escaped}
  </div>
);
export default {component_name};
"""


# ─── agent-browser scraping ─────────────────────────────────────────────────────


def ab(args_list: list[str], timeout: int = 60) -> str:
    result = subprocess.run(
        ["agent-browser"] + args_list,
        capture_output=True,
        text=True,
        timeout=timeout,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"agent-browser {' '.join(args_list)}: {result.stderr.strip() or result.stdout.strip()}"
        )
    return result.stdout.strip()


def scrape_via_agent_browser(url: str) -> str | None:
    ab(["open", url])
    ab(["wait", "--load", "networkidle"], timeout=90)
    html = ab(["get", "html", "main"])
    return html


def scrape_lesson(lesson: dict, output_dir: Path) -> bool:
    slug = lesson["slug"]
    course = lesson["course"]
    section = lesson["section"]
    url = lesson["url"]
    output_path = output_dir / course / f"{section}__{slug}.tsx"

    if output_path.exists():
        return True

    for attempt in range(MAX_RETRIES + 1):
        try:
            raw_html = scrape_via_agent_browser(url)
            if not raw_html or not raw_html.strip():
                if attempt < MAX_RETRIES:
                    time.sleep(DELAY_BETWEEN * 2)
                    continue
                print(f"  EMPTY {slug}")
                return False

            content = extract_lesson_html(raw_html)
            if not content:
                if attempt < MAX_RETRIES:
                    time.sleep(DELAY_BETWEEN * 2)
                    continue
                print(f"  EMPTY (extract) {slug}")
                return False

            tsx = html_to_tsx(content, slug, section)
            output_path.write_text(tsx)
            print(f"  OK   {slug} ({len(tsx)} bytes)")
            return True

        except subprocess.TimeoutExpired:
            if attempt < MAX_RETRIES:
                time.sleep(DELAY_BETWEEN * 2)
                continue
            print(f"  TIMEOUT {slug}")
            return False

        except RuntimeError as e:
            if attempt < MAX_RETRIES:
                time.sleep(DELAY_BETWEEN * 2)
                continue
            print(f"  FAIL  {slug}: {e}")
            return False

    return False


def main_agent_browser(output_dir: Path, redo_failed: bool):
    output_dir.mkdir(parents=True, exist_ok=True)

    all_lessons = parse_lessons_from_ts(SITE_DATA)
    tracker = load_tracker()
    completed = set(tracker["completed"])
    failed = set(tracker["failed"])

    total = len(all_lessons)
    already = sum(
        1
        for l in all_lessons
        if (output_dir / l["course"] / f"{l['section']}__{l['slug']}.tsx").exists()
    )
    remaining = (
        total - already - sum(1 for l in all_lessons if l["slug"] in failed and not redo_failed)
    )
    print(
        f"Found {total} total, {already} files exist, {len(failed)} previously failed, ~{remaining} to scrape"
    )
    print()

    if already == total:
        print("All lessons already scraped.")
        return

    done = already
    successes = 0
    failures = 0

    for lesson in all_lessons:
        slug = lesson["slug"]
        output_path = output_dir / lesson["course"] / f"{lesson['section']}__{slug}.tsx"

        if output_path.exists():
            continue

        if slug in failed and not redo_failed:
            continue

        done += 1
        print(f"[{done}/{total}] {slug}  ({lesson['category']}/{lesson['section']})")

        if scrape_lesson(lesson, output_dir):
            successes += 1
            completed.add(slug)
            failed.discard(slug)
        else:
            failures += 1
            failed.add(slug)
            completed.discard(slug)

        tracker["completed"] = sorted(completed)
        tracker["failed"] = sorted(failed)
        save_tracker(tracker)

        if done < total:
            time.sleep(DELAY_BETWEEN)

    print(f"\nDone: {successes} new, {already} already done, {failures} failed")


# ─── tracker ────────────────────────────────────────────────────────────────────


def load_tracker() -> dict:
    if TRACKER_PATH.exists():
        return json.loads(TRACKER_PATH.read_text())
    return {"completed": [], "failed": []}


def save_tracker(tracker: dict):
    TRACKER_PATH.write_text(json.dumps(tracker, indent=2))


# ─── from-file mode ─────────────────────────────────────────────────────────────


def main_from_file(args):
    slug = args.slug
    sub = args.section
    if not slug or not sub:
        print("--slug and --section are required with --from-file")
        sys.exit(1)

    html = Path(args.from_file).read_text()
    content = extract_lesson_html(html)
    if not content:
        print(f"EMPTY: could not extract lesson content from {args.from_file}")
        sys.exit(1)

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{slug}.tsx"
    tsx = html_to_tsx(content, slug, sub)
    output_path.write_text(tsx)
    print(f"OK   {slug} ({len(tsx)} bytes) -> {output_path}")


# ─── main ──────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(
        description="Scrape lesson content from systemoverflow.com using agent-browser"
    )
    parser.add_argument("--from-file", help="Read rendered HTML from file")
    parser.add_argument("--slug", help="Lesson slug (required with --from-file)")
    parser.add_argument("--section", help="Lesson section (required with --from-file)")
    parser.add_argument("--output-dir", default=str(LESSONS_DIR))
    parser.add_argument(
        "--agent-browser",
        action="store_true",
        help="Run automated scraping loop via agent-browser",
    )
    parser.add_argument(
        "--redo-failed",
        action="store_true",
        help="Retry previously failed lessons",
    )
    args = parser.parse_args()

    if args.agent_browser:
        main_agent_browser(Path(args.output_dir), args.redo_failed)
    elif args.from_file:
        main_from_file(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
