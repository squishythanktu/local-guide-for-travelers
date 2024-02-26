import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_ADDRESS = 'addresses'

const addressApi = {
  getProvinces() {
    return http.get<SuccessResponse<string[]>>(`${URL_ADDRESS}/provinces`)
  },
  getDistrictsByProvince(provinceName: string) {
    return http.get<SuccessResponse<string[]>>(`${URL_ADDRESS}/districts`, {
      params: {
        provinceName
      }
    })
  },
  getWardByDistrictsProvince(districtName: string, provinceName: string) {
    return http.get<SuccessResponse<string[]>>(`${URL_ADDRESS}/wards`, {
      params: {
        districtName,
        provinceName
      }
    })
  }
}

export default addressApi
