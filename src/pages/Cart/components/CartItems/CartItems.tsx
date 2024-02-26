import { Booking } from 'src/types/cart.type'
import ItemCard from './ItemCard'

interface Props {
  bookings: Booking[]
}

export default function CartItems({ bookings }: Props) {
  return (
    <div className='flex flex-col gap-6'>
      {bookings.map((booking: Booking) => (
        <ItemCard key={booking.id} booking={booking} />
      ))}
    </div>
  )
}
