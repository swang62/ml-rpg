"""Ensure the LanceDB index exists and is current.

Called at startup. Rebuilds only when:
- The index table is missing or empty, OR
- The replicated content DB file changed (detected via file hash).
"""

import hashlib
import logging
from pathlib import Path

import lancedb

from ..config import CONTENT_DB_PATH, LANCEDB_PATH
from .build_index import CHUNKS_TABLE_NAME, build_index

logger = logging.getLogger("rag_api")


def _read_stored_hash() -> str | None:
    """Read the stored DB file hash from .index_meta."""
    meta_path = Path(LANCEDB_PATH) / ".index_meta"
    if not meta_path.exists():
        return None
    try:
        return meta_path.read_text(encoding="utf-8").strip().split("\n")[0].strip()
    except (OSError, IndexError, ValueError):
        return None


def _compute_db_file_hash() -> str | None:
    """Return a short hash of the content DB file to detect changes."""
    db_path = Path(CONTENT_DB_PATH)
    if not db_path.exists():
        return None
    try:
        return hashlib.sha256(db_path.read_bytes()).hexdigest()[:16]
    except OSError:
        return None


def _has_valid_table() -> bool:
    """Check if the chunks table exists and has rows."""
    try:
        db = lancedb.connect(LANCEDB_PATH)
        table_names = db.table_names()
        if CHUNKS_TABLE_NAME not in table_names:
            logger.info("No '%s' table found in LanceDB", CHUNKS_TABLE_NAME)
            return False
        table = db.open_table(CHUNKS_TABLE_NAME)
        count = table.count_rows()
        if count == 0:
            logger.warning("'%s' table exists but is empty", CHUNKS_TABLE_NAME)
            return False
        return True
    except Exception as exc:
        logger.warning("Failed to open existing LanceDB table: %s", exc)
        return False


def ensure_index() -> bool:
    """Ensure the RAG index exists and is current.

    Rebuilds only if the index is missing/empty or the content DB file hash changed.

    Returns True if a valid index is available after the check/rebuild.
    """
    stored_hash = _read_stored_hash()
    has_table = _has_valid_table()

    # Fast path: index exists and DB file hasn't changed — no rebuild needed
    if has_table and stored_hash is not None:
        current_db_hash = _compute_db_file_hash()
        if current_db_hash is not None and current_db_hash == stored_hash:
            logger.info(
                "RAG index is current (hash: %s) — skipping rebuild",
                stored_hash,
            )
            return True

        if current_db_hash is None:
            logger.warning("Content DB missing — cannot verify, rebuilding")
        else:
            logger.info(
                "Content DB changed (hash: %s -> %s) — rebuilding index",
                stored_hash,
                current_db_hash,
            )
    elif not has_table:
        logger.info("No index table found — building for the first time...")
    else:
        logger.info("Stored metadata missing — rebuilding index")

    # Rebuild — deletes/recreates the index
    try:
        row_count, new_hash = build_index()
        logger.info("Index rebuild complete: %d rows (hash: %s)", row_count, new_hash)
        return True
    except Exception:
        logger.exception("Index build failed")
        if has_table:
            logger.warning(
                "Index rebuild failed — preserving previous valid index"
            )
            return True
        logger.error(
            "No valid index available — RAG retrieval will be unavailable"
        )
        return False
