import Rating from '@mui/material/Rating'
import classNames from 'classnames'
import { Review } from 'src/types/review.type'
import { formatDateLocaleString } from 'src/utils/date-time'

interface CommentProps {
  comment: Review
}

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  const randomColorIndex = Math.floor(Math.random() * 3)

  return (
    <div className='review-card__container flex flex-col gap-2 border-b py-6'>
      <div className='review-card__rating'>
        <Rating max={5} value={5} readOnly />
      </div>
      <div className='review-card__header flex'>
        <div className='review-card__user-photo mr-4 flex max-w-10'>
          <span
            className={classNames(
              'flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold uppercase text-white',
              {
                'bg-orange-500': randomColorIndex === 0,
                'bg-blue-500': randomColorIndex === 1,
                'bg-green-500': randomColorIndex === 2
              }
            )}
          >
            {comment.traveler.email.slice(0, 1)}
          </span>
        </div>
        <div className='review-card__user-details flex flex-col'>
          <div className='review-card__user-name-address flex gap-2'>
            <span className='user-name text-sm font-semibold'>
              {comment.traveler.fullName || comment.traveler.email}
            </span>
            <span className='text-sm font-semibold '>-</span>
            <span className='user-adrress text-sm font-semibold'>{comment.traveler.address || 'N/A'}</span>
          </div>
          <div className='review-card__user-name-address mt-[-2px] text-slate-500'>
            <span className='user-name text-sm font-semibold'>{formatDateLocaleString(comment.createAt)}</span>
          </div>
        </div>
      </div>
      <div className='review-card__comment'>
        <span>{comment.comment}</span>
      </div>
    </div>
  )
}

export default Comment
