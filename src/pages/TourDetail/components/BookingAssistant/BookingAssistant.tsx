/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import scheduleApi from 'src/apis/schedule.api'
import tourApi from 'src/apis/tour.api'
import { AvailableTimeSeat } from 'src/types/available-time-seat'
import { formatDate } from 'src/utils/date-time'
import { bookingSchema } from 'src/utils/rules'
import { BookingAssistantFormData } from '../../TourDetail'

dayjs.extend(isSameOrBefore)

const bookingFormSchema = bookingSchema.pick(['startDate', 'numberTravelers'])

interface BookingAssistantProps {
  id: number
  onSubmit: (data: BookingAssistantFormData) => void
  onSubmitAvailableTimeSeats: (timeSeats: AvailableTimeSeat[]) => void
}

const BookingAssistant: React.FC<BookingAssistantProps> = ({
  id,
  onSubmit,
  onSubmitAvailableTimeSeats
}: BookingAssistantProps) => {
  const { t } = useTranslation()
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(new Date())
  const [maxAvailableSeats, setMaxAvailableSeats] = useState<number | undefined>(undefined)
  const [activeStep, setActiveStep] = useState<number>(0)

  const {
    trigger,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm<BookingAssistantFormData>({
    defaultValues: {
      startDate: undefined,
      numberTravelers: 0
    },
    resolver: yupResolver(bookingFormSchema)
  })

  const { data: startTimeData } = useQuery({
    queryKey: [`Start time of id ${id} in ${selectedStartDate}`, selectedStartDate],
    queryFn: () =>
      tourApi.getStartTimeOfTour(Number(id), { localDate: formatDate(selectedStartDate as Date, 'YYYY-MM-DD') }),
    enabled: !!selectedStartDate
  })

  const { data: busySchedulesQuery } = useQuery({
    queryKey: [`Get busy schedules of tour ${id}`, id],
    queryFn: () => scheduleApi.getBusySchedulesOfTour(id),
    enabled: id !== 0
  })

  useEffect(() => {
    if (!selectedStartDate) {
      setMaxAvailableSeats(undefined)
      return
    }
    if (startTimeData) {
      setMaxAvailableSeats(getMaxNumberTravelers(startTimeData?.data.data as AvailableTimeSeat[]))
      onSubmitAvailableTimeSeats(startTimeData?.data.data as AvailableTimeSeat[])
    }
  }, [onSubmitAvailableTimeSeats, selectedStartDate, startTimeData])

  const handleNext = (index: number) => {
    if (getValues('startDate') == undefined) {
      return
    }
    if (index === 0) {
      setSelectedStartDate(getValues('startDate'))
    }
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
  }

  const handleReset = () => {
    reset()
    setSelectedStartDate(undefined)
    setActiveStep(0)
  }

  const checkBusyDate = (date: Date) => {
    if (busySchedulesQuery?.data.data) {
      return busySchedulesQuery.data.data.some((busyDate) => dayjs(date).isSame(busyDate, 'day'))
    }
    return false
  }

  const steps = [
    {
      label: 'Select date',
      input: (
        <Controller
          control={control}
          name='startDate'
          render={({ field }) => (
            <DatePicker
              className='h-[56px] rounded-sm'
              disablePast={true}
              shouldDisableDate={checkBusyDate}
              onChange={(date) => {
                field.onChange(date)
                trigger('startDate')
              }}
              sx={{
                bgcolor: 'white',
                width: '100%',
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'black'
                }
              }}
              slotProps={{
                textField: {
                  disabled: true
                }
              }}
            />
          )}
        />
      )
    },
    {
      label: 'Select participant(s)',
      input: (
        <>
          {!!maxAvailableSeats && <span>You can book up to {maxAvailableSeats} person(s) on this day</span>}
          {!maxAvailableSeats && <span>No available seat for this day! Try another one.</span>}
          <Controller
            control={control}
            name='numberTravelers'
            render={({ field }) => (
              <OutlinedInput
                {...field}
                placeholder='Participant(s)'
                className='mt-2 w-full rounded-sm'
                type='number'
                endAdornment={<PersonOutlineOutlinedIcon sx={{ color: '#757575', marginRight: '-5px' }} />}
                sx={{
                  bgcolor: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }}
                inputProps={{
                  min: 1,
                  max: maxAvailableSeats
                }}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('numberTravelers')
                }}
              />
            )}
          />
          {errors.numberTravelers && <div className='pb-3 text-xs text-red-500'>{errors.numberTravelers?.message}</div>}
        </>
      )
    }
  ]

  const getMaxNumberTravelers = (availableTimeSeats: AvailableTimeSeat[] | undefined) => {
    let maxNumberTravelers = 0
    availableTimeSeats?.map((availableTimeSeat) => {
      if (availableTimeSeat.numberTravelers > maxNumberTravelers) {
        maxNumberTravelers = availableTimeSeat.numberTravelers
      }
    })
    return maxNumberTravelers
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 rounded-3xl bg-[var(--decorative-midnight-blue)] px-3 py-5 text-white'
    >
      <div className='font-semibold'>{t('pages.tourDetails.selectParticipantsDate')}</div>
      <div className='mb-4 flex flex-col gap-4'>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel optional={index === 2 ? <Typography variant='caption'>Last step</Typography> : null}>
                <span className='text-white'>{step.label}</span>
              </StepLabel>
              <StepContent>
                {step.input}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button variant='contained' onClick={() => handleNext(index)} sx={{ mt: 1, mr: 1 }}>
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Button
            type='submit'
            className='mr-2 w-[100%] rounded-full pr-7 font-semibold md:inline-block'
            variant='contained'
            size='large'
          >
            {t('pages.tourDetails.checkAvailability')}
          </Button>
        )}
      </div>
    </form>
  )
}

export default BookingAssistant
