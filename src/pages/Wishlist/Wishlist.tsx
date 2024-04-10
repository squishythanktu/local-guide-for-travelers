import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import wishlistApi from 'src/apis/wishlist.api'
import TourCard from 'src/components/TourCard'
import { AppContext } from 'src/contexts/app.context'
import Loading from '../Loading/Loading'

const Wishlist: React.FC = () => {
  const { isAuthenticated, profile } = useContext(AppContext)

  const { data: wishListData, refetch } = useQuery({
    queryKey: [`wishlist of user with id ${profile?.id}`],
    queryFn: () => wishlistApi.getWishlist(),
    staleTime: 5 * 1000,
    enabled: isAuthenticated
  })
  if (!isAuthenticated)
    return (
      <div className='flex h-[550px] flex-col items-center justify-center'>
        <img
          loading='lazy'
          src='/assets/images/empty-wishlist.png'
          alt='Empty booking'
          className='h-52 w-52 object-cover'
        />
        <h3>You have to sign in first to see your wishlist.</h3>
      </div>
    )

  return (
    <Box className='container'>
      {isAuthenticated && !wishListData?.data.data && <Loading />}
      {isAuthenticated && wishListData?.data.data && wishListData.data.data.length > 0 ? (
        <div className=''>
          <h2 className='wishlist__title pt-5'>Wishlist</h2>
          <div className='my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {wishListData.data.data.map((tour, index) => (
              <TourCard tourData={tour} refetch={refetch} key={index} isTourInWishList={true} />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex h-[550px] flex-col items-center justify-center'>
          <img
            loading='lazy'
            src='/assets/images/empty-wishlist.png'
            alt='Empty booking'
            className='mb-2 h-40 w-40 object-cover'
          />
          <h3>No wishlist data available.</h3>
        </div>
      )}
    </Box>
  )
}
export default Wishlist
