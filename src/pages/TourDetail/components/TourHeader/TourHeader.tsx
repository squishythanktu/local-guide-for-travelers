import { Box } from '@mui/material'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import { TourCategory } from 'src/types/tour.type'
import LocationCityIcon from '@mui/icons-material/LocationCity'

interface TourHeaderProps {
  categories: TourCategory[]
  title: string
  rating: number
  numberOfReviews: number
  provider: string
  address: string
}

export default function TourHeader({ categories, title, rating, numberOfReviews, provider, address }: TourHeaderProps) {
  return (
    <>
      <Box
        sx={{ color: (theme) => theme.palette.secondary.main }}
        className='activity__category-label uppercase sm:flex sm:gap-4'
      >
        {categories.map((category, index) => (
          <>
            <div className='text-md font-bold leading-4 md:text-lg' key={index}>
              {category.name}
            </div>
            <h3>{categories.length > 1 && index < categories.length - 1 && '-'}</h3>
          </>
        ))}
      </Box>
      <div className='activity__header w-full'>
        <h1 className='activity__title my-2 text-left text-3xl font-bold md:text-4xl lg:font-extrabold'>{title}</h1>
        <div className='activity__basic-info flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
          <div className='activity-rating flex items-center gap-4'>
            <Rating max={5} precision={0.1} value={rating} size='large' readOnly />
            <div className='text-sm font-medium md:text-[16px]'>{rating}/5</div>
            <Link to='' className='text-sm underline md:text-[16px]'>
              {numberOfReviews} reviews
            </Link>
          </div>
          <div className='activity-author flex items-center gap-1'>
            <div className='mr-1 text-sm font-semibold md:text-[16px]'>Activity provider:</div>
            <Link to='' className='text-sm italic md:text-[16px]'>
              {provider}
            </Link>
          </div>
          <div className='address flex items-center'>
            <LocationCityIcon
              sx={{ marginRight: '2px', marginBottom: '3px', color: (theme) => theme.palette.secondary.main }}
            />
            {address || 'N/A'}
          </div>
        </div>
      </div>
    </>
  )
}
