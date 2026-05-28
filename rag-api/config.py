import os

LANCEDB_PATH: str = os.environ["LANCEDB_PATH"]
VOYAGE_API_KEY: str = os.environ["VOYAGE_API_KEY"]

EMBEDDING_MODEL = "voyage-context-3"
MAX_SOURCES = 3
MIN_TEXT_SIZE = 3
VOYAGE_API_URL = "https://api.voyageai.com/v1/contextualizedembeddings"
GITHUB_REPO_URL = "https://github.com/swang62/ml-rpg"
