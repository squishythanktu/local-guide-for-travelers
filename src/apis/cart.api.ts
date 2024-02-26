import { BookingUpdateFormData } from './../pages/Cart/components/CartItems/ItemCard/ItemCard'
import { BookingsInCart } from 'src/types/cart.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_CARTS = 'carts'

const cartApi = {
  getBookingInCart() {
    return http.get<SuccessResponse<BookingsInCart>>(URL_CARTS)
  },
  updateBookingInCart(body: BookingUpdateFormData) {
    return http.put<SuccessResponse<BookingsInCart>>(URL_CARTS, body)
  },
  deleteBookingInCart(id: string) {
    return http.delete<SuccessResponse<void>>(`${URL_CARTS}/${id}`)
  }
}

export default cartApi
