import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NotificationItem from './NotificationItem/NotificationItem'

interface NotificationProps {
  textColor: string
}

const Notification: React.FC<NotificationProps> = ({ textColor }: NotificationProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <Box
      className='relative ml-2 flex cursor-pointer flex-col items-center 
text-base md:after:absolute md:after:bottom-[0px] md:after:left-0 md:after:h-[2.25px] 
md:after:w-0 md:after:bg-orange-500 md:after:transition-all md:after:duration-300 lg:hover:after:w-full'
    >
      <Button
        aria-label='notification'
        size='small'
        onClick={handleClick}
        className='flex flex-col text-inherit'
        disableRipple
        disableFocusRipple
        sx={{
          color: textColor,
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'transparent'
          }
        }}
      >
        <Badge variant='dot' color='error'>
          <NotificationsIcon sx={{ color: textColor }} />
        </Badge>
        <span className='mt-[5px] hidden lg:block lg:text-sm'>Notifications</span>
      </Button>
      <Menu
        disableScrollLock
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          '& .MuiPaper-root': {
            marginTop: '4px',
            minWidth: 350
          },
          '& .MuiList-root': {
            paddingY: 0
          }
        }}
      >
        <Box sx={{ background: (theme) => theme.palette.primary.main, paddingY: '10px', paddingX: '16px' }}>
          <Typography variant='subtitle2' sx={{ color: 'white', fontSize: '1.1rem' }}>
            Notifications
          </Typography>
        </Box>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <Box sx={{ paddingY: '10px', paddingX: '16px' }}>
          {/* TODO: Handle see all recent activities API */}
          <Link to='/'>
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: (theme) => theme.palette.primary.light,
                fontSize: '14px',
                '&:hover': { color: (theme) => theme.palette.primary.main }
              }}
            >
              See all recent activities
            </Typography>
          </Link>
        </Box>
      </Menu>
    </Box>
  )
}
export default Notification
