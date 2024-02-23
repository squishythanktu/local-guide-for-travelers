import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import AlertTitle from '@mui/material/AlertTitle'

export default function CartTotal() {
  return (
    <div className=''>
      <Card className='rounded-lg border p-2'>
        <CardHeader
          title={
            <>
              <div className='item-card__header flex justify-between'>
                <div className='title text-xl font-bold leading-5'>Total (1 item):</div>
                <div className='flex flex-col items-end gap-1'>
                  <div className='title text-xl font-bold leading-5'>$38.00</div>
                  <div className='title text-xs font-medium leading-5 text-emerald-700 lg:text-sm'>
                    All taxes and fees included
                  </div>
                </div>
              </div>
            </>
          }
        />
        <CardActions className='relative'>
          <Button
            type='submit'
            className='mr-2 w-[100%] rounded-full pr-7 font-semibold md:inline-block'
            variant='contained'
            size='large'
          >
            Go to checkout
          </Button>
        </CardActions>
        <CardContent>
          <Alert variant='standard' severity='success' className='text-sm'>
            <AlertTitle className='text-sm'>Free cancellation</AlertTitle>

            <div className='text-sm'>Until 11:00 AM on February 23</div>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
