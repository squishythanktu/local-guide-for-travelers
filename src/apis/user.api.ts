import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { UserSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'fullName' | 'address' | 'phone' | 'dateOfBirth'>

const URL_USERS = 'users'

const userApi = {
  getMe() {
    return http.get<SuccessResponse<User>>(`${URL_USERS}/me`)
  },
  updateMe(body: FormData) {
    return http.put<SuccessResponse<User>>(`${URL_USERS}`, body)
  }
}

export default userApi
