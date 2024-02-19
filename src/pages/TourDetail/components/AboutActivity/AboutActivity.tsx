import ActivityInfo from './ActivityInfo'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import AlarmOnOutlinedIcon from '@mui/icons-material/AlarmOnOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

interface AboutActivityProps {
  limit: number
  duration: number
  unit: string
  transportation: string
  includeService: string
  estimatedLocalCashNeeded: string
  itinerary: string
}
export default function AboutActivity({
  limit,
  duration,
  unit,
  transportation,
  includeService,
  estimatedLocalCashNeeded,
  itinerary
}: AboutActivityProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='text-[18px] font-semibold md:text-2xl'>About this activity</div>
      <ActivityInfo
        icon={<CurrencyExchangeOutlinedIcon />}
        title={'Free cancellation'}
        content={'Cancel up to 24 hours in advance for a full refund'}
      />
      <ActivityInfo icon={<GroupsOutlinedIcon />} title={'Group'} content={`Limited to ${limit} participants`} />
      <ActivityInfo icon={<AlarmOnOutlinedIcon />} title={'Duration'} content={`${duration} ${unit}`} />
      <ActivityInfo icon={<AirportShuttleOutlinedIcon />} title={'Transportation'} content={`${transportation}`} />
      <ActivityInfo icon={<FastfoodOutlinedIcon />} title={'Service'} content={`${includeService}`} />
      <ActivityInfo
        icon={<LocalAtmOutlinedIcon />}
        title={'Local Cash Needed'}
        content={`${estimatedLocalCashNeeded}`}
      />
      <ActivityInfo icon={<CalendarMonthOutlinedIcon />} title={'Itinerary'} content={`${itinerary}`} />
    </div>
  )
}
