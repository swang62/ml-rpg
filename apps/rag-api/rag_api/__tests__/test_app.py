from fastapi.testclient import TestClient

from ..app import app

client = TestClient(app)


def test_short_query():
    response = client.post("/retrieve", json={"query": "ab"})
    assert response.status_code == 200
    data = response.json()
    assert data["sources"] == []
    assert data["keywords"] == []
    assert data["chunks"] == []


def test_empty_query():
    response = client.post("/retrieve", json={"query": ""})
    assert response.status_code == 200
    data = response.json()
    assert data["sources"] == []
    assert data["keywords"] == []
    assert data["chunks"] == []


def test_invalid_method():
    response = client.get("/retrieve")
    assert response.status_code == 405


def test_missing_field():
    response = client.post("/retrieve", json={})
    assert response.status_code == 422
