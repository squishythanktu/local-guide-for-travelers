import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Divider from '@mui/material/Divider'
import NumberInput from '../../components/ParticipantInput/NumberInput'
import { ChangeEvent, useState } from 'react'

export default function ParticipantInput() {
  const [adultCount, setAdultCount] = useState(0)
  const [youthCount, setYouthCount] = useState(0)
  const [infantCount, setInfantCount] = useState(0)

  const handleAdultCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdultCount(parseInt(event.target.value))
  }

  const handleYouthCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYouthCount(parseInt(event.target.value))
  }

  const handleInfantCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfantCount(parseInt(event.target.value))
  }

  return (
    <Accordion
      className='rounded border border-solid border-neutral-300 shadow-none hover:border-black md:w-64'
      disableGutters={true}
    >
      <AccordionSummary>
        <div className='text-[15px] font-medium'>
          {adultCount ? `Adult x${adultCount}, ` : ''}
          {youthCount ? `Youth x${youthCount}, ` : ''}
          {infantCount ? `Infant x${infantCount}` : ''}
          {adultCount !== 0 || youthCount !== 0 || infantCount !== 0 ? '' : 'Participants'}
        </div>
      </AccordionSummary>
      <AccordionDetails className='absolute top-12 z-50 flex w-64 flex-col gap-1.5 rounded-sm border bg-[#fff] shadow-md'>
        <div className='flex items-center justify-between text-[14px]'>
          Adult (Age 18+)
          <NumberInput value={adultCount} onChange={handleAdultCountChange} />
        </div>
        <Divider />
        <div className='flex items-center justify-between text-[14px]'>
          Youth (Age 5-17) <NumberInput value={youthCount} onChange={handleYouthCountChange} />
        </div>
        <Divider />
        <div className='flex items-center justify-between text-[14px]'>
          Infant (Age 4 and younger)
          <NumberInput value={infantCount} onChange={handleInfantCountChange} />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
