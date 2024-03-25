import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import { CssVarsTheme, Theme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import WhiteLogoIcon from 'src/assets/svg/logo-white.svg'
import MainLogoIcon from 'src/assets/svg/logo.svg'
import { headerHeight } from 'src/constants/width-height.constant'
import path from 'src/constants/path.constant'
import NavLink from './NavLink'
import ProfileMenu from './ProfileMenu'
import RightDrawer from './RightDrawer/RightDrawer'
import SearchBar from './SearchBar/SearchBar'
import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import Notification from './Notification/Notification'
import { AppContext } from 'src/contexts/app.context'

interface HeaderProps {
  bgColor?: string
  textColor?: string
  logoColor?: 'main' | 'white'
  isEnableScroll?: boolean
}

export default function Header({
  bgColor = 'linear-gradient(180deg,#392a2a1c  0,rgba(0,0,0,0))',
  textColor = ((theme: Omit<Theme, 'palette'> & CssVarsTheme) => theme.palette.primary.main).toString(),
  logoColor = 'main',
  isEnableScroll = true
}: HeaderProps) {
  const { isAuthenticated } = useContext(AppContext)
  const [scroll, setScroll] = useState<boolean>(false)

  useEffect(() => {
    if (!isEnableScroll) return

    const handleScroll = () => {
      const scrollHeight = window.scrollY
      const specificHeight = 520

      if (scrollHeight > specificHeight) {
        setScroll(true)
        return
      }
      setScroll(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isEnableScroll])

  return (
    <Box
      className={classNames('header__container top-0', {
        sticky: scroll && isEnableScroll
      })}
      sx={{
        height: headerHeight.sm,
        width: '100%',
        background: `${scroll && isEnableScroll ? 'white' : bgColor}`,
        '@media (min-width: 768px)': {
          height: headerHeight.md
        },
        zIndex: 99
      }}
    >
      <Box className='header__content block min-w-80 px-4 py-2 md:mx-auto md:px-8 md:py-3 lg:w-full lg:max-w-[1400px] lg:px-8 xl:px-24'>
        <div className='grid grid-cols-12'>
          <Link to='/' className='col-span-1 flex items-center lg:col-span-2'>
            <SvgIcon
              component={logoColor === 'main' ? MainLogoIcon : scroll && isEnableScroll ? MainLogoIcon : WhiteLogoIcon}
              inheritViewBox
              className='h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14'
            />
          </Link>
          <SearchBar className='search-bar col-span-9 col-start-2 mx-4 flex h-[48px] items-center md:col-span-7 md:col-start-3 md:h-[60px] lg:col-span-6 lg:mr-6' />
          <Box
            className='col-span-3 col-start-10 hidden lg:flex lg:items-center lg:justify-end'
            sx={{ color: `${scroll && isEnableScroll ? 'black' : textColor}` }}
          >
            <NavLink to={path.wishlist} icon={<FavoriteBorderIcon sx={{ fontSize: 24 }} />} text='Wishlist' />
            <NavLink to={path.cart} icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />} text='Cart' />
            <NavLink
              to={path.bookings}
              icon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: 24 }} />}
              text='Bookings'
            />
            {isAuthenticated && <Notification textColor={scroll && isEnableScroll ? 'black' : textColor} />}
            <ProfileMenu textColor={scroll && isEnableScroll ? 'black' : textColor} />
          </Box>
          <Box className='drawer col-span-2 col-start-11 flex items-center justify-end lg:col-span-1 lg:col-start-12 lg:hidden'>
            {isAuthenticated && <Notification textColor={scroll && isEnableScroll ? 'black' : textColor} />}
            <RightDrawer textColor={scroll && isEnableScroll ? 'black' : textColor} />
          </Box>
        </div>
      </Box>
    </Box>
  )
}
