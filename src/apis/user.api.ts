import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_USERS = 'users'

const userApi = {
  getMe() {
    return http.get<SuccessResponse<User>>(`${URL_USERS}/me`)
  }
}

export default userApi
