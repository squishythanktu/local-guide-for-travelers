import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Box } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import path from 'src/constants/path.constant'
import OrderSummary from './components/OrderSummary'
import PassengerInformation from './components/PassengerInformation/PassengerInformation'
import { Link as RouterLink } from 'react-router-dom'

export default function Checkout() {
  const breadcrumbs = [
    <Link
      key='1'
      underline='hover'
      sx={{ display: 'flex', alignItems: 'center' }}
      color='inherit'
      component={RouterLink}
      to={path.cart}
    >
      <ShoppingCartOutlinedIcon sx={{ mr: 0.5 }} fontSize='inherit' />
      Cart
    </Link>,
    <Link
      key='2'
      underline='hover'
      sx={{ display: 'flex', alignItems: 'center' }}
      color='inherit'
      component={RouterLink}
      to={path.checkout}
    >
      <PaymentOutlinedIcon sx={{ mr: 0.5 }} fontSize='inherit' />
      Checkout
    </Link>
  ]

  return (
    <Box className='container flex flex-col'>
      <Breadcrumbs className='mt-4' aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>
      <div className='flex flex-col-reverse gap-10 py-4 md:flex-row md:gap-4'>
        <div className='checkout__order-summary w-full md:w-[60%]'>
          <OrderSummary />
        </div>
        <div className='checkout__personal-details w-full md:w-[40%]'>
          <PassengerInformation />
        </div>
      </div>
    </Box>
  )
}
