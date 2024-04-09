import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonIcon from '@mui/icons-material/Person'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { Link, useLocation } from 'react-router-dom'
import AvatarSideNav from 'src/components/AvatarSideNav/AvatarSideNav'
import path from 'src/constants/path.constant'
import { isActive } from 'src/utils/active.util'

export default function AccountSideNav() {
  const location = useLocation()

  return (
    <div className='account__container flex-auto md:m-0'>
      <AvatarSideNav />
      <div className='account__side-menu'>
        <Paper>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to={path.profile} selected={isActive(location, path.profile)}>
                <ListItemIcon>
                  <PersonIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Profile' />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to={path.password} selected={isActive(location, path.password)}>
                <ListItemIcon>
                  <LockOutlinedIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Password' />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </div>
    </div>
  )
}
