import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Notification } from 'src/types/notification.type'
import { getRelativeTime } from 'src/utils/date-time'
import { NotificationType } from 'src/enums/notification-type.enum'

interface NotificationItemProps {
  data: Notification
  innerRef?: React.Ref<HTMLParagraphElement>
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data, innerRef }: NotificationItemProps) => {
  return (
    <MenuItem>
      <Box
        ref={innerRef}
        className='notification-item'
        sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingY: '0.5rem', width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '2.5rem',
            height: '2.5rem',
            aspectRatio: 1 / 1,
            fontWeight: '700',
            fontSize: '1.25rem',
            textTransform: 'uppercase',
            borderRadius: '50%',
            color: 'white',
            background: (theme) => theme.palette.secondary.main
          }}
        >
          {(data.sender?.fullName || data.sender.email).slice(0, 1)}
        </Box>
        <Box className='notification-item__content' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography sx={{ fontSize: '14px', maxWidth: '17.5rem' }} noWrap>
            {data.notificationType !== NotificationType.receivedBooking && (
              <strong>{data.sender?.fullName || data.sender.email} </strong>
            )}
            {data.message}
          </Typography>
          <Typography className='notification-item__content-message' sx={{ fontSize: '0.75rem', color: 'grey' }}>
            {getRelativeTime(data.notificationDate)}
          </Typography>
        </Box>
        {!data.isRead && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '0.5rem',
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              background: (theme) => theme.palette.primary.main
            }}
          ></Box>
        )}
      </Box>
    </MenuItem>
  )
}

export default NotificationItem