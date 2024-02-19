import { TourCategory } from 'src/types/tour.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GET_CATEGORIES = 'category-management/categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<TourCategory[]>>(URL_GET_CATEGORIES)
  }
}

export default categoryApi
