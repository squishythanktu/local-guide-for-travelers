import { Divider } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartApi from 'src/apis/cart.api'
import CalendarCheckIcon from 'src/assets/svg/calendar-check.svg'
import ClockDurationIcon from 'src/assets/svg/clock-duration.svg'
import GuideIcon from 'src/assets/svg/guide.svg'
import LocationIcon from 'src/assets/svg/location.svg'
import { Unit } from 'src/enums/unit.enum'
import { Booking } from 'src/types/cart.type'
import { Tour } from 'src/types/tour.type'
import { formatTime } from 'src/utils/date-time'
import { BookingAssistantFormData } from '../../layouts/TourDetailLayout/TourDetailLayout'

interface Props {
  timeOptions?: string[]
  formData: BookingAssistantFormData
  tour: Tour
}

export type AddBookingForm = Omit<Booking, 'status' | 'tour'>

export default function BookingConfirmation({ timeOptions, formData, tour }: Props) {
  const [selectedTimeOption, setSelectedTimeOption] = useState<string>('')
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()

  const handleOptionClick = (option: string) => {
    setSelectedTimeOption(option)
  }

  const [bookingFormData, setBookingFormData] = useState<AddBookingForm>({
    id: tour.id,
    startDate: selectedTimeOption
      ? new Date(dayjs(formData.startDate).format('YYYY-MM-DD') + 'T' + selectedTimeOption)
      : formData.startDate,
    numberTravelers: formData.numberTravelers,
    price: totalPrice
  })

  useEffect(() => {
    const data = {
      ...bookingFormData,
      startDate: selectedTimeOption
        ? new Date(dayjs(formData.startDate).format('YYYY-MM-DD') + 'T' + selectedTimeOption)
        : formData.startDate,
      price: totalPrice
    }
    setBookingFormData(data)
  }, [selectedTimeOption, totalPrice])

  useEffect(() => {
    setTotalPrice(tour.pricePerTraveler + (formData.numberTravelers - 1) * tour.extraPrice)
  }, [formData])

  const addBookingMutation = useMutation({
    mutationFn: (body: AddBookingForm) => {
      return cartApi.createBookingInCart(body)
    }
  })

  const handleAddBooking = () => {
    if (tour.unit === Unit.HOURS && tour.duration < 5 && !selectedTimeOption) {
      return
    } else {
      addBookingMutation.mutate(bookingFormData, {
        onSuccess: () => {
          toast.success('Add booking in cart successfully.')
          navigate('/cart')
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  }

  return (
    <Card className='rounded-xl border-2 border-blue-500'>
      <div className='flex flex-col gap-3 p-4'>
        <div className='booking-info flex flex-col gap-2'>
          <div className='title font-medium'>Warner Bros. Studio Tour in English</div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center text-base font-normal'>
              <ClockDurationIcon className='mb-[2px] mr-2 h-6 w-6' />
              <div className='text-sm font-medium text-gray-500'>3 hours</div>
            </div>
            <div className='flex items-center font-normal'>
              <GuideIcon className='mb-[2px] mr-2 h-6 w-6' />
              <div className='text-sm font-medium text-gray-500'>Guide: Warner Bros</div>
            </div>
            <div className='flex items-center font-normal'>
              <LocationIcon className='mb-[2px] mr-2 h-6 w-6' />
              <div className='text-sm font-medium  underline'>
                <Link to='/'>Meet at 3400 Warner Blvd, Burbank, CA 91505, USA</Link>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        {timeOptions && (
          <>
            <div className='starting-times flex flex-col gap-2'>
              <div className='font-medium'>
                Select a starting time of {dayjs(formData.startDate).format('MM/DD/YYYY')}
              </div>
              <div className='flex flex-wrap gap-2'>
                {timeOptions.map((option) => (
                  <Button
                    key={option}
                    variant='outlined'
                    className={`${option === selectedTimeOption ? 'bg-[#1a2b49] text-white' : 'border-2 border-gray-300 text-black '} `}
                    onClick={() => handleOptionClick(option)}
                  >
                    {formatTime(option, 'HH:mm:ss', 'HH:mm')}
                  </Button>
                ))}
              </div>
            </div>
            {tour.unit === Unit.HOURS && tour.duration < 5 && !selectedTimeOption && (
              <div className='text-xs text-red-500'>Select a time</div>
            )}

            <Divider />
          </>
        )}
        <div className='participants flex flex-col gap-2'>
          <div className='relative flex'>
            <div className='text-sm font-medium text-gray-500'>
              Person 1x ${tour.pricePerTraveler} - Extra price ${tour.extraPrice}
            </div>
            <div className='absolute right-2 text-sm font-medium text-gray-500'>$ {totalPrice}</div>
          </div>
          <div className='flex items-center font-normal'>
            <CalendarCheckIcon className='mb-[2px] mr-2 h-6 w-6' />
            <div className='text-sm font-medium'>Cancel up to 24 hours in advance for a full refund</div>
          </div>
        </div>
      </div>
      <div className='bg-slate-100 p-4 md:grid md:grid-cols-2 md:items-center'>
        <div className='md:col-span-1'>
          <div className='text-sm font-medium text-gray-600'>Total price</div>
          <div className='text-xl font-extrabold'>$ {totalPrice}</div>
          <div className='text-xs font-medium'>All taxes and fees included</div>
        </div>
        <div className='flex flex-col gap-2 pt-2 md:col-span-1 md:flex-row md:justify-self-end '>
          <Button
            type='submit'
            className='mr-2 rounded-full pr-7 font-semibold md:inline-block'
            variant='outlined'
            size='large'
          >
            Book now
          </Button>
          <Button
            type='submit'
            className='mr-2 rounded-full pr-7 font-semibold md:inline-block'
            variant='contained'
            size='large'
            onClick={handleAddBooking}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  )
}
