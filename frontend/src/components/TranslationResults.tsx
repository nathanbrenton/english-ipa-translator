import type { TranslateResponse } from '../types/translate'

type TranslationResultsProps = {
  result: TranslateResponse | null
  isLoading: boolean
  errorMessage: string
  copyMessage: string
  onCopyIpaLine: () => void
}

function TranslationResults({
  result,
  isLoading,
  errorMessage,
  copyMessage,
  onCopyIpaLine,
}: TranslationResultsProps) {
  const hasIpaLine = Boolean(result?.ipa_line)

  return (
    <section className="result-panel" aria-labelledby="result-heading">
      <h3 id="result-heading">Translation result</h3>

      {isLoading && <p className="muted">Translating...</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && !result && (
        <p className="muted">
          Submit text to call <code>POST /api/translate</code> and display IPA
          output.
        </p>
      )}

      {result && (
        <div className="translation-output">
          <div className="ipa-line-card">
            <div className="result-card-header">
              <div>
                <p className="result-label">Full-line IPA</p>
                <p className="ipa-line">
                  {result.ipa_line || 'No IPA output available.'}
                </p>
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={onCopyIpaLine}
                disabled={!hasIpaLine}
              >
                Copy IPA
              </button>
            </div>

            {copyMessage && <p className="copy-message">{copyMessage}</p>}
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Normalized</th>
                  <th>Status</th>
                  <th>ARPABET</th>
                  <th>IPA</th>
                </tr>
              </thead>
              <tbody>
                {result.tokens.map((token, index) => (
                  <tr
                    key={`${token.text}-${index}`}
                    className={token.found ? undefined : 'unknown-row'}
                  >
                    <td>{token.text}</td>
                    <td>{token.normalized}</td>
                    <td>
                      <span
                        className={
                          token.found ? 'status-found' : 'status-unknown'
                        }
                      >
                        {token.found ? 'found' : 'unknown'}
                      </span>
                    </td>
                    <td>{token.arpabet.length ? token.arpabet.join(' ') : '—'}</td>
                    <td>{token.ipa || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="muted">
            Unknown words are intentionally marked instead of guessed.
          </p>
        </div>
      )}
    </section>
  )
}

export default TranslationResults
