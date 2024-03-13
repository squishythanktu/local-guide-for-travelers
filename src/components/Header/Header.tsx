import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import { CssVarsTheme, Theme } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import WhiteLogoIcon from 'src/assets/svg/logo-white.svg'
import MainLogoIcon from 'src/assets/svg/logo.svg'
import { headerHeight } from 'src/constants/height.constant'
import path from 'src/constants/path.constant'
import NavLink from './NavLink'
import ProfileMenu from './ProfileMenu'
import RightDrawer from './RightDrawer/RightDrawer'
import SearchBar from './SearchBar/SearchBar'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

interface Props {
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
}: Props) {
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    if (!isEnableScroll) return

    const handleScroll = () => {
      const scrollHeight = window.scrollY
      const specificHeight = 520

      if (scrollHeight > specificHeight) {
        setScroll(true)
      } else {
        setScroll(false)
      }
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
        height: headerHeight.base,
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
          <SearchBar className='search-bar col-span-10 col-start-2 mx-4 flex h-[48px] items-center md:col-span-8 md:col-start-3 md:h-[60px] lg:col-span-6' />
          <Box
            className='col-span-3 col-start-10 hidden lg:flex lg:items-center lg:justify-end'
            sx={{ color: `${scroll && isEnableScroll ? 'black' : textColor}` }}
          >
            <NavLink to='' icon={<FavoriteBorderIcon sx={{ fontSize: 24 }} />} text='Wishlist' />
            <NavLink to={path.cart} icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />} text='Cart' />
            <NavLink
              to={path.bookings}
              icon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: 24 }} />}
              text='Bookings'
            />
            <ProfileMenu textColor={scroll && isEnableScroll ? 'black' : textColor} />
          </Box>
          <Box className='drawer col-span-1 col-start-12 flex items-center justify-end lg:hidden'>
            <RightDrawer textColor={scroll && isEnableScroll ? 'black' : textColor} />
          </Box>
        </div>
      </Box>
    </Box>
  )
}
