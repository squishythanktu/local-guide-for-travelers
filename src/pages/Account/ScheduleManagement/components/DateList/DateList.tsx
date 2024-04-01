import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, IconButton } from '@mui/material'
import List from '@mui/material/List'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { DateObject } from 'react-multi-date-picker'
import { DayInSchedule } from 'src/types/schedule.type'
import { DateArrayConvertToDateObjectArray, compareDate, formatDate, isInArr } from 'src/utils/date-time'

interface Props {
  busyByGuide: DayInSchedule[]
  busyByDay: DayInSchedule[]
  busyByHour: DayInSchedule[]
  handleDateChange: (date: DateObject[]) => void
}

const DateList: React.FC<Props> = ({ busyByGuide, busyByDay, busyByHour, handleDateChange }: Props) => {
  const [pastBusyDates, setPastBusyDates] = useState<Date[]>([])
  const [futureBusyDates, setFutureBusyDates] = useState<Date[]>([])
  const [pastBookedByDay, setPastBookedByDay] = useState<Date[]>([])
  const [futureBookedByDay, setFutureBookedByDay] = useState<Date[]>([])
  const [pastBookedByHour, setPastBookedByHour] = useState<Date[]>([])
  const [futureBookedByHour, setFutureBookedByHour] = useState<Date[]>([])
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [dayState, setDayState] = useState<'daysOff' | 'bookedByDay' | 'bookedByHour'>('daysOff')
  const [temporalState, setTemporalState] = useState<'upcoming' | 'past'>('upcoming')
  const [displayDates, setDisplayDates] = useState<Date[]>([])

  const confirmDelete = () => {
    if (selectedDates.length < 1) return
    const oldDayOff = busyByGuide.map((d) => d.busyDate)
    handleDateChange(DateArrayConvertToDateObjectArray(oldDayOff.filter((date) => !isInArr(date, selectedDates))))
    setSelectedDates([])
  }

  const handleDeleteDay = (date: Date) => () => {
    const newBusyDates = busyByGuide.filter((d) => d.busyDate !== date)
    handleDateChange(newBusyDates.map((d) => new DateObject(d.busyDate)))
  }

  const formattedData = (dateArr: Date[], type: 'ASC' | 'DESC') => {
    const data = [...new Set(dateArr)]
    if (type === 'DESC') return data.sort((a, b) => compareDate(b, a))
    return data.sort((a, b) => compareDate(a, b))
  }

  const handleDayClick = (day: Date) => {
    const isDelete = selectedDates.includes(day)
    if (isDelete) {
      const newSelectedDates = selectedDates.filter((item) => item !== day)
      setSelectedDates(newSelectedDates)
      return
    }
    const newSelectedDates = [...selectedDates, day]
    setSelectedDates(newSelectedDates)
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
    setSelectedDates([])
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

  const shouldDisableButton = () => {
    if (selectedDates.length > 0) return false
    return true
  }

  return (
    <Box className='relative h-[380px] rounded-md border' sx={{ bgcolor: 'background.paper' }}>
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
      <List disablePadding className='rounded-b-md px-2 pt-2' subheader={<li />}>
        {displayDates.map((item, index) => (
          <Box
            sx={{ borderColor: (theme) => theme.palette.primary.main }}
            key={index}
            className={classNames('mx-4 my-1 rounded-md border py-1 md:mx-0 lg:mx-4', {
              'bg-[#fff0f1] ': isInArr(item, selectedDates)
            })}
          >
            <Box
              sx={{ color: (theme) => theme.palette.primary.main }}
              className={classNames('grid items-center  px-3', {
                'grid-flow-col justify-items-end':
                  dayState.toString() === 'daysOff' && temporalState.toString() === 'upcoming',
                'justify-items-center': dayState.toString() === 'bookedDays'
              })}
              onClick={(event) => {
                if (dayState === 'daysOff' && temporalState == 'upcoming') event.stopPropagation(), handleDayClick(item)
              }}
            >
              <div className='grid justify-center'>{formatDate(new Date(item), 'MM/DD/YYYY')}</div>
              {dayState.toString() === 'daysOff' && temporalState.toString() === 'upcoming' && (
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation(), handleDeleteDay(item)()
                  }}
                  className='p-0'
                >
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
      {dayState === 'daysOff' && temporalState == 'upcoming' && (
        <Button
          disabled={shouldDisableButton()}
          variant='contained'
          className='absolute bottom-0 w-full rounded-none rounded-b-md'
          onClick={confirmDelete}
        >
          Delete
        </Button>
      )}
    </Box>
  )
}
export default DateList
