import { GuideStatisticResult, TourStatisticByGuideResult, TourStatisticResult } from 'src/types/statistic.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { PaginationParams } from './../types/pagination-params.type'

const URL_STATISTIC = 'statistic'

const statisticApi = {
  getStatisticOfTour(params: PaginationParams) {
    return http.get<SuccessResponse<TourStatisticResult>>(`${URL_STATISTIC}/tours`, { params })
  },
  getStatisticOfTourByGuide(params?: PaginationParams) {
    return http.get<SuccessResponse<TourStatisticByGuideResult>>(`${URL_STATISTIC}/guide/tours`, { params })
  },
  getStatisticOfGuide(params: PaginationParams) {
    return http.get<SuccessResponse<GuideStatisticResult>>(`${URL_STATISTIC}/guides`, { params })
  }
}

export default statisticApi
