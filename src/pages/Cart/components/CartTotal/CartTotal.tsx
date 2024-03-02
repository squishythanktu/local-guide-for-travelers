import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import AlertTitle from '@mui/material/AlertTitle'
import { Booking } from 'src/types/cart.type'

interface Props {
  bookings: Booking[]
}

export default function CartTotal({ bookings }: Props) {
  const totalBookingPrice = bookings.reduce((total, booking) => total + booking.price, 0)

  return (
    <div className=''>
      <Card className='rounded-lg border p-2'>
        <CardHeader
          title={
            <>
              <div className='item-card__header flex justify-between'>
                <div className='title whitespace-nowrap text-xl font-bold leading-5'>
                  Total ({bookings.length} {bookings.length > 1 ? 'items' : 'item'}):
                </div>
                <div className='flex flex-col items-end gap-1'>
                  <div className='title text-xl font-bold leading-5'>${totalBookingPrice.toLocaleString()}</div>
                  <div className='title text-right text-xs font-medium leading-5 text-emerald-700 lg:text-sm'>
                    All taxes and fees included
                  </div>
                </div>
              </div>
            </>
          }
        />
        <CardActions className='relative'>
          <Button
            type='submit'
            className='mr-2 w-[100%] rounded-full pr-7 font-semibold md:inline-block'
            variant='contained'
            size='large'
          >
            Go to checkout
          </Button>
        </CardActions>
        <CardContent>
          <Alert variant='standard' severity='success' className='text-sm'>
            <AlertTitle className='text-sm'>Free cancellation</AlertTitle>
            <div className='text-sm'>Until 24 hours before activity</div>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
