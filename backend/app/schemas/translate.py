"""Pydantic schemas for translation API requests and responses."""

from pydantic import BaseModel, Field


class TranslateRequest(BaseModel):
    """Request body for English-to-IPA translation."""

    text: str = Field(
        min_length=1,
        description="English words, phrases, or lyric lines to translate.",
    )


class TokenPronunciation(BaseModel):
    """Pronunciation data for a single token."""

    text: str
    normalized: str
    found: bool
    arpabet: list[str]
    ipa: str


class TranslateResponse(BaseModel):
    """Structured English-to-IPA translation response."""

    input: str
    tokens: list[TokenPronunciation]
    ipa_line: str
