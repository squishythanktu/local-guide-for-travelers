import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton } from '@mui/material'
import List from '@mui/material/List'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { DayInSchedule } from 'src/types/schedule.type'
import { compareDate, formatDate } from 'src/utils/date-time'

interface Props {
  busyByGuide: DayInSchedule[]
  busyByDay: DayInSchedule[]
  busyByHour: DayInSchedule[]
  handleDeleteDay: (date: Date) => () => void
}

const DateList: React.FC<Props> = ({ busyByGuide, busyByDay, handleDeleteDay, busyByHour }: Props) => {
  const [pastBusyDates, setPastBusyDates] = useState<Date[]>([])
  const [futureBusyDates, setFutureBusyDates] = useState<Date[]>([])
  const [pastBookedByDay, setPastBookedByDay] = useState<Date[]>([])
  const [futureBookedByDay, setFutureBookedByDay] = useState<Date[]>([])
  const [pastBookedByHour, setPastBookedByHour] = useState<Date[]>([])
  const [futureBookedByHour, setFutureBookedByHour] = useState<Date[]>([])

  const [dayState, setDayState] = useState<'daysOff' | 'bookedByDay' | 'bookedByHour'>('daysOff')
  const [temporalState, setTemporalState] = useState<'upcoming' | 'past'>('upcoming')
  const [displayDates, setDisplayDates] = useState<Date[]>([])

  const formattedData = (dateArr: Date[], type: 'ASC' | 'DESC') => {
    const data = [...new Set(dateArr)]
    if (type === 'DESC') return data.sort((a, b) => compareDate(b, a))
    return data.sort((a, b) => compareDate(a, b))
  }

  useEffect(() => {
    setPastBusyDates([])
    setFutureBusyDates([])
    setPastBookedByDay([])
    setFutureBookedByDay([])
    setPastBookedByHour([])
    setFutureBookedByHour([])
    busyByGuide.forEach((item) => {
      const busyDate = item.busyDate
      if (busyDate < new Date()) {
        pastBusyDates.push(busyDate)
      } else {
        futureBusyDates.push(busyDate)
      }
    })

    busyByDay.forEach((item) => {
      const busyDate = item.busyDate
      if (busyDate < new Date()) {
        pastBookedByDay.push(busyDate)
      } else {
        futureBookedByDay.push(busyDate)
      }
    })

    busyByHour.forEach((item) => {
      const busyDate = item.busyDate
      if (busyDate < new Date()) {
        pastBookedByHour.push(busyDate)
      } else {
        futureBookedByHour.push(busyDate)
      }
    })

    if (dayState.toString() === 'daysOff') {
      if (temporalState.toString() === 'upcoming') {
        setDisplayDates(formattedData(futureBusyDates, 'ASC'))
        return
      }
      setDisplayDates(formattedData(pastBusyDates, 'DESC'))
      return
    }

    if (dayState.toString() === 'bookedByHour') {
      if (temporalState.toString() === 'upcoming') {
        setDisplayDates(formattedData(futureBookedByHour, 'ASC'))
        return
      }
      setDisplayDates(formattedData(pastBookedByHour, 'DESC'))
      return
    }

    if (temporalState.toString() === 'upcoming') {
      setDisplayDates(formattedData(futureBookedByDay, 'ASC'))
      return
    }
    setDisplayDates(formattedData(pastBookedByDay, 'DESC'))
  }, [busyByGuide, busyByDay, busyByHour, temporalState, dayState])

  const handleBookedByDayButton = () => {
    setDayState('bookedByDay')
  }
  const handleBookedByHourButton = () => {
    setDayState('bookedByHour')
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
    <Box className='h-[332px] rounded-md border' sx={{ bgcolor: 'background.paper' }}>
      <Box className='flex flex-col items-center justify-center rounded-t-md'>
        <Box
          sx={{
            color: (theme) => theme.palette.primary.main,
            borderColor: (theme) => theme.palette.common.white,
            display: 'flex',
            flexWrap: 'wrap'
          }}
          className='w-full text-sm font-medium text-white'
        >
          <Button
            variant='outlined'
            size='small'
            onClick={handleDaysOffButton}
            className={classNames('w-[33.33%] rounded-none rounded-tl-md border-none', {
              'bg-[#fff0f1]': dayState.toString() === 'daysOff'
            })}
            sx={{
              flex: '1 1 auto'
            }}
          >
            DAYS OFF
          </Button>
          <Button
            onClick={handleBookedByDayButton}
            variant='outlined'
            size='small'
            className={classNames('w-[33.33%] rounded-none border-none ', {
              'bg-[#fff9eb]': dayState.toString() === 'bookedByDay'
            })}
            sx={{
              flex: '1 1 auto'
            }}
          >
            BOOKED BY DAY
          </Button>
          <Button
            onClick={handleBookedByHourButton}
            variant='outlined'
            size='small'
            className={classNames('w-[33.33%] rounded-none rounded-tr-md border-none', {
              'bg-[#e9fbf0]': dayState.toString() === 'bookedByHour'
            })}
            sx={{
              flex: '1 1 auto'
            }}
          >
            BOOKED BY HOUR
          </Button>
        </Box>
        <Box
          className={classNames('flex w-full border-y', {
            'border-t-yellow-500': dayState.toString() === 'bookedByDay',
            'border-t-green-500': dayState.toString() === 'bookedByHour',
            'border-t-red-500': dayState.toString() === 'daysOff'
          })}
        >
          <Button
            className={classNames('w-[50%] rounded-none border-none font-normal', {
              'bg-[#fff9eb] ': dayState.toString() === 'bookedByDay',
              'bg-transparent ': dayState.toString() === 'bookedByHour' && temporalState.toString() === 'past',
              'bg-[#e9fbf0] ': dayState.toString() === 'bookedByHour' && temporalState.toString() === 'upcoming',
              'bg-[#fff0f1] ': dayState.toString() === 'daysOff',
              'bg-transparent': temporalState.toString() === 'past'
            })}
            variant='outlined'
            size='small'
            onClick={handleUpcomingButton}
          >
            Upcoming
          </Button>
          <Button
            onClick={handlePastButton}
            className={classNames('w-[50%]', 'rounded-none', 'border-none', 'font-normal', {
              'bg-[#fff0f1] ': dayState.toString() === 'daysOff',
              'bg-[#fff9eb] ': dayState.toString() === 'bookedByDay',
              'bg-transparent ': dayState.toString() === 'bookedByHour' && temporalState.toString() === 'upcoming',
              'bg-[#e9fbf0] ': dayState.toString() === 'bookedByHour' && temporalState.toString() === 'past',
              'bg-transparent': temporalState.toString() === 'upcoming'
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
        className='rounded-b-md px-2 pt-2'
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: '288px',
          '@media (min-width: 346px)': {
            maxHeight: '230px'
          },
          '@media (min-width: 547px)': {
            maxHeight: '250px'
          },
          '@media (min-width: 768px)': {
            maxHeight: '230px'
          },
          '@media (min-width: 1124px)': {
            maxHeight: '250px'
          }
        }}
        subheader={<li />}
      >
        <div className=''></div>
        {displayDates.map((item, index) => (
          <Box
            sx={{ borderColor: (theme) => theme.palette.primary.main }}
            key={index}
            className='mx-4 my-1 rounded-md border py-1 md:mx-0 lg:mx-4'
          >
            <Box
              sx={{ color: (theme) => theme.palette.primary.main }}
              className={classNames('grid items-center  px-3', {
                'grid-flow-col justify-items-end':
                  dayState.toString() === 'daysOff' && temporalState.toString() === 'upcoming',
                'justify-items-center': dayState.toString() === 'bookedDays'
              })}
            >
              <div className=''>{formatDate(item, 'MM/DD/YYYY')}</div>
              {dayState.toString() === 'daysOff' && temporalState.toString() === 'upcoming' && (
                <IconButton onClick={handleDeleteDay(item)} className='p-0'>
                  <CloseIcon
                    className='h-4 w-4'
                    sx={{
                      color: (theme) => theme.palette.primary.main
                    }}
                  />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </List>
    </Box>
  )
}
export default DateList
