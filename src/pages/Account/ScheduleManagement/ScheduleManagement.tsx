import React, { useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import DatePickerHeader from 'react-multi-date-picker/plugins/date_picker_header'
import Toolbar from 'react-multi-date-picker/plugins/toolbar'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const ScheduleManagement: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([])

  const handleDateChange = (value: DateObject[]) => {
    setSelectedDates(value)
  }

  return (
    <>
      <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Schedule Management
      </h2>
      <div className='mb-3'>Select your busy days</div>
      <Calendar
        multiple
        value={selectedDates}
        onChange={handleDateChange}
        months={months}
        plugins={[
          <DatePickerHeader key='header' position='left' size='small' />,
          <DatePanel key='panel' sort='date' header='All Dates' />,
          <Toolbar key='toolbar' position='bottom' />
        ]}
        className='mx-auto flex h-[450px] w-full flex-col'
      />
    </>
  )
}

export default ScheduleManagement
