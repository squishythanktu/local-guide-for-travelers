import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Rating from '@mui/material/Rating'

const StarRatingFilter: React.FC = () => {
  return (
    <div className='star-rating-filter'>
      <h3 className='reviews-summary__title'>By star rating</h3>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label='All star ratings' />
        <Box className='flex items-center'>
          <FormControlLabel control={<Checkbox />} label='5 stars' />
          <Rating max={5} value={5} readOnly />
        </Box>
        <Box className='flex items-center'>
          <FormControlLabel control={<Checkbox />} label='4 stars' />
          <Rating max={5} value={4} readOnly />
        </Box>
        <Box className='flex items-center'>
          <FormControlLabel control={<Checkbox />} label='3 stars' />
          <Rating max={5} value={3} readOnly />
        </Box>
        <Box className='flex items-center'>
          <FormControlLabel control={<Checkbox />} label='2 stars' />
          <Rating max={5} value={2} readOnly />
        </Box>
        <Box className='flex items-center'>
          <FormControlLabel control={<Checkbox />} label='1 stars' />
          <Rating max={5} value={1} readOnly />
        </Box>
      </FormGroup>
    </div>
  )
}

export default StarRatingFilter
