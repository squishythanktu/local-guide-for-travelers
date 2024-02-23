import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import SvgIcon from '@mui/material/SvgIcon'
import { CssVarsTheme, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import WhiteLogoIcon from 'src/assets/svg/logo-white.svg'
import MainLogoIcon from 'src/assets/svg/logo.svg'
import { headerHeight } from 'src/constants/height.constant'
import { SearchCategory } from 'src/enums/search-category.enum'
import useQueryConfig from 'src/hooks/useQueryConfig'
import useSearchToursGuides from 'src/hooks/useSearchToursGuides'
import theme from 'src/theme'
import NavLink from './NavLink'
import ProfileMenu from './ProfileMenu'
import path from 'src/constants/path.constant'

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
  const location = useLocation()
  const getInitialSearchCategoryValue = () => {
    return location.pathname.includes(SearchCategory.GUIDES) ? SearchCategory.GUIDES : SearchCategory.TOURS
  }
  const { onSubmitSearch, control, trigger, register } = useSearchToursGuides()
  const queryConfig = useQueryConfig()
  const [searchCategory, setSearchCategory] = useState<string>(getInitialSearchCategoryValue())
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'))

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
              <div className='search-icon flex h-full w-auto items-center justify-center border-r-2 border-solid border-[var(--border-primary)]'>
                <FormControl size='small'>
                  <Select
                    displayEmpty
                    id='searchCategory'
                    value={searchCategory}
                    label='Categories'
                    {...register('searchCategory')}
                    onChange={(event) => {
                      setSearchCategory(event.target.value)
                      trigger('searchCategory')
                    }}
                    className='h-full w-12 overflow-auto md:w-[100px]'
                    sx={{
                      boxShadow: 'none',
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        border: 0
                      },
                      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 0
                      }
                    }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value={SearchCategory.TOURS}>Tours</MenuItem>
                    <MenuItem value={SearchCategory.GUIDES}>Guides</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Controller
                control={control}
                name='searchName'
                render={({ field }) => (
                  <InputBase
                    sx={{
                      color: 'inherit',
                      '& .MuiInputBase-input': {
                        padding: (theme) => theme.spacing(1, 1, 1, 1.5),
                        transition: (theme) => theme.transitions.create('width'),
                        width: '100%',
                        height: isMdBreakpoint ? '2.5rem' : '1.5rem',
                        fontSize: '1rem'
                      }
                    }}
                    className='w-full font-semibold'
                    placeholder={searchCategory === SearchCategory.TOURS ? 'Search tours' : 'Search guides'}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('searchName')
                    }}
                    defaultValue={queryConfig.searchName ? queryConfig.searchName : field.value || ''}
                  />
                )}
              />
              {isMdBreakpoint ? (
                <Button
                  type='submit'
                  className='mr-2 rounded-full font-semibold md:inline-block'
                  variant='contained'
                  size={'large'}
                >
                  <SearchIcon />
                </Button>
              ) : (
                <IconButton type='submit' color='primary' aria-label='search' className='mr-2'>
                  <SearchIcon />
                </IconButton>
              )}
            </Box>
          </form>
          <Box className='col-span-2 flex items-center justify-end' sx={{ color: textColor }}>
            <NavLink to='/' icon={<FavoriteBorderIcon sx={{ fontSize: 24 }} />} text='Wishlist' />
            <NavLink to={path.cart} icon={<ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />} text='Cart' />
            <NavLink to='/' icon={<ConfirmationNumberOutlinedIcon sx={{ fontSize: 24 }} />} text='Bookings' />
            <ProfileMenu textColor={textColor} />
          </Box>
        </div>
      </Box>
    </Box>
  )
}
