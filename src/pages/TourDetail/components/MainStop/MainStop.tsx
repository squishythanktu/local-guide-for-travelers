import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { Location } from 'src/types/tour.type'

interface Props {
  locations: Location[]
}

export default function MainStop({ locations }: Props) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <div className='text-[18px] font-semibold md:text-2xl'>Main stop</div>
      <Stepper orientation='vertical' activeStep={-1}>
        {locations.map((location, index) => (
          <Step key={location.name}>
            <StepLabel
              sx={{
                '& .MuiStepIcon-root': { color: (theme) => theme.palette.secondary.main }
              }}
            >
              {index === 0 && <div className='font-bold'>Starting location:</div>}
              {index === locations.length - 1 && <div className='font-bold'>Finish at:</div>}
              {location.name}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
