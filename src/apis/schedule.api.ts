import http from 'src/utils/http'
import { BusySchedule, ScheduleLists } from 'src/types/schedule.type'
import { SuccessResponse } from 'src/types/utils.type'

const URL_SCHEDULES = 'schedules/busy'

const scheduleApi = {
  getBusySchedulesOfGuide() {
    return http.get<SuccessResponse<ScheduleLists>>(`${URL_SCHEDULES}/guide`)
  },
  updateBusyScheduleOfGuide(body: string[]) {
    return http.post<SuccessResponse<BusySchedule[]>>(URL_SCHEDULES, body)
  },
  getBusySchedulesOfTour(id: number) {
    return http.get<SuccessResponse<Date[]>>(`${URL_SCHEDULES}/tour/${id}`)
  }
}

export default scheduleApi
