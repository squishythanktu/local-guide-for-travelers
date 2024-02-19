/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'
import { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  className?: string
  queryConfig: QueryConfig
}

export default function DateRangePicker({ className, queryConfig }: Props) {
  const navigate = useNavigate()

  const getInitialStartDate = (): Dayjs | null => {
    return queryConfig.start_date ? dayjs(queryConfig.start_date, 'DD/MM/YYYY') : null
  }

  const getInitialEndDate = (): Dayjs | null => {
    return queryConfig.end_date ? dayjs(queryConfig.end_date, 'DD/MM/YYYY') : null
  }

  const [startDate, setStartDate] = useState<Dayjs | null>(getInitialStartDate())
  const [endDate, setEndDate] = useState<Dayjs | null>(getInitialEndDate())

  const updateSearchQuery = useCallback((startDate: Dayjs | null, endDate: Dayjs | null) => {
    navigate({
      search: createSearchParams(
        omitBy(
          {
            ...queryConfig,
            start_date: startDate ? startDate.toDate().toLocaleDateString('en-GB') : '',
            end_date: endDate ? endDate.toDate().toLocaleDateString('en-GB') : ''
          },
          isEmpty
        )
      ).toString()
    })
  }, [])

  useEffect(() => {
    updateSearchQuery(startDate, endDate)
  }, [startDate, endDate, updateSearchQuery])

  const handleStartDateChange = (date: Dayjs | null) => {
    if (!date) return
    setStartDate(date)
    if (endDate && endDate.isBefore(date)) setEndDate(date)
  }

  const handleEndDateChange = (date: Dayjs | null) => {
    if (!date) return
    if (startDate && date.isBefore(startDate)) {
      setStartDate(date)
    }
    setEndDate(date)
  }

  const handleClearStartDate = () => {
    setStartDate(null)
    setEndDate(null)
  }

  return (
    <Box className={`flex gap-4 ${className}`}>
      <DatePicker
        disablePast
        label='Start date'
        value={startDate}
        onChange={(newStartDate) => handleStartDateChange(newStartDate)}
        slotProps={{
          field: { clearable: true, onClear: handleClearStartDate }
        }}
        className='w-1/2'
      />
      <DatePicker
        minDate={startDate || undefined}
        disabled={!startDate}
        label='End date'
        value={endDate}
        onChange={(newEndDate) => handleEndDateChange(newEndDate)}
        slotProps={{
          field: { clearable: true, onClear: () => setEndDate(null) }
        }}
        className='w-1/2'
      />
    </Box>
  )
}
