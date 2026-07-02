import os
from pathlib import Path

from dotenv import load_dotenv

_dotenv_path = Path(__file__).parent.parent / ".env"
if _dotenv_path.exists():
    load_dotenv(_dotenv_path)

_raw_lancedb_path = os.environ["LANCEDB_PATH"]
_lancedb_p = Path(_raw_lancedb_path)
if not _lancedb_p.is_absolute():
    _lancedb_p = Path(__file__).parent.parent / _raw_lancedb_path

LANCEDB_PATH: str = str(_lancedb_p.resolve())
LOG_LEVEL: str = os.environ.get("LOG_LEVEL", "INFO").upper()
IDLE_TIMEOUT: int = int(os.environ.get("IDLE_TIMEOUT", "300"))

FASTEMBED_MODEL_NAME = "BAAI/bge-small-en-v1.5"
FASTEMBED_BATCH_SIZE = 256
EMBEDDING_DIM = 384
GITHUB_REPO_URL = "https://github.com/swang62/ml-rpg"

MIN_RAG_SCORE = 0.02
INITIAL_RAG_CHUNKS = 10
TOP_K_CHUNKS = 3
MIN_TEXT_SIZE = 3
MAX_TEXT_SIZE = 1000
