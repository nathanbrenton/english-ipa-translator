import type { TranslateResponse } from '../types/translate'

const API_BASE_URL = 'http://127.0.0.1:8000'

export async function translateText(text: string): Promise<TranslateResponse> {
  const response = await fetch(`${API_BASE_URL}/api/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    throw new Error(`Translation request failed with status ${response.status}`)
  }

  return response.json()
}
