import { Box } from '@mui/material'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import { TourCategory } from 'src/types/tour.type'
import LocationCityIcon from '@mui/icons-material/LocationCity'

interface TourHeaderProps {
  categories: TourCategory[]
  title: string
  rating: number
  totalReviews: number
  provider: string
  address: string
}

export default function TourHeader({ categories, title, rating, totalReviews, provider, address }: TourHeaderProps) {
  return (
    <>
      <Box
        sx={{ color: (theme) => theme.palette.secondary.main }}
        className='category-label uppercase sm:flex sm:gap-4'
      >
        {categories.map((category, index) => (
          <Box key={index}>
            <div className='text-md font-bold leading-4 md:text-lg'>{category.name}</div>
            <h3>{categories.length > 1 && index < categories.length - 1 && '-'}</h3>
          </Box>
        ))}
      </Box>
      <div className='header w-full'>
        <h1 className='title my-2 text-left text-3xl font-bold md:text-4xl lg:font-extrabold'>{title}</h1>
        <div className='basic-info flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
          <div className='rating mr-2 flex items-center gap-2'>
            <Rating max={5} precision={0.1} value={rating} size='large' readOnly />
            <div className='text-sm font-medium md:text-[16px]'>{rating}/5</div>
            <Link to='' className='text-nowrap text-sm underline md:text-[16px]'>
              {totalReviews} reviews
            </Link>
          </div>
          <div className='author mr-2 flex items-center gap-2'>
            <div className='text-nowrap text-sm font-semibold md:text-[16px]'>Activity provider:</div>
            <Link to='' className='text-sm md:text-[16px]'>
              {provider}
            </Link>
          </div>
        </div>
        <div className='address mt-2 flex items-center'>
          <LocationCityIcon sx={{ marginRight: '4px', color: (theme) => theme.palette.secondary.main }} />
          <span>{address || 'N/A'}</span>
        </div>
      </div>
    </>
  )
}
