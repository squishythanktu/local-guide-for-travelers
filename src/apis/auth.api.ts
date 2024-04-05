import { ChangePasswordFormData } from './../pages/ResetPassword/ChangePasswordByToken/ChangePasswordByToken'
import { AuthSuccessResponse } from 'src/types/auth.type'
import http from 'src/utils/http'
import { ResetPasswordFormData } from './../pages/ResetPassword/ResetPassword'

export const URL_REGISTER = 'auth/register'
export const URL_LOGIN = 'auth/login'
export const URL_LOGOUT = 'auth/logout'
export const URL_RESET_PASSWORD = 'auth/send-email-reset-password'
export const URL_CHANGE_PASSWORD_BY_TOKEN = 'auth/reset-password'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthSuccessResponse>(URL_REGISTER, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthSuccessResponse>(URL_LOGIN, body)
  },
  reset(body: ResetPasswordFormData) {
    return http.post<null>(URL_RESET_PASSWORD, body)
  },
  changePasswordByToken(body: ChangePasswordFormData) {
    return http.post<null>(URL_CHANGE_PASSWORD_BY_TOKEN, body)
  }
}

export default authApi
