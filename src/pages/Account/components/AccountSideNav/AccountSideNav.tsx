import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import AvatarSideNav from 'src/components/AvatarSideNav/AvatarSideNav'
import path from 'src/constants/path.constant'

export default function AccountSideNav() {
  return (
    <div className='account__container flex-auto md:m-0'>
      <AvatarSideNav />
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
          </MenuList>
        </Paper>
      </div>
    </div>
  )
}
