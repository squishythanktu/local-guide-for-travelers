import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function NotificationItem() {
  return (
    <MenuItem>
      <Box className='notification-item' sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingY: '0.5rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '2.5rem',
            height: '2.5rem',
            fontWeight: '700',
            fontSize: '1.25rem',
            textTransform: 'uppercase',
            borderRadius: '50%',
            color: 'white',
            background: (theme) => theme.palette.secondary.main
          }}
        >
          {'Name'.slice(0, 1)}
        </Box>
        <Box className='notification-item__content' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography sx={{ fontSize: '14px' }} noWrap>
            <strong>Kuromi</strong> commented & rated on <strong>your tour</strong>
          </Typography>
          <Typography className='notification-item__content-message' sx={{ fontSize: '0.75rem', color: 'grey' }}>
            2 min ago
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '1rem',
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            background: (theme) => theme.palette.primary.main
          }}
        ></Box>
      </Box>
    </MenuItem>
  )
}
