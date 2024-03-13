import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import Toolbar from 'react-multi-date-picker/plugins/toolbar'
import scheduleApi from 'src/apis/schedule.api'
import { AppContext } from 'src/contexts/app.context'
import { ScheduleLists } from 'src/types/schedule.type'
import DateList from './components/DateList/DateList'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const ScheduleManagement: React.FC = () => {
  const DateArrayConvertToDateObjectArray = (dateArr: Date[]) => {
    return dateArr.map((item: Date) => {
      const ISOFormat = new Date(item)
      return new DateObject(ISOFormat)
    })
  }

  const { profile } = useContext(AppContext)
  const [dateLists, setDateLists] = useState<ScheduleLists>({ busyDayOfGuider: [], busyDayByBooking: [] })

  const { data: busySchedulesData, refetch } = useQuery({
    queryKey: [`busy schedules of ${profile?.id}`],
    queryFn: () => scheduleApi.getBusySchedulesOfGuide(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000
  })

  const [selectedDates, setSelectedDates] = useState<DateObject[]>(
    DateArrayConvertToDateObjectArray(dateLists.busyDayOfGuider)
  )

  const handleDateChange = (value: DateObject[]) => {
    const formattedBody = value.map((date) => {
      const dateObject = new Date(date.format('MM/DD/YYYY'))
      dateObject.setDate(dateObject.getDate() + 1)
      return dateObject.toISOString()
    })
    updateBusyScheduleMutation.mutate(formattedBody, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  useEffect(() => {
    if (busySchedulesData?.data?.data) {
      setDateLists(busySchedulesData.data.data)
      setSelectedDates(DateArrayConvertToDateObjectArray(busySchedulesData.data.data.busyDayOfGuider))
    }
  }, [busySchedulesData])

  const updateBusyScheduleMutation = useMutation({
    mutationFn: (body: string[]) => scheduleApi.updateBusyScheduleOfGuide(body)
  })

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
                  color: '#178d46',
                  backgroundColor: '#e9fbf0',
                  fontWeight: 'bold',
                  textDecoration: 'underline'
                }

              if (dateLists.busyDayByBooking.some((item) => isSameDate(new DateObject(item), date)))
                (props.style = {
                  ...props.style,
                  color: '#ab6800',
                  backgroundColor: '#fff9eb',
                  fontWeight: 'bold'
                }),
                  (props.disabled = false)

              if (dateLists.busyDayOfGuider.some((item) => isSameDate(new DateObject(item), date)))
                props.style = {
                  ...props.style,
                  color: '#94000d',
                  backgroundColor: '#fff0f1',
                  fontWeight: 'bold'
                }

              props.disabled = date < new DateObject()
              return props
            }}
            multiple
            value={selectedDates}
            onChange={handleDateChange}
            months={months}
            plugins={[
              <Toolbar key='toolbar' position='bottom' names={{ today: 'Today', deselect: 'Clear', close: '' }} />
            ]}
            className='mx-auto flex h-[450px] w-full flex-col rounded-lg border shadow-2xl'
          />
        </div>
        <div className='col-span-3 md:col-span-2'>
          <DateList dateList={dateLists} />
        </div>
      </div>
    </>
  )
}

export default ScheduleManagement
