/* eslint-disable react/prop-types */
import { Box, Button, Card } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import scheduleApi from 'src/apis/schedule.api'
import { AppContext } from 'src/contexts/app.context'
import { BusyDate } from 'src/enums/busy-date.enum'
import { DayInSchedule } from 'src/types/schedule.type'
import { convertNormalDate } from 'src/utils/date-time'
import DateList from './components/DateList/DateList'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const ScheduleManagement: React.FC = () => {
  const DateArrayConvertToDateObjectArray = (dateArr: Date[]) => {
    return dateArr.map((item: Date) => {
      return new DateObject(item)
    })
  }

  const { profile } = useContext(AppContext)

  const { data: busySchedulesData, refetch } = useQuery({
    queryKey: [`busy schedules of ${profile?.id}`],
    queryFn: () => scheduleApi.getBusySchedulesOfGuide(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000
  })

  const [busyByDay, setBusyByDay] = useState<DayInSchedule[]>([])
  const [busyByHour, setBusyByHour] = useState<DayInSchedule[]>([])
  const [busyByGuide, setBusyByGuide] = useState<DayInSchedule[]>([])
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([])

  useEffect(() => {
    if (busySchedulesData?.data?.data) {
      setBusyByDay(busySchedulesData.data.data.filter((day) => day.typeBusyDayEnum === BusyDate.BOOKED_DAY_BY_DAYS))
      setBusyByHour(busySchedulesData.data.data.filter((day) => day.typeBusyDayEnum === BusyDate.BOOKED_DAY_BY_HOURS))
      setBusyByGuide(
        busySchedulesData.data.data.filter((day) => day.typeBusyDayEnum === BusyDate.DATE_SELECTED_BY_GUIDE)
      )
      setSelectedDates([])
    }
  }, [busySchedulesData])

  const handleDateChange = (value: DateObject[]) => {
    const formattedBody = value.map((date) => {
      const dateObject = new Date(date.format('MM/DD/YYYY'))
      dateObject.setDate(dateObject.getDate() + 1)
      return dateObject.toISOString()
    })

    updateBusyScheduleMutation.mutate(formattedBody, {
      onSuccess: () => {
        setSelectedDates([])
        refetch()
      }
    })
  }

  const updateBusyScheduleMutation = useMutation({
    mutationFn: (body: string[]) => scheduleApi.updateBusyScheduleOfGuide(body)
  })

  const handleDate = (value: DateObject[]) => {
    setSelectedDates(value)
  }

  const handleDeleteDay = (date: Date) => () => {
    const newBusyDates = busyByGuide.filter((d) => d.busyDate !== date)
    handleDateChange(newBusyDates.map((d) => new DateObject(d.busyDate)))
  }

  const confirmAdd = () => {
    const oldDayOff = busyByGuide.map((d) => d.busyDate)
    handleDateChange(DateArrayConvertToDateObjectArray(oldDayOff).concat(selectedDates))
  }

  const confirmDelete = () => {
    if (selectedDates.length < 1) return
    const oldDayOff = busyByGuide.map((d) => d.busyDate)
    handleDateChange(
      DateArrayConvertToDateObjectArray(
        oldDayOff.filter(
          (date) =>
            !isInArr(
              date,
              selectedDates.map((item) => new Date(convertNormalDate(item)))
            )
        )
      )
    )
  }

  const isInArr = (date: Date, arr: Date[]) => {
    return arr.map((item) => new Date(item).getTime()).includes(new Date(date).getTime())
  }

  const clearAll = () => {
    setSelectedDates([])
  }

  return (
    <>
      <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Schedule Management
      </h2>
      <div className='mb-3'>Select your busy days</div>
      <div className='grid grid-cols-7 gap-2'>
        <div className='col-span-4 md:col-span-5'>
          <Calendar
            mapDays={({ date, isSameDate }) => {
              const props: { style: object; disabled: boolean } = { style: {}, disabled: false }

              props.style = {
                boxShadow: 'none'
              }
              if (isSameDate(date, new DateObject()))
                props.style = {
                  color: '#000',
                  fontWeight: 'bold',
                  textDecoration: 'underline'
                }
              if (busyByGuide.some((item: DayInSchedule) => isSameDate(new DateObject(item.busyDate), date)))
                props.style = {
                  ...props.style,
                  color: '#94000d',
                  backgroundColor: '#fff0f1',
                  fontWeight: 'bold'
                }
              if (selectedDates.some((item) => isSameDate(item, date)))
                props.style = {
                  ...props.style,
                  color: '#fff',
                  backgroundColor: '#0074d9',
                  fontWeight: 'normal'
                }
              if (busyByHour.some((item: DayInSchedule) => isSameDate(new DateObject(item.busyDate), date)))
                props.style = {
                  ...props.style,
                  color: '#178d46',
                  backgroundColor: '#e9fbf0',
                  fontWeight: 'bold'
                }
              if (busyByDay.some((item: DayInSchedule) => isSameDate(new DateObject(item.busyDate), date)))
                props.style = {
                  ...props.style,
                  color: '#ab6800',
                  backgroundColor: '#fff9eb',
                  fontWeight: 'bold'
                }
              props.disabled =
                date < new DateObject() ||
                busyByHour.some((item: DayInSchedule) => isSameDate(new DateObject(item.busyDate), date)) ||
                busyByDay.some((item: DayInSchedule) => isSameDate(new DateObject(item.busyDate), date))
              return props
            }}
            multiple
            value={selectedDates}
            onChange={handleDate}
            months={months}
            className='mx-auto flex h-[380px] w-full flex-col rounded-lg border shadow-2xl'
          />
        </div>
        <Box className='col-span-3 md:col-span-2'>
          <DateList
            busyByDay={busyByDay}
            busyByGuide={busyByGuide}
            busyByHour={busyByHour}
            handleDeleteDay={handleDeleteDay}
          />
          <Card
            className='mt-2 grid h-[40px] grid-cols-3 rounded-md border shadow-none'
            sx={{ bgcolor: 'background.paper' }}
          >
            <Button className='rounded-none rounded-tl-md' onClick={confirmAdd}>
              Add
            </Button>
            <Button className='rounded-none' onClick={confirmDelete}>
              Delete
            </Button>
            <Button className='rounded-none rounded-tr-md' onClick={clearAll}>
              Clear
            </Button>
          </Card>
        </Box>
      </div>
    </>
  )
}

export default ScheduleManagement
