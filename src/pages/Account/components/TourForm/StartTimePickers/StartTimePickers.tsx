/* eslint-disable @typescript-eslint/no-explicit-any */
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Box, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { Unit } from 'src/enums/unit.enum'

interface StartTimePickers {
  watchUnitDuration: any
  onStartTimesChange: (startTimes: Dayjs[]) => void
}

const StartTimePickers: React.FC<StartTimePickers> = ({ watchUnitDuration, onStartTimesChange }: StartTimePickers) => {
  const [isMultipleStartTime, setIsMultipleStartTime] = useState<boolean>(false)
  const [startTimes, setStartTimes] = useState<Dayjs[]>([dayjs('2022-04-17T00:00')])
  //   const watchUnitDuration = watch(['unit', 'duration'])

  useEffect(() => {
    onStartTimesChange(startTimes as any)
  }, [onStartTimesChange, startTimes])

  const handleAddMoreStartTime = () => {
    setStartTimes((prev) => [...prev, dayjs('2022-04-17T00:00')])
  }

  const handleTimePickerChange = (index: any, newValue: any) => {
    setStartTimes((prevStartTimes) => {
      const newStartTimes = [...prevStartTimes]
      newStartTimes[index] = dayjs(newValue)
      return newStartTimes
    })
  }

  const handleRemoveStartTime = (index: any) => {
    setStartTimes((prevStartTimes) => {
      const newStartTimes = [...prevStartTimes]
      newStartTimes.splice(index, 1)
      return newStartTimes
    })
  }

  useEffect(() => {
    if (watchUnitDuration[0] === Unit.HOURS && Number(watchUnitDuration[1]) <= 5) {
      setIsMultipleStartTime(true)
      return
    }
    setIsMultipleStartTime(false)
  }, [watchUnitDuration])

  return (
    <Box className='flex flex-col gap-2'>
      <Box className='flex items-center gap-2'>
        <Typography sx={{ fontWeight: 600, fontSize: '13px' }} color={(theme) => theme.palette.primary.main}>
          Select {isMultipleStartTime ? 'start times' : 'start time'}
          <Typography component='span' sx={{ color: 'red' }}>
            *
          </Typography>
        </Typography>
        {isMultipleStartTime && (
          <Button variant='outlined' endIcon={<MoreTimeIcon />} onClick={handleAddMoreStartTime}>
            Add
          </Button>
        )}
      </Box>
      <div className='account-profile__field-group mb-4 flex flex-col overflow-x-auto md:flex-row md:gap-4'>
        {startTimes.map((selectedTime, index) => (
          <div key={index} className='flex items-center'>
            <TimePicker
              className='min-w-[150px]'
              onChange={(newValue) => handleTimePickerChange(index, newValue)}
              defaultValue={selectedTime}
            />
            {index > 0 && (
              <IconButton color='error' onClick={() => handleRemoveStartTime(index)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </Box>
  )
}

export default StartTimePickers
