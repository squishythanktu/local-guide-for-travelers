import ActivityInfo from './ActivityInfo'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Tour } from 'src/types/tour.type'

interface AboutActivityProps {
  tour: Tour
}
export default function AboutActivity({ tour }: AboutActivityProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-[18px] font-semibold md:text-2xl'>About this activity</div>
      <ActivityInfo
        icon={<CurrencyExchangeOutlinedIcon />}
        title={'Free cancellation'}
        content={'Cancel up to 24 hours in advance for a full refund'}
      />
      <ActivityInfo
        icon={<GroupsOutlinedIcon />}
        title={'Group'}
        content={`Limited to ${tour.limitTraveler} participants`}
      />
      <ActivityInfo icon={<AttachMoneyIcon />} title={'Price per person'} content={`${tour.pricePerTraveler} $`} />
      <ActivityInfo icon={<AlarmOnOutlinedIcon />} title={'Duration'} content={`${tour.duration} ${tour.unit}`} />
      <ActivityInfo icon={<AirportShuttleOutlinedIcon />} title={'Transportation'} content={`${tour.transportation}`} />
      <ActivityInfo icon={<FastfoodOutlinedIcon />} title={'Service'} content={`${tour.includeService}`} />
      <ActivityInfo
        icon={<LocalAtmOutlinedIcon />}
        title={'Local Cash Needed'}
        content={`${tour.estimatedLocalCashNeeded}`}
      />
      <ActivityInfo icon={<CalendarMonthOutlinedIcon />} title={'Itinerary'} content={`${tour.itinerary}`} />
    </div>
  )
}
