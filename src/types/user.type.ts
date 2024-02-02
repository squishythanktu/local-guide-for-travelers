type Role = 'GUIDER' | 'TRAVELER'

export interface User {
  id: string
  username?: string
  email: string
  date_of_birth?: string
  phone?: string
  address?: string
  roles?: Role[]
}
