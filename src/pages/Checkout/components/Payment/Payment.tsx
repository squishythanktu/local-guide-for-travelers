import { Button, Card } from '@mui/material'

export default function Payment() {
  return (
    <div>
      <h3 className='pb-3'>Payment</h3>
      <Card className='rounded-lg border-2 shadow-none'>
        <div className='p-4'>
          <Button type='submit' className=' rounded-full pr-7 font-semibold' variant='contained' size='large'>
            Pay now
          </Button>
        </div>
      </Card>
    </div>
  )
}
