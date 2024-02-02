import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const URL_AUTH = 'auth/'
const URL_REGISTER = 'register'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_AUTH + URL_REGISTER, body)
  }
}

export default authApi
