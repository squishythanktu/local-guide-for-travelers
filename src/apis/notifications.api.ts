import { Notification } from 'src/types/notification.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_NOTIFICATIONS = 'notifications'

const notificationApi = {
  getNotifications({ pageParam }: { pageParam: number }) {
    return http.get<SuccessResponse<Notification[]>>(`${URL_NOTIFICATIONS}?page=` + pageParam)
  }
}

export default notificationApi
