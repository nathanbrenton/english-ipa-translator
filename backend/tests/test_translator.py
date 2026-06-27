from app.services.translator import translate_text


def test_translate_known_phrase():
    result = translate_text("we dream")

    assert result["input"] == "we dream"
    assert len(result["tokens"]) == 2
    assert result["tokens"][0]["normalized"] == "we"
    assert result["tokens"][0]["found"] is True
    assert result["tokens"][0]["arpabet"] == ["W", "IY1"]
    assert result["tokens"][0]["ipa"] == "wˈiː"
    assert result["ipa_line"]


def test_translate_unknown_word():
    result = translate_text("zzzznotaword")

    assert len(result["tokens"]) == 1
    assert result["tokens"][0]["text"] == "zzzznotaword"
    assert result["tokens"][0]["normalized"] == "zzzznotaword"
    assert result["tokens"][0]["found"] is False
    assert result["tokens"][0]["arpabet"] == []
    assert result["tokens"][0]["ipa"] == ""
    assert result["ipa_line"] == ""
