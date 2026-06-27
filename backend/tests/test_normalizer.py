from app.services.normalizer import normalize_token


def test_normalize_lowercases_token():
    assert normalize_token("Dream") == "dream"


def test_normalize_strips_outer_whitespace():
    assert normalize_token("  beneath  ") == "beneath"
