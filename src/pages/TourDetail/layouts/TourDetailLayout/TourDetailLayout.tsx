import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import tourApi from 'src/apis/tour.api'
import Map from 'src/components/Map/Map'
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
import CustomerReview from 'src/components/CustomerReview'

export type BookingAssistantFormData = Pick<BookingSchema, 'numberTravelers' | 'startDate'>
const numberOfReviews = 125

export default function TourDetail() {
  const [checkAvailability, setCheckAvailability] = useState<boolean>(false)
  const [formData, setFormData] = useState<BookingAssistantFormData>({
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
    queryKey: [`Start time of tourId ${id} in ${formData.startDate}`, formData],
    queryFn: () => tourApi.getStartTime(Number(id), { localDate: formatDate(formData.startDate, 'YYYY-MM-DD') }),
    enabled: tourQuery?.data.data.unit === Unit.HOURS && tourQuery?.data.data.duration < 5 && checkAvailability
  })

  const handleSubmitBookingAssistant = (body: BookingAssistantFormData) => {
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
            <div className='col-span-1'>
              <BookingAssistant onSubmit={handleSubmitBookingAssistant} id={tour.id} />
            </div>
          </div>
        </div>
        {checkAvailability && (
          <div className='pt-5'>
            <div className='col-span-1 gap-6 md:col-span-2 lg:col-span-3'>
              <BookingConfirmation tour={tour} formData={formData} timeOptions={startTimeData?.data.data} />
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
        {/* <Box className='activity__customer-reviews flex flex-col pb-6'>
          <Divider className='my-4' />
          <div className='activity__customer-reviews--title flex items-center gap-2'>
            <p className='text-[18px] font-semibold md:text-2xl'>Customer reviews</p>
            <Tooltip title='All reviews are from verified customers who purchased the activity. Reviews can only be submitted after the activity takes place.'>
              <IconButton>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={8} md={12}>
              <div className='reviews-summary__rating flex flex-col items-center'>
                <h3 className='reviews-summary__title'>Overall rating</h3>
                <div className='reviews-summary__content flex flex-col'>
                  <div className='average-rating flex items-center justify-center gap-2'>
                    <span className='current-average-rating text-3xl font-bold md:text-4xl'>4.5</span>
                    <span className='max-rating text-xl font-bold text-slate-500 md:text-2xl'>/5</span>
                  </div>
                  <Rating
                    sx={{
                      '& .MuiRating-icon': { fontSize: '3rem' }
                    }}
                    max={5}
                    precision={0.1}
                    value={4.5}
                    readOnly
                  />
                  <span className='mt-2 text-center font-semibold text-slate-500'>based on 306 reviews</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={0} sm={2} md={3}>
              <StarRatingFilter />
            </Grid>
            <Grid item xs={4} sm={6} md={9}>
              <Comment />
              <Comment />
            </Grid>
          </Grid>
        </Box> */}
        <CustomerReview />
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
      </div>
    </div>
  )
}
