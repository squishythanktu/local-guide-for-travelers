type TourCategory = {
  id: number
  name: string
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
