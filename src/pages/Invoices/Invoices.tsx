import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import invoiceApi from 'src/apis/invoice.api'
import InvoiceComponent from './components/InvoiceComponent/InvoiceComponent'
import { AppContext } from 'src/contexts/app.context'
import Box from '@mui/material/Box'
import Loading from '../Loading/Loading'

const Invoices: React.FC = () => {
  const { isAuthenticated, profile } = useContext(AppContext)

  const { data: invoicesData, refetch: refetchInvoicesData } = useQuery({
    queryKey: [`Get invoices by user with id ${profile?.id}`],
    queryFn: () => invoiceApi.getInvoices()
  })

  if (!isAuthenticated)
    return (
      <div className='flex h-[550px] flex-col items-center justify-center'>
        <img
          loading='lazy'
          src='/assets/images/empty-booking.png'
          alt='Empty booking'
          className='h-52 w-52 object-cover'
        />
        <h3>You have to sign in first to see your invoices.</h3>
      </div>
    )

  return (
    <Box className='container flex min-h-[550px] flex-col '>
      {!invoicesData?.data.data && <Loading />}
      {invoicesData?.data.data && invoicesData.data.data.length > 0 ? (
        <>
          <h2 className='my-invoices mt-6'>My invoices</h2>
          {invoicesData?.data.data.map((invoice, index) => (
            <InvoiceComponent key={index} invoice={invoice} refetchInvoicesData={refetchInvoicesData} />
          ))}
        </>
      ) : (
        <div className='flex h-[550px] flex-col items-center justify-center'>
          <img
            loading='lazy'
            src='/assets/images/empty-booking.png'
            alt='Empty booking'
            className='h-52 w-52 object-cover'
          />
          <h3>No invoice data available.</h3>
        </div>
      )}
    </Box>
  )
}

export default Invoices
