import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { SyntheticEvent, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import reviewApi from 'src/apis/review.api'
import ReviewSortFilter from 'src/components/ReviewSortFilter/ReviewSortFilter'
import ReviewTitle from 'src/components/ReviewTitle/ReviewTitle'
import TabPanel from 'src/components/TabPanel/TabPanel'
import TourManagement from 'src/pages/Account/TourManagement'
import { a11yProps } from 'src/utils/tab-panel'

interface TourAndReviewProps {
  guideId?: string
}

export default function TourAndReview({ guideId }: TourAndReviewProps) {
  const theme = useTheme()
  const [value, setValue] = useState(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  const { data: reviewsData } = useQuery({
    queryKey: [`Get reviews of tour by ${guideId}`, guideId],
    queryFn: () => reviewApi.getReviewsOfGuide(Number(guideId)),
    enabled: guideId !== undefined
  })

  return (
    <Box
      sx={{
        borderRadius: '12px'
      }}
    >
      <AppBar
        position='static'
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          color: (theme) => theme.palette.primary.main,
          borderRadius: '12px',
          borderWidth: '1px',
          borderColor: (theme) => theme.palette.primary.main,
          boxShadow: 'none'
        }}
        className='w-fit'
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='secondary'
          textColor='inherit'
          sx={{
            borderRadius: '12px'
          }}
        >
          <Tab label={`Tour(s)`} {...a11yProps(1)} />
          <Tab label={`Review(s)`} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={1} index={1} dir={theme.direction}>
          <TourManagement guideId={guideId} />
        </TabPanel>
        <TabPanel value={2} index={2} dir={theme.direction}>
          <Divider className='mb-4' />
          <ReviewTitle />
          {reviewsData?.data.data && (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item sm={2} md={3}>
                <ReviewSortFilter onChange={() => {}} />
              </Grid>
              <Grid item sm={6} md={9}>
                {/* TODO: Handle API for comments
                {reviewsData?.data.data.map((review) => <Comment key={review.id} comment={review} />)} */}
              </Grid>
            </Grid>
          )}
          {!reviewsData?.data.data && (
            <>
              <span>This tour has not had any reviews yet.</span>
            </>
          )}
        </TabPanel>
      </SwipeableViews>
    </Box>
  )
}
