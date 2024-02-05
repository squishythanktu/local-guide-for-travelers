import { AuthSuccessResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_REGISTER = 'auth/register'
export const URL_LOGIN = 'auth/login'
export const URL_LOGOUT = 'auth/logout'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthSuccessResponse>(URL_REGISTER, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthSuccessResponse>(URL_LOGIN, body)
  }
}

export default authApi
