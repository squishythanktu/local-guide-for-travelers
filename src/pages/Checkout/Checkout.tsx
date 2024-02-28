import OrderSummary from './components/OrderSummary'
import Payment from './components/Payment'

export default function Checkout() {
  return (
    <div className='container flex flex-col gap-10 py-4 md:flex-row-reverse md:gap-5'>
      <div className='checkout__order-summary w-full md:w-[50%] lg:w-[40%]'>
        <OrderSummary />
      </div>
      <div className='checkout__personal-details w-full md:w-[50%] lg:w-[60%]'>
        <Payment />
      </div>
    </div>
  )
}
