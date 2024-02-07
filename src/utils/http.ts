import axios, { AxiosError, type AxiosInstance } from 'axios'
import config from 'src/constants/config.constant'
import { AuthSuccessResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLocalStorage, setAccessTokenToLS, setProfileToLS } from './auth'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from 'src/apis/auth.api'

export class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10 * 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          this.accessToken = (response.data as AuthSuccessResponse).data.accessToken
          setAccessTokenToLS(this.accessToken)
          setProfileToLS((response.data as AuthSuccessResponse).data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
