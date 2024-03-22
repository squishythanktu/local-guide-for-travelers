import { Box } from '@mui/material'
import BookingSummaryCard from 'src/components/BookingSummaryCard/BookingSummaryCard'
import Loading from 'src/pages/Loading'
import { Booking } from 'src/types/booking.type'

interface Props {
  bookingList: Booking[]
}

const BookingContent: React.FC<Props> = ({ bookingList }: Props) => {
  return (
    <Box style={{ maxHeight: 376, overflow: 'auto' }}>
      {!bookingList ? (
        <Loading />
      ) : bookingList.length > 0 ? (
        bookingList.map((bookingCartData, index) => <BookingSummaryCard key={index} booking={bookingCartData} />)
      ) : (
        <div className='flex h-[550px] flex-col items-center justify-center'>
          <img src='/assets/images/empty-booking.png' alt='Empty booking' className='h-52 w-52 object-cover' />
          <h3>No bookings data available.</h3>
        </div>
      )}
    </Box>
  )
}
export default BookingContent
