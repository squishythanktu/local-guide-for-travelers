import { Box, Button } from '@mui/material'
import List from '@mui/material/List'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ScheduleLists } from 'src/types/schedule.type'
import { formatDate } from 'src/utils/date-time'

interface Props {
  dateList?: ScheduleLists
}

const DateList: React.FC<Props> = ({ dateList }: Props) => {
  const [pastBusyDates, setPastBusyDates] = useState<Date[]>([])
  const [futureBusyDates, setFutureBusyDates] = useState<Date[]>([])
  const [pastBookedDates, setPastBookedDates] = useState<Date[]>([])
  const [futureBookedDates, setFutureBookedDates] = useState<Date[]>([])

  const [dayState, setDayState] = useState<'daysOff' | 'bookedDays'>('daysOff')
  const [temporalState, setTemporalState] = useState<'upcoming' | 'past'>('upcoming')
  const [displayDates, setDisplayDates] = useState<Date[]>([])

  function compareDates(a: Date, b: Date) {
    return a.getTime() - b.getTime()
  }

  useEffect(() => {
    const updatedPastBusyDates: Date[] = []
    const updatedFutureBusyDates: Date[] = []
    const updatedPastBookedDates: Date[] = []
    const updatedFutureBookedDates: Date[] = []

    dateList?.busyDayOfGuider.forEach((item) => {
      const busyDate = new Date(item)
      if (busyDate < new Date()) {
        pastBusyDates.push(busyDate)
      } else {
        futureBusyDates.push(busyDate)
      }
    })

    dateList?.busyDayByBooking.forEach((item) => {
      const busyDate = new Date(item)
      if (busyDate < new Date()) {
        pastBookedDates.push(busyDate)
      } else {
        futureBookedDates.push(busyDate)
      }
    })
    setPastBusyDates(updatedPastBusyDates)
    setFutureBusyDates(updatedFutureBusyDates)
    setPastBookedDates(updatedPastBookedDates)
    setFutureBookedDates(updatedFutureBookedDates)

    if (dayState.toString() === 'daysOff') {
      if (temporalState.toString() === 'upcoming') {
        setDisplayDates(futureBusyDates.sort(compareDates))
        return
      }
      setDisplayDates(pastBusyDates.sort(compareDates))
      return
    }

    if (temporalState.toString() === 'upcoming') {
      setDisplayDates(futureBookedDates.sort(compareDates))
      return
    }
    setDisplayDates(pastBookedDates.sort(compareDates))
  }, [dateList, dayState, temporalState])

  const handleBookedDaysButton = () => {
    setDayState('bookedDays')
  }
  const handleDaysOffButton = () => {
    setDayState('daysOff')
  }
  const handleUpcomingButton = () => {
    setTemporalState('upcoming')
  }
  const handlePastButton = () => {
    setTemporalState('past')
  }

  return (
    <Box className='rounded-lg border shadow-2xl'>
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.primary.light
        }}
        className='flex flex-col items-center justify-center rounded-t-md'
      >
        <Box
          sx={{ color: (theme) => theme.palette.primary.main, borderColor: (theme) => theme.palette.common.white }}
          className='w-full text-sm font-medium text-white'
        >
          <Button
            className='w-[50%] rounded-none border-none font-extrabold text-red-500'
            variant='outlined'
            size='small'
            onClick={handleDaysOffButton}
          >
            DAYS OFF
          </Button>
          <Button
            className='w-[50%] rounded-none border-none font-extrabold text-yellow-500'
            onClick={handleBookedDaysButton}
            variant='outlined'
            size='small'
          >
            BOOKED DAYS
          </Button>
        </Box>
        <Box className='w-full'>
          <Button
            className={classNames('w-[50%] rounded-none border-none', {
              'text-red-500': dayState.toString() === 'daysOff',
              'text-yellow-500': dayState.toString() !== 'daysOff',
              'underline decoration-2': temporalState.toString() === 'upcoming'
            })}
            variant='outlined'
            size='small'
            onClick={handleUpcomingButton}
          >
            Upcoming
          </Button>
          <Button
            onClick={handlePastButton}
            className={classNames('w-[50%]', 'rounded-none', 'border-none', {
              'text-red-500': dayState.toString() === 'daysOff',
              'text-yellow-500': dayState.toString() !== 'daysOff',
              'underline decoration-2': temporalState.toString() === 'past'
            })}
            variant='outlined'
            size='small'
          >
            Past
          </Button>
        </Box>
      </Box>
      <List
        disablePadding
        className='px-2 pt-2'
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: '288px',
          '@media (min-width: 346px)': {
            maxHeight: '370px'
          },
          '@media (min-width: 547px)': {
            maxHeight: '390px'
          },
          '@media (min-width: 768px)': {
            maxHeight: '370px'
          },
          '@media (min-width: 1124px)': {
            maxHeight: '390px'
          },
          borderRadius: '8px',
          '& ul': { padding: 0 }
        }}
        key={JSON.stringify(dateList)}
        subheader={<li />}
      >
        <div className=''></div>
        {displayDates.map((item, index) => (
          <Box
            sx={{ borderColor: (theme) => theme.palette.primary.main }}
            key={index}
            className='mx-4 my-1 rounded-md border py-1 md:mx-0 lg:mx-4'
          >
            <Box sx={{ color: (theme) => theme.palette.primary.main }} className='flex justify-center px-3'>
              {formatDate(item, 'MM/DD/YYYY')}
            </Box>
          </Box>
        ))}
      </List>
    </Box>
  )
}
export default DateList
