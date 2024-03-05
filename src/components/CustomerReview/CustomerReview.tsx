import StarRatingFilter from '../../pages/TourDetail/components/StarRatingFilter/StarRatingFilter'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import Tooltip from '@mui/material/Tooltip'
import Comment from '../../pages/TourDetail/components/Comment/Comment'

export default function CustomerReview() {
  return (
    <Box className='activity__customer-reviews flex flex-col pb-6'>
      <Divider className='my-4' />
      <div className='activity__customer-reviews--title flex items-center gap-2'>
        <p className='text-[18px] font-semibold md:text-2xl'>Customer reviews</p>
        <Tooltip title='All reviews are from verified customers who purchased the activity. Reviews can only be submitted after the activity takes place.'>
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} sm={8} md={12}>
          <div className='reviews-summary__rating flex flex-col items-center'>
            <h3 className='reviews-summary__title'>Overall rating</h3>
            <div className='reviews-summary__content flex flex-col'>
              <div className='average-rating flex items-center justify-center gap-2'>
                <span className='current-average-rating text-3xl font-bold md:text-4xl'>4.5</span>
                <span className='max-rating text-xl font-bold text-slate-500 md:text-2xl'>/5</span>
              </div>
              <Rating
                sx={{
                  '& .MuiRating-icon': { fontSize: '3rem' }
                }}
                max={5}
                precision={0.1}
                value={4.5}
                readOnly
              />
              <span className='mt-2 text-center font-semibold text-slate-500'>based on 306 reviews</span>
            </div>
          </div>
        </Grid>
        <Grid item xs={0} sm={2} md={3}>
          <StarRatingFilter />
        </Grid>
        <Grid item xs={4} sm={6} md={9}>
          <Comment />
          <Comment />
        </Grid>
      </Grid>
    </Box>
  )
}
