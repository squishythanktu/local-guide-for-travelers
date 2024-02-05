export interface SuccessResponseApi<Data> {
  statusCode: string
  message: string
  data: Data
}
export interface ErrorResponseApi<Data> {
  statusCode: string
  message: string
  data?: Data
}
