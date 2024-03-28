import { GuideInStatistic, TourInStatistic } from 'src/types/statistic.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_STATISTIC = 'statistic'

const statisticApi = {
  getStatisticOfTour() {
    return http.get<SuccessResponse<TourInStatistic[]>>(`${URL_STATISTIC}/tours`)
  },
  getStatisticOfTourByGuide() {
    return http.get<SuccessResponse<TourInStatistic[]>>(`${URL_STATISTIC}/guide/tours`)
  },
  getStatisticOfGuide() {
    return http.get<SuccessResponse<GuideInStatistic[]>>(`${URL_STATISTIC}/guides`)
  }
}

export default statisticApi
