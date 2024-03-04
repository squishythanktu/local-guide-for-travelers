import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_PAYMENT = 'payment'

const paymentApi = {
  getPaymentUrl(params: { price: number; bookingIds: string }) {
    return http.get<SuccessResponse<string>>(`${URL_PAYMENT}/pay`, { params })
  }
}

export default paymentApi
