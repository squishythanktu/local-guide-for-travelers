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
import SearchBar from './SearchBar/SearchBar'

interface Props {
  bgColor?: string
  textColor?: string
  logoColor?: 'main' | 'white'
}

export default function Header({
  bgColor = 'linear-gradient(180deg,#392a2a1c  0,rgba(0,0,0,0))',
  textColor = ((theme: Omit<Theme, 'palette'> & CssVarsTheme) => theme.palette.primary.main).toString(),
  logoColor = 'main'
}: Props) {
  return (
    <Box
      className='header__container'
      sx={{
        height: headerHeight.base,
        width: '100%',
        background: `${bgColor}`,
        '@media (min-width: 768px)': {
          height: headerHeight.md
        }
      }}
    >
      <Box className='header__content block min-w-80 px-4 py-2 md:mx-auto md:px-8 md:py-3 lg:w-full lg:max-w-[1400px] lg:px-8 xl:px-24'>
        <div className='grid grid-cols-6'>
          <Link to='/' className='col-span-1 flex items-center'>
            <SvgIcon
              component={logoColor === 'main' ? MainLogoIcon : WhiteLogoIcon}
              inheritViewBox
              className='h-10 w-10 md:h-14 md:w-14'
            />
          </Link>
          <SearchBar />
          <Box className='col-span-2 flex items-center justify-end' sx={{ color: textColor }}>
            <NavLink to='' icon={<FavoriteBorderIcon sx={{ fontSize: 24 }} />} text='Wishlist' />
            <NavLink to={path.cart} icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />} text='Cart' />
            <NavLink to='' icon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: 24 }} />} text='Bookings' />
            <ProfileMenu textColor={textColor} />
          </Box>
        </div>
      </Box>
    </Box>
  )
}
