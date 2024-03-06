import { Divider, Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { SyntheticEvent, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import StarRatingFilter from 'src/components/StarRatingFilter/StarRatingFilter'
import TourManagement from 'src/pages/Account/TourManagement'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

interface Props {
  guideId?: string
}

export default function TourAndReview({ guideId }: Props) {
  const theme = useTheme()
  const [value, setValue] = useState(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

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
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={0} sm={2} md={3}>
              <StarRatingFilter />
            </Grid>
            <Grid item xs={4} sm={6} md={9}>
              {/* <Comment /> */}
              {/* <Comment /> */}
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </Box>
  )
}
