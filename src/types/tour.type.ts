import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type TourCategory = {
  id: number
  name: string
}

export type ImageWithLink = {
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
  address: string
  images: ImageWithLink[]
}

export interface TourListConfig {
  page?: number | string
  limit?: number | string
  sortBy?: 'rating' | 'price'
  order?: 'asc' | 'desc'
  overallRating?: number | string
  minPrice?: number | string
  maxPrice?: number | string
  searchValue?: string
  categoryId?: number[]
  start_date?: string
  end_date?: string
}

export type TourSuccessResponse = SuccessResponse<Tour>
