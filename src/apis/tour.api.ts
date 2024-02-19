import { Tour } from 'src/types/tour.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_GET_TOURS = 'tour-management/tours'

const tourApi = {
  getTours() {
    return http.get<SuccessResponse<Tour[]>>(URL_GET_TOURS)
  }
}

export default tourApi
