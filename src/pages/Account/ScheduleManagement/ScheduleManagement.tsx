import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import Toolbar from 'react-multi-date-picker/plugins/toolbar'
import scheduleApi from 'src/apis/schedule.api'
import { BusySchedule } from 'src/types/schedule.type'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const ScheduleManagement: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([])

  const handleDateChange = (value: DateObject[]) => {
    setSelectedDates(value)
  }

  const { data: busySchedulesData } = useQuery({
    queryKey: ['busy schedules'],
    queryFn: () => scheduleApi.getBusySchedulesOfGuide(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000
  })

  useEffect(() => {
    if (busySchedulesData?.data?.data) {
      const formattedDates = busySchedulesData.data.data.map((item: BusySchedule) => {
        const ISOFormat = new Date(item.busyDate)
        return new DateObject(ISOFormat)
      })

      setSelectedDates(formattedDates)
    }
  }, [busySchedulesData])

  const updateBusyScheduleMutation = useMutation({
    mutationFn: (body: string[]) => scheduleApi.updateBusyScheduleOfGuide(body)
  })

  useEffect(() => {
    const formattedBody = selectedDates.map((date) => {
      const dateObject = new Date(date.format('MM/DD/YYYY'))
      dateObject.setDate(dateObject.getDate() + 1)
      return dateObject.toISOString()
    })
    updateBusyScheduleMutation.mutate(formattedBody)
  }, [selectedDates])

  return (
    <>
      <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Schedule Management
      </h2>
      <div className='mb-3'>Select your busy days</div>
      <Calendar
        mapDays={({ date, isSameDate }) => {
          const props: { style: object; disabled: boolean } = { style: {}, disabled: false }
          if (isSameDate(date, new DateObject()))
            props.style = {
              color: '#418944',
              backgroundColor: '#edf7ed',
              fontWeight: 'bold'
            }
          props.disabled = date < new DateObject() ? true : false
          return props
        }}
        multiple
        value={selectedDates}
        onChange={handleDateChange}
        months={months}
        plugins={[
          <DatePanel key='panel' sort='date' header='All Dates' />,
          <Toolbar key='toolbar' position='bottom' />
        ]}
        className='mx-auto flex h-[450px] w-full flex-col'
      />
    </>
  )
}

export default ScheduleManagement
