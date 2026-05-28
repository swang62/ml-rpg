import os
from pathlib import Path

# Ensure env vars are present before any test imports trigger config.py
# Falls back to dummy values for tests that don't hit real services.
_dotenv = Path(__file__).parent.parent / ".env"
if _dotenv.exists():
    try:
        from dotenv import load_dotenv
        load_dotenv(_dotenv)
    except ImportError:
        pass

os.environ.setdefault("LANCEDB_PATH", "/tmp/test-lancedb")
os.environ.setdefault("VOYAGE_API_KEY", "test-voyage-key")


def make_chunk(**overrides) -> dict:
    chunk = {
        "id": "1",
        "text": "some text",
        "lessonTitle": "Lesson",
        "lessonUrl": "/course/ml/lesson-1",
        "categoryTitle": "ML",
        "sectionTitle": "Basics",
        "courseTitle": "Course",
        "chunkIndex": 0,
        "_relevance_score": 0.8,
    }
    chunk.update(overrides)
    return chunk
