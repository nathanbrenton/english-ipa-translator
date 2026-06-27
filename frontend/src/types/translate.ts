export type TokenPronunciation = {
  text: string
  normalized: string
  found: boolean
  arpabet: string[]
  ipa: string
}

export type TranslateResponse = {
  input: string
  tokens: TokenPronunciation[]
  ipa_line: string
}
