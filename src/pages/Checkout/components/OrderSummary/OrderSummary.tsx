import { Card, CardContent, CardHeader, CardMedia, Divider, Rating } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckIcon from 'src/assets/svg/check-green.svg'
import ClockIcon from 'src/assets/svg/clock.svg'
import ThumbIcon from 'src/assets/svg/thumb.svg'
import TicketsIcon from 'src/assets/svg/tickets.svg'
import UsersIcon from 'src/assets/svg/users.svg'

export default function OrderSummary() {
  return (
    <div className=''>
      <h3 className='pb-3'>Order summary</h3>
      <Card className='rounded-lg border-2 shadow-none'>
        <CardHeader
          avatar={
            <CardMedia
              className='h-16 w-16 rounded-lg object-cover'
              component='img'
              alt='Tour image'
              src={'/assets/images/auth-cover.jpg'}
            />
          }
          title={
            <>
              <div className='item-card__header'>
                <div className='title text-lg font-medium'>{'Tour name'}</div>
                <div className='text-sm'>
                  Provided by{' '}
                  <Link to='/' className='underline'>
                    USS Midway Museum
                  </Link>
                </div>
                <div className='rating flex'>
                  <div className='activity-rating flex items-center gap-1 '>
                    <div className='text-sm font-medium'>{4.2}</div>
                    <Rating max={5} precision={0.1} value={4.2} size='large' readOnly />
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Divider />
        <CardContent className='flex flex-col gap-4'>
          <div className='flex items-center font-normal'>
            <TicketsIcon className='mb-[2px] mr-2 h-4 w-4' />
            <div className='text-sm font-medium'>San Diego: USS Midway Museum Entry Ticket</div>
          </div>
          <div className='flex items-center font-normal'>
            <ClockIcon className='mb-[2px] mr-2 h-4 w-4' />
            <div className='text-sm font-medium'>Wednesday, March 6, 2024</div>
          </div>
          <div className='flex items-center font-normal'>
            <UsersIcon className='mb-[2px] mr-2 h-4 w-4' />
            <div className='text-sm font-medium'>1 Adult (Age 13 - 99)</div>
          </div>
        </CardContent>
        <Divider />
        <CardContent className='flex flex-col gap-4'>
          <div className='flex items-center font-normal'>
            <CheckIcon className='mb-[2px] mr-2 h-4 w-4' />
            <div className=''>
              <div className='text-sm font-semibold'>Free cancellation</div>
              <div className='text-sm font-normal'>Until 24 hours before activity</div>
            </div>
          </div>
          <div className='flex items-center font-normal'>
            <ThumbIcon className='mb-[2px] mr-2 h-4 w-4' />
            <div className=''>
              <div className='text-sm font-semibold'>Free cancellation</div>
              <div className='text-sm font-normal'>Customers rated this 4.7/5 for value for money</div>
            </div>
          </div>
        </CardContent>
        <Divider />
        <div className='flex justify-between bg-slate-100 p-4'>
          <div className='text-lg font-extrabold'>Subtotal</div>
          <div className='flex flex-col items-end'>
            <div className='text-lg font-extrabold'>₫ 819,800</div>
            <div className='text-xs font-medium text-emerald-700'>All taxes and fees included</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
