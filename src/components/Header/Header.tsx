import { Link } from 'react-router-dom'
import { SvgIcon } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import { ReactComponent as MainLogoIcon } from 'src/assets/logo.svg'
import { ReactComponent as WhiteLogoIcon } from 'src/assets/logo-white.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Box from '@mui/material/Box'

interface Props {
  theme: any
  bgColor: string
  textColor: string
  logoColor?: 'main' | 'white'
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '2.5rem',
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      width: '28ch'
    }
  }
}))

export default function Header({ bgColor, textColor, logoColor = 'main' }: Props) {
  return (
    <Box className='pb-2 pt-1' sx={{ bgcolor: bgColor }}>
      <div className='mx-auto py-1'>
        <div className='grid grid-cols-6'>
          <Link to='/' className='col-span-1 flex items-center justify-center'>
            <SvgIcon
              component={logoColor === 'main' ? MainLogoIcon : WhiteLogoIcon}
              inheritViewBox
              className='h-10 w-10 md:h-14 md:w-14'
            />
          </Link>
          <div className='col-span-3 flex items-center'>
            <Search className='flex max-w-full items-center rounded-full'>
              <div className='pointer-events-none absolute flex h-full items-center justify-center p-4'>
                <SearchIcon sx={{ fontSize: 24, color: textColor }} />
              </div>
              <StyledInputBase placeholder='Where are you going?' inputProps={{ 'aria-label': 'search' }} />
              <Button
                className='mr-2 hidden rounded-full uppercase md:inline-block'
                variant='contained'
                size='large'
                sx={{ height: '2.5rem', width: '6rem' }}
              >
                Search
              </Button>
            </Search>
          </div>
          <Box
            className='col-span-2 flex items-center justify-end'
            // sx={{ color: (theme) => theme.palette.primary.main }}
            sx={{ color: textColor }}
          >
            <Link to='' className='nav md:hidden'>
              <SearchOutlinedIcon sx={{ fontSize: 24 }} />
            </Link>
            <Link to='' className='nav'>
              <FavoriteBorderIcon sx={{ fontSize: 24 }} />
              <span className='hidden pt-1 md:block md:text-sm'>Wishlist</span>
            </Link>
            <Link to='' className='nav'>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
              <span className='hidden pt-1 md:block md:text-sm'>Cart</span>
            </Link>
            <Link to='' className='nav'>
              <ConfirmationNumberOutlinedIcon sx={{ fontSize: 24 }} />
              <span className='hidden pt-1 md:block md:text-sm'>Bookings</span>
            </Link>
            <Link to='' className='nav pr-2 md:pr-4'>
              <AccountCircleOutlinedIcon sx={{ fontSize: 24 }} />
              <span className='hidden pt-1 md:block md:text-sm'>Username</span>
            </Link>
          </Box>
        </div>
      </div>
    </Box>
  )
}
