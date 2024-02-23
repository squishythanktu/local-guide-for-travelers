import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import UpdateIcon from 'src/assets/svg/update.svg'
import DeleteIcon from 'src/assets/svg/delete.svg'
import { useState } from 'react'
import ParticipantInput from 'src/pages/TourDetail/components/ParticipantInput'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ClockIcon from 'src/assets/svg/clock.svg'
import UsersIcon from 'src/assets/svg/users.svg'

export default function ItemCard() {
  const [editMode, setEditMode] = useState(false)
  const [hour, setHour] = useState<string>('')

  const handleChange = (event: SelectChangeEvent<typeof hour>) => {
    setHour(event.target.value)
  }

  const handleUpdate = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  return (
    <Card className='rounded-lg border p-2 shadow-none'>
      <CardHeader
        avatar={
          <CardMedia
            className='h-24 w-24 rounded-lg object-cover'
            component='img'
            alt='Tour image'
            image='/assets/images/homepage-cover.jpg'
          />
        }
        title={
          <>
            <div className='item-card__header'>
              <div className='title text-lg font-medium leading-5'>London: The London Eye Entry Ticket</div>
              <div className='rating flex pt-1'>
                <div className='activity-rating flex items-center gap-1 '>
                  <div className='text-base font-medium'>{4.5}</div>
                  <Rating max={5} precision={0.1} value={4.5} size='large' readOnly />
                </div>
              </div>
            </div>
          </>
        }
      />
      <CardContent className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <div className='flex items-center font-normal'>
            <ClockIcon className='mb-[2px] mr-2 h-5 w-5' />
            {!editMode && <div className='text-base font-medium'>Saturday, February 24, 2024</div>}
            {editMode && <ParticipantInput />}
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='flex items-center font-normal'>
            <UsersIcon className='mb-[2px] mr-2 h-5 w-5' />
            {!editMode && (
              <>
                <div className='text-base font-medium'>
                  {'1 Adult'} - {'11:00 AM'}
                </div>
              </>
            )}
            {editMode && (
              <div className='flex gap-2'>
                <DatePicker
                  className='w-64'
                  sx={{
                    bgcolor: 'white',
                    border: '8px',
                    '.MuiOutlinedInput-notchedOutline': {
                      border: ''
                    },
                    '.MuiOutlinedInput-root': {
                      borderRadius: '4px'
                    }
                  }}
                />
                <Select
                  onChange={handleChange}
                  value={hour}
                  className=''
                  sx={{
                    rounded: 'rounded',
                    border: 'border',
                    borderRadius: '4px',
                    borderStyle: 'border-solid',
                    borderColor: 'neutral-300',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'black'
                    }
                  }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>11:00 AM</MenuItem>
                  <MenuItem value={20}>12:00 AM</MenuItem>
                  <MenuItem value={5}>5:00 AM</MenuItem>
                </Select>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardActions className='relative'>
        <div className='flex gap-2'>
          <Button
            onClick={editMode ? handleCancel : handleUpdate}
            className='flex h-10 w-20 cursor-pointer gap-1 rounded-full border-none bg-gray-200 px-4 py-3 text-black hover:bg-gray-300'
            variant='contained'
          >
            {!editMode ? (
              <>
                <UpdateIcon className='h-4 w-4' />
                <span className='text-sm font-medium'>Edit</span>
              </>
            ) : (
              <span className='text-sm font-medium'>Cancel</span>
            )}
          </Button>
          {!editMode && (
            <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-400 text-black hover:bg-red-500'>
              <DeleteIcon className='h-4 w-4' />
            </div>
          )}
        </div>
        <div className='total absolute right-0 pr-2 text-lg font-medium leading-5'>$37.28</div>
      </CardActions>
    </Card>
  )
}
