import { Box, Divider } from '@mui/material'
import CheckIcon from 'src/assets/svg/check-green.svg'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import invoiceApi from 'src/apis/invoice.api'
import ContentInvoice from './components/ContentInvoice'
import PassengerInfo from './components/PassengerInfo'

export default function BookingSuccess() {
  const { id: invoiceId } = useParams()
  const { data: invoiceQuery } = useQuery({
    queryKey: [`Get invoice by ${invoiceId}`],
    queryFn: () => invoiceApi.getInvoice(invoiceId as string)
  })

  return (
    <div className='container my-6 max-w-[800px]'>
      <Box className='my-3 rounded-lg' sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
        <div className='invoice__header relative p-4'>
          <div className='flex flex-col items-center gap-2'>
            <CheckIcon className='h-12 w-12' />
            <div className='text-2xl font-medium'>Booking Success</div>
            <span className='text-center text-gray-400'>
              For more information, please refer to confirmation email, sent to your mailbox!{' '}
            </span>
          </div>
          <div className='absolute bottom-[-0.75rem] left-[-0.75rem] h-6 w-6 rounded-full bg-white'></div>
          <div className='absolute bottom-[-0.75rem] right-[-0.75rem]  h-6 w-6 rounded-full bg-white'></div>
        </div>
        <Divider className='mx-3 rounded-full border-dashed' />
        <div className='invoice__content flex flex-col gap-4 px-4 py-5'>
          <div className='passenger-info'>
            <PassengerInfo />
          </div>
          <div className='tours-info'>
            <Box
              sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
              className='mb-2 rounded-lg px-4 py-2 font-medium'
            >
              Tours Information
            </Box>
            <ContentInvoice bookings={invoiceQuery?.data.data.tours} />
          </div>
          <div className='payment-info'>
            <Box
              sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
              className='mb-2 rounded-lg px-4 py-2 font-medium'
            >
              Payment Information
            </Box>
            <div className='payment-info__content pl-4'>
              <div className='total'>
                <div className='flex flex-col text-sm font-medium'>
                  Total
                  <span className='text-xl font-light'>${invoiceQuery?.data.data.priceTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}
