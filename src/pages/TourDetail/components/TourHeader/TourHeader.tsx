import LocationCityIcon from '@mui/icons-material/LocationCity'
import { Box } from '@mui/material'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import path from 'src/constants/path.constant'
import { Tour } from 'src/types/tour.type'

interface TourHeaderProps {
  totalReviews: number
  tour: Tour
}

export default function TourHeader({ tour, totalReviews }: TourHeaderProps) {
  return (
    <>
      <Box
        sx={{ color: (theme) => theme.palette.secondary.main }}
        className='category-label uppercase sm:flex sm:gap-4'
      >
        {tour.categories.map((category, index) => (
          <Box key={index}>
            <div className='text-md font-bold leading-4 md:text-lg'>{category.name}</div>
            <h3>{tour.categories.length > 1 && index < tour.categories.length - 1 && '-'}</h3>
          </Box>
        ))}
      </Box>
      <div className='header w-full'>
        <h1 className='title my-2 text-left text-3xl font-bold md:text-4xl lg:font-extrabold'>{tour.name}</h1>
        <div className='basic-info flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
          <div className='rating mr-2 flex items-center gap-2'>
            <Rating max={5} precision={0.1} value={Number(tour.overallRating.toFixed(2))} size='large' readOnly />
            <div className='text-sm font-medium md:text-[16px]'>{Number(tour.overallRating.toFixed(2))}/5</div>
            <Link to='' className='text-nowrap text-sm underline md:text-[16px]'>
              {totalReviews} reviews
            </Link>
          </div>
          <div className='author mr-2 flex items-center gap-2'>
            <div className='text-nowrap text-sm font-semibold md:text-[16px]'>Activity provider:</div>
            <Link
              to={`${path.guideProfile.replace(':id', tour.guide.id.toString())}`}
              className='text-sm md:text-[16px]'
            >
              {tour.guide?.fullName || 'N/A'}
            </Link>
          </div>
        </div>
        <div className='address mt-2 flex items-center'>
          <LocationCityIcon sx={{ marginRight: '4px', color: (theme) => theme.palette.secondary.main }} />
          <span>{(tour.locations[0]?.address as string) || 'N/A'}</span>
        </div>
      </div>
    </>
  )
}
