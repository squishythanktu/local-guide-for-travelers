import Grid from '@mui/material/Grid'
import dayjs from 'dayjs'
import MainStop from 'src/components/MainStop/MainStop'
import { Booking } from 'src/types/booking.type'

interface Props {
  booking: Booking
}
export default function ToursInfo({ booking }: Props) {
  return (
    <div className='flex flex-col gap-2 pl-4'>
      <Grid container className='mb-3' spacing={{ xs: 1, md: 1, sm: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} sm={8} md={6}>
          <div className='text-sm font-medium'>
            Tour name: <span className='text-sm'>{booking.tour.name}</span>
          </div>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <div className='text-sm font-medium'>
            Start date: <span className='text-sm'>{dayjs(booking.startDate).format('DD/MM/YYYY')}</span>
          </div>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <div className='text-sm font-medium'>
            Number of traveler(s): <span className='text-sm'>{booking.numberTravelers}</span>
          </div>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <div className='text-sm font-medium'>
            Price: <span className='text-sm'>${booking.price.toLocaleString()}</span>
          </div>
        </Grid>
      </Grid>
      <MainStop locations={booking.tour.locations} orientation='vertical' isShowAddress={false} />
    </div>
  )
}
