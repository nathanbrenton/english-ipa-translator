"""Translation API routes."""

from fastapi import APIRouter

from app.schemas.translate import TranslateRequest, TranslateResponse
from app.services.translator import translate_text

router = APIRouter(prefix="/api", tags=["translation"])


@router.post("/translate", response_model=TranslateResponse)
def translate(request: TranslateRequest) -> TranslateResponse:
    """Translate English text into IPA-like pronunciation output."""
    result = translate_text(request.text)
    return TranslateResponse(**result)
