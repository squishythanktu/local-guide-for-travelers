import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import requestApi from 'src/apis/request.api'
import { AppContext } from 'src/contexts/app.context'
import { StatusRequestForGuide, StatusRequestForTraveler } from 'src/enums/status-request.enum'
import { Request } from 'src/types/request.type'
import ButtonComponent from './components/ButtonComponent'
import RequestComponent from './components/RequestComponent'

const RequestManagement: React.FC = () => {
  const { profile } = useContext(AppContext)
  const [isGuide, setIsGuide] = useState<boolean>()

  const { data: requestsData, refetch } = useQuery({
    queryKey: [`requests of  ${profile?.id}`],
    queryFn: () => requestApi.getRequests(),
    staleTime: 6 * 1000
  })

  const [requestStatus, setRequestStatus] = useState<StatusRequestForGuide | StatusRequestForTraveler>(
    StatusRequestForGuide.PENDING
  )
  const [displayData, setDisplayData] = useState<Request[]>([])

  useEffect(() => {
    let displayRequestsData: Request[] = []
    if (requestsData && profile) {
      if (parseInt(profile.id) === requestsData.data.data[0].guide.id) {
        setIsGuide(true)
      }
      if (profile.id === requestsData.data.data[0].traveler?.id) {
        setIsGuide(false)
      }
      displayRequestsData = requestsData.data.data
        .filter((item) => item.status === requestStatus.toUpperCase())
        .map((item) => item)
    }
    setDisplayData(displayRequestsData)
  }, [requestsData, requestStatus])

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='border-b-1 mb-2 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Request Management
      </h2>
      {isGuide && (
        <Box sx={{ borderColor: (theme) => theme.palette.primary.main }} className='grid grid-cols-4 border'>
          {Object.values(StatusRequestForGuide).map((item) => (
            <ButtonComponent
              key={item}
              setRequestStatus={setRequestStatus}
              requestStatus={item}
              currentRequestStatus={requestStatus}
            />
          ))}
        </Box>
      )}
      {!isGuide && (
        <Box sx={{ borderColor: (theme) => theme.palette.primary.main }} className='grid grid-cols-6 border'>
          {Object.values(StatusRequestForTraveler).map((item) => (
            <ButtonComponent
              key={item}
              setRequestStatus={setRequestStatus}
              requestStatus={item}
              currentRequestStatus={requestStatus}
            />
          ))}
        </Box>
      )}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {displayData.map((request) => {
          return (
            <div key={request.id} className='col-span-1'>
              <RequestComponent
                request={request}
                isGuide={isGuide}
                refetch={refetch}
                setRequestStatus={setRequestStatus}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default RequestManagement
