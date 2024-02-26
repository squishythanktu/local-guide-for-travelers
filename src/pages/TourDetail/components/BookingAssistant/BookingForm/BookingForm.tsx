import OutlinedInput from '@mui/material/OutlinedInput'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MenuItem from '@mui/material/MenuItem'
import { Dispatch, SetStateAction, useState } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ClockIcon from 'src/assets/svg/clock.svg'
import UsersIcon from 'src/assets/svg/users.svg'
import Button from '@mui/material/Button'

interface Props {
  setEditMode?: Dispatch<SetStateAction<boolean>>
}

export default function BookingForm({ setEditMode }: Props) {
  const [hour, setHour] = useState<string>('')

  const handleCancel = () => {
    if (setEditMode) {
      setEditMode(false)
    }
  }
  const handleSelectNumberOfParticipants = () => {}

  const handleChange = (event: SelectChangeEvent<typeof hour>) => {
    setHour(event.target.value)
  }
  return (
    <form className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2 font-normal'>
        <div className='flex items-center'>
          <UsersIcon className='mb-[2px] mr-2 h-5 w-5' />
          <OutlinedInput
            placeholder='Participant(s)'
            // value={booking.numberTraveler}
            className='rounded-md'
            type='number'
            onChange={handleSelectNumberOfParticipants}
            sx={{
              bgcolor: 'white'
            }}
          />
        </div>
        <div className='flex items-center'>
          <ClockIcon className='mb-[2px] mr-2 h-5 w-5' />
          <div className='flex gap-2'>
            <DatePicker
              className='w-64'
              sx={{
                bgcolor: 'white',
                border: '8px'
              }}
            />
            <Select onChange={handleChange} value={hour}>
              <MenuItem value={10}>11:00 AM</MenuItem>
              <MenuItem value={20}>12:00 AM</MenuItem>
              <MenuItem value={5}>5:00 AM</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      {setEditMode && (
        <Button
          onClick={handleCancel}
          className='flex h-10 w-10 cursor-pointer gap-1 rounded-full border-none bg-red-400 text-black hover:bg-red-500'
          variant='contained'
        >
          <span className='text-sm font-medium '>Cancel</span>
        </Button>
      )}
    </form>
  )
}
