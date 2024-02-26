import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Rating from '@mui/material/Rating'
import { useState } from 'react'
import ClockIcon from 'src/assets/svg/clock.svg'
import UsersIcon from 'src/assets/svg/users.svg'
import { Booking } from 'src/types/cart.type'
import moment from 'moment'
import BookingForm from 'src/pages/TourDetail/components/BookingAssistant/BookingForm/BookingForm'
import Button from '@mui/material/Button'
import DeleteIcon from 'src/assets/svg/delete.svg'

interface Props {
  booking: Booking
}

export default function ItemCard({ booking }: Props) {
  const [editMode, setEditMode] = useState(false)
  const handleUpdate = () => {
    setEditMode(true)
  }

  return (
    <Card className='rounded-lg border p-2 shadow-none'>
      <CardHeader
        avatar={
          <CardMedia
            className='h-24 w-24 rounded-lg object-cover'
            component='img'
            alt='Tour image'
            src={booking.tour.images[1].imageLink}
          />
        }
        title={
          <>
            <div className='item-card__header'>
              <div className='title text-lg font-medium leading-5'>{booking.tour.name}</div>
              <div className='rating flex pt-1'>
                <div className='activity-rating flex items-center gap-1 '>
                  <div className='text-base font-medium'>{booking.tour.overallRating}</div>
                  <Rating max={5} precision={0.1} value={booking.tour.overallRating} size='large' readOnly />
                </div>
              </div>
            </div>
          </>
        }
      />
      <CardContent className='relative flex flex-col gap-2'>
        <div className='flex gap-2'>
          <div className='flex flex-col gap-2 font-normal'>
            {!editMode && (
              <>
                <div className='flex '>
                  <UsersIcon className='mb-[2px] mr-2 h-5 w-5' />
                  <div className='text-base font-medium'>
                    {moment(booking.startDate).format('MM/DD/YYYY')} - {moment(booking.startDate).format('HH:MM')}
                  </div>
                </div>
                <div className='flex'>
                  <ClockIcon className='mb-[2px] mr-2 h-5 w-5' />
                  <div className='text-base font-medium'>{booking.numberTraveler}</div>
                </div>
                <div className='flex gap-2'>
                  <Button
                    onClick={handleUpdate}
                    className='flex h-10 w-20 cursor-pointer gap-1 rounded-full border-none bg-gray-200 px-4 py-3 text-black hover:bg-gray-300'
                    variant='contained'
                  >
                    <span className='text-sm font-medium'>Update</span>
                  </Button>
                  <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-400 text-black hover:bg-red-500'>
                    <DeleteIcon className='h-4 w-4' />
                  </div>
                </div>
              </>
            )}
            {editMode && <BookingForm setEditMode={setEditMode} />}
          </div>
        </div>
        <div className='total absolute bottom-5 right-0 pr-2 text-lg font-medium leading-5'>
          ${booking.price.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
