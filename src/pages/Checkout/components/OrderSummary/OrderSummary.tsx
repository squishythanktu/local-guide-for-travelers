import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import Rating from '@mui/material/Rating'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useCallback, useContext, useEffect, useState } from 'react'
import cartApi from 'src/apis/cart.api'
import ClockIcon from 'src/assets/svg/clock.svg'
import UsersIcon from 'src/assets/svg/users.svg'
import { AppContext } from 'src/contexts/app.context'
import Loading from 'src/pages/Loading'
import { formatDateLocaleString, formatTime } from 'src/utils/date-time'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import paymentApi from 'src/apis/payment.api'
import { useNavigate } from 'react-router-dom'

export default function OrderSummary() {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const { data: bookingsCartData } = useQuery({
    queryKey: [`booking in cart by ${profile?.id}`],
    queryFn: () => cartApi.getBookingsInCart(),
    placeholderData: keepPreviousData,
    staleTime: 6 * 1000
  })
  const totalBookingPrice = bookingsCartData?.data.data.bookings.reduce((total, booking) => total + booking.price, 0)
  const totalBookingLength = bookingsCartData?.data.data.bookings.length
  const [isProceedPaymentClicked, setIsProceedPaymentClicked] = useState<boolean>(false)

  const getFormattedBookingIds = useCallback(() => {
    return bookingsCartData?.data.data.bookings.map((booking) => booking.id).join(',') as string
  }, [bookingsCartData?.data.data.bookings])

  const { data: paymentUrl } = useQuery({
    queryKey: [`Get payment url for bookings with id ${getFormattedBookingIds}`],
    queryFn: () =>
      paymentApi.getPaymentUrl({
        price: totalBookingPrice as number,
        bookingIds: getFormattedBookingIds()
      }),
    enabled: !!isProceedPaymentClicked
  })

  useEffect(() => {
    if (paymentUrl?.data.data) {
      window.location.href = paymentUrl.data.data
    }
  }, [navigate, paymentUrl])

  return (
    <>
      <h3 className='pb-3'>Order summary</h3>
      <Box style={{ maxHeight: 600, overflow: 'auto' }}>
        {bookingsCartData ? (
          bookingsCartData.data.data.bookings.map((bookingCartData, index) => (
            <Card key={index} className='mb-4 rounded-lg border-2 shadow-none'>
              <CardHeader
                avatar={
                  <CardMedia
                    className='h-16 w-16 rounded-lg object-cover'
                    component='img'
                    alt='Tour image'
                    src={bookingCartData.tour.images[0]?.imageLink || '/assets/images/default-cover.jpg'}
                  />
                }
                title={
                  <div className='item-card__header'>
                    <div className='title text-lg font-medium'>{bookingCartData.tour.name}</div>
                    <div className='text-sm'>
                      Provided by <span className='text-sm underline'>USS Midway Museum</span>
                    </div>
                    <div className='rating flex'>
                      <div className='activity-rating flex items-center gap-1 '>
                        <Rating
                          max={5}
                          precision={0.1}
                          value={bookingCartData.tour.overallRating}
                          size='large'
                          readOnly
                        />
                        <div className='text-sm font-medium'>{bookingCartData.tour.overallRating}</div>
                      </div>
                    </div>
                  </div>
                }
              />
              <CardContent className='flex gap-6'>
                <div className='flex items-center font-normal'>
                  <ClockIcon className='mb-[2px] mr-2 h-4 w-4' />
                  <div className='text-sm font-medium'>
                    {formatDateLocaleString(bookingCartData.startDate)} -{' '}
                    {formatTime(bookingCartData.startDate.toString().split('T')[1], 'HH:mm:ss', 'HH:mm')}
                  </div>
                </div>
                <div className='flex items-center font-normal'>
                  <UsersIcon className='mb-[2px] mr-2 h-4 w-4' />
                  <div className='text-sm font-medium'>{bookingCartData.numberTravelers} person(s)</div>
                </div>
              </CardContent>
              <Divider />
              <div className='flex justify-between px-4 py-2'>
                <div className='text-lg font-extrabold'>Subtotal</div>
                <div className='flex flex-col items-end'>
                  <Typography
                    className='text-lg font-extrabold'
                    sx={{ color: (theme) => theme.palette.secondary.main }}
                  >
                    ${bookingCartData.price.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Loading />
        )}
      </Box>
      <Box className='mt-4 flex justify-between rounded-b-md  bg-slate-100 px-4 py-2'>
        <div className='t text-lg font-extrabold'>Total ({totalBookingLength} item(s))</div>
        <div className='flex flex-col items-end'>
          <Typography className='text-lg font-extrabold' sx={{ color: (theme) => theme.palette.secondary.main }}>
            ${totalBookingPrice?.toLocaleString()}
          </Typography>
          <div className='text-xs font-medium text-emerald-700'>All taxes and fees included</div>
          <Button
            variant='contained'
            className='mt-4'
            size='large'
            endIcon={<ArrowForwardIosOutlinedIcon />}
            onClick={() => setIsProceedPaymentClicked(true)}
          >
            Proceed Payment
          </Button>
        </div>
      </Box>
    </>
  )
}
