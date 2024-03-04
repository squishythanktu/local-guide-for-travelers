import { Box } from '@mui/material'
import { useContext } from 'react'
import EmailIcon from 'src/assets/svg/email.svg'
import PhoneIcon from 'src/assets/svg/phone.svg'
import UserIcon from 'src/assets/svg/user.svg'
import { AppContext } from 'src/contexts/app.context'

export default function PassengerInfo() {
  const { profile } = useContext(AppContext)

  return (
    <>
      <Box
        sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
        className='mb-2 rounded-lg px-4 py-2 font-medium'
      >
        Passenger Information
      </Box>
      <div className='flex flex-col gap-2 pl-4'>
        <div className='flex items-center text-base font-normal'>
          <UserIcon className='mb-[2px] mr-2 h-5 w-5' />
          <div className='text-sm font-medium'>
            Name: <span className='text-sm'>{profile?.username}</span>
          </div>
        </div>
        <div className='flex items-center font-normal'>
          <EmailIcon className='mb-[2px] mr-2 h-5 w-5' />
          <div className='text-sm font-medium'>
            Email: <span className='text-sm'>{profile?.email || 'N/A'}</span>
          </div>
        </div>
        <div className='flex items-center font-normal'>
          <PhoneIcon className='mb-[2px] mr-2 h-5 w-5' />
          <div className='text-sm font-medium '>
            <div className='text-sm font-medium'>
              Phone Number: <span className='text-sm'>{profile?.phone || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
