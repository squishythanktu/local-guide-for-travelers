import dayjs from 'dayjs'
import MainStop from 'src/pages/TourDetail/components/MainStop/MainStop'
import { BookingInInvoice } from 'src/types/invoice.type'

interface Props {
  booking: BookingInInvoice
}
export default function ToursInfo({ booking }: Props) {
  return (
    <div className='flex flex-col gap-2 pl-4'>
      <div className='text-sm font-medium'>
        Tour name: <span className='text-sm'>{booking.tour.name}</span>
      </div>
      <div className='text-sm font-medium'>
        Start date: <span className='text-sm'>{dayjs(booking.startDate).format('DD-MM-YYYY')}</span>
      </div>
      <div className='text-sm font-medium'>
        Number of traveler(s): <span className='text-sm'>{booking.numberTraveler}</span>
      </div>
      <div className='text-sm font-medium'>
        Price: <span className='text-sm'>{booking.price.toLocaleString()}</span>
      </div>
      <MainStop locations={booking.tour.locations} />
    </div>
  )
}
