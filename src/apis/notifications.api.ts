import { Notification } from 'src/types/notification.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_NOTIFICATIONS = 'notifications'

const notificationApi = {
  getNotifications({ pageParam }: { pageParam: number }) {
    return http.get<SuccessResponse<Notification[]>>(`${URL_NOTIFICATIONS}?page=` + pageParam)
  },
  updateReadNotificationStatus(id: number) {
    return http.patch<SuccessResponse<void>>(`${URL_NOTIFICATIONS}/${id}`)
  }
}

export default notificationApi
