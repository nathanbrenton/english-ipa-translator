"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.translate import router as translate_router

app = FastAPI(
    title="English IPA Translator",
    description="English-to-IPA translator using CMUdict-style lookup and ARPABET-to-IPA conversion.",
    version="0.1.0",
)

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(translate_router)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    """Return API health status."""
    return {
        "status": "ok",
        "service": "english-ipa-translator",
    }
