export interface ResponseApi<Data> {
  statusCode: string
  message: string
  data?: Data
}
