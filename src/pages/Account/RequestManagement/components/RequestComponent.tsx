import { Box, Button, Divider } from '@mui/material'
import { QueryObserverResult, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import requestApi from 'src/apis/request.api'
import path from 'src/constants/path.constant'
import { StatusRequestForGuide, StatusRequestForTraveler } from 'src/enums/status-request.enum'
import { Request } from 'src/types/request.type'

interface Props {
  request: Request
  isGuide?: boolean
  refetch: () => Promise<QueryObserverResult>
}
const RequestComponent: React.FC<Props> = ({ request, isGuide, refetch }: Props) => {
  const navigate = useNavigate()

  const updateStatusRequestMutation = useMutation({
    mutationFn: (body: string) => requestApi.updateRequestStatus(request.id, { status: body })
  })

  const handleUpdateStatusRequest = (status: string) => () => {
    updateStatusRequestMutation.mutate(status, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  return (
    <Box
      className='min-h-[226px] rounded-md border py-4 text-black shadow-md'
      onClick={() => navigate(`/${path.tourDetail.replace(':id', request.tourId.toString())}`)}
    >
      <div className='request__header flex items-center justify-between px-4'>
        <div className='flex gap-3'>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xl font-bold uppercase text-slate-800'>
            H
          </span>
          <div className=''>
            <div className='text-sm font-bold'>{isGuide ? request.traveler.fullName : request.guide.fullName}</div>
            <div className='text-sm'>{isGuide ? request.traveler.address : request.guide.address}</div>
          </div>
        </div>
        <div className='flex gap-2'>
          {isGuide && request.status === StatusRequestForGuide.PENDING.toUpperCase() && (
            <>
              <Button
                onClick={(event) => {
                  event.stopPropagation()
                  handleUpdateStatusRequest(StatusRequestForGuide.ACCEPTED.toLocaleUpperCase())()
                }}
                variant='outlined'
                className='w-fit'
                color='success'
                size='small'
              >
                Accept
              </Button>
              <Button
                onClick={(event) => {
                  event.stopPropagation()
                  handleUpdateStatusRequest(StatusRequestForGuide.DENIED.toLocaleUpperCase())()
                }}
                variant='outlined'
                className='w-fit'
                color='error'
                size='small'
              >
                Reject
              </Button>
            </>
          )}
          {isGuide && request.status === StatusRequestForGuide.ACCEPTED.toUpperCase() && (
            <Button
              variant='outlined'
              className='w-fit'
              color='primary'
              size='small'
              onClick={(event) => {
                event.stopPropagation(), navigate(path.tours, { state: { requestId: request.id } })
              }}
            >
              Add tour
            </Button>
          )}
          {!isGuide && request.status === StatusRequestForGuide.PENDING.toUpperCase() && (
            <Button
              variant='outlined'
              onClick={(event) => {
                event.stopPropagation()
                handleUpdateStatusRequest(StatusRequestForTraveler.DELETED.toLocaleUpperCase())()
              }}
              className='w-fit'
              color='error'
              size='small'
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
      <Divider className='my-2' />
      <div className='grid grid-cols-2 gap-1 px-4'>
        <div className='col-span-2 flex gap-1 text-sm font-medium'>
          Destination:<div className='text-sm'>{request.destination}</div>
        </div>
        <div className='flex gap-1 text-sm font-medium'>
          Duration:
          <div className='flex gap-1 text-sm'>
            {request.duration}
            <span className='text-sm md:hidden'>{request.unit}</span>
          </div>
        </div>
        <div className='hidden gap-1 text-sm font-medium md:flex'>
          Unit:
          <div className='text-sm'>{request.unit}</div>
        </div>
        <div className='col-span-2 flex gap-1 text-sm font-medium lg:col-span-1'>
          Max price:<div className='text-sm'>{request.maxPrice}</div>
        </div>
        <div className='col-span-2 flex gap-1 text-sm font-medium lg:col-span-1'>
          Transportation:
          {request.transportation.map((item: string) => (
            <div key={item} className='text-sm'>
              {item}
            </div>
          ))}
        </div>

        <div className='col-span-2 flex gap-2 text-sm font-medium'>
          Message:<div className='text-sm'>{request.message}</div>
        </div>
      </div>
    </Box>
  )
}
export default RequestComponent
