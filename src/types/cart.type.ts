import { Tour } from './tour.type'

export type BookingsInCart = {
  id: number
  bookings: Booking[]
}

export type Booking = {
  id: string
  startDate: string
  numberTraveler: number
  price: number
  status: string
  tour: Tour
}
