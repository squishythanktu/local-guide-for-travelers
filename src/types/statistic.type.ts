import { PageResult } from './page-result.type'
import { Omit } from 'lodash'
import { Guide } from './guide.type'
import { Tour } from './tour.type'

export type TourStatisticByGuideResult = PageResult & {
  statisticalTourDTOS: TourInStatistic[]
}

export type TourStatisticResult = {
  tourDTOS: TourInStatistic[]
} & PageResult

export type TourInStatistic = Pick<
  Tour,
  'id' | 'name' | 'pricePerTraveler' | 'limitTraveler' | 'extraPrice' | 'overallRating'
> & { overallRating: number; totalTravelerNumber: number; totalRevenue: number }

export type GuideInStatistic = Omit<
  Guide,
  'biography' | 'credential' | 'avatar' | 'languageSkill' | 'numberOfReviews'
> & { totalTravelerNumber: number; totalRevenue: number; totalBooking: number }

export type GuideStatisticResult = {
  statisticalGuideDTOS: GuideInStatistic[]
} & PageResult
