import AboutActivity from '../../components/AboutActivity'
import BookingAssistant from '../../components/BookingAssistant'
import TourHeader from '../../components/TourHeader'
import SimpleSlider from '../../components/SimpleSlider'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import tourApi from 'src/apis/tour.api'
import { useEffect, useState } from 'react'
import { Tour } from 'src/types/tour.type'
import Loading from 'src/pages/Loading'
import NotFound from 'src/pages/NotFound'

const numberOfReviews = 125

const initTour: Tour = {
  id: 0,
  name: '',
  description: '',
  transportation: '',
  includeService: '',
  duration: 0,
  unit: '',
  estimatedLocalCashNeeded: '',
  pricePerTraveler: 0,
  limitTraveler: 0,
  extraPrice: 0,
  overallRating: 0,
  province: '',
  itinerary: '',
  categories: [{ id: 0, name: '' }],
  images: [{ id: 0, imageLink: '' }],
  guide: { id: '', email: '' }
}

export default function TourDetail() {
  const [tour, setTour] = useState<Tour>(initTour)
  const { id } = useParams()

  const {
    isPending: isLoadingTour,
    error: errorTour,
    data: tourQuery
  } = useQuery({
    queryKey: [`Get tour by ${id}`, id],
    queryFn: () => tourApi.getTourById(id as string),
    enabled: id !== undefined
  })

  useEffect(() => {
    if (tourQuery?.data) {
      setTour(tourQuery.data.data)
    }
  }, [tourQuery?.data])

  if (isLoadingTour) {
    return <Loading />
  }

  if (errorTour) {
    return <NotFound />
  }
  return (
    <div className='px-4 py-2 text-sm md:mx-auto md:px-8 md:py-3 lg:w-full lg:max-w-[1400px] lg:px-8 xl:px-24'>
      <div className='activity__container flex flex-col'>
        <TourHeader
          categories={tour.categories}
          title={tour.name}
          rating={tour.overallRating}
          numberOfReviews={numberOfReviews}
          provider={tour.guide?.username || ''}
        />
        <div className='activity__photo-gallery pb-2 pt-2'>
          <SimpleSlider itemsData={tour.images} />
        </div>
        <div className='activity__content pt-5'>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 lg:grid-cols-4'>
            <div className='col-span-1 flex flex-col gap-6 md:col-span-2 lg:col-span-3'>
              <div className='overview-activity text-sm md:text-[16px]'>{tour.description}</div>
              <div className='about-activity flex flex-col gap-2'></div>
              <AboutActivity
                limit={tour.limitTraveler}
                duration={tour.duration}
                unit={tour.unit}
                transportation={tour.transportation}
                includeService={tour.includeService}
                estimatedLocalCashNeeded={tour.estimatedLocalCashNeeded}
                itinerary={tour.itinerary}
              />
              <div className='check-availability'></div>
            </div>
            <div className='col-span-1'>
              <BookingAssistant />
            </div>
          </div>
        </div>
        <div className='activity__recommendation mt-10 flex flex-col gap-4 md:gap-6'>
          <div className='text-[18px] font-semibold md:text-2xl'>You might also like...</div>
          <div className='collection-body grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {/* TODO: Handle tour detail API 
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard />
            <TourCard /> */}
          </div>
        </div>
        <div className='activity__customer-review'></div>
      </div>
    </div>
  )
}
