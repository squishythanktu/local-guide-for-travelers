import { PageResult } from './page-result.type'

export type TourStatisticResult = PageResult & {
  tourDTOS: StatisticOfTour[]
}

export type TourStatisticByGuideResult = PageResult & {
  statisticalTourDTOS: StatisticOfTour[]
}

export type StatisticOfTour = {
  id: number
  name: string
  pricePerTraveler: number
  limitTraveler: number
  extraPrice: number
  overallRating: number
  totalTravelerNumber: number
  totalRevenue: number
  totalBooking: number
}
