import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

export default function Loading() {
  return (
    <Box
      className='h-screen w-full'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}
