import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined'
import ViewListIcon from '@mui/icons-material/ViewList'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { KeyboardEvent, SyntheticEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { clearLocalStorage } from 'src/utils/auth'
import { UserRole } from 'src/enums/user-role.enum'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useToggle } from 'src/hooks/useToggle'

interface RightDrawerProps {
  textColor: string
}

const RightDrawer: React.FC<RightDrawerProps> = ({ textColor = 'white' }: RightDrawerProps) => {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [state, setState] = useState({
    right: false
  })
  const [openCollapse, toggleCollapse, setOpenCollapse] = useToggle(false)
  const navigate = useNavigate()

  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    toggleCollapse()
  }

  const toggleDrawer = (anchor: string, open: boolean) => (event: SyntheticEvent | MouseEvent) => {
    if (
      event &&
      'type' in event &&
      (event.type === 'keydown' || event.type === 'keyup') &&
      (event as KeyboardEvent).key &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    )
      return

    setState({ ...state, [anchor]: open })

    if (!open) setOpenCollapse(false)
  }

  const handleLogout = () => {
    clearLocalStorage()
    navigate(path.home)
    window.location.reload()
  }

  const listAuthenticated = (anchor: string) => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding component={Link} to={path.wishlist}>
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
        <ListItem disablePadding component={Link} to={path.bookings}>
          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Bookings' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to={path.invoices}>
          <ListItemButton>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary='Invoices' />
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
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCollapse} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.profile}>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.tourRequest}>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary='Management' />
            </ListItemButton>
            {profile?.role === UserRole.TRAVELER && (
              <ListItemButton sx={{ pl: 4 }} component={Link} to={path.guideApplications}>
                <ListItemIcon>
                  <ContactPageOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary='Become a guide' />
              </ListItemButton>
            )}
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

  const listNotAuthenticated = (anchor: string) => (
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
        <ListItem disablePadding component={Link} to={path.bookings}>
          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Bookings' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to={path.invoices}>
          <ListItemButton>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary='Invoices' />
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
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openCollapse} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.guideApplications}>
              <ListItemIcon>
                <ContactPageOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Become a guide' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.login}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary='Sign in' />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to={path.register}>
              <ListItemIcon>
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText primary='Sign up' />
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
        {isAuthenticated ? listAuthenticated('right') : listNotAuthenticated('right')}
      </Drawer>
    </>
  )
}

export default RightDrawer
