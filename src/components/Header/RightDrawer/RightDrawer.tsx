import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import path from 'src/constants/path.constant'
import Box from '@mui/material/Box'
import { SyntheticEvent, useContext, useState, KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

interface RightDrawerProps {
  textColor: string
}

const RightDrawer: React.FC<RightDrawerProps> = ({ textColor = 'white' }: RightDrawerProps) => {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [state, setState] = useState({
    right: false
  })
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    setOpen(!open)
  }

  const toggleDrawer = (anchor: string, open: boolean) => (event: SyntheticEvent | MouseEvent) => {
    if (
      event &&
      'type' in event &&
      (event.type === 'keydown' || event.type === 'keyup') &&
      (event as KeyboardEvent).key &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })

    if (!open) {
      setOpen(false)
    }
  }

  const handleLogout = () => {
    clearLS()
    navigate(path.home)
    window.location.reload()
  }

  const list = (anchor: string) => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteBorderIcon />
            </ListItemIcon>
            <ListItemText primary='Wish list' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to={path.cart}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Cart' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Bookings' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                isAuthenticated && profile && profile.fullName
                  ? profile.fullName
                  : profile?.email
                    ? profile?.email.split('@')[0]
                    : 'Profile'
              }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.profile}>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LightModeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Appearance' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Log out' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  )

  return (
    <>
      <IconButton
        className='h-[35px] w-[35px] md:h-12 md:w-12'
        sx={{ color: `${textColor}` }}
        aria-label='menu drawer'
        onClick={toggleDrawer('right', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor='right' open={state.right} onClose={toggleDrawer('right', false)}>
        {list('right')}
      </Drawer>
    </>
  )
}

export default RightDrawer
