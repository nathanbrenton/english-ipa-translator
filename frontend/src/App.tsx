import { useState } from 'react'
import { translateText } from './api/translateClient'
import './App.css'
import TranslationResults from './components/TranslationResults'
import TranslatorForm from './components/TranslatorForm'
import type { TranslateResponse } from './types/translate'

const EXAMPLE_TEXTS = [
  'we dream beneath the satellites',
  'hello zzzznotaword world',
  'sing softly under silver rain',
]

function App() {
  const [inputText, setInputText] = useState('')
  const [translationResult, setTranslationResult] =
    useState<TranslateResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [copyMessage, setCopyMessage] = useState('')

  async function handleSubmit() {
    const trimmedText = inputText.trim()

    if (!trimmedText) {
      setTranslationResult(null)
      setErrorMessage('Please enter text before translating.')
      setCopyMessage('')
      return
    }

    setIsLoading(true)
    setErrorMessage('')
    setCopyMessage('')

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

  function handleUseExample(exampleText: string) {
    setInputText(exampleText)
    setTranslationResult(null)
    setErrorMessage('')
    setCopyMessage('')
  }

  function handleClear() {
    setInputText('')
    setTranslationResult(null)
    setErrorMessage('')
    setCopyMessage('')
  }

  async function handleCopyIpaLine() {
    if (!translationResult?.ipa_line) {
      return
    }

    try {
      await navigator.clipboard.writeText(translationResult.ipa_line)
      setCopyMessage('IPA line copied to clipboard.')
    } catch {
      setCopyMessage('Could not copy IPA line to clipboard.')
    }
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
        isLoading={isLoading}
        exampleTexts={EXAMPLE_TEXTS}
        onInputTextChange={setInputText}
        onSubmit={handleSubmit}
        onUseExample={handleUseExample}
        onClear={handleClear}
      />

      <TranslationResults
        result={translationResult}
        isLoading={isLoading}
        errorMessage={errorMessage}
        copyMessage={copyMessage}
        onCopyIpaLine={handleCopyIpaLine}
      />
    </main>
  )
}

export default App
