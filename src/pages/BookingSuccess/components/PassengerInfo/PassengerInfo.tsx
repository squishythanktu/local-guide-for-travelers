import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'

interface Props {
  email: string
  fullName: string
  phone: string
}

const PassengerInfo: React.FC<Props> = ({ email, fullName, phone }: Props) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <PersonOutlineOutlinedIcon />
          <span className='mr-1 hidden text-sm font-bold sm:block'>Name: </span>
          <span>{fullName || 'N/A'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <MailOutlinedIcon />
          <span className='mr-1 hidden text-sm font-bold sm:block'>Email: </span>
          <span>{email || 'N/A'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <PhoneOutlinedIcon />
          <span className='mr-1 hidden text-sm font-bold sm:block'>Phone number: </span>
          <span>{phone || 'N/A'}</span>
        </div>
      </div>
    </>
  )
}

export default PassengerInfo
