type TranslationPreviewProps = {
  submittedText: string
}

function TranslationPreview({ submittedText }: TranslationPreviewProps) {
  return (
    <section className="result-panel" aria-labelledby="result-heading">
      <h3 id="result-heading">Result preview</h3>

      {submittedText ? (
        <div className="placeholder-result">
          <p className="result-label">Submitted text</p>
          <p className="submitted-text">{submittedText}</p>
          <p className="muted">
            Backend API integration comes next. This placeholder confirms that
            React state, form handling, props, and conditional rendering are
            working.
          </p>
        </div>
      ) : (
        <p className="muted">
          Submit text to preview the frontend interaction. The next step will
          call <code>POST /api/translate</code>.
        </p>
      )}
    </section>
  )
}

export default TranslationPreview
