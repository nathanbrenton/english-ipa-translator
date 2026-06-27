"""Tokenization helpers for English text."""

import re


WORD_PATTERN = re.compile(r"[A-Za-z]+(?:'[A-Za-z]+)?")


def tokenize_text(text: str) -> list[str]:
    """Return word-like tokens from raw input text.

    Apostrophes inside words are preserved for now, so examples like
    "don't" remain a single token.
    """
    return WORD_PATTERN.findall(text)
