import { Tour } from './tour.type'

export type TourInInvoice = Pick<Tour, 'id' | 'images' | 'name' | 'overallRating' | 'locations'>
export type BookingInInvoice = {
  id: number
  startDate: Date
  numberTraveler: number
  price: number
  status: string
  tour: TourInInvoice
}

export type Invoice = {
  id: number
  priceTotal: number
  createAt: Date
  status: string
  tours: BookingInInvoice[]
}
