type TranslatorFormProps = {
  inputText: string
  isLoading: boolean
  exampleTexts: string[]
  onInputTextChange: (value: string) => void
  onSubmit: () => void
  onUseExample: (exampleText: string) => void
  onClear: () => void
}

function TranslatorForm({
  inputText,
  isLoading,
  exampleTexts,
  onInputTextChange,
  onSubmit,
  onUseExample,
  onClear,
}: TranslatorFormProps) {
  const trimmedInput = inputText.trim()
  const isSubmitDisabled = isLoading || !trimmedInput

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <section className="translator-card" aria-labelledby="translator-heading">
      <div className="card-header">
        <div>
          <h2 id="translator-heading">Translator</h2>
          <p>Enter a word or phrase.</p>
        </div>
      </div>

      <div className="example-list" aria-label="Example phrases">
        {exampleTexts.map((exampleText) => (
          <button
            key={exampleText}
            type="button"
            className="example-button"
            onClick={() => onUseExample(exampleText)}
          >
            {exampleText}
          </button>
        ))}
      </div>

      <form className="translator-form" onSubmit={handleSubmit}>
        <label htmlFor="translator-input">English text</label>
        <textarea
          id="translator-input"
          value={inputText}
          onChange={(event) => onInputTextChange(event.target.value)}
          placeholder="we dream beneath the satellites"
          rows={5}
        />

        <div className="form-actions">
          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitDisabled}
          >
            {isLoading ? 'Translating...' : 'Translate to IPA'}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={onClear}
            disabled={isLoading && !inputText}
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  )
}

export default TranslatorForm
