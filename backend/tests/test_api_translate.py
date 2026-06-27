from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_endpoint_returns_ok():
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "english-ipa-translator",
    }


def test_translate_endpoint_returns_structured_result():
    response = client.post(
        "/api/translate",
        json={"text": "we dream"},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["input"] == "we dream"
    assert data["ipa_line"]
    assert len(data["tokens"]) == 2

    first_token = data["tokens"][0]

    assert first_token["text"] == "we"
    assert first_token["normalized"] == "we"
    assert first_token["found"] is True
    assert first_token["arpabet"] == ["W", "IY1"]
    assert first_token["ipa"] == "wˈiː"


def test_translate_endpoint_marks_unknown_words():
    response = client.post(
        "/api/translate",
        json={"text": "zzzznotaword"},
    )

    assert response.status_code == 200

    data = response.json()
    token = data["tokens"][0]

    assert token["text"] == "zzzznotaword"
    assert token["normalized"] == "zzzznotaword"
    assert token["found"] is False
    assert token["arpabet"] == []
    assert token["ipa"] == ""
    assert data["ipa_line"] == ""


def test_translate_endpoint_rejects_empty_text():
    response = client.post(
        "/api/translate",
        json={"text": ""},
    )

    assert response.status_code == 422
