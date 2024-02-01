import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'

export default function TourCard() {
  return (
    <Link to='/' className='relative'>
      <div className='tour-card__wrapper flex h-full flex-col justify-between overflow-hidden rounded border border-solid border-[var(--border-primary)]'>
        <div className='tour-card__top-wrapper'>
          <div className='tour-card__top relative'>
            <div className='tour-card__photo h-64 overflow-hidden'>
              <img
                src='https://cdn.getyourguide.com/img/tour/6493cf7d1fe21.png/132.webp'
                alt='Tour img'
                className='h-full w-full object-cover transition duration-700 hover:scale-125'
              />
            </div>
            <div className='tour-card__header mb-2 mt-1 px-3'>
              <span className='activity-type mb-1 text-sm font-semibold uppercase leading-5 text-[var(--label-secondary)]'>
                Water activity
              </span>
              <h3 className='title capitalize text-[var(--label-primary)] lg:max-h-20 lg:overflow-hidden'>
                Hoi An: Hoai River Boat Trip by Night with Release Lantern
              </h3>
            </div>
            <div className='tour-card__body mb-2 px-2 py-0 text-sm text-[var(--label-primary)] sm:px-3'>
              <ul className='flex flex-wrap gap-4'>
                <li className='text-sm font-semibold'>20 minutes</li>
                <li className='relative flex items-center whitespace-nowrap text-sm font-semibold'>
                  <span className='absolute left-[-10px] top-1/2 -translate-y-1/2 transform'>•</span>
                  Small group
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='tour-card__details  float-left mb-2 px-3 lg:max-h-40 lg:overflow-hidden'>
          <div className='rating-overall-container flex items-center gap-1'>
            <Rating name='half-rating' defaultValue={4.5} precision={0.5} size='small' />
            <span className='rating-overal__number text-sm font-semibold'>4.3</span>
            <span className='rating-overal__reviews text-sm font-semibold  text-[var(--label-secondary)]'>
              (244 reviews)
            </span>
          </div>
          <div className='pricing-container font-semibold'>From ₫ 195,000 per person</div>
        </div>
      </div>
      <div className='wishlist-icon absolute right-1 top-1 z-[4] cursor-pointer'>
        <FavoriteBorderIcon style={{ color: 'var(--border-primary)' }} />
      </div>
    </Link>
  )
}
