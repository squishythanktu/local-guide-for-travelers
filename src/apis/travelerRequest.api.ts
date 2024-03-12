import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { Tour } from '../types/tour.type'
import { RequestTourFormData } from './../pages/RequestTour/RequestTour'

const URL_TRAVELER_REQUEST = 'traveler-requests'

const travelerRequestApi = {
  createRequest(body: RequestTourFormData) {
    return http.post<SuccessResponse<Tour>>(URL_TRAVELER_REQUEST, body)
  }
}

export default travelerRequestApi
