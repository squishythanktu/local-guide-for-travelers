import Rating from '@mui/material/Rating'

const Comment: React.FC = () => {
  return (
    <div className='review-card__container flex flex-col gap-2 border-b py-6'>
      <div className='review-card__rating'>
        <Rating max={5} value={5} readOnly />
      </div>
      <div className='review-card__header flex'>
        <div className='review-card__user-photo mr-4 flex max-w-10'>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-xl font-bold uppercase text-white'>
            N
          </span>
        </div>
        <div className='review-card__user-details flex flex-col'>
          <div className='review-card__user-name-address flex gap-2'>
            <span className='user-name text-sm font-semibold'>Nishanth</span>
            <span className='text-sm font-semibold '>-</span>
            <span className='user-adrress text-sm font-semibold'>Da Nang</span>
          </div>
          <div className='review-card__user-name-address mt-[-2px] text-slate-500'>
            <span className='user-name text-sm font-semibold'>February 21, 2024</span>
          </div>
        </div>
      </div>
      <div className='review-card__comment'>
        <span>
          I would have loved to give 5 stars because the hike and scenery were very beautiful. I just wished the tour
          guide would have been more transparent about what was going on. Please bring water with you, it's not included
          in the ticket. Neither did we see any rock carvings as depicted in the description. And make sure you wear
          hiking shoes as the trek can be slippery at times and dirty At the beginning of the tour 4-5 local ladies
          joined us. I thought in the beginning they were part of the tour and I really appreciated their help along the
          trek. Unfortunately, when we almost concluded our tour they wanted us to buy their goods at an exorbitant
          price compared to anywhere else in SaPa. They hid their goods in baskets, which were revealed at the end.
          Please just give up a heads-up to tourists why you are part of the tour to avoid a disappointing finish to the
          day. Lunch was okay but I didn't feel it was enough and I think the tickets we paid for are overpriced for
          what we've got.
        </span>
      </div>
    </div>
  )
}

export default Comment
