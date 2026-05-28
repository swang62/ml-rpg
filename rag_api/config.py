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
VOYAGE_API_KEY: str = os.environ["VOYAGE_API_KEY"]
LOG_LEVEL: str = os.environ.get("LOG_LEVEL", "INFO").upper()

VOYAGE_MODEL = "voyage-context-3"
VOYAGE_API_URL = "https://api.voyageai.com/v1/contextualizedembeddings"
GITHUB_REPO_URL = "https://github.com/swang62/ml-rpg"

MIN_RAG_SCORE = 0.02
MAX_SOURCES = 3
MIN_TEXT_SIZE = 3
MAX_TEXT_SIZE = 1000
