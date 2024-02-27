import cartApi from 'src/apis/cart.api'
import CartInfo from '../../components/CartInfo'
import CartItems from '../../components/CartItems'
import CartTotal from '../../components/CartTotal'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

export default function CartLayout() {
  const { profile } = useContext(AppContext)

  const { data: cartData, refetch } = useQuery({
    queryKey: [`booking in cart by ${profile?.id}`],
    queryFn: () => cartApi.getBookingInCart(),
    placeholderData: keepPreviousData,
    staleTime: 6 * 1000
  })

  return (
    <div className='container grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-28'>
      <div className='py-5 lg:col-span-3'>
        <div className='cart__title pb-5 text-2xl font-black'>Shopping cart</div>
        <div className='cart__items'>
          <CartItems bookings={cartData?.data.data.bookings || []} refetch={refetch} />
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
  )
}
