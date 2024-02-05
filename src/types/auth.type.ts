import { User } from './user.type'
import { SuccessResponseApi } from './utils.type'

export type AuthSuccessResponse = SuccessResponseApi<{
  accessToken: string
  user: User
}>
