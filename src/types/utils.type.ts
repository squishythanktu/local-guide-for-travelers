export interface SuccessResponse<Data> {
  statusCode: string
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  statusCode: string
  message: string
  data?: Data
}
