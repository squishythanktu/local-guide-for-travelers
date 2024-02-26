import { BookingsInCart } from 'src/types/cart.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_CARTS = 'carts'

const cartApi = {
  getBookingInCart() {
    return http.get<SuccessResponse<BookingsInCart>>(URL_CARTS)
  }
}

export default cartApi
