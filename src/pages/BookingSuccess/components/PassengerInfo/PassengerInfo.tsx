import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import { Box } from '@mui/material'

interface Props {
  email: string
  fullName: string
  phone: string
}

const PassengerInfo: React.FC<Props> = ({ email, fullName, phone }: Props) => {
  return (
    <>
      <Box
        sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
        className='mb-2 rounded-lg px-4 py-2 font-medium'
      >
        Passenger Information
      </Box>
      <div className='flex flex-col gap-2 pl-4'>
        <div className='flex items-center gap-1'>
          <PersonOutlineOutlinedIcon />
          <span className='mr-1 text-sm font-bold'>Name: </span>
          <span>{fullName || 'N/A'}</span>
        </div>
        <div className='flex items-center gap-1'>
          <MailOutlinedIcon />
          <span className='mr-1 text-sm font-bold'>Email: </span>
          <span>{email || 'N/A'}</span>
        </div>
        <div className='flex items-center gap-1'>
          <PhoneOutlinedIcon />
          <span className='mr-1 text-sm font-bold'>Phone number: </span>
          <span>{phone || 'N/A'}</span>
        </div>
      </div>
    </>
  )
}

export default PassengerInfo
