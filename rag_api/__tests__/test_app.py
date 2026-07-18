from fastapi.testclient import TestClient

from ..app import app

client = TestClient(app)

# Auth token from config (set via .env or docker-compose)
from ..config import SESSION_SECRET  # noqa: E402

AUTH_HEADERS = {"Authorization": f"Bearer {SESSION_SECRET}"}


def test_health_public():
    response = client.get("/health")
    assert response.status_code == 200


def test_status_public():
    response = client.get("/status")
    assert response.status_code == 200


def test_no_auth_returns_403():
    response = client.post("/retrieve", json={"query": "test"})
    assert response.status_code == 403
    data = response.json()
    assert data["detail"] == "Forbidden"


def test_wrong_auth_returns_403():
    response = client.post(
        "/retrieve",
        json={"query": "test"},
        headers={"Authorization": "Bearer wrong-token"},
    )
    assert response.status_code == 403
    data = response.json()
    assert data["detail"] == "Forbidden"


def test_chat_no_auth_returns_403():
    response = client.post("/chat", json={"query": "hi", "history": []})
    assert response.status_code == 403


def test_embed_no_auth_returns_403():
    response = client.post("/embed", json={"texts": ["test"]})
    assert response.status_code == 403


def test_short_query():
    response = client.post("/retrieve", json={"query": "ab"}, headers=AUTH_HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data["sources"] == []
    assert data["keywords"] == []
    assert data["chunks"] == []


def test_empty_query():
    response = client.post("/retrieve", json={"query": ""}, headers=AUTH_HEADERS)
    assert response.status_code == 200
    data = response.json()
    assert data["sources"] == []
    assert data["keywords"] == []
    assert data["chunks"] == []


def test_invalid_method():
    response = client.get("/retrieve", headers=AUTH_HEADERS)
    assert response.status_code == 405


def test_missing_field():
    response = client.post("/retrieve", json={}, headers=AUTH_HEADERS)
    assert response.status_code == 422
