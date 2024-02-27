import { Divider } from '@mui/material'
import Card from '@mui/material/Card'
import { Link } from 'react-router-dom'
import ClockDurationIcon from 'src/assets/svg/clock-duration.svg'
import GuideIcon from 'src/assets/svg/guide.svg'
import LocationIcon from 'src/assets/svg/location.svg'
import Button from '@mui/material/Button'
import { useState } from 'react'
import CalendarCheckIcon from 'src/assets/svg/calendar-check.svg'

export default function BookingConfirmation() {
  const options = ['10:00 AM', '11:15 AM', '12:30 AM', '1:45 PM', '2:15 PM', '3:15 PM', '4:30 PM']
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
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
        <div className='starting-times flex flex-col gap-2'>
          <div className='font-medium'>Select a starting time</div>
          <div className='flex flex-wrap gap-2'>
            {options.map((option) => (
              <Button
                key={option}
                variant='outlined'
                className={`${option === selectedOption ? 'bg-[#1a2b49] text-white' : 'border-2 border-gray-300 text-black '} `}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <Divider />
        <div className='participants flex flex-col gap-2'>
          <div className='relative flex'>
            <div className='text-sm font-medium text-gray-500'>Person 2× $ 119</div>
            <div className='absolute right-2 text-sm font-medium text-gray-500'>$ 238</div>
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
          <div className='text-xl font-extrabold'>$ 70</div>
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
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  )
}
