import logging

import httpx

from ..config import VOYAGE_API_KEY, VOYAGE_API_URL, VOYAGE_MODEL

logger = logging.getLogger("rag_api")

_client: httpx.AsyncClient | None = None


def get_client() -> httpx.AsyncClient:
    global _client
    if _client is None:
        _client = httpx.AsyncClient(timeout=120.0)
    return _client


async def close_client() -> None:
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None


async def embed_query(query: str) -> list[float]:
    return (await embed_queries([query]))[0]


async def embed_queries(queries: list[str]) -> list[list[float]]:
    """Embed multiple queries via Voyage API, batching up to 100 per request."""
    client = get_client()
    results: list[list[float]] = []
    batch_size = 100

    for start in range(0, len(queries), batch_size):
        batch = queries[start : start + batch_size]
        try:
            response = await client.post(
                VOYAGE_API_URL,
                headers={
                    "Authorization": f"Bearer {VOYAGE_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "inputs": [[q] for q in batch],
                    "model": VOYAGE_MODEL,
                    "input_type": "query",
                },
            )

            if not response.is_success:
                err_text = response.text
                raise RuntimeError(
                    f"Voyage API error: {response.status_code} {err_text}"
                )

            body = response.json()
            for item in body["data"]:
                results.append(item["data"][0]["embedding"])
        except Exception:
            logger.exception("Voyage embedding failed for batch starting at %d", start)
            raise

    return results
