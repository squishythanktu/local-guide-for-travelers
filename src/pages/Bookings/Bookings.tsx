import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useQuery } from '@tanstack/react-query'
import { SyntheticEvent, useContext, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import bookingApi from 'src/apis/booking.api'
import BookingSummaryCard from 'src/components/BookingSummaryCard/BookingSummaryCard'
import TabPanel from 'src/components/TabPanel/TabPanel'
import { AppContext } from 'src/contexts/app.context'
import theme from 'src/theme'
import { a11yProps } from 'src/utils/tab-panel'
import Loading from '../Loading'

const Bookings: React.FC = () => {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [value, setValue] = useState<number>(0)
  const { data: bookingsHistoryData } = useQuery({
    queryKey: [`get bookings history of user ${profile?.email}`],
    queryFn: () => bookingApi.getBookingsHistory(),
    staleTime: 10 * 1000
  })

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <Box className='container flex min-h-[550px] flex-col py-5'>
      {!isAuthenticated && (
        <div className='flex h-[550px] flex-col items-center justify-center'>
          <img src='/assets/images/empty-booking.png' alt='Empty booking' className='h-52 w-52 object-cover' />
          <h3>You have to sign in first to see your bookings.</h3>
        </div>
      )}
      {isAuthenticated && !bookingsHistoryData?.data.data && <Loading />}
      {isAuthenticated && bookingsHistoryData?.data.data && bookingsHistoryData.data.data.length > 0 ? (
        <>
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
              {/* TODO: Handle API bookings */}All
            </TabPanel>
            <TabPanel value={2} index={2} dir={theme.direction}>
              {/* TODO: Handle API bookings */}Upcoming bookings
            </TabPanel>
            <TabPanel value={3} index={3} dir={theme.direction}>
              <Box style={{ maxHeight: 1000, overflow: 'auto' }}>
                {!bookingsHistoryData?.data.data ? (
                  <Loading />
                ) : bookingsHistoryData?.data.data.length > 0 ? (
                  bookingsHistoryData.data.data.map((bookingCartData, index) => (
                    <BookingSummaryCard key={index} booking={bookingCartData} />
                  ))
                ) : (
                  <div className='flex h-[550px] flex-col items-center justify-center'>
                    <img
                      src='/assets/images/empty-booking.png'
                      alt='Empty booking'
                      className='h-52 w-52 object-cover'
                    />
                    <h3>No bookings data available.</h3>
                  </div>
                )}
              </Box>
            </TabPanel>
          </SwipeableViews>
        </>
      ) : (
        <div className='flex h-[550px] flex-col items-center justify-center'>
          <img src='/assets/images/empty-booking.png' alt='Empty booking' className='h-52 w-52 object-cover' />
          <h3>No bookings data available.</h3>
        </div>
      )}
    </Box>
  )
}

export default Bookings
