import { Booking } from 'src/types/booking.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_BOOKINGS = 'bookings'

const bookingApi = {
  getBookingsHistory() {
    return http.get<SuccessResponse<Booking[]>>(`${URL_BOOKINGS}/history`)
  }
}

export default bookingApi
