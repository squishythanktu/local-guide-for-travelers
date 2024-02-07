import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ParticipantInput from '../ParticipantInput'
import Button from '@mui/material/Button'

export default function BookingAssistant() {
  const onSubmitCheckAvailability = () => {}

  return (
    <form
      onSubmit={onSubmitCheckAvailability}
      className='flex flex-col gap-4 rounded-3xl bg-[#1a2b49] px-3 py-5 text-white'
    >
      <div className='font-semibold'>Select participants & date</div>
      <div className='flex flex-col gap-4'>
        <ParticipantInput />
        <DatePicker
          className='rounded-[4px]'
          sx={{
            bgcolor: 'white',
            border: 'none',
            width: '100%',
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            '.MuiOutlinedInput-root': {
              borderRadius: '4px'
            }
          }}
        />
      </div>
      <Button
        type='submit'
        className='mr-2 w-[100%] rounded-[4px] pr-7 font-semibold md:inline-block'
        variant='contained'
        size='large'
      >
        Check availability
      </Button>
    </form>
  )
}
