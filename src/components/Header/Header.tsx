import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import SvgIcon from '@mui/material/SvgIcon'
import { CssVarsTheme, Theme } from '@mui/material/styles'
import { Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import WhiteLogoIcon from 'src/assets/svg/logo-white.svg'
import MainLogoIcon from 'src/assets/svg/logo.svg'
import { headerHeight } from 'src/constants/height.constant'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useSearchToursGuides from 'src/hooks/useSearchToursGuides'
import NavLink from './NavLink'
import ProfileMenu from './ProfileMenu'

interface Props {
  bgColor?: string
  textColor?: string
  logoColor?: 'main' | 'white'
}

export default function Header({
  bgColor = 'linear-gradient(180deg,#0000001c  0,rgba(0,0,0,0))',
  textColor = ((theme: Omit<Theme, 'palette'> & CssVarsTheme) => theme.palette.primary.main).toString(),
  logoColor = 'main'
}: Props) {
  const { onSubmitSearch, control, trigger } = useSearchToursGuides()
  const queryConfig = useQueryConfig()

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
          <form className='search-bar col-span-3 flex items-center' onSubmit={onSubmitSearch}>
            <Box className='relative flex w-auto items-center rounded-full border-2 border-solid border-[var(--border-primary)] bg-white focus:border-2 focus:border-solid focus:border-blue-500 sm:w-full'>
              <div className='search-icon pointer-events-none absolute flex h-full items-center justify-center p-4'>
                <SearchIcon sx={{ fontSize: 24, color: (theme) => theme.palette.primary.main }} />
              </div>
              <Controller
                control={control}
                name='search_name'
                render={({ field }) => (
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
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('search_name')
                    }}
                    defaultValue={queryConfig.search_name ? queryConfig.search_name : field.value || ''}
                  />
                )}
              />
              <Button
                type='submit'
                className='mr-2 hidden rounded-full pr-7 font-semibold md:inline-block'
                variant='contained'
                size='large'
              >
                Search
              </Button>
            </Box>
          </form>
          <Box className='col-span-2 flex items-center justify-end' sx={{ color: textColor }}>
            <NavLink to='/' icon={<FavoriteBorderIcon sx={{ fontSize: 24 }} />} text='Wishlist' />
            <NavLink to='/' icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />} text='Cart' />
            <NavLink to='/' icon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: 24 }} />} text='Bookings' />
            <ProfileMenu textColor={textColor} />
          </Box>
        </div>
      </Box>
    </Box>
  )
}
