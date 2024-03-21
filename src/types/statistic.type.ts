export type StatisticOfTour = {
  tourDTOS: TourInStatistic[]
  totalOfPage: number
  totalOfResult: number
}

export type TourInStatistic = {
  id: number
  name: string
  pricePerTraveler: number
  limitTraveler: number
  extraPrice: number
  overallRating: number
  totalTravelerNumber: number
  totalRevenue: number
}
