import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { PaymentParams } from './../types/payment-params.type'

export const URL_PAYMENT = 'payment'

const paymentApi = {
  getPaymentUrl(params: PaymentParams) {
    return http.get<SuccessResponse<string>>(`${URL_PAYMENT}/pay`, { params })
  }
}

export default paymentApi
