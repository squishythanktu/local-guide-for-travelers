import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import { Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import AvatarSideNav from 'src/components/AvatarSideNav/AvatarSideNav'
import path from 'src/constants/path.constant'

const ManagementSideNav: React.FC = () => {
  return (
    <div className='account__container flex-auto md:m-0'>
      <AvatarSideNav />
      <div className='account__side-menu'>
        <Paper>
          <MenuList>
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
            <Divider />
            <MenuItem component={Link} to={path.request}>
              <ListItemIcon>
                <ListAltOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <Typography variant='inherit' noWrap>
                Request Management
              </Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    </div>
  )
}

export default ManagementSideNav
