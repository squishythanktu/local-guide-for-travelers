import { TourUpdateFormData } from 'src/pages/Account/components/TourForm/UpdateForm/UpdateForm'
import { Tour, TourSuccessResponse } from 'src/types/tour.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { TourSchema } from 'src/utils/rules'

type TourFormData = TourSchema
const URL_TOURS = 'tours'

const tourApi = {
  getTours() {
    return http.get<SuccessResponse<Tour[]>>(URL_TOURS)
  },
  getTourById(id: string) {
    return http.get<TourSuccessResponse>(`${URL_TOURS}/${id}`)
  },
  createTour(body: TourFormData) {
    return http.post<SuccessResponse<Tour>>(URL_TOURS, body)
  },
  updateTour(body: TourUpdateFormData) {
    return http.put<SuccessResponse<Tour>>(URL_TOURS, body)
  },
  deleteTour(id: string) {
    return http.delete<SuccessResponse<void>>(`${URL_TOURS}/${id}`)
  },
  getToursOfGuide() {
    return http.get<SuccessResponse<Tour[]>>(`${URL_TOURS}/guide`)
  }
}

export default tourApi
