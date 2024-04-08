import { PaginationParams } from 'src/types/pagination-params.type'
import {
  GuideStatisticResult,
  TourStatisticResult,
  ToursOfGuideStatisticResult,
  YearStatisticResult
} from 'src/types/statistic.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_STATISTIC = 'statistic'

const statisticApi = {
  getStatisticOfTour(params: PaginationParams) {
    return http.get<SuccessResponse<TourStatisticResult>>(`${URL_STATISTIC}/tours`, { params })
  },
  getStatisticOfTourByGuide(params: PaginationParams) {
    return http.get<SuccessResponse<ToursOfGuideStatisticResult>>(`${URL_STATISTIC}/guide/tours`, { params })
  },
  getStatisticOfGuide(params: PaginationParams) {
    return http.get<SuccessResponse<GuideStatisticResult>>(`${URL_STATISTIC}/guides`, { params })
  },
  getStatisticOfTourByYear(year: number) {
    return http.get<SuccessResponse<YearStatisticResult>>(`${URL_STATISTIC}/month/${year}`)
  }
}

export default statisticApi
