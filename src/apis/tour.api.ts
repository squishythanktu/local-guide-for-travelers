import { Tour, TourSuccessResponse } from 'src/types/tour.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { TourSchema } from 'src/utils/rules'

type TourFormData = TourSchema
const URL_CREATE_TOURS = 'tour-management/add'
const URL_GET_TOURS = 'tour-management/tours'
const URL_TOUR_DETAILS = 'tour-management/tour-detail'

const tourApi = {
  getTours() {
    return http.get<SuccessResponse<Tour[]>>(URL_GET_TOURS)
  },
  getTourById(id: string) {
    return http.get<TourSuccessResponse>(`${URL_TOUR_DETAILS}/${id}`)
  },
  createTour(body: TourFormData) {
    return http.post<SuccessResponse<Tour>>(URL_CREATE_TOURS, body)
  }
}

export default tourApi
