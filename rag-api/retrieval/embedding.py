import httpx

from rag_api.config import EMBEDDING_MODEL, VOYAGE_API_KEY, VOYAGE_API_URL


async def embed_query(query: str) -> list[float]:
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.post(
            VOYAGE_API_URL,
            headers={
                "Authorization": f"Bearer {VOYAGE_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "inputs": [[query]],
                "model": EMBEDDING_MODEL,
                "input_type": "query",
            },
        )

    if not response.is_success:
        err_text = response.text
        raise RuntimeError(
            f"Voyage API error: {response.status_code} {err_text}"
        )

    data = response.json()
    return data[0]["data"][0]["embedding"]
