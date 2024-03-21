import { StatisticOfTour } from 'src/types/statistic.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { PaginationParams } from './../types/pagination-params.type'

const URL_STATISTIC = 'statistic'

const statisticApi = {
  getStatisticOfTour(params: PaginationParams) {
    return http.get<SuccessResponse<StatisticOfTour>>(`${URL_STATISTIC}/tours`, { params })
  }
}

export default statisticApi
