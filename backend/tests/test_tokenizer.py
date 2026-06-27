from app.services.tokenizer import tokenize_text


def test_tokenize_simple_phrase():
    assert tokenize_text("we dream") == ["we", "dream"]


def test_tokenize_strips_punctuation():
    assert tokenize_text("hello, world!") == ["hello", "world"]


def test_tokenize_preserves_internal_apostrophe():
    assert tokenize_text("don't stop") == ["don't", "stop"]
