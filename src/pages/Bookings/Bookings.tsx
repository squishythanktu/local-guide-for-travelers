/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useQuery } from '@tanstack/react-query'
import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import bookingApi from 'src/apis/booking.api'
import invoiceApi from 'src/apis/invoice.api'
import TabPanel from 'src/components/TabPanel/TabPanel'
import { AppContext } from 'src/contexts/app.context'
import theme from 'src/theme'
import { Booking } from 'src/types/booking.type'
import { compareDate } from 'src/utils/date-time'
import { a11yProps } from 'src/utils/tab-panel'
import Loading from '../Loading'
import BookingContent from './components/BookingContent/BookingContent'
import InvoiceComponent from './components/InvoiceComponent/InvoiceComponent'

const Bookings: React.FC = () => {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [value, setValue] = useState<number>(0)
  const { data: bookingsHistoryData } = useQuery({
    queryKey: [`get bookings history of user ${profile?.email}`],
    queryFn: () => bookingApi.getBookingsHistory(),
    staleTime: 10 * 1000
  })

  const { data: invoicesData, refetch: refetchInvoicesData } = useQuery({
    queryKey: [`Get invoices by user with id ${profile?.id}`],
    queryFn: () => invoiceApi.getInvoices()
  })

  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([])
  const [pastBookings, setPastBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (bookingsHistoryData?.data.data) {
      setUpcomingBookings(
        bookingsHistoryData?.data.data.filter((booking) => {
          return compareDate(booking.startDate, new Date()) > 0
        })
      )
      setPastBookings(
        bookingsHistoryData?.data.data.filter((booking) => {
          return compareDate(booking.startDate, new Date()) < 0
        })
      )
    }
  }, [bookingsHistoryData])

  const handleChange = (_: SyntheticEvent, newValue: number) => setValue(newValue)

  const handleChangeIndex = (index: number) => setValue(index)

  if (!isAuthenticated)
    return (
      <div className='flex h-[550px] flex-col items-center justify-center'>
        <img src='/assets/images/empty-booking.png' alt='Empty booking' className='h-52 w-52 object-cover' />
        <h3>You have to sign in first to see your bookings.</h3>
      </div>
    )

  return (
    <Box className='container flex min-h-[550px] flex-col '>
      {isAuthenticated && !bookingsHistoryData?.data.data && <Loading />}
      {isAuthenticated && bookingsHistoryData?.data.data && bookingsHistoryData.data.data.length > 0 ? (
        <div>
          <div>
            <h1 className='my-bookings__title'>My bookings</h1>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='secondary'
              textColor='inherit'
              className='mt-3 w-full rounded-xl border shadow-none md:w-1/2'
              sx={{
                color: (theme) => theme.palette.primary.main,
                backgroundColor: (theme) => theme.palette.common.white,
                borderColor: (theme) => theme.palette.primary.main
              }}
            >
              <Tab className='w-1/3' label={`All`} {...a11yProps(1)} />
              <Tab className='w-1/3' label={`Upcoming bookings`} {...a11yProps(2)} />
              <Tab className='w-1/3' label={`Past bookings`} {...a11yProps(3)} />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={1} index={1} dir={theme.direction}>
                <BookingContent bookingList={bookingsHistoryData?.data.data} />
              </TabPanel>
              <TabPanel value={2} index={2} dir={theme.direction}>
                <BookingContent bookingList={upcomingBookings} />
              </TabPanel>
              <TabPanel value={3} index={3} dir={theme.direction}>
                <BookingContent bookingList={pastBookings} />
              </TabPanel>
            </SwipeableViews>
          </div>
          <div>
            <h1
              onClick={() =>
                window.scrollTo({
                  top: 600,
                  behavior: 'smooth'
                })
              }
              className='my-bookings__title mt-6'
            >
              My invoices
            </h1>
            {invoicesData?.data.data &&
              invoicesData?.data.data.map((invoice, index) => (
                <InvoiceComponent key={index} invoice={invoice} refetchInvoicesData={refetchInvoicesData} />
              ))}
          </div>
        </div>
      ) : (
        <div className='flex h-[550px] flex-col items-center justify-center'>
          <img src='/assets/images/empty-booking.png' alt='Empty booking' className='h-52 w-52 object-cover' />
          <h3>No bookings & invoices data available.</h3>
        </div>
      )}
    </Box>
  )
}

export default Bookings
