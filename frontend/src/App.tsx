import { useState } from 'react'
import { translateText } from './api/translateClient'
import './App.css'
import TranslationResults from './components/TranslationResults'
import TranslatorForm from './components/TranslatorForm'
import type { TranslateResponse } from './types/translate'

const EXAMPLE_TEXT = 'we dream beneath the satellites'

function App() {
  const [inputText, setInputText] = useState('')
  const [translationResult, setTranslationResult] =
    useState<TranslateResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit() {
    const trimmedText = inputText.trim()

    if (!trimmedText) {
      setTranslationResult(null)
      setErrorMessage('Please enter text before translating.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = await translateText(trimmedText)
      setTranslationResult(result)
    } catch (error) {
      setTranslationResult(null)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while translating.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleUseExample() {
    setInputText(EXAMPLE_TEXT)
    setTranslationResult(null)
    setErrorMessage('')
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">English IPA Translator</p>
        <h1>Translate English lyric lines into IPA-style pronunciation output.</h1>
        <p className="hero-copy">
          This MVP uses a deterministic FastAPI backend with CMUdict-style
          pronunciation lookup and ARPABET-to-IPA conversion. The React frontend
          provides a simple interface for entering text and reviewing
          word-by-word pronunciation results.
        </p>
      </section>

      <TranslatorForm
        inputText={inputText}
        onInputTextChange={setInputText}
        onSubmit={handleSubmit}
        onUseExample={handleUseExample}
      />

      <TranslationResults
        result={translationResult}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  )
}

export default App
