import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type TourCategory = {
  id: number
  name: string
}

type ImageWithLink = {
  id: number
  imageLink: string
}

export type Tour = {
  id: number
  name: string
  description: string
  transportation: string
  includeService: string
  duration: number
  unit: string
  overallRating: number
  estimatedLocalCashNeeded: string
  pricePerTraveler: number
  limitTraveler: number
  extraPrice: number
  province: string
  itinerary: string
  categories: TourCategory[]
  guide: User
  images: ImageWithLink[]
}

export interface TourListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'rating' | 'price'
  order?: 'asc' | 'desc'
  rating_filter?: number | string
  min_price?: number | string
  max_price?: number | string
  search_name?: string
  category?: string
  start_date?: string
  end_date?: string
}

export type TourSuccessResponse = SuccessResponse<Tour>
