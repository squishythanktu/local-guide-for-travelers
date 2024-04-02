import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import requestApi from 'src/apis/request.api'
import { AppContext } from 'src/contexts/app.context'
import { StatusRequestForGuide, StatusRequestForTraveler } from 'src/enums/status-request.enum'
import Loading from 'src/pages/Loading'
import { Request } from 'src/types/request.type'
import ButtonComponent from './components/ButtonComponent'
import RequestComponent from './components/RequestComponent'
import ButtonGroup from '@mui/material/ButtonGroup'

const TourRequestManagement: React.FC = () => {
  const { profile, isAuthenticated } = useContext(AppContext)
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
    if (requestsData && requestsData.data.data.length > 0 && profile) {
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
  }, [requestsData, requestStatus, profile])

  const handleQuantity = (item: StatusRequestForGuide | StatusRequestForTraveler) => {
    if (requestsData)
      return requestsData.data.data.filter((data) => data.status === item.toUpperCase()).map((item) => item).length
    return 0
  }

  return (
    <div className='flex flex-col gap-4'>
      {isAuthenticated && !requestsData?.data.data && <Loading />}
      {isAuthenticated && requestsData?.data.data && requestsData.data.data.length > 0 ? (
        <div className=''>
          <h2 className='border-b-1 mb-2 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Tour Request Management
          </h2>
          {isGuide && (
            <Box
              sx={{ borderColor: (theme) => theme.palette.primary.main }}
              className='grid grid-cols-4 overflow-x-auto border'
            >
              {Object.values(StatusRequestForGuide).map((item) => (
                <ButtonComponent
                  key={item}
                  setRequestStatus={setRequestStatus}
                  requestStatus={item}
                  currentRequestStatus={requestStatus}
                  quantity={handleQuantity(item)}
                />
              ))}
            </Box>
          )}
          {!isGuide && (
            // <Box style={{ width: '100%', overflow: 'auto' }}>
            <ButtonGroup
              variant='outlined'
              aria-label='Basic button group'
              sx={{
                width: '100%',
                overflowX: 'scroll',
                button: {
                  flex: 'none'
                },
                '::-webkit-scrollbar': {
                  display: 'none'
                }
              }}
            >
              {Object.values(StatusRequestForTraveler).map((item) => (
                <ButtonComponent
                  key={item}
                  setRequestStatus={setRequestStatus}
                  requestStatus={item}
                  currentRequestStatus={requestStatus}
                  quantity={handleQuantity(item)}
                />
              ))}
            </ButtonGroup>
            // </Box>
          )}
          <div className='mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
      ) : (
        <div className='flex h-[550px] flex-col items-center justify-center'>
          <img src='/assets/images/empty-booking.png' alt='Empty request' className='mb-2 h-72 w-72 object-cover' />
          <h3>No request data available.</h3>
        </div>
      )}
    </div>
  )
}

export default TourRequestManagement
