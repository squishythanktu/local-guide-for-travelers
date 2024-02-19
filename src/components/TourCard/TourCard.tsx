import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'
import { Tour } from 'src/types/tour.type'

export default function TourCard({ tourData }: { tourData: Tour }) {
  return (
    <Link to={`/tours/${tourData.id}`} className='relative'>
      <div className='tour-card__wrapper flex h-full flex-col justify-between overflow-hidden rounded border border-solid border-[var(--border-primary)]'>
        <div className='tour-card__top-wrapper'>
          <div className='tour-card__top relative'>
            <div className='tour-card__photo h-64 overflow-hidden'>
              <img
                src={tourData.images[0].imageLink}
                alt='Tour img'
                className='h-full w-full object-cover transition duration-700 hover:scale-125'
              />
            </div>
            <div className='tour-card__header mb-2 mt-1 px-3'>
              <span className='activity-type mb-1 text-sm font-semibold uppercase leading-5 text-[var(--label-secondary)]'>
                {tourData?.categories[0]?.name}
              </span>
              <h3 className='title capitalize text-[var(--label-primary)] lg:max-h-20 lg:overflow-hidden'>
                {tourData?.name}
              </h3>
            </div>
            <div className='tour-card__body mb-2 px-2 py-0 text-sm text-[var(--label-primary)] sm:px-3'>
              <ul className='flex flex-wrap gap-4'>
                <li className='text-sm font-semibold'>
                  {tourData?.duration} {tourData?.unit}
                </li>
                <li className='relative flex items-center whitespace-nowrap text-sm font-semibold'>
                  <span className='absolute left-[-10px] top-1/2 -translate-y-1/2 transform'>•</span>
                  {tourData?.transportation}
                </li>
                <li className='relative flex items-center whitespace-nowrap text-sm font-semibold'>
                  <span className='absolute left-[-10px] top-1/2 -translate-y-1/2 transform'>|</span>
                  by {tourData?.guide?.username || tourData?.guide?.email || 'N/A'}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='tour-card__details  float-left mb-2 px-3 lg:max-h-40 lg:overflow-hidden'>
          <div className='rating-overall-container flex items-center gap-1'>
            <Rating name='half-rating' defaultValue={tourData?.overallRating} precision={0.1} size='small' />
            <span className='rating-overall__number text-sm font-semibold'>{tourData?.overallRating}</span>
            <span className='rating-overall__reviews text-sm font-semibold  text-[var(--label-secondary)]'>
              {/* TODO: Replace by tour total reviews from API */}
              (244 reviews)
            </span>
          </div>
          <div className='pricing-container font-semibold'>
            From $ {tourData?.pricePerTraveler.toLocaleString()} per person
          </div>
        </div>
      </div>
      <div className='wishlist-icon absolute right-1 top-1 z-[4] cursor-pointer'>
        <FavoriteBorderIcon style={{ color: 'var(--border-primary)' }} />
      </div>
    </Link>
  )
}
