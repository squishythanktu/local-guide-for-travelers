import Rating from '@mui/material/Rating'
import { Review } from 'src/types/review.type'
import { formatDateLocaleString } from 'src/utils/date-time'

interface CommentProps {
  comment: Review
}

const Comment: React.FC<CommentProps> = ({ comment }: CommentProps) => {
  return (
    <div className='review-card__container flex flex-col gap-2 border-b py-6'>
      <div className='review-card__rating'>
        <Rating max={5} value={5} readOnly />
      </div>
      <div className='review-card__header flex'>
        <div className='review-card__user-photo mr-4 flex max-w-10'>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-xl font-bold uppercase text-white'>
            {comment.traveler.fullName || comment.traveler.email}
          </span>
        </div>
        <div className='review-card__user-details flex flex-col'>
          <div className='review-card__user-name-address flex gap-2'>
            <span className='user-name text-sm font-semibold'>{comment.traveler.email}</span>
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
