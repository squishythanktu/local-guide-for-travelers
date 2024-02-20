type LanguageSkill = {
  id: number
  language: string
  level: string
}

export type Guide = {
  id: number
  email: string
  username: string
  dateOfBirth: Date
  phone: string
  address: string
  biography: string
  credential: string
  overallRating: number
  avatar: string
  languageSkill: LanguageSkill[]
}
