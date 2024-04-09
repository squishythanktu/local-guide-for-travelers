/* eslint-disable react/prop-types */
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import scheduleApi from 'src/apis/schedule.api'
import { months } from 'src/constants/months.constant'
import { AppContext } from 'src/contexts/app.context'
import { BusyDate } from 'src/enums/busy-date.enum'
import { DayInSchedule } from 'src/types/schedule.type'
import { DateArrayConvertToDateObjectArray } from 'src/utils/date-time'
import DateList from './components/DateList/DateList'
import Notes from './components/Notes/Notes'
import './schedule-management.style.scss'

const ScheduleManagement: React.FC = () => {
  const { profile } = useContext(AppContext)
  const [busyByDay, setBusyByDay] = useState<DayInSchedule[]>([])
  const [busyByHour, setBusyByHour] = useState<DayInSchedule[]>([])
  const [busyByGuide, setBusyByGuide] = useState<DayInSchedule[]>([])
  const [addMode, setAddMode] = useState<boolean>(false)
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([])

  const { data: busySchedulesData, refetch } = useQuery({
    queryKey: [`busy schedules of ${profile?.id}`],
    queryFn: () => scheduleApi.getBusySchedulesOfGuide(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000
  })

  useEffect(() => {
    if (busySchedulesData?.data?.data) {
      setBusyByDay(busySchedulesData.data.data.filter((day) => day.typeBusyDayEnum === BusyDate.BOOKED_DAY_BY_DAYS))
      setBusyByHour(busySchedulesData.data.data.filter((day) => day.typeBusyDayEnum === BusyDate.BOOKED_DAY_BY_HOURS))
      setBusyByGuide(
        busySchedulesData.data.data.filter((day) => day.typeBusyDayEnum === BusyDate.DATE_SELECTED_BY_GUIDE)
      )
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

  const confirmAdd = () => {
    const oldDayOff = busyByGuide.map((d) => d.busyDate)
    handleDateChange(DateArrayConvertToDateObjectArray(oldDayOff).concat(selectedDates))
  }

  return (
    <>
      {addMode && (
        <Dialog open={true} fullWidth maxWidth='md'>
          <DialogTitle sx={{ m: 0, p: 2 }} className='flex items-center justify-between'>
            <div className='text-lg font-semibold'>Select your busy days</div>
            <Notes />
            <IconButton
              onClick={() => {
                setAddMode(false)
                setSelectedDates([])
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
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
                      busyByDay.some((item: DayInSchedule) => isSameDate(new DateObject(item.busyDate), date)) ||
                      busyByGuide.some((item: DayInSchedule) => isSameDate(new DateObject(item.busyDate), date))
                    return props
                  }}
                  multiple
                  value={selectedDates}
                  onChange={(data: DateObject[]) => setSelectedDates(data)}
                  months={months}
                  className='mx-auto flex h-[380px] w-full flex-col rounded-lg border shadow-none'
                />
              </div>
              <Box className='col-span-3 md:col-span-2'>
                <Box className='relative h-[380px] rounded-md border' sx={{ bgcolor: 'background.paper' }}>
                  <Box
                    sx={{
                      color: (theme) => theme.palette.primary.main
                    }}
                    className='my-3 grid items-center justify-center font-medium'
                  >
                    Selected day(s)
                  </Box>
                  <List disablePadding className='rounded-b-md px-2 pt-2' subheader={<li />}>
                    {selectedDates.map((item, index) => (
                      <Box
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                          borderColor: (theme) => theme.palette.primary.main
                        }}
                        className='mx-4 my-1 grid items-center justify-center rounded-md border py-1 md:mx-0 lg:mx-4'
                        key={index}
                      >
                        <div>{item.format('MM/DD/YYYY')}</div>
                      </Box>
                    ))}
                  </List>
                </Box>
              </Box>
            </div>
          </DialogContent>
          <DialogActions>
            <div className='mb-2 mr-4 flex gap-4'>
              <Button variant='outlined' onClick={() => setSelectedDates([])}>
                Clear all
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  confirmAdd(), setAddMode(false)
                }}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      )}
      <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Schedule Management
      </h2>
      <div className='mb-3 flex items-center justify-between gap-6'>
        <Button variant='outlined' onClick={() => setAddMode(true)}>
          Add your busy days
        </Button>
        <Notes />
      </div>
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
              props.disabled = true
              return props
            }}
            multiple
            months={months}
            className='mx-auto flex h-[380px] w-full flex-col rounded-lg border shadow-none'
          />
        </div>
        <Box className='col-span-3 md:col-span-2'>
          <DateList
            busyByDay={busyByDay}
            busyByGuide={busyByGuide}
            busyByHour={busyByHour}
            handleDateChange={handleDateChange}
          />
        </Box>
      </div>
    </>
  )
}
export default ScheduleManagement
