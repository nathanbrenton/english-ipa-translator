import { useState } from 'react'
import './App.css'
import TranslationPreview from './components/TranslationPreview'
import TranslatorForm from './components/TranslatorForm'

const EXAMPLE_TEXT = 'we dream beneath the satellites'

function App() {
  const [inputText, setInputText] = useState('')
  const [submittedText, setSubmittedText] = useState('')

  function handleSubmit() {
    setSubmittedText(inputText.trim())
  }

  function handleUseExample() {
    setInputText(EXAMPLE_TEXT)
    setSubmittedText('')
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

      <TranslationPreview submittedText={submittedText} />
    </main>
  )
}

export default App
