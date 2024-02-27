export type SeachResult = {
  id?: number
  resultName: string
  imageLink?: string
}

export type SearchSuggestionResult = {
  addresses: string[]
  toursOrGuiders: SeachResult[]
}
