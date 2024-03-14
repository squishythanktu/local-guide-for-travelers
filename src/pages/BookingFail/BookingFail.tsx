import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import path from 'src/constants/path.constant'

export default function BookingFail() {
  const navigate = useNavigate()

  return (
    <Box className='container flex flex-col'>
      <div className='flex h-[550px] flex-col items-center justify-center gap-2'>
        <img src='/assets/images/payment-failure.png' alt='Payment failure' className='h-52 w-52 object-cover' />
        <div className='text-2xl font-medium'>Your payment failed</div>
        <span className='text-center text-gray-400'>There was an issue with your payment. Please try again later.</span>
        <Button onClick={() => navigate(path.home)} variant='outlined' size='large' className='mt-4 uppercase'>
          Go home
        </Button>
      </div>
    </Box>
  )
}
