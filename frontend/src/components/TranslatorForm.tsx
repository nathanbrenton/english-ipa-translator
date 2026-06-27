type TranslatorFormProps = {
  inputText: string
  onInputTextChange: (value: string) => void
  onSubmit: () => void
  onUseExample: () => void
}

function TranslatorForm({
  inputText,
  onInputTextChange,
  onSubmit,
  onUseExample,
}: TranslatorFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <section className="translator-card" aria-labelledby="translator-heading">
      <div className="card-header">
        <div>
          <h2 id="translator-heading">Translator</h2>
          <p>Enter a word, phrase, or lyric line.</p>
        </div>
        <button type="button" className="secondary-button" onClick={onUseExample}>
          Use example
        </button>
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

        <button type="submit" className="primary-button">
          Translate to IPA
        </button>
      </form>
    </section>
  )
}

export default TranslatorForm
