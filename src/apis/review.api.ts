import { Review } from 'src/types/review.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_TOUR_REVIEW = '/reviews/tour-reviews'

const reviewApi = {
  getReviewsOfToaur(id: string) {
    return http.get<SuccessResponse<Review[]>>(`${URL_TOUR_REVIEW}/${id}`)
  }
}

export default reviewApi
