import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

export default function AccountSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='account__container flex-auto md:m-0'>
      <Box
        className='account__header relative flex h-32 flex-col justify-center overflow-hidden text-center text-white'
        sx={{ backgroundColor: `var(--decorative-midnight-blue)` }}
      >
        <h1 className='account__header-name mb-1 text-2xl font-bold'>{profile?.fullName || 'username'}</h1>
        <h4 className='account__header-subheading font-bold tracking-wide'>{profile?.roles?.join(' | ')}</h4>
        <img
          src='/assets/svg/top-line.svg'
          className='absolute right-[-130px] top-[-10px]'
          alt='account__header__top-line'
        />
        <img
          src='/assets/svg/bottom-line.svg'
          className='absolute bottom-[5px] left-[-120px]'
          alt='account__header__bottom-line'
        />
      </Box>
      <div className='account__side-menu'>
        <Paper>
          <MenuList>
            <MenuItem component={Link} to={path.profile}>
              <ListItemIcon>
                <PersonIcon fontSize='small' />
              </ListItemIcon>
              <Typography variant='inherit' noWrap>
                Profile
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to={path.password}>
              <ListItemIcon>
                <LockOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <Typography variant='inherit' noWrap>
                Password
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to={path.tours}>
              <ListItemIcon>
                <AddLocationAltOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <Typography variant='inherit' noWrap>
                Tour Management
              </Typography>
            </MenuItem>
            <Divider />

            <MenuItem component={Link} to={path.schedule}>
              <ListItemIcon>
                <CalendarMonthIcon fontSize='small' />
              </ListItemIcon>
              <Typography variant='inherit' noWrap>
                Schedule Management
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    </div>
  )
}
