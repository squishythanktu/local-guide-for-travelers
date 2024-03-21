import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_STATISTIC = 'statistic'

const statisticApi = {
  getStatisticOfTour() {
    return http.get<SuccessResponse<any>>(`${URL_STATISTIC}/tour`)
  }
}

export default statisticApi
