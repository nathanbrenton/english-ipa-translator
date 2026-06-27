"""CMUdict lookup service."""

import pronouncing


def lookup_arpabet(normalized_word: str) -> list[str]:
    """Return the first ARPABET pronunciation for a normalized word.

    The pronouncing library returns pronunciations as strings like:
    "D R IY1 M"

    For the MVP, we use the first available pronunciation.
    """
    pronunciations = pronouncing.phones_for_word(normalized_word)

    if not pronunciations:
        return []

    return pronunciations[0].split()
