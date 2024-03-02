import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import tourApi from 'src/apis/tour.api'
import { Unit } from 'src/enums/unit.enum'
import Loading from 'src/pages/Loading'
import NotFound from 'src/pages/NotFound'
import { Tour } from 'src/types/tour.type'
import { formatDate } from 'src/utils/date-time'
import { BookingSchema } from 'src/utils/rules'
import AboutActivity from '../../components/AboutActivity'
import BookingAssistant from '../../components/BookingAssistant'
import BookingConfirmation from '../../components/BookingConfirmation'
import MainStop from '../../components/MainStop/MainStop'
import SimpleSlider from '../../components/SimpleSlider'
import TourHeader from '../../components/TourHeader'
import Map from 'src/components/Map/Map'

type BookingFormData = Pick<BookingSchema, 'numberTravelers' | 'startDate'>
const numberOfReviews = 125

export default function TourDetail() {
  const [checkAvailability, setCheckAvailability] = useState<boolean>(false)
  const [formData, setFormData] = useState<BookingFormData>({
    startDate: new Date(),
    numberTravelers: 0
  })
  const { id } = useParams()
  const [tour, setTour] = useState<Tour>({
    id: 0,
    name: '',
    description: '',
    transportation: '',
    includeService: '',
    duration: 0,
    unit: '',
    locations: [],
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
  })
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [tourQuery?.data])

  const { data: startTimeData } = useQuery({
    queryKey: [`Start time of tourId ${id} in ${formData.startDate}`],
    queryFn: () => tourApi.getStartTime(Number(id), { localDate: formatDate(formData.startDate, 'YYYY-MM-DD') }),
    enabled: tourQuery?.data.data.unit === Unit.HOURS && tourQuery?.data.data.duration < 5 && checkAvailability
  })

  const handleSubmitBookingAssistant = (body: BookingFormData) => {
    setFormData(body)
    setCheckAvailability(true)
  }

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
          address={tour.locations[0]?.address || 'N/A'}
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
            {!checkAvailability && (
              <div className='col-span-1'>
                <BookingAssistant onSubmit={handleSubmitBookingAssistant} />
              </div>
            )}
          </div>
        </div>
        {checkAvailability && (
          <div className='pt-5'>
            <div className='col-span-1 gap-6 md:col-span-2 lg:col-span-3'>
              <BookingConfirmation timeOptions={startTimeData?.data.data} />
            </div>
          </div>
        )}
        <div className='activity__itinerary mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-10'>
          <div className='main-stop col-span-1'>
            <MainStop locations={tour.locations} />
          </div>
          <div className='map col-span-2'>
            <div className='text-[18px] font-semibold md:text-2xl'>Itinerary</div>
            <Map onMarkersUpdate={() => {}} locations={tour.locations} isSelect={true} />
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
