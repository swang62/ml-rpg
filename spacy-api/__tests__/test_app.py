from fastapi.testclient import TestClient
from app import app, formatted

client = TestClient(app)


def test_formatted():
    assert formatted(" Hello World ") == "hello world"
    assert formatted("  ") == ""
    assert formatted("TEST") == "test"
    assert formatted("") == ""


def test_extract_keywords_short_query():
    response = client.post("/extract-keywords", json={"query": "ab"})
    assert response.status_code == 200
    assert response.json() == {"keywords": []}


def test_extract_keywords_empty_query():
    response = client.post("/extract-keywords", json={"query": ""})
    assert response.status_code == 200
    assert response.json() == {"keywords": []}


def test_extract_keywords_org_entity():
    response = client.post("/extract-keywords", json={"query": "I work at Google"})
    assert response.status_code == 200
    data = response.json()
    assert "google" in data["keywords"]


def test_extract_keywords_noun_and_adjective():
    response = client.post(
        "/extract-keywords", json={"query": "modern machine learning"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "modern" in data["keywords"]
    assert "machine" in data["keywords"]
    assert "learning" in data["keywords"]


def test_extract_keywords_greeting_only():
    response = client.post(
        "/extract-keywords", json={"query": "hello there"}
    )
    assert response.status_code == 200
    assert response.json() == {"keywords": []}


def test_extract_keywords_invalid_method():
    response = client.get("/extract-keywords")
    assert response.status_code == 405


def test_extract_keywords_missing_field():
    response = client.post("/extract-keywords", json={})
    assert response.status_code == 422
