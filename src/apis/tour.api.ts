import { StartTimeParams, Tour, TourSuccessResponse } from './../types/tour.type'
import { TourUpdateFormData } from 'src/pages/Account/components/TourForm/UpdateForm/UpdateForm'
import { SuccessResponse, SuccessResponseWithPagination } from 'src/types/utils.type'
import http from 'src/utils/http'
import { TourSchema } from 'src/utils/rules'
import { QueryConfig } from 'src/hooks/useQueryConfig'

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
  searchTours(params: QueryConfig) {
    return http.get<SuccessResponseWithPagination<Tour[]>>(URL_TOURS + '/search', { params })
  },
  getToursOfGuide() {
    return http.get<SuccessResponse<Tour[]>>(`${URL_TOURS}/guide`)
  },
  getStartTime(tourId: number, params: StartTimeParams) {
    return http.get<SuccessResponse<string[]>>(`${URL_TOURS}/${tourId}/tour-start-time-available`, { params })
  }
}

export default tourApi
