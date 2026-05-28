from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient

from rag_api.retrieval import retrieve


@pytest.fixture
def client():
    with (
        patch("rag_api.retrieval.vector_search._get_table"),
        patch("rag_api.retrieval.embedding.embed_query"),
    ):
        from rag_api.app import app

        with TestClient(app) as c:
            yield c


class TestRetrieveEndpoint:
    def test_short_query(self, client):
        response = client.post("/retrieve", json={"query": "ab"})
        assert response.status_code == 200
        assert response.json() == {"sources": [], "keywords": []}

    def test_empty_query(self, client):
        response = client.post("/retrieve", json={"query": ""})
        assert response.status_code == 200
        data = response.json()
        assert data["sources"] == []
        assert data["keywords"] == []

    def test_invalid_method(self, client):
        response = client.get("/retrieve")
        assert response.status_code == 405

    def test_missing_field(self, client):
        response = client.post("/retrieve", json={})
        assert response.status_code == 422

    def test_successful_retrieval(self, client):
        with (
            patch.object(retrieve, "extract_keywords", return_value=["test"]),
            patch.object(
                retrieve, "embed_query", return_value=[0.1, 0.2, 0.3]
            ),
            patch.object(
                retrieve,
                "hybrid_search",
                return_value=[
                    {
                        "_relevance_score": 0.9,
                        "lessonUrl": "/course/ml/lesson-1",
                        "lessonTitle": "Lesson 1",
                        "text": "Some content",
                        "categoryTitle": "ML",
                        "sectionTitle": "Basics",
                        "courseTitle": "Course",
                    }
                ],
            ),
        ):
            response = client.post("/retrieve", json={"query": "test query"})
            assert response.status_code == 200
            data = response.json()
            assert len(data["sources"]) == 1
            assert data["sources"][0]["title"] == "Lesson 1"
            assert data["keywords"] == ["test"]

    def test_internal_error(self, client):
        with patch.object(
            retrieve, "extract_keywords", side_effect=Exception("boom")
        ):
            response = client.post("/retrieve", json={"query": "test query"})
            assert response.status_code == 500
