import LoadingButton from '@mui/lab/LoadingButton'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartApi from 'src/apis/cart.api'
import paymentApi from 'src/apis/payment.api'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { BookingsInCart } from 'src/types/booking.type'
import { PassengerInformationSchema } from 'src/utils/rules'

interface Props {
  passengerInfo: PassengerInformationSchema
  isDisplaySaveButton: boolean
  bookingId?: number
}

const PaymentMethod: React.FC<Props> = ({ passengerInfo, isDisplaySaveButton, bookingId }: Props) => {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const { data: bookingsCartData } = useQuery({
    queryKey: [`booking in cart by ${profile?.id}`],
    queryFn: () => cartApi.getBookingsInCart(),
    placeholderData: keepPreviousData,
    staleTime: 6 * 1000
  })
  const totalBookingPrice = bookingsCartData?.data.data.bookings.reduce((total, booking) => total + booking.price, 0)
  const [isProceedPaymentClicked, setIsProceedPaymentClicked] = useState<boolean>(false)
  const [isTransferMoney, setIsTransferMoney] = useState<boolean>(false)

  const getFormattedBookingIds = useCallback(() => {
    return (bookingsCartData?.data.data as BookingsInCart).bookings!.map((booking) => booking.id).join(',') as string
  }, [bookingsCartData?.data.data])

  const { data: paymentUrl, isLoading: VNPaymentLoading } = useQuery({
    queryKey: [`Get payment url for bookings with id ${getFormattedBookingIds}`],
    queryFn: () =>
      paymentApi.getPaymentUrl({
        price: !bookingId
          ? (totalBookingPrice as number)
          : bookingsCartData
            ? bookingsCartData.data.data.bookings.slice(-1)[0].price
            : 0,
        bookingIds: bookingId ? bookingId.toString() : getFormattedBookingIds(),
        fullName: passengerInfo.fullName,
        email: passengerInfo.email,
        phone: passengerInfo.phone
      }),
    enabled: !!isProceedPaymentClicked
  })

  const { data: coinData, isLoading: cryptoPaymentLoading } = useQuery({
    queryKey: [`Convert ${totalBookingPrice} dollars to coins `],
    queryFn: () => paymentApi.transferMoney(totalBookingPrice as number),
    enabled: !!isTransferMoney
  })

  useEffect(() => {
    if (paymentUrl?.data.data) {
      window.location.href = paymentUrl.data.data
    }
  }, [navigate, paymentUrl])

  const handlePayment = () => {
    if (!isDisplaySaveButton) setIsProceedPaymentClicked(true)
    else toast.error('Please fill in the complete Passenger Information and save.')
  }

  const handleCryptoPayment = () => {
    setIsTransferMoney(true)
  }

  if (isTransferMoney && coinData?.data.data)
    navigate(path.cryptoPayment, {
      state: {
        priceTotal: totalBookingPrice,
        coin: coinData?.data.data,
        bookingIds: getFormattedBookingIds(),
        passengerInfo: passengerInfo
      }
    })

  useEffect(() => {
    if (isTransferMoney) {
      setIsTransferMoney(false)
    }
  }, [])

  return (
    <>
      <div className='mt-4 rounded-lg border-2 p-4 shadow-none'>
        <h3 className='pb-4'>Payment method</h3>
        <div className='grid grid-cols-2  justify-items-center gap-3'>
          <div className='col-span-1'>
            <img loading='lazy' src='/assets/images/coin-payment.png' alt='coin-payment' className='h-9' />
            <LoadingButton
              loading={cryptoPaymentLoading}
              variant='outlined'
              className='mt-4'
              size='large'
              onClick={handleCryptoPayment}
            >
              Payment with crypto
            </LoadingButton>
          </div>
          <div className='col-span-1'>
            <img loading='lazy' src='/assets/images/vnpay.png' alt='coin-payment' className='h-9' />
            <LoadingButton
              loading={VNPaymentLoading}
              variant='outlined'
              className='mt-4'
              size='large'
              onClick={handlePayment}
            >
              Payment with VNPay
            </LoadingButton>
          </div>
        </div>
      </div>
    </>
  )
}
export default PaymentMethod
