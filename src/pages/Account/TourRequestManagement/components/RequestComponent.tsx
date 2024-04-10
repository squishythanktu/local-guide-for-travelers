import { Box, Button, Chip, Divider } from '@mui/material'
import { QueryObserverResult, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import requestApi from 'src/apis/request.api'
import path from 'src/constants/path.constant'
import { StatusRequest } from 'src/enums/status-request.enum'
import { TourStatus } from 'src/enums/tour-status.enum'
import { Request } from 'src/types/request.type'

interface Props {
  request: Request
  isGuide?: boolean
  refetch: () => Promise<QueryObserverResult>
  setRequestStatus: React.Dispatch<React.SetStateAction<StatusRequest>>
}

const RequestComponent: React.FC<Props> = ({ request, isGuide, refetch, setRequestStatus }: Props) => {
  const navigate = useNavigate()

  const updateStatusRequestMutation = useMutation({
    mutationFn: (body: string) => requestApi.updateRequestStatus(request.id, { status: body })
  })

  const handleUpdateStatusRequest = (status: StatusRequest) => () => {
    updateStatusRequestMutation.mutate(status.toLocaleUpperCase(), {
      onSuccess: () => {
        refetch()
        setRequestStatus(status)
      }
    })
  }

  return (
    <Box
      className='min-h-[250px] rounded-md border py-4 text-black shadow-md'
      onClick={() => {
        if (request.tour && request.tour.status === TourStatus.ACCEPT)
          navigate(`${path.tourDetail.replace(':id', request.tour.id.toString())}`)
      }}
    >
      <div className='request__header flex items-center justify-between px-4'>
        <div className='flex gap-3'>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xl font-bold uppercase text-slate-800'>
            {request.traveler.fullName ? request.traveler.fullName[0] : request.traveler.email[0]}
          </span>
          <div className=''>
            <div className='text-sm font-bold'>{isGuide ? request.traveler.fullName : request.guide.fullName}</div>
            <div className='text-sm'>{isGuide ? request.traveler.address : request.guide.address}</div>
          </div>
        </div>
        <div className='flex gap-2'>
          {isGuide &&
            (request.status === StatusRequest.DENIED.toUpperCase() ? (
              <>
                <Chip label='Self-denied' color='error' size='small' />
              </>
            ) : (
              request.tour &&
              request.tour.status === TourStatus.DENY && <Chip label='Admin denied' color='error' size='small' />
            ))}
          {isGuide &&
            (request.status === StatusRequest.PENDING.toUpperCase() ? (
              <>
                <Button
                  onClick={(event) => {
                    event.stopPropagation()
                    handleUpdateStatusRequest(StatusRequest.ACCEPTED)()
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
                    handleUpdateStatusRequest(StatusRequest.DENIED)()
                  }}
                  variant='outlined'
                  className='w-fit'
                  color='error'
                  size='small'
                >
                  Reject
                </Button>
              </>
            ) : (
              request.tour &&
              request.tour.status === TourStatus.PENDING && <Chip label='Awaiting admin' color='warning' size='small' />
            ))}
          {isGuide && request.status === StatusRequest.ACCEPTED.toUpperCase() && (
            <Button
              variant='outlined'
              className='w-fit'
              color='primary'
              size='small'
              onClick={(event) => {
                event.stopPropagation(), navigate(path.tours, { state: { request: request } })
              }}
            >
              Add tour
            </Button>
          )}
          {!isGuide &&
            (request.status === StatusRequest.PENDING.toUpperCase() ? (
              <Button
                variant='outlined'
                onClick={(event) => {
                  event.stopPropagation()
                  handleUpdateStatusRequest(StatusRequest.CANCELED)()
                }}
                className='w-fit'
                color='error'
                size='small'
              >
                Cancel
              </Button>
            ) : request.status === StatusRequest.ACCEPTED.toUpperCase() ? (
              <Chip label='Guide accepted' color='success' size='small' />
            ) : (
              request.tour &&
              request.tour.status === TourStatus.PENDING && <Chip label='Awaiting admin' color='warning' size='small' />
            ))}
          {!isGuide && request.status === StatusRequest.DRAFT.toUpperCase() && (
            <Button
              variant='outlined'
              onClick={(event) => {
                event.stopPropagation()
                navigate(path.requestTour, {
                  state: { request: request, guideId: request.guide.id }
                })
              }}
              className='w-fit'
              color='primary'
              size='small'
            >
              Edit
            </Button>
          )}
          {!isGuide &&
            (request.status === StatusRequest.CANCELED.toUpperCase() ? (
              <Chip label='Self-canceled' color='error' size='small' />
            ) : request.status === StatusRequest.DENIED.toUpperCase() ? (
              <Chip label='Guide denied' color='error' size='small' />
            ) : (
              request.tour &&
              request.tour.status === TourStatus.DENY && <Chip label='Admin denied' color='error' size='small' />
            ))}
        </div>
      </div>
      <Divider className='my-2' />
      <div className='grid grid-cols-2 gap-1 px-4'>
        <div className='col-span-2 flex gap-1 text-sm font-medium'>
          Destination:<div className='text-sm'>{request.destination}</div>
        </div>
        <div className='col-span-1 flex gap-1 text-sm font-medium'>
          Duration:
          <div className='flex gap-1 text-sm'>
            {request.duration}
            <span className='text-sm md:hidden'>{request.unit}</span>
          </div>
        </div>
        <div className='col-span-1 flex gap-1 text-sm font-medium sm:hidden lg:inline-block '>
          Unit:
          <span className='ml-1 text-sm'>{request.unit}</span>
        </div>
        <div className='col-span-1 flex gap-1 text-sm font-medium sm:col-span-2  lg:col-span-1'>
          Max price:<div className='text-sm'>${request.maxPricePerPerson.toLocaleString()}</div>
        </div>
        <div className='col-span-1 flex gap-1 text-sm font-medium sm:col-span-2 lg:col-span-1'>
          Number of travelers:<div className='text-sm'>{request.numberOfTravelers}</div>
        </div>
        <div className='col-span-2 flex gap-1 text-sm font-medium'>
          Transportation:
          <div className='text-sm'>{request.transportation.join(', ')}</div>
        </div>

        <div className='col-span-2 flex gap-2 text-sm font-medium'>
          Message:<div className='text-sm'>{request.message}</div>
        </div>
      </div>
    </Box>
  )
}
export default RequestComponent
