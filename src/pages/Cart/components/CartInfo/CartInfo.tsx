import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LockIcon from 'src/assets/svg/lock.svg'
import CheckIcon from 'src/assets/svg/check.svg'
import MessageIcon from 'src/assets/svg/message.svg'

export default function CartInfo() {
  return (
    <Card className='rounded-lg border p-2'>
      <CardHeader
        title={
          <>
            <div className='item-card__header text-base font-bold leading-5'>Why book with us?</div>
          </>
        }
      />
      <CardContent className='flex flex-col gap-2 px-8'>
        <div className='flex items-center font-normal'>
          <LockIcon className='mb-[2px] mr-2 h-6 w-6' />
          <div className='text-sm font-medium'>Secure payment</div>
        </div>
        <div className='flex items-center font-normal'>
          <CheckIcon className='mb-[2px] mr-2 h-6 w-6' />
          <div className='text-sm font-medium'>No hidden costs</div>
        </div>
        <div className='flex items-center font-normal'>
          <MessageIcon className='mb-[2px] mr-2 h-6 w-6' />
          <div className='text-sm font-medium'>24/7 customer support</div>
        </div>
      </CardContent>
    </Card>
  )
}
