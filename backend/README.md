# English IPA Translator Backend

FastAPI backend for the English IPA Translator project.

The backend accepts English words, phrases, or lyric lines and returns structured IPA-like pronunciation output using deterministic CMUdict-style lookup and ARPABET-to-IPA conversion.

## Current Backend Scope

- FastAPI application
- `/api/health` health endpoint
- `/api/translate` translation endpoint
- CMUdict lookup through the `pronouncing` package
- ARPABET-to-IPA conversion
- Unknown-word fallback
- pytest test suite

## Project Location

`~/Desktop/english-ipa-translator/backend`

## Wheelhouse Location

Python requirements and wheels are stored outside the project at:

- `~/Downloads/python-wheelhouse/requirements`
- `~/Downloads/python-wheelhouse/wheels`

Backend requirements file:

`~/Downloads/python-wheelhouse/requirements/english-ipa-backend.txt`

## Activate the Virtual Environment

From the project root:

    cd ~/Desktop/english-ipa-translator
    source backend/.venv/bin/activate

## Install Backend Requirements from Wheelhouse

    python -m pip install \
      --no-index \
      --find-links="$HOME/Downloads/python-wheelhouse/wheels" \
      -r "$HOME/Downloads/python-wheelhouse/requirements/english-ipa-backend.txt"

## Run the API

    cd ~/Desktop/english-ipa-translator/backend
    source .venv/bin/activate

    uvicorn app.main:app --host 127.0.0.1 --port 8000

## Health Check

In another terminal:

    curl -s http://127.0.0.1:8000/api/health | python -m json.tool

Expected response:

    {
        "status": "ok",
        "service": "english-ipa-translator"
    }

## Translate Text

    curl -s -X POST http://127.0.0.1:8000/api/translate \
      -H "Content-Type: application/json" \
      -d '{"text":"we dream beneath the satellites"}' \
      | python -m json.tool

## Run Tests

    cd ~/Desktop/english-ipa-translator/backend
    source .venv/bin/activate

    pytest -v

## Backend Architecture

    Raw English text
      ↓
    tokenizer.py
      ↓
    normalizer.py
      ↓
    cmudict_service.py
      ↓
    arpabet_to_ipa.py
      ↓
    translator.py
      ↓
    FastAPI response

## Notes

This MVP does not use machine-learning models, LLMs, embeddings, or transformer generation.

It uses deterministic dictionary lookup and rule-based ARPABET-to-IPA conversion.
