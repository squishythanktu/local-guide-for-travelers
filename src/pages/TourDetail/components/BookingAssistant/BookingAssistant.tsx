import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import { Controller, useForm } from 'react-hook-form'
import { BookingFormSchema, bookingFormSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'

interface Props {
  onSubmit: (data: BookingFormSchema) => void
}

export default function BookingAssistant({ onSubmit }: Props) {
  const {
    trigger,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<BookingFormSchema>({
    defaultValues: {
      numberTravelers: 0,
      startDate: new Date()
    },
    resolver: yupResolver(bookingFormSchema)
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 rounded-3xl bg-[#1a2b49] px-3 py-5 text-white'
    >
      <div className='font-semibold'>Select participants & date</div>
      <div className='flex flex-col gap-4'>
        <Controller
          control={control}
          name='numberTravelers'
          render={({ field }) => (
            <OutlinedInput
              {...field}
              placeholder='Participant(s)'
              className='rounded-sm'
              type='number'
              sx={{
                bgcolor: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
              onChange={(event) => {
                field.onChange(event)
                trigger('numberTravelers')
              }}
            />
          )}
        />
        {errors.numberTravelers && <div className='pb-3 text-xs text-red-500'>{errors.numberTravelers?.message}</div>}
        <Controller
          control={control}
          name='startDate'
          render={({ field }) => (
            <DatePicker
              className='rounded-sm'
              defaultValue={dayjs(new Date())}
              sx={{
                bgcolor: 'white',
                width: '100%',
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
              onChange={(event) => {
                field.onChange(event)
                trigger('startDate')
              }}
            />
          )}
        />
        {errors.startDate && <div className='text-xs text-red-500'>{errors.startDate.message}</div>}
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
