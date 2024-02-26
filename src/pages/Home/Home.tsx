import { Box } from '@mui/material'
import TourCard from '../../components/TourCard/TourCard'
import { headerHeight } from 'src/constants/height.constant'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LocationCard from 'src/components/LocationCard'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import tourApi from 'src/apis/tour.api'
import { Tour } from 'src/types/tour.type'
import Skeleton from '@mui/material/Skeleton'

export default function Home() {
  const { data: toursData, isPending } = useQuery({
    queryKey: ['tours'],
    queryFn: () => tourApi.getTours(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000
  })
  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <h1 className='homepage__container'>
      <Box
        className='hero-section'
        sx={{
          height: `calc(600px - ${headerHeight.base})`,
          '@media (min-width: 768px)': {
            height: `calc(600px - ${headerHeight.md})`
          }
        }}
      >
        <Box className='hero-section__image-container absolute left-0 top-0 z-[-1] h-[600px] w-full'>
          <img src='/assets/images/homepage-cover.jpg' alt='Homepage cover' className='h-full w-full object-cover' />
        </Box>
        <Box className='hero-section__content m-auto flex max-w-[1400px] flex-col items-center justify-start px-4 py-4 md:py-8 lg:px-24 '>
          <h1 className='hero-section__header mb-10 mt-32 w-1/2 self-start text-4xl leading-none text-white drop-shadow-2xl md:text-5xl lg:text-6xl'>
            Make memories on your next trip
          </h1>
        </Box>
      </Box>
      {/* Tours */}
      <div className='collection-container container relative mx-0 my-10 max-w-full lg:mx-auto lg:max-w-[1400px]'>
        <div className='collection-header mb-4'>
          <h2 className='text-4xl	leading-10'>Unforgettable experiences around the world</h2>
        </div>
        <div className='collection-body grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {isPending
            ? Array(8)
                .fill(0)
                .map((_, index) => <Skeleton variant='rounded' width='100%' height='300px' key={index} />)
            : toursData?.data.data.map((tourData: Tour) => <TourCard key={tourData.id} tourData={tourData} />)}
        </div>
      </div>
      {/* Locations */}
      <div className='collection-container container relative mx-auto my-10 max-w-[94%] lg:mx-auto lg:max-w-[1400px]'>
        <div className='collection-header mb-4'>
          <h2 className='text-4xl	leading-10'>Awe-inspiring destinations</h2>
        </div>
        <div className='collection-body'>
          <Slider {...carouselSettings} className='w-full'>
            {Array.from(Array(9).keys()).map((num) => (
              <LocationCard key={num} />
            ))}
          </Slider>
        </div>
      </div>
    </h1>
  )
}
