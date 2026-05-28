import httpx

from ..config import VOYAGE_MODEL, VOYAGE_API_KEY, VOYAGE_API_URL

_client: httpx.AsyncClient | None = None


def get_client() -> httpx.AsyncClient:
    global _client
    if _client is None:
        _client = httpx.AsyncClient(timeout=10.0)
    return _client


async def close_client() -> None:
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None


async def embed_query(query: str) -> list[float]:
    client = get_client()
    response = await client.post(
        VOYAGE_API_URL,
        headers={
            "Authorization": f"Bearer {VOYAGE_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "inputs": [[query]],
            "model": VOYAGE_MODEL,
            "input_type": "query",
        },
    )

    if not response.is_success:
        err_text = response.text
        raise RuntimeError(f"Voyage API error: {response.status_code} {err_text}")

    body = response.json()
    return body["data"][0]["data"][0]["embedding"]
