import cartApi from 'src/apis/cart.api'
import CartInfo from './components/CartInfo'
import CartTotal from './components/CartTotal'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Loading from 'src/pages/Loading'
import { Booking } from 'src/types/cart.type'
import CartBookingItem from './components/CartBookingItem'

export default function Cart() {
  const { profile } = useContext(AppContext)

  const { data: cartData, refetch } = useQuery({
    queryKey: [`booking in cart by ${profile?.id}`],
    queryFn: () => cartApi.getBookingsInCart(),
    placeholderData: keepPreviousData,
    staleTime: 6 * 1000
  })

  return (
    <>
      {cartData ? (
        <div className='container grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-28'>
          <div className='py-5 lg:col-span-3'>
            <div className='cart__title pb-2 text-2xl font-black'>Shopping cart</div>
            <div className='cart__items'>
              <div className='flex flex-col gap-6'>
                {cartData && cartData.data.data.bookings.length > 0 ? (
                  cartData.data.data.bookings.map((booking: Booking) => (
                    <CartBookingItem key={booking.id} booking={booking} refetch={refetch} />
                  ))
                ) : (
                  <div className='flex h-[450px] flex-col items-center justify-center'>
                    <img src='/assets/images/empty-cart.png' alt='Empty cart' className='h-52 w-52 object-cover' />
                    <h3>You haven't added any tours to the cart yet.</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6 pb-8 pt-[60px] lg:col-span-2'>
            <div className='cart__total'>
              <CartTotal bookings={cartData?.data.data.bookings || []} />
            </div>
            <div className='cart__info'>
              <CartInfo />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}