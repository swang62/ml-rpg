"""Build the LanceDB RAG index from local SQLite course content.

Port of the frontend buildVectorDB / embedLessonGroups / getReadmeLessonGroup
logic in src/server/search.ts into Python, with one change: content is read
from a replicated local SQLite DB instead of the frontend's runtime DB.
"""

import hashlib
import json
import logging
import os
import re
import sqlite3
import tempfile
import time
from pathlib import Path
from typing import Any

import lancedb

from ..config import (
    CONTENT_DB_PATH,
    EMBEDDING_DIM,
    FASTEMBED_BATCH_SIZE,
    LANCEDB_PATH,
    RAG_CHUNK_OVERLAP,
    RAG_CHUNK_SIZE,
    STOP_WORDS,
)
from ..retrieval.embedding import _embed_batch

logger = logging.getLogger("rag_api")

CHUNKS_TABLE_NAME = "chunks"

_rag_api_dir = Path(__file__).parent.parent
README_PATH = _rag_api_dir.parent / "README.md"


# ---------------------------------------------------------------------------
# Recursive text splitting with overlap (port of LangChain's RecursiveCharacterTextSplitter)
# ---------------------------------------------------------------------------


def _split_text(text: str, chunk_size: int, chunk_overlap: int) -> list[str]:
    """Recursive character text splitting, matching LangChain's behavior.

    Splits on double-newline first, then single newline, then sentences,
    then chunks of chunk_size characters.
    """
    if not text:
        return []

    separators = ["\n\n", "\n", ". ", " ", ""]

    def _split(text: str, seps: list[str]) -> list[str]:
        if not text:
            return []
        if not seps:
            return [text]

        separator = seps[0]
        if separator == "":
            # Character-level split with overlap
            result: list[str] = []
            i = 0
            step = chunk_size - chunk_overlap if chunk_overlap > 0 else chunk_size
            while i < len(text):
                result.append(text[i : i + chunk_size])
                i += step
            return result

        chunks: list[str] = []
        start = 0
        while start < len(text):
            end = start + chunk_size
            if end >= len(text):
                chunk = text[start:]
                if chunk.strip():
                    chunks.append(chunk)
                break

            # Find the best split point within [start, end]
            split_at = end
            for sep in [s for s in seps if s]:
                idx = text.rfind(sep, start, end)
                if idx != -1 and idx > start:
                    split_at = idx + len(sep)
                    break

            chunk = text[start:split_at]
            if chunk.strip():
                chunks.append(chunk)

            overlap_start = max(start, split_at - chunk_overlap)
            if overlap_start <= start:
                overlap_start = split_at
            start = overlap_start

        return chunks

    return _split(text, separators)


# ---------------------------------------------------------------------------
# Tag enrichment
# ---------------------------------------------------------------------------

_STOP_WORDS_LOWER = {w.lower() for w in STOP_WORDS}


def _extract_word_tokens(text: str) -> list[str]:
    matches = re.findall(r"\b[a-z]{5,}\b", text.lower())
    return list(dict.fromkeys(matches))


def _parse_tags(keywords_json: str) -> list[str]:
    try:
        return json.loads(keywords_json)
    except (json.JSONDecodeError, TypeError):
        return []


def _enrich_tags(
    keywords_json: str, category_title: str, section_title: str
) -> list[str]:
    tags = _parse_tags(keywords_json)
    for token in _extract_word_tokens(f"{category_title} {section_title}"):
        if token not in _STOP_WORDS_LOWER and token not in tags:
            tags.append(token)
    return tags


# ---------------------------------------------------------------------------
# Build index
# ---------------------------------------------------------------------------


def _load_lessons_from_db() -> list[dict[str, Any]]:
    """Load all lessons with joined course/category/section info from local SQLite."""
    db_path = Path(CONTENT_DB_PATH)
    if not db_path.exists():
        raise FileNotFoundError(f"Content DB not found at {CONTENT_DB_PATH}")

    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT id, slug, title FROM course")
    courses = {row["id"]: dict(row) for row in cursor.fetchall()}

    cursor.execute(
        "SELECT id, slug, title, course_id AS courseid FROM category"
    )
    categories = {row["id"]: dict(row) for row in cursor.fetchall()}

    cursor.execute(
        "SELECT id, slug, title, course_id AS courseid, "
        "category_id AS categoryid FROM section"
    )
    sections = {row["id"]: dict(row) for row in cursor.fetchall()}

    cursor.execute(
        "SELECT slug, title, lesson_highlights, keywords, section_id AS sectionid, "
        "category_id AS categoryid, course_id AS courseid "
        "FROM lesson WHERE lesson_highlights != ''"
    )
    lessons_raw = [dict(row) for row in cursor.fetchall()]
    conn.close()

    lesson_groups: list[dict[str, Any]] = []
    for lesson in lessons_raw:
        course = courses.get(lesson["courseid"])
        category = categories.get(lesson["categoryid"])
        section = sections.get(lesson["sectionid"])

        if not course or not category or not section:
            continue

        plain_text = lesson["lesson_highlights"]
        if not plain_text:
            continue

        lesson_url = (
            f"/{course['slug']}/{category['slug']}/"
            f"{section['slug']}/{lesson['slug']}"
        )
        chunks = _split_text(plain_text, RAG_CHUNK_SIZE, RAG_CHUNK_OVERLAP)
        if not chunks:
            continue

        tags = _enrich_tags(
            lesson.get("keywords", "[]"), category["title"], section["title"]
        )

        lesson_groups.append(
            {
                "lessonTitle": lesson["title"],
                "lessonUrl": lesson_url,
                "categoryTitle": category["title"],
                "sectionTitle": section["title"],
                "courseTitle": course["title"],
                "courseSlug": course["slug"],
                "categorySlug": category["slug"],
                "sectionSlug": section["slug"],
                "lessonSlug": lesson["slug"],
                "texts": chunks,
                "tags": tags,
            }
        )

    logger.info("Loaded %d lesson groups from %s", len(lesson_groups), CONTENT_DB_PATH)
    return lesson_groups


def _compute_content_hash(lesson_groups: list[dict]) -> str:
    """Compute a hash of the content for version tracking."""
    h = hashlib.sha256()
    for group in sorted(lesson_groups, key=lambda g: g.get("lessonUrl", "")):
        for chunk_text in sorted(group["texts"]):
            h.update(chunk_text.encode("utf-8"))
    return h.hexdigest()[:16]


def _compute_db_content_hash() -> str:
    """Return a hash of lesson content (slug + html), not raw file bytes.
    
    SQLite file bytes change on each write due to internal timestamps,
    even with identical data. Hashing the content itself is stable.
    """
    import sqlite3
    
    db_path = Path(CONTENT_DB_PATH)
    if not db_path.exists():
        raise FileNotFoundError(f"Content DB not found at {CONTENT_DB_PATH}")
    conn = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
    rows = conn.execute(
        "SELECT slug, html FROM lesson ORDER BY slug"
    ).fetchall()
    h = hashlib.sha256()
    for slug, html in rows:
        h.update(slug.encode("utf-8"))
        h.update(html.encode("utf-8"))
    conn.close()
    return h.hexdigest()[:16]


def _get_readme_lesson_group() -> dict[str, Any] | None:
    """Read the local README.md and return a lesson group, or None if unavailable."""
    if not README_PATH.exists():
        logger.warning("README not found at %s — skipping", README_PATH)
        return None
    try:
        text = README_PATH.read_text(encoding="utf-8")
        if not text.strip():
            return None
        chunks = _split_text(text, RAG_CHUNK_SIZE, RAG_CHUNK_OVERLAP)
        if not chunks:
            return None
        return {
            "lessonTitle": "Site Information",
            "lessonUrl": "https://github.com/swang62/ml-rpg",
            "categoryTitle": "About",
            "sectionTitle": "README",
            "courseTitle": "Machine Learning (the RPG)",
            "courseSlug": "ml-rpg",
            "categorySlug": "about",
            "sectionSlug": "readme",
            "lessonSlug": "site-information",
            "texts": chunks,
            "tags": [],
        }
    except OSError:
        logger.warning("Could not read README at %s — skipping", README_PATH)
        return None


def build_index() -> tuple[int, str]:
    """Build the full LanceDB index from local content.

    Returns (row_count, db_file_hash).

    Raises RuntimeError on failure.
    """
    logger.info("Building LanceDB index from local content...")
    start = time.monotonic()

    # 1. Load lessons
    lesson_groups = _load_lessons_from_db()

    if not lesson_groups:
        raise RuntimeError("No content to index")

    # 1b. Append README as an extra lesson group
    readme_group = _get_readme_lesson_group()
    if readme_group:
        lesson_groups.append(readme_group)
        logger.info("Added README lesson group (%d chunks)", len(readme_group["texts"]))

    total_chunks = sum(len(g["texts"]) for g in lesson_groups)
    logger.info("Loaded %d lesson groups, %d total chunks", len(lesson_groups), total_chunks)

    # 2. Compute content hash BEFORE embedding (cheap change detector)
    db_hash = _compute_db_content_hash()

    # 3. Collect all texts for batched embedding
    all_texts: list[str] = []
    text_metadata: list[dict[str, Any]] = []
    for group in lesson_groups:
        for ci, chunk_text in enumerate(group["texts"]):
            all_texts.append(chunk_text)
            text_metadata.append(
                {
                    "group": group,
                    "chunk_idx": ci,
                }
            )

    # 4. Embed in batches
    logger.info("Generating embeddings via FastEmbed (%d texts)...", len(all_texts))
    all_embeddings: list[list[float]] = []
    for batch_start in range(0, len(all_texts), FASTEMBED_BATCH_SIZE):
        batch = all_texts[batch_start : batch_start + FASTEMBED_BATCH_SIZE]
        embeddings = _embed_batch(batch)
        all_embeddings.extend(embeddings)
        logger.debug("  embedded %d/%d chunks", len(all_embeddings), len(all_texts))

    if len(all_embeddings) != len(all_texts):
        raise RuntimeError(
            f"Embedding count mismatch: {len(all_embeddings)} embeddings for "
            f"{len(all_texts)} texts"
        )

    # 5. Validate vector dimension
    for emb in all_embeddings:
        if len(emb) != EMBEDDING_DIM:
            raise RuntimeError(
                f"Vector dimension mismatch: expected {EMBEDDING_DIM}, got {len(emb)}"
            )

    # 6. Build table data
    table_data: list[dict[str, Any]] = []
    for meta, vector in zip(text_metadata, all_embeddings):
        group = meta["group"]
        ci = meta["chunk_idx"]
        table_data.append(
            {
                "id": (
                    f"{group['courseSlug']}/{group['categorySlug']}/"
                    f"{group['sectionSlug']}/{group['lessonSlug']}-chunk-{ci}"
                ),
                "vector": vector,
                "text": group["texts"][ci],
                "lessonTitle": group["lessonTitle"],
                "lessonUrl": group["lessonUrl"],
                "categoryTitle": group["categoryTitle"],
                "sectionTitle": group["sectionTitle"],
                "courseTitle": group["courseTitle"],
                "chunkIndex": ci,
                "tags": group["tags"],
            }
        )

    # 7. Write to a temporary path and then swap atomically
    lancedb_dir = Path(LANCEDB_PATH)
    lancedb_dir.mkdir(parents=True, exist_ok=True)

    tmp_dir = Path(tempfile.mkdtemp(dir=str(lancedb_dir), prefix=".build_"))
    try:
        tmp_db = lancedb.connect(str(tmp_dir))
        table = tmp_db.create_table(CHUNKS_TABLE_NAME, table_data)

        # Create FTS indexes
        logger.info("Creating FTS index on text...")
        table.create_fts_index("text", replace=True)

        logger.info("Creating FTS index on lessonTitle...")
        table.create_fts_index("lessonTitle", replace=True)

        row_count = table.count_rows()
        logger.info("Index built: %d rows in %s", row_count, tmp_dir)

        # 7b. Write index metadata (DB file hash + embedding dim)
        meta_path = tmp_dir / ".index_meta"
        meta_path.write_text(f"{db_hash}\n", encoding="utf-8")

        # 8. Atomic swap: move new table artifacts into place
        fragments_dst = lancedb_dir / f"{CHUNKS_TABLE_NAME}.lance"
        _remove_path(fragments_dst)

        new_fragments = tmp_dir / f"{CHUNKS_TABLE_NAME}.lance"
        if new_fragments.exists():
            _move_path(new_fragments, fragments_dst)

        # Copy any data files LanceDB created in tmp_dir
        for f in tmp_dir.iterdir():
            if f.suffix in (".data", ".wal", ".manifest") or f.name == "db.lace":
                _move_path(f, lancedb_dir / f.name)

        # Move metadata file
        dst_meta = lancedb_dir / ".index_meta"
        _remove_path(dst_meta)
        meta_path.rename(dst_meta)

        _remove_path(tmp_dir)

        elapsed = time.monotonic() - start
        logger.info(
            "Index build complete: %d rows in %.1fs (hash: %s)",
            row_count,
            elapsed,
            db_hash,
        )

        return row_count, db_hash

    except Exception:
        if tmp_dir.exists():
            _remove_path(tmp_dir)
        raise


def _remove_path(path: Path) -> None:
    """Remove a file or directory tree."""
    import shutil

    if not path.exists():
        return
    if path.is_dir():
        shutil.rmtree(path, ignore_errors=True)
    else:
        path.unlink(missing_ok=True)


def _move_path(src: Path, dst: Path) -> None:
    """Move src to dst, removing dst first if it exists."""
    if dst.exists():
        _remove_path(dst)
    src.rename(dst)
