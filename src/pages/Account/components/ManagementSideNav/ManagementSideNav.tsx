import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import TourIcon from '@mui/icons-material/Tour'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { Box, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AvatarSideNav from 'src/components/AvatarSideNav/AvatarSideNav'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { UserRole } from 'src/enums/user-role.enum'

const ManagementSideNav: React.FC = () => {
  const { profile } = useContext(AppContext)

  return (
    <div className='account__container flex-auto md:m-0'>
      <AvatarSideNav />
      <div className='account__side-menu'>
        <Paper>
          <MenuList>
            <MenuItem component={Link} to={path.tourRequest}>
              <ListItemIcon>
                <TourIcon fontSize='small' />
              </ListItemIcon>
              <Typography variant='inherit' noWrap>
                Tour Request Management
              </Typography>
            </MenuItem>
            {profile?.role === UserRole.GUIDER && (
              <Box>
                <Divider sx={{ marginY: '0.5rem' }} />
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
                <MenuItem component={Link} to={path.salesReport}>
                  <ListItemIcon>
                    <TrendingUpIcon fontSize='small' />
                  </ListItemIcon>
                  <Typography variant='inherit' noWrap>
                    Sales Report
                  </Typography>
                </MenuItem>
              </Box>
            )}
          </MenuList>
        </Paper>
      </div>
    </div>
  )
}

export default ManagementSideNav
