type Role = 'GUIDER' | 'TRAVELER'

export interface User {
  id: string
  username?: string
  email: string
  dateOfBirth?: string
  phone?: string
  address?: string
  roles?: Role[]
}
