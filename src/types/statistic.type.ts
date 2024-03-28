import { Omit } from 'lodash'
import { Guide } from './guide.type'
import { Tour } from './tour.type'

export type TourInStatistic = Pick<
  Tour,
  'id' | 'name' | 'pricePerTraveler' | 'limitTraveler' | 'extraPrice' | 'overallRating'
> & { overallRating: number; totalTravelerNumber: number; totalRevenue: number; totalBooking: number }

export type GuideInStatistic = Omit<
  Guide,
  'biography' | 'credential' | 'avatar' | 'languageSkill' | 'numberOfReviews'
> & { totalTravelerNumber: number; totalRevenue: number; totalBooking: number }
