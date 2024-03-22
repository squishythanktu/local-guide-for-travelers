import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartApi from 'src/apis/cart.api'
import paymentApi from 'src/apis/payment.api'
import BookingSummaryCard from 'src/components/BookingSummaryCard/BookingSummaryCard'
import { AppContext } from 'src/contexts/app.context'
import Loading from 'src/pages/Loading'
import { BookingsInCart } from 'src/types/booking.type'
import { PassengerInformationSchema } from 'src/utils/rules'

interface Props {
  passengerInfo: PassengerInformationSchema
  isDisplaySaveButton: boolean
}

const OrderSummary: React.FC<Props> = ({ passengerInfo, isDisplaySaveButton }: Props) => {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const { data: bookingsCartData } = useQuery({
    queryKey: [`booking in cart by ${profile?.id}`],
    queryFn: () => cartApi.getBookingsInCart(),
    placeholderData: keepPreviousData,
    staleTime: 6 * 1000
  })
  const totalBookingPrice = (bookingsCartData?.data.data as BookingsInCart).bookings!.reduce(
    (total, booking) => total + booking.price,
    0
  )
  const totalBookingLength = (bookingsCartData?.data.data as BookingsInCart).bookings!.length
  const [isProceedPaymentClicked, setIsProceedPaymentClicked] = useState<boolean>(false)

  const getFormattedBookingIds = useCallback(() => {
    return (bookingsCartData?.data.data as BookingsInCart).bookings!.map((booking) => booking.id).join(',') as string
  }, [bookingsCartData?.data.data])

  const { data: paymentUrl } = useQuery({
    queryKey: [`Get payment url for bookings with id ${getFormattedBookingIds}`],
    queryFn: () =>
      paymentApi.getPaymentUrl({
        price: totalBookingPrice as number,
        bookingIds: getFormattedBookingIds(),
        fullName: passengerInfo.fullName,
        email: passengerInfo.email,
        phone: passengerInfo.phone
      }),
    enabled: !!isProceedPaymentClicked
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

  return (
    <>
      <h1 className='pb-3'>Order summary</h1>
      <Box style={{ maxHeight: 600, overflow: 'auto' }}>
        {bookingsCartData ? (
          (bookingsCartData.data.data as BookingsInCart).bookings!.map((bookingCartData, index) => (
            <BookingSummaryCard key={index} booking={bookingCartData} />
          ))
        ) : (
          <Loading />
        )}
      </Box>
      <Box className='mt-4 flex justify-between rounded-b-md  bg-slate-100 px-4 py-2'>
        <div className='t text-lg font-extrabold'>Total ({totalBookingLength} item(s))</div>
        <div className='flex flex-col items-end'>
          <Typography
            className='text-lg font-semibold sm:text-xl md:text-2xl'
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            ${totalBookingPrice?.toLocaleString()}
          </Typography>
          <div className='text-xs font-medium text-emerald-700'>All taxes and fees included</div>
          <Button
            variant='contained'
            className='mt-4'
            size='large'
            endIcon={<ArrowForwardIosOutlinedIcon />}
            onClick={handlePayment}
          >
            Proceed Payment
          </Button>
        </div>
      </Box>
    </>
  )
}

export default OrderSummary
