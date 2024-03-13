import { Button } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { StatusRequestForGuide, StatusRequestForTraveler } from 'src/enums/status-request.enum'

interface Props {
  setRequestStatus: Dispatch<SetStateAction<StatusRequestForGuide | StatusRequestForTraveler>>
  requestStatus: StatusRequestForGuide | StatusRequestForTraveler
  currentRequestStatus: StatusRequestForGuide | StatusRequestForTraveler
}

const ButtonComponent: React.FC<Props> = ({ setRequestStatus, requestStatus, currentRequestStatus }: Props) => {
  return (
    <Button
      onClick={() => setRequestStatus(requestStatus)}
      className='col-span-1 rounded-none'
      sx={{
        ...(currentRequestStatus === requestStatus.toString() && {
          backgroundColor: (theme) => theme.palette.primary.light
        })
      }}
    >
      {requestStatus}
    </Button>
  )
}
export default ButtonComponent
