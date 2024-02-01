import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SvgIcon from '@mui/material/SvgIcon'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { ReactComponent as WhiteLogoIcon } from 'src/assets/logo-white.svg'
import { ReactComponent as MainLogoIcon } from 'src/assets/logo.svg'
import { headerHeight } from 'src/constants/height.constant'

interface Props {
  bgColor?: string
  textColor?: string
  logoColor?: 'main' | 'white'
}

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className={`relative ml-2 flex cursor-pointer flex-col items-center text-base 
    hover:after:w-full md:ml-4 md:after:absolute md:after:bottom-[-4px] md:after:left-0 md:after:h-[2px] 
    md:after:w-0 md:after:bg-orange-500 md:after:transition-all md:after:duration-300 xl:ml-8`}
  >
    {icon}
    <span className='hidden pt-1 md:block md:text-sm'>{text}</span>
  </Link>
)

export default function Header({
  bgColor = 'linear-gradient(180deg,#0000001c  0,rgba(0,0,0,0))',
  textColor = (theme) => theme.palette.primary.main,
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
      {' '}
      <Box className='header__content xl: block min-w-80 px-4 py-2 md:mx-auto md:px-8 md:py-3 lg:w-full lg:max-w-[1400px] lg:px-8 xl:px-24'>
        <div className='grid grid-cols-6'>
          <Link to='/' className='col-span-1 flex items-center'>
            <SvgIcon
              component={logoColor === 'main' ? MainLogoIcon : WhiteLogoIcon}
              inheritViewBox
              className='h-10 w-10 md:h-14 md:w-14'
            />
          </Link>
          <div className='search-bar col-span-3 flex items-center'>
            <Box className='relative flex w-auto items-center rounded-full border-2 border-solid border-[var(--border-primary)] bg-white focus:border-2 focus:border-solid focus:border-blue-500 sm:w-full'>
              <div className='search-icon pointer-events-none absolute flex h-full items-center justify-center p-4'>
                <SearchIcon sx={{ fontSize: 24, color: (theme) => theme.palette.primary.main }} />
              </div>
              <InputBase
                sx={{
                  color: 'inherit',
                  '& .MuiInputBase-input': {
                    padding: (theme) => theme.spacing(1, 1, 1, 0),
                    paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
                    transition: (theme) => theme.transitions.create('width'),
                    width: '100%',
                    height: '1.5rem',
                    fontSize: '1rem',
                    '@media (min-width:768px)': {
                      height: '2.5rem'
                    }
                  }
                }}
                className='w-full font-semibold'
                placeholder='Where are you going?'
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button
                className='mr-2 hidden rounded-full pr-7 font-semibold md:inline-block'
                variant='contained'
                size='large'
              >
                Search
              </Button>
            </Box>
          </div>
          <Box className='col-span-2 flex items-center justify-end' sx={{ color: textColor }}>
            <NavLink to='/' icon={<FavoriteBorderIcon sx={{ fontSize: 24 }} />} text='Wishlist' />
            <NavLink to='/' icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />} text='Cart' />
            <NavLink to='/' icon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: 24 }} />} text='Bookings' />
            <NavLink to='/' icon={<AccountCircleOutlinedIcon sx={{ fontSize: 24 }} />} text='Username' />
          </Box>
        </div>
      </Box>
    </Box>
  )
}
