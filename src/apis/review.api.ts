import { Review } from 'src/types/review.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { CommentSchema } from 'src/utils/rules'

export type CommentFormData = CommentSchema

export const URL_TOUR_REVIEW = '/reviews/tour-reviews'
export const URL_GUIDE_REVIEW = '/reviews/guide-reviews'

const reviewApi = {
  getReviewsOfTour(tourId: number) {
    return http.get<SuccessResponse<Review[]>>(`${URL_TOUR_REVIEW}/${tourId}`)
  },
  addReviewsOfTourById(tourId: number, body: CommentFormData) {
    return http.post<SuccessResponse<Review[]>>(`${URL_TOUR_REVIEW}/${tourId}`, body)
  },
  updateReviewsOfTourById(reviewId: number, body: CommentFormData) {
    return http.put<SuccessResponse<Review[]>>(`${URL_TOUR_REVIEW}/${reviewId}`, body)
  },
  deleteReviewsOfTourById(reviewId: number) {
    return http.delete<SuccessResponse<void>>(`${URL_TOUR_REVIEW}/${reviewId}`)
  },
  getReviewsOfGuide(guideId: number) {
    return http.get<SuccessResponse<Review[]>>(`${URL_GUIDE_REVIEW}/${guideId}`)
  }
}

export default reviewApi
