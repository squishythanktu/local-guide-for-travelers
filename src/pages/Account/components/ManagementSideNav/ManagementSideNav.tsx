import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import TourIcon from '@mui/icons-material/Tour'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AvatarSideNav from 'src/components/AvatarSideNav/AvatarSideNav'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { UserRole } from 'src/enums/user-role.enum'
import { isActive } from 'src/utils/active.util'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'

const ManagementSideNav: React.FC = () => {
  const { profile } = useContext(AppContext)
  const location = useLocation()

  return (
    <div className='management__container flex-auto md:m-0'>
      <AvatarSideNav />
      <div className='management__side-menu'>
        <Paper>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to={path.tourRequest} selected={isActive(location, path.tourRequest)}>
                <ListItemIcon>
                  <TourIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary='Tour Request Management' />
              </ListItemButton>
            </ListItem>
            {profile?.role === UserRole.GUIDER && (
              <Box>
                <Divider />
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton component={Link} to={path.tours} selected={isActive(location, path.tours)}>
                    <ListItemIcon>
                      <AddLocationAltOutlinedIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Tour Management' />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    component={Link}
                    to={path.bookingsManagement}
                    selected={isActive(location, path.bookingsManagement)}
                  >
                    <ListItemIcon>
                      <ConfirmationNumberOutlinedIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Booking Management' />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton component={Link} to={path.schedule} selected={isActive(location, path.schedule)}>
                    <ListItemIcon>
                      <CalendarMonthIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Schedule Management' />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    component={Link}
                    to={path.salesReport}
                    selected={isActive(location, path.salesReport)}
                  >
                    <ListItemIcon>
                      <TrendingUpIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Sales Report' />
                  </ListItemButton>
                </ListItem>
              </Box>
            )}
          </List>
        </Paper>
      </div>
    </div>
  )
}

export default ManagementSideNav
