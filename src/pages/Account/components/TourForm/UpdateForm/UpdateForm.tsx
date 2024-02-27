import { QueryObserverResult, useMutation, useQuery } from '@tanstack/react-query'
import tourApi from 'src/apis/tour.api'
import TourForm, { TourFormData } from '../TourForm'
import { toast } from 'react-toastify'

export type TourUpdateFormData = TourFormData & { id: string }

interface Props {
  onCancel: () => void
  tourId: string
  setUpdateMode: React.Dispatch<React.SetStateAction<boolean>>
  refetch: () => Promise<QueryObserverResult>
}

export default function UpdateForm({ onCancel, tourId, setUpdateMode, refetch }: Props) {
  const { data: tourQuery } = useQuery({
    queryKey: [`Get tour by ${tourId}`],
    queryFn: () => tourApi.getTourById(tourId as string)
  })

  const updateTourMutation = useMutation({
    mutationFn: (body: TourUpdateFormData) => {
      return tourApi.updateTour(body)
    }
  })

  const handleUpdateTourForm = (body: TourFormData) => {
    const formattedBody = { id: tourId, ...body }
    updateTourMutation.mutate(formattedBody, {
      onSuccess: () => {
        setUpdateMode(false)
        refetch()
        toast.success('Update the tour successfully.')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return <TourForm onSubmit={handleUpdateTourForm} onCancel={onCancel} defaultValue={tourQuery?.data.data} />
}
