import os
from pathlib import Path

from dotenv import load_dotenv

_dotenv_path = Path(__file__).parent.parent / ".env"
if _dotenv_path.exists():
    load_dotenv(_dotenv_path)

_raw_lancedb_path = os.environ.get("LANCEDB_PATH", ".data/search")
_lancedb_p = Path(_raw_lancedb_path)
if not _lancedb_p.is_absolute():
    _lancedb_p = Path(__file__).parent.parent / _raw_lancedb_path

LANCEDB_PATH: str = str(_lancedb_p.resolve())
LOG_LEVEL: str = os.environ.get("LOG_LEVEL", "INFO").upper()
IDLE_TIMEOUT: int = int(os.environ.get("IDLE_TIMEOUT", "300"))

FASTEMBED_MODEL_NAME = "BAAI/bge-small-en-v1.5"
FASTEMBED_BATCH_SIZE = 256
FASTEMBED_MAX_LENGTH = 512
EMBEDDING_DIM = 384
GITHUB_REPO_URL = "https://github.com/swang62/ml-rpg"

MIN_RAG_SCORE = 0.02
INITIAL_RAG_CHUNKS = 10
TOP_K_CHUNKS = 3
MIN_TEXT_SIZE = 3
MAX_TEXT_SIZE = 1000

# Chunking
RAG_CHUNK_SIZE = 512
RAG_CHUNK_OVERLAP = 0
RAG_BATCH_SIZE = 256

# Replicated local course content (used instead of D1 or frontend runtime DB)
_rag_api_dir = Path(__file__).parent
CONTENT_DB_PATH: str = str(_rag_api_dir / "data" / "lessons.db")
# STOP_WORDS set ported from src/utils/constants.ts
STOP_WORDS: set[str] = {
    "a", "an", "the", "and", "or", "but", "nor", "not", "if", "so",
    "in", "on", "at", "to", "for", "of", "by", "with", "up", "as",
    "is", "are", "was", "were", "be", "been", "being", "have", "has",
    "had", "do", "does", "did", "will", "would", "can", "could",
    "shall", "should", "may", "might", "must", "this", "that", "these",
    "those", "it", "its", "they", "them", "their", "we", "us", "our",
    "you", "your", "he", "she", "him", "her", "his", "my", "me",
    "no", "nor", "also", "than", "all", "any", "each", "few", "some",
    "every", "about", "above", "after", "again", "before", "between",
    "both", "because", "into", "more", "most", "much", "now", "only",
    "other", "own", "over", "same", "such", "through", "until", "very",
    "just", "what", "when", "where", "which", "while", "who", "why",
    "how",
}
