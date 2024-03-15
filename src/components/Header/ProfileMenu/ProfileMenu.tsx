import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Button } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

interface ProfileMenuProps {
  textColor: string
}

export default function ProfileMenu({ textColor }: ProfileMenuProps) {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    clearLS()
    navigate(path.home)
    window.location.reload()
  }

  return (
    <>
      <Button
        onClick={handleClick}
        className={classNames(
          'ml-0 flex flex-col items-center text-sm font-normal hover:after:w-full md:after:absolute md:after:bottom-[1.5px] md:after:left-0 md:after:h-[2.5px] md:after:w-0 md:after:bg-orange-500 md:after:transition-all md:after:duration-300',
          {
            'md:after:w-full': location.pathname.includes(path.account)
          }
        )}
        sx={{
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent'
          },
          color: textColor
        }}
        disableRipple
        disableFocusRipple
      >
        <AccountCircleOutlinedIcon sx={{ fontSize: 24, color: textColor, marginBottom: '4px' }} />
        <span className='hidden text-sm md:block'>
          {isAuthenticated && profile && profile.fullName
            ? profile.fullName
            : profile?.email
              ? profile?.email.split('@')[0]
              : 'Profile'}
        </span>
      </Button>
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
              marginTop: '4px',
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
              marginTop: '4px',
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
          <MenuItem onClick={handleLogout}>
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
