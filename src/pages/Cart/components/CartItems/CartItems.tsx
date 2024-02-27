import { Booking } from 'src/types/cart.type'
import ItemCard from './ItemCard'

interface CartItemsProps {
  bookings: Booking[]
}

export default function CartItems({ bookings }: CartItemsProps) {
  return (
    <div className='flex flex-col gap-6'>
      {bookings.length > 0 ? (
        bookings.map((booking: Booking) => <ItemCard key={booking.id} booking={booking} />)
      ) : (
        <div className='flex h-[450px] flex-col items-center justify-center'>
          <img src='/assets/images/empty-cart.png' alt='Empty cart' className='h-52 w-52 object-cover' />
          <h3>You haven't added any tours to the cart yet.</h3>
        </div>
      )}
    </div>
  )
}
