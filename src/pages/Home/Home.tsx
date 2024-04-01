import { Box, Pagination } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import bookingApi from 'src/apis/booking.api'
import tourApi from 'src/apis/tour.api'
import wishlistApi from 'src/apis/wishlist.api'
import LocationCard from 'src/components/LocationCard/LocationCard'
import { headerHeight } from 'src/constants/width-height.constant'
import { AppContext } from 'src/contexts/app.context'
import { PaginationParams } from 'src/types/pagination-params.type'
import { Tour } from 'src/types/tour.type'
import { isTourInWishlist } from 'src/utils/wishlist'
import TourCard from '../../components/TourCard/TourCard'

export default function Home() {
  const { profile, isAuthenticated } = useContext(AppContext)
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({ page: 0, limit: 8 })
  const { data: toursData, isPending } = useQuery({
    queryKey: ['tours', paginationParams],
    queryFn: () => tourApi.getTours(paginationParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000
  })
  const { data: popularCitiesData, isPending: isPendingCities } = useQuery({
    queryKey: ['popular cities'],
    queryFn: () => bookingApi.getPopularCities(),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000
  })
  const {
    data: wishListData,
    refetch,
    isPending: isWishlistDataPending
  } = useQuery({
    queryKey: [`wishlist of user with id ${profile?.id}`],
    queryFn: () => wishlistApi.getWishlist(),
    staleTime: 5 * 1000,
    enabled: isAuthenticated
  })

  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => <Skeleton variant='rounded' width='100%' height='300px' key={index} />)
  }

  return (
    <div className='homepage__container'>
      <Box
        className='hero-section'
        sx={{
          height: `calc(600px - ${headerHeight.sm})`,
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
            ? renderSkeletons()
            : isAuthenticated
              ? isWishlistDataPending
                ? renderSkeletons()
                : toursData?.data.data.tourDTOS.map((tourData: Tour) => (
                    <TourCard
                      key={tourData.id}
                      tourData={tourData}
                      isTourInWishList={!!isTourInWishlist(wishListData?.data.data as Tour[], tourData.id)}
                      refetch={refetch}
                    />
                  ))
              : toursData?.data.data.tourDTOS.map((tourData: Tour) => (
                  <TourCard key={tourData.id} tourData={tourData} refetch={refetch} />
                ))}
        </div>
        {toursData && (
          <Pagination
            onChange={(_, page) => {
              setPaginationParams((prevPagination) => ({
                ...prevPagination,
                page: page - 1
              }))
            }}
            count={toursData?.data.data.totalOfPage as unknown as number}
            className='my-6 flex justify-center'
            size='large'
            variant='outlined'
            color='primary'
          />
        )}
      </div>

      {/* Locations */}
      {!isPendingCities && popularCitiesData?.data.data && popularCitiesData?.data.data.length > 0 && (
        <div className='collection-container container relative mx-auto my-10 max-w-[94%] lg:mx-auto lg:max-w-[1400px]'>
          <div className='collection-header mb-4'>
            <h2 className='text-4xl	leading-10'>Awe-inspiring destinations</h2>
          </div>
          <div className='scroll flex flex-nowrap gap-2 overflow-x-auto'>
            {popularCitiesData?.data.data.map((city, index) => (
              <div key={index} className='col-span-1'>
                <LocationCard city={city} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
