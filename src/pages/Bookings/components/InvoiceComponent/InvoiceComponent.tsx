import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Button, Chip, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import paymentApi from 'src/apis/payment.api'
import ConfirmDialog from 'src/components/ConfirmDialog/ConfirmDialog'
import PassengerInfo from 'src/pages/BookingSuccess/components/PassengerInfo/PassengerInfo'
import { Invoice } from 'src/types/invoice.type'
import BookingContent from '../BookingContent/BookingContent'

interface Props {
  invoice: Invoice
  refetchInvoicesData: () => Promise<QueryObserverResult>
}

const InvoiceComponent: React.FC<Props> = ({ invoice, refetchInvoicesData }: Props) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(false)
  const [isClicked, setIsClicked] = useState<{ confirmRefund: boolean; refund: boolean }>({
    confirmRefund: false,
    refund: false
  })
  const [refundSuccess, setRefundSuccess] = useState<boolean>(false)

  const { data: refundData, isLoading } = useQuery({
    queryKey: [`refund ${invoice.id}`],
    queryFn: () => paymentApi.refundInvoice({ invoice_id: invoice.id }),
    enabled: isClicked.confirmRefund
  })

  useEffect(() => {
    if (isClicked.confirmRefund) {
      if (refundData?.data.data) {
        setRefundSuccess(true)
        refetchInvoicesData()
      }
      if (!isLoading && Number(refundData?.data.statusCode) !== 200) {
        toast.error(`Cancellation and refund failure.`)
        setIsClicked((prevState) => ({
          ...prevState,
          confirmRefund: false
        }))
      }
    }
  }, [isLoading])

  return (
    <div className='mb-7 mt-3  rounded-lg border-2 '>
      <div className='grid grid-cols-2 p-3'>
        <div className='col-span-1'>
          <div className='text-lg font-medium'>Passenger Information</div>
          <PassengerInfo email={invoice.email} fullName={invoice.fullName} phone={invoice.phone} />
        </div>
        <div className='col-span-1 flex flex-col items-end justify-between gap-4'>
          {invoice.status === 'PAID' && (
            <Button
              variant='outlined'
              onClick={() =>
                setIsClicked((prevState) => ({
                  ...prevState,
                  refund: true
                }))
              }
              className='w-fit'
              color='primary'
              size='medium'
            >
              Cancel & Refund
            </Button>
          )}
          {invoice.status === 'REFUNDED' && (
            <Chip className='' label='REFUNDED' color='error' size='small' variant='filled' />
          )}
          <Typography className='text-2xl font-extrabold' sx={{ color: (theme) => theme.palette.secondary.main }}>
            ${invoice.priceTotal}
          </Typography>
        </div>
      </div>
      <div className=''>
        <div className='px-3 pb-3 text-lg font-medium'>
          Tours Information
          <Button
            variant='outlined'
            endIcon={openCollapse ? <ExpandLess /> : <ExpandMore />}
            onClick={() => setOpenCollapse(!openCollapse)}
            className='ml-2'
            size='small'
          >
            {!openCollapse ? 'View' : 'Hide'}
          </Button>
        </div>
        {openCollapse && (
          <div className='bg-slate-200 p-3'>
            <BookingContent bookingList={invoice.tours} />
          </div>
        )}
      </div>
      {isClicked.refund && (
        <ConfirmDialog
          title='Confirm cancel'
          content='Are you sure you want to cancel and refund this tour?'
          handleClose={() =>
            setIsClicked((prevState) => ({
              ...prevState,
              refund: false
            }))
          }
          handleConfirm={() => {
            setIsClicked({ confirmRefund: true, refund: false })
          }}
        />
      )}
      {refundSuccess && (
        <Dialog open={true}>
          <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
            Refund Successful
            <img src='/assets/images/refund.png' alt='Refund success img' />
            <p>Refund of {refundData?.data.data.vndPrice.toLocaleString()} VNĐ has been successfully processed.</p>
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setRefundSuccess(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
export default InvoiceComponent
