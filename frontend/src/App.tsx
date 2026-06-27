import { useState } from 'react'
import './App.css'

const EXAMPLE_TEXT = 'we dream beneath the satellites'

function App() {
  const [inputText, setInputText] = useState('')
  const [submittedText, setSubmittedText] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
          will provide a simple interface for entering text and reviewing
          word-by-word pronunciation results.
        </p>
      </section>

      <section className="translator-card" aria-labelledby="translator-heading">
        <div className="card-header">
          <div>
            <h2 id="translator-heading">Translator</h2>
            <p>Enter a word, phrase, or lyric line.</p>
          </div>
          <button type="button" className="secondary-button" onClick={handleUseExample}>
            Use example
          </button>
        </div>

        <form className="translator-form" onSubmit={handleSubmit}>
          <label htmlFor="translator-input">English text</label>
          <textarea
            id="translator-input"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="we dream beneath the satellites"
            rows={5}
          />

          <button type="submit" className="primary-button">
            Translate to IPA
          </button>
        </form>

        <section className="result-panel" aria-labelledby="result-heading">
          <h3 id="result-heading">Result preview</h3>

          {submittedText ? (
            <div className="placeholder-result">
              <p className="result-label">Submitted text</p>
              <p className="submitted-text">{submittedText}</p>
              <p className="muted">
                Backend API integration comes next. This placeholder confirms
                that React state, form handling, and conditional rendering are
                working.
              </p>
            </div>
          ) : (
            <p className="muted">
              Submit text to preview the frontend interaction. The next step
              will call <code>POST /api/translate</code>.
            </p>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
