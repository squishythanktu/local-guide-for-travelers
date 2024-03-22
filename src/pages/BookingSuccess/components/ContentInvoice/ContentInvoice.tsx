import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { SyntheticEvent, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Booking } from 'src/types/booking.type'
import ToursInfo from '../ToursInfo'

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
        <Box sx={{ p: 3 }}>
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
  bookings?: Booking[]
}

export default function ContentInvoice({ bookings }: Props) {
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
        backgroundColor: (theme) => theme.palette.common.white,
        color: (theme) => theme.palette.primary.main,
        border: 'solid',
        borderWidth: '1px',
        borderRadius: '12px'
      }}
    >
      <AppBar
        position='static'
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          color: (theme) => theme.palette.primary.main,
          borderTopRightRadius: '12px',
          borderTopLeftRadius: '12px'
        }}
      >
        <Tabs value={value} onChange={handleChange} indicatorColor='secondary' textColor='inherit'>
          {bookings?.map((_: Booking, index: number) => (
            <Tab key={index} label={`Trip ${index + 1}`} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {bookings?.map((booking: Booking, index: number) => (
          <TabPanel key={index} value={value} index={index} dir={theme.direction}>
            <ToursInfo booking={booking} />
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  )
}
