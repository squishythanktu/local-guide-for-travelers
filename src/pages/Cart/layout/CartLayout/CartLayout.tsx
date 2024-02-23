import CartInfo from '../../components/CartInfo'
import CartItems from '../../components/CartItems'
import CartTotal from '../../components/CartTotal'

export default function CartLayout() {
  return (
    <div className='container grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-28'>
      <div className='py-5 lg:col-span-3'>
        <div className='cart__title pb-5 text-2xl font-black'>Shopping cart</div>
        <div className='cart__items'>
          <CartItems />
        </div>
      </div>
      <div className='flex flex-col gap-6 pb-8 pt-[60px] lg:col-span-2'>
        <div className='cart__total'>
          <CartTotal />
        </div>
        <div className='cart__info'>
          <CartInfo />
        </div>
      </div>
    </div>
  )
}
