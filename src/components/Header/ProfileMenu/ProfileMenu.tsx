import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constant'
import React, { useContext } from 'react'
import NavLink from '../NavLink'
import { AppContext } from 'src/contexts/app.context'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { clearLS } from 'src/utils/auth'

interface Props {
  textColor: string
}

export default function ProfileMenu({ textColor }: Props) {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <NavLink
        to=''
        icon={
          <IconButton
            onClick={handleClick}
            size='small'
            className='p-0'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircleOutlinedIcon sx={{ fontSize: 24, color: textColor }} />
          </IconButton>
        }
        text={isAuthenticated && profile && profile.username ? profile.username : 'Profile'}
      />
      {!isAuthenticated && (
        <Menu
          disableScrollLock
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null)
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          sx={{
            '& .MuiPaper-root': {
              marginTop: '24px',
              minWidth: 180
            }
          }}
        >
          <MenuItem component={Link} to={path.login}>
            <ListItemIcon>
              <LoginIcon fontSize='small' />
            </ListItemIcon>
            Sign in
          </MenuItem>
          <MenuItem component={Link} to={path.register}>
            <ListItemIcon>
              <PersonAddAlt1Icon fontSize='small' />
            </ListItemIcon>
            Sign up
          </MenuItem>
          <Divider />
          <MenuItem component={Link} to='/'>
            <ListItemIcon>
              <LightModeOutlinedIcon fontSize='small' />
            </ListItemIcon>
            Appearance
          </MenuItem>
        </Menu>
      )}
      {isAuthenticated && (
        <Menu
          disableScrollLock
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null)
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          sx={{
            '& .MuiPaper-root': {
              marginTop: '24px',
              minWidth: 180
            }
          }}
        >
          <MenuItem component={Link} to={path.profile}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize='small' />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem component={Link} to='/'>
            <ListItemIcon>
              <LightModeOutlinedIcon fontSize='small' />
            </ListItemIcon>
            Appearance
          </MenuItem>
          <Divider />
          <MenuItem onClick={clearLS}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            Log out
          </MenuItem>
        </Menu>
      )}
    </>
  )
}
