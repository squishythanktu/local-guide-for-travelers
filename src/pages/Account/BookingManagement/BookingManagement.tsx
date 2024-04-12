import Box from '@mui/material/Box'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import guideApi from 'src/apis/guide.api'
import { AppContext } from 'src/contexts/app.context'
import BookingContent from 'src/pages/Bookings/components/BookingContent/BookingContent'

const BookingManagement: React.FC = () => {
  const { profile } = useContext(AppContext)
  const { data: bookingsData } = useQuery({
    queryKey: [`get booking by guide ${profile}`],
    queryFn: () => guideApi.getBookings()
  })
  return (
    <Box className='h-full'>
      <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Booking Management
      </h2>
      <Box className='max-h-[1000px] overflow-auto'>
        <BookingContent bookingList={bookingsData?.data.data} />
      </Box>
    </Box>
  )
}
export default BookingManagement
