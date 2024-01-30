import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import PersonIcon from '@mui/icons-material/Person'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constant'

export default function AccountSideNav() {
  return (
    <div className='account__container flex-auto md:m-0 md:pr-4'>
      <Box
        className='account__header relative flex h-32 flex-col justify-center overflow-hidden text-center text-white'
        sx={{ backgroundColor: `var(--decorative-midnight-blue)` }}
      >
        <h1 className='account__header-name mb-1 text-2xl font-bold'>Tu</h1>
        <h4 className='account__header-subheading font-bold tracking-wide'>Account</h4>
        <img
          src='/src/assets/top-line.svg'
          className='absolute right-[-130px] top-[-10px]'
          alt='account__header__top-line'
        />
        <img
          src='/src/assets/bottom-line.svg'
          className='absolute bottom-[5px] left-[-120px]'
          alt='account__header__bottom-line'
        />
      </Box>
      <div className='account__side-menu'>
        <Paper>
          <MenuList>
            <MenuItem component={Link} to={path.profile}>
              <ListItemIcon>
                <PersonIcon fontSize='medium' />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to={path.password}>
              <ListItemIcon>
                <LockOutlinedIcon fontSize='medium' />
              </ListItemIcon>
              <ListItemText>Password</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </div>
    </div>
  )
}
