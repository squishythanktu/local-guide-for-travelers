import { Review } from 'src/types/review.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const URL_TOUR_REVIEW = '/reviews/tour-reviews'
export const URL_GUIDE_REVIEW = '/reviews/guide-reviews'

const reviewApi = {
  getReviewsOfTour(id: number) {
    return http.get<SuccessResponse<Review[]>>(`${URL_TOUR_REVIEW}/${id}`)
  },
  getReviewsOfGuide(id: number) {
    return http.get<SuccessResponse<Review[]>>(`${URL_GUIDE_REVIEW}/${id}`)
  }
}

export default reviewApi
