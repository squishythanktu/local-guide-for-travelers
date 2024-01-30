import range from 'lodash/range'
import { useEffect, useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, errorMessage, value }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate(),
    month: value?.getMonth(),
    year: value?.getFullYear()
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: SelectChangeEvent) => {
    const { value: valueFromSelect, name } = event.target

    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='flex w-full flex-col flex-wrap sm:flex-row'>
      <div className='flex w-full justify-between gap-6'>
        <Select
          name='date'
          value={value?.getDate().toString() || ''}
          onChange={handleChange}
          displayEmpty
          className='h-fit basis-1/3'
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value='' disabled>
            <em>Day</em>
          </MenuItem>
          {range(1, 32).map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Select
          name='month'
          value={value?.getMonth().toString() || ''}
          onChange={handleChange}
          displayEmpty
          className='h-fit basis-1/3'
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value='' disabled>
            <em>Month</em>
          </MenuItem>
          {range(0, 12).map((item) => (
            <MenuItem value={item} key={item}>
              {item + 1}
            </MenuItem>
          ))}
        </Select>
        <Select
          name='year'
          value={value?.getFullYear().toString() || ''}
          onChange={handleChange}
          displayEmpty
          className='h-fit basis-1/3'
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value='' disabled>
            <em>Year</em>
          </MenuItem>
          {range(1900, 2024).map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className='mt-1 min-h-[1.25rem] w-full text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
