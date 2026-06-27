"""Normalization helpers for dictionary lookup."""


def normalize_token(token: str) -> str:
    """Normalize a token for pronunciation dictionary lookup."""
    return token.strip().lower()
