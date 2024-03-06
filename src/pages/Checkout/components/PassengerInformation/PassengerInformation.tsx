import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { formatDate } from 'src/utils/date-time'

const PassengerInformation: React.FC = () => {
  const { profile } = useContext(AppContext)

  return (
    <>
      <h3 className='pb-3'>Passenger Information</h3>
      <Card className='rounded-lg border-2 p-4 shadow-none'>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={6} className='flex flex-col'>
            <span className='text-sm text-gray-400'>Full name</span>
            <Box className='flex items-center gap-2'>
              <PersonOutlineOutlinedIcon />
              <span>{profile?.fullName || 'N/A'}</span>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={6} className='flex flex-col'>
            <span className='text-sm text-gray-400'>Address</span>
            <Box className='flex items-center gap-2'>
              <HomeOutlinedIcon />
              <span>{profile?.address || 'N/A'}</span>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={6} className='flex flex-col'>
            <span className='text-sm text-gray-400'>Phone number</span>
            <Box className='flex items-center gap-2'>
              <PhoneOutlinedIcon />
              <span>{profile?.phone || 'N/A'}</span>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={6} className='flex flex-col'>
            <span className='text-sm text-gray-400'>Date of birth</span>
            <Box className='flex items-center gap-2'>
              <DateRangeOutlinedIcon />
              <span>{profile?.dateOfBirth ? formatDate(profile.dateOfBirth, 'DD/MM/YYYY') : 'N/A'}</span>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={12} className='flex flex-col'>
            <span className='text-sm text-gray-400'>Email</span>
            <Box className='flex items-center gap-2'>
              <MailOutlinedIcon />
              <span>{profile?.email || 'N/A'}</span>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default PassengerInformation
