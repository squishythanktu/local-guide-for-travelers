import { Button } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { StatusRequestForGuide, StatusRequestForTraveler } from 'src/enums/status-request.enum'

interface Props {
  setRequestStatus: Dispatch<SetStateAction<StatusRequestForGuide | StatusRequestForTraveler>>
  requestStatus: StatusRequestForGuide | StatusRequestForTraveler
  currentRequestStatus: StatusRequestForGuide | StatusRequestForTraveler
  quantity: number
}

const ButtonComponent: React.FC<Props> = ({
  setRequestStatus,
  requestStatus,
  currentRequestStatus,
  quantity
}: Props) => {
  return (
    <Button
      onClick={() => setRequestStatus(requestStatus)}
      className='col-span-1 rounded-none'
      sx={{
        ...(currentRequestStatus === requestStatus.toString() && {
          backgroundColor: '#d9e7f4'
        })
      }}
    >
      {requestStatus}
      <div className='ml-1 text-sm'>({quantity})</div>
    </Button>
  )
}
export default ButtonComponent
