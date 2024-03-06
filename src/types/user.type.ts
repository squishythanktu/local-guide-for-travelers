type Role = 'GUIDER' | 'TRAVELER'

export interface User {
  id: string
  fullName?: string
  email: string
  dateOfBirth?: string
  phone?: string
  address?: string
  roles?: Role[]
}
