import { Box } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Rating from '@mui/material/Rating'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useCallback, useEffect, useState } from 'react'
import { SortReview } from 'src/enums/sort-review.enum'
import { ReviewParams } from 'src/types/review.type'
import MenuButton from '../MenuButton/MenuButton'
import StarBorderIcon from '@mui/icons-material/StarBorder'

interface ReviewSortFilter {
  onChange: (reviewParams: ReviewParams) => void
}

const ReviewSortFilter: React.FC<ReviewSortFilter> = ({ onChange }: ReviewSortFilter) => {
  const [ratings, setRatings] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<string>('')

  const castToRatingString = useCallback(() => ratings.map((rating) => rating).join(','), [ratings])

  useEffect(() => {
    const reviewParams: ReviewParams = {
      ratings: castToRatingString(),
      sortBy: sortBy
    }
    onChange(reviewParams)
  }, [castToRatingString, onChange, ratings, sortBy])

  const handleCheckboxChange = useCallback((value: number) => {
    setRatings((prevRatings) => {
      if (prevRatings.includes(value)) return prevRatings.filter((rating) => rating !== value)
      return [...prevRatings, value]
    })
  }, [])

  const handleCheckAll = useCallback(() => {
    if (ratings.length === 5) {
      setRatings([])
      return
    }
    setRatings([1, 2, 3, 4, 5])
  }, [ratings.length])

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => setSortBy(event.target.value), [])

  const RatingFormGroup = (
    <>
      <h3 className='reviews-summary__title'>Filter</h3>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={ratings.length === 5} onChange={() => handleCheckAll()} />}
          label='All star ratings'
        />
        {[5, 4, 3, 2, 1].map((value, index) => (
          <Box className='flex items-center' key={index}>
            <FormControlLabel
              control={<Checkbox checked={ratings.includes(value)} onChange={() => handleCheckboxChange(value)} />}
              label={`${value} stars`}
              classes={{ label: 'sm:hidden lg:block' }}
            />
            <Rating max={5} value={value} readOnly />
          </Box>
        ))}
      </FormGroup>
    </>
  )

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='sort-filter-reviews'>
      <Grid item xs={2} sm={3} md={12} className='sort-by'>
        <h3 className='reviews-summary__title mb-2'>Sort by</h3>
        <FormControl fullWidth>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={sortBy}
            onChange={handleSelectChange}
            MenuProps={{ disableScrollLock: true }}
            style={{ height: 63, marginTop: '-6px' }}
            sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 800, maxWidth: '175px' }}
          >
            <MenuItem disabled value=''>
              <em>
                <strong>Sort</strong>
              </em>
            </MenuItem>
            {Object.values(SortReview).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={0}
        sm={0}
        md={12}
        className='star-rating'
        sx={{
          display: { xs: 'none', md: 'block' }
        }}
      >
        {RatingFormGroup}
      </Grid>
      <Grid
        item
        xs={2}
        sm={3}
        md={0}
        className='star-rating-menu-button'
        sx={{
          display: { xs: 'block', md: 'none' }
        }}
      >
        <h3 className='reviews-summary__title mb-2'>Filter</h3>

        <MenuButton
          text='Star ratings'
          icon={<StarBorderIcon />}
          jsx={<Box sx={{ padding: '12px' }}>{RatingFormGroup}</Box>}
        />
      </Grid>
    </Grid>
  )
}

export default ReviewSortFilter
