import { RefundInvoice } from 'src/types/invoice.type'
import http from 'src/utils/http'
import { PaymentParams } from './../types/payment-params.type'
import { SuccessResponse } from './../types/utils.type'

export const URL_PAYMENT = 'payment'

const paymentApi = {
  getPaymentUrl(params: PaymentParams) {
    return http.get<SuccessResponse<string>>(`${URL_PAYMENT}/pay`, { params })
  },
  refundInvoice(params: { invoice_id: number }) {
    return http.get<SuccessResponse<RefundInvoice>>(`${URL_PAYMENT}/refund`, { params })
  },
  transferMoney(price: number) {
    return http.get<SuccessResponse<number>>(`${URL_PAYMENT}/amount/${price}`)
  },
  cryptoTransaction(body: { amount: number; buyer_email: string }) {
    return http.post<SuccessResponse<{ error: string; result: { checkout_url: string } }>>(
      `${URL_PAYMENT}/transaction`,
      body
    )
  }
}

export default paymentApi
