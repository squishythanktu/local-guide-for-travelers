/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Rating from '@mui/material/Rating'
import { QueryObserverResult, useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-toastify'
import cartApi from 'src/apis/cart.api'
import ClockIcon from 'src/assets/svg/clock.svg'
import DeleteIcon from 'src/assets/svg/delete.svg'
import UsersIcon from 'src/assets/svg/users.svg'
import BookingForm from 'src/pages/TourDetail/components/BookingAssistant/BookingForm/BookingForm'
import { Booking } from 'src/types/cart.type'
import { BookingFormSchema } from 'src/utils/rules'

export type BookingUpdateFormData = BookingFormSchema & { id: string }

interface Props {
  booking: Booking
  refetch: () => Promise<QueryObserverResult>
}

export default function ItemCard({ booking, refetch }: Props) {
  const [editMode, setEditMode] = useState(false)
  const handleUpdate = () => {
    setEditMode(true)
  }

  const handleDelete = () => {
    deleteBookingMutation.mutate(booking.id, {
      onSuccess: () => {
        refetch()
        toast.success('Delete the booking in cart successfully.')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  const updateBookingMutation = useMutation({
    mutationFn: (body: BookingUpdateFormData) => {
      return cartApi.updateBookingInCart(body)
    }
  })

  const handleUpdateBookingForm = (body: BookingFormSchema) => {
    console.log('body', body)

    setEditMode(false)
    const formattedBody = { id: booking.id, ...body }
    updateBookingMutation.mutate(formattedBody, {
      onSuccess: () => {
        setEditMode(false)
        refetch()
        toast.success('Update the booking in cart successfully.')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  const deleteBookingMutation = useMutation({
    mutationFn: (id: string) => cartApi.deleteBookingInCart(id)
  })

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
                    className='flex h-10 w-20 cursor-pointer gap-1 rounded-full border-none  px-4 py-3'
                    variant='contained'
                  >
                    <span className='text-sm font-medium'>Update</span>
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full'
                    color='error'
                    variant='outlined'
                  >
                    <DeleteIcon className='h-4 w-4' />
                  </Button>
                </div>
              </>
            )}
            {editMode && <BookingForm onSubmit={handleUpdateBookingForm} booking={booking} setEditMode={setEditMode} />}
          </div>
        </div>
        <div className='total absolute bottom-5 right-0 pr-2 text-lg font-medium leading-5'>
          ${booking.price.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
