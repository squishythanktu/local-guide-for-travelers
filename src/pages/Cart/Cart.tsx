import { Box } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import cartApi from 'src/apis/cart.api'
import { AppContext } from 'src/contexts/app.context'
import Loading from 'src/pages/Loading/Loading'
import { Booking, BookingsInCart } from 'src/types/booking.type'
import CartBookingItem from './components/CartBookingItem'
import CartInfo from './components/CartInfo'
import CartTotal from './components/CartTotal'

export default function Cart() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const {
    data: cartData,
    refetch,
    isPending
  } = useQuery({
    queryKey: [`bookings in cart by ${profile?.id}`],
    queryFn: () => cartApi.getBookingsInCart(),
    placeholderData: keepPreviousData,
    staleTime: 6 * 1000
  })

  if (!isAuthenticated)
    return (
      <div className='flex h-[550px] flex-col items-center justify-center'>
        <img loading='lazy' src='/assets/images/empty-cart.png' alt='Empty cart' className='h-52 w-52 object-cover' />
        <h3>You have to sign in first to see your cart.</h3>
      </div>
    )

  return (
    <Box className='container flex min-h-[550px] flex-col'>
      {isPending && <Loading />}
      {!isPending && (cartData?.data.data.bookings?.length === 0 || !cartData?.data.data.bookings) && (
        <div className='flex min-h-[550px] flex-col items-center justify-center'>
          <img loading='lazy' src='/assets/images/empty-cart.png' alt='Empty cart' className='h-52 w-52 object-cover' />
          <h3>No cart data available.</h3>
        </div>
      )}
      {!isPending && cartData && cartData.data.data.bookings && cartData.data.data.bookings.length > 0 && (
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-28'>
          <div className='py-5 lg:col-span-3'>
            <h2 className='cart__title pb-2 font-black'>Shopping cart</h2>
            <div className='cart__items'>
              <div className='flex flex-col gap-4'>
                {cartData.data.data.bookings.map((booking: Booking) => (
                  <CartBookingItem key={booking.id} booking={booking} refetch={refetch} />
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 pb-8 pt-0 lg:col-span-2 lg:pt-[60px]'>
            <div className='cart__total'>
              <CartTotal bookings={(cartData?.data.data as BookingsInCart).bookings} />
            </div>
            <div className='cart__info'>
              <CartInfo />
            </div>
          </div>
        </div>
      )}
    </Box>
  )
}
