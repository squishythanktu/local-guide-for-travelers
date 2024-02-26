import OutlinedInput from '@mui/material/OutlinedInput'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MenuItem from '@mui/material/MenuItem'
import { Dispatch, SetStateAction } from 'react'
import Select from '@mui/material/Select'
import ClockIcon from 'src/assets/svg/clock.svg'
import UsersIcon from 'src/assets/svg/users.svg'
import Button from '@mui/material/Button'
import { Booking } from 'src/types/cart.type'
import { Controller, useForm } from 'react-hook-form'
import { BookingFormSchema, bookingFormSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
interface Props {
  setEditMode?: Dispatch<SetStateAction<boolean>>
  onSubmit: (data: BookingFormSchema) => void
  booking?: Booking
}

export default function BookingForm({ setEditMode, booking, onSubmit }: Props) {
  const {
    trigger,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<BookingFormSchema>({
    defaultValues: {
      numberTravelers: booking?.numberTraveler,
      startDate: booking?.startDate
    },
    resolver: yupResolver(bookingFormSchema)
  })
  const handleCancel = () => {
    if (setEditMode) {
      setEditMode(false)
    }
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-1 font-normal'>
        <div className='flex items-center'>
          <UsersIcon className='mb-[2px] mr-2 h-5 w-5' />
          <Controller
            control={control}
            name='numberTravelers'
            render={({ field }) => (
              <OutlinedInput
                {...field}
                placeholder='Participant(s)'
                className='rounded-md'
                type='number'
                onChange={(event) => {
                  field.onChange(event)
                  trigger('numberTravelers')
                }}
                sx={{
                  bgcolor: 'white'
                }}
              />
            )}
          />
        </div>
        {errors.numberTravelers && (
          <div className='pb-3 pl-7 text-xs text-red-500'>{errors.numberTravelers?.message}</div>
        )}
        <div className='flex items-center'>
          <ClockIcon className='mb-[2px] mr-2 h-5 w-5' />
          <div className='flex gap-2'>
            <Controller
              control={control}
              name='startDate'
              render={({ field }) => (
                <DatePicker
                  defaultValue={dayjs(booking?.startDate)}
                  className='w-64'
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('startDate')
                  }}
                  sx={{
                    bgcolor: 'white',
                    border: '8px'
                  }}
                />
              )}
            />
            <Select>
              <MenuItem value={10}>11:00 AM</MenuItem>
              <MenuItem value={20}>12:00 AM</MenuItem>
              <MenuItem value={5}>5:00 AM</MenuItem>
            </Select>
          </div>
        </div>
        {errors.startDate && <div className='pl-7 text-xs text-red-500'>{errors.startDate.message}</div>}
      </div>
      {setEditMode && (
        <div className='flex gap-2'>
          <Button
            type='submit'
            className='flex h-10 w-10 cursor-pointer gap-1 rounded-full border-none bg-red-400 text-black hover:bg-red-500'
            variant='contained'
          >
            <span className='text-sm font-medium'>Save</span>
          </Button>
          <Button
            onClick={handleCancel}
            className='flex h-10 w-10 cursor-pointer gap-1 rounded-full border-none bg-red-400 text-black hover:bg-red-500'
            variant='contained'
          >
            <span className='text-sm font-medium'>Cancel</span>
          </Button>
        </div>
      )}
    </form>
  )
}
