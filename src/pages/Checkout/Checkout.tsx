import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Box } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { useContext, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { PassengerInformationSchema } from 'src/utils/rules'
import OrderSummary from './components/OrderSummary/OrderSummary'
import PassengerInformation from './components/PassengerInformation/PassengerInformation'
import PaymentMethod from './components/PaymentMethod/PaymentMethod'

export default function Checkout() {
  const location = useLocation()

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

  const { profile } = useContext(AppContext)
  const [isDisplaySaveButton, setIsDisplaySaveButton] = useState<boolean>(true)

  const [passengerInfo, setPassengerInfo] = useState<PassengerInformationSchema>({
    fullName: profile?.fullName || '',
    phone: profile?.phone || '',
    email: profile?.email || ''
  })

  return (
    <Box className='container flex flex-col'>
      <Breadcrumbs className='mt-4' aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>
      <div className='flex flex-col-reverse gap-10 py-4 md:flex-row md:gap-4'>
        <div className='checkout__order-summary w-full md:w-[60%]'>
          {location.state && location.state.bookingId ? (
            <OrderSummary bookingId={location.state.bookingId} />
          ) : (
            <OrderSummary />
          )}
        </div>
        <div className='checkout__personal-details w-full md:w-[40%]'>
          <PassengerInformation
            isDisplaySaveButton={isDisplaySaveButton}
            setIsDisplaySaveButton={setIsDisplaySaveButton}
            setPassengerInfo={setPassengerInfo}
          />
          {!isDisplaySaveButton &&
            (location.state && location.state.bookingId ? (
              <PaymentMethod
                bookingId={location.state.bookingId}
                isDisplaySaveButton={isDisplaySaveButton}
                passengerInfo={passengerInfo}
              />
            ) : (
              <PaymentMethod isDisplaySaveButton={isDisplaySaveButton} passengerInfo={passengerInfo} />
            ))}
        </div>
      </div>
    </Box>
  )
}
