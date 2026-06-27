# English IPA Translator Frontend

React frontend for the English IPA Translator project.

The frontend provides a simple browser interface for entering English words or phrases and viewing IPA-style pronunciation output from the FastAPI backend.

## Current Frontend Scope

- Vite React TypeScript app
- Plain CSS styling
- Controlled textarea input
- Submit button
- Example text button
- Loading state
- Error state
- API client using fetch
- Full-line IPA display
- Word-by-word pronunciation table
- Unknown-word display

## Project Location

`~/Desktop/english-ipa-translator/frontend`

## Local Development

From the frontend directory:

    cd ~/Desktop/english-ipa-translator/frontend
    npm run dev

The Vite development server normally starts at:

    http://localhost:5173/

## Build

    cd ~/Desktop/english-ipa-translator/frontend
    npm run build

## Lint

    cd ~/Desktop/english-ipa-translator/frontend
    npm run lint

## Preview Production Build

    cd ~/Desktop/english-ipa-translator/frontend
    npm run preview

## Backend Dependency

The frontend expects the FastAPI backend to be running at:

    http://127.0.0.1:8000

The frontend sends translation requests to:

    POST http://127.0.0.1:8000/api/translate

## Node/npm Cache Notes

The project commits:

- `package.json`
- `package-lock.json`

The project does not commit:

- `node_modules/`
- `dist/`

The npm cache can be preserved outside the repo at:

    ~/Downloads/node-cache/npm

A repeatable reinstall can be attempted with:

    cd ~/Desktop/english-ipa-translator/frontend
    npm ci --cache "$HOME/Downloads/node-cache/npm" --prefer-offline

A stricter offline attempt can be tried with:

    cd ~/Desktop/english-ipa-translator/frontend
    npm ci --cache "$HOME/Downloads/node-cache/npm" --offline

## Notes

This frontend intentionally avoids UI frameworks and external state-management libraries.

The goal is to practice core React concepts:

- components
- props
- state
- controlled forms
- event handlers
- conditional rendering
- API calls
- TypeScript types
- plain CSS
