"""Main translation service for English text to IPA-like output."""

from app.services.arpabet_to_ipa import arpabet_to_ipa
from app.services.cmudict_service import lookup_arpabet
from app.services.normalizer import normalize_token
from app.services.tokenizer import tokenize_text


def translate_text(text: str) -> dict:
    """Translate raw English text into structured pronunciation output."""
    raw_tokens = tokenize_text(text)
    token_results = []

    for raw_token in raw_tokens:
        normalized = normalize_token(raw_token)
        arpabet = lookup_arpabet(normalized)
        found = bool(arpabet)
        ipa = arpabet_to_ipa(arpabet) if found else ""

        token_results.append(
            {
                "text": raw_token,
                "normalized": normalized,
                "found": found,
                "arpabet": arpabet,
                "ipa": ipa,
            }
        )

    ipa_line = " ".join(
        token_result["ipa"]
        for token_result in token_results
        if token_result["ipa"]
    )

    return {
        "input": text,
        "tokens": token_results,
        "ipa_line": ipa_line,
    }
