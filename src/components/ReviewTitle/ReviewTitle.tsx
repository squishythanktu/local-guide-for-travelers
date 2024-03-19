import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const ReviewTitle: React.FC = () => {
  return (
    <div id='review-title' className='activity__customer-reviews--title flex items-center gap-2'>
      <p className='text-[18px] font-semibold md:text-2xl'>Customer reviews</p>
      <Tooltip title='All reviews are from verified customers who purchased the activity. Reviews can only be submitted after the activity takes place.'>
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default ReviewTitle
