/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import CheckIcon from '@mui/icons-material/Check'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { LatLngExpression } from 'leaflet'
import debounce from 'lodash/debounce'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import addressApi from 'src/apis/address.api'
import Map from 'src/components/Map/Map'
import { Location } from 'src/types/location.type'

interface MapTourFormProps {
  watch: any
  errors: any
  handleSaveUpdatedLocations: (updatedLocations: Location[]) => void
}

const MapTourForm: React.FC<MapTourFormProps> = ({ watch, errors, handleSaveUpdatedLocations }: MapTourFormProps) => {
  const watchLocations = watch(['locations'])
  const [locations, setLocations] = useState<Location[]>(watchLocations[0])
  const [openCollapse, setOpenCollapse] = useState(false)
  const [isConfirmLocations, setIsConfirmLocations] = useState<boolean>(false)
  const [isSaveUpdatedLocations, setIsSaveUpdatedLocations] = useState<boolean>(false)

  const { data: locationNamesData, isPending: isLocationNamesPending } = useQuery({
    queryKey: [`location name of ${locations}`],
    queryFn: () => addressApi.getLocationNameByLatLon(locations),
    enabled: openCollapse && locations.length > 0
  })

  useEffect(() => {
    if (locationNamesData?.data.data) {
      const names = locationNamesData.data.data
      const updateLocationsWithNames = locations.map((location, index) => ({
        ...location,
        name: names[index]
      }))

      setLocations(updateLocationsWithNames)
    }
  }, [locationNamesData])

  const handleMarkersUpdate = useCallback(
    (markers: LatLngExpression[]) => {
      const formattedMarkers: Location[] = (markers as Array<number[]>).map((marker: number[]) => {
        return {
          latitude: marker[0],
          longitude: marker[1]
        }
      })
      setLocations(formattedMarkers)
    },
    [setLocations]
  )

  const handleConfirmLocationLatLon = () => {
    setOpenCollapse(true)
    setIsConfirmLocations(true)
  }

  const handleChangeLocationName = useCallback(
    debounce((index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(event.target.value)

      setLocations((prevLocationNames) => {
        const updatedLocationNames = [...prevLocationNames]
        updatedLocationNames[index].name = event.target.value
        return updatedLocationNames
      })
    }, 300),
    []
  )

  const handleSave = () => {
    handleSaveUpdatedLocations(locations)
    setIsSaveUpdatedLocations(true)
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      <Box className='flex justify-between'>
        <Typography sx={{ fontWeight: 600, fontSize: '13px' }} color={(theme) => theme.palette.primary.main}>
          Select sequential locations{' '}
          <Typography component='span' sx={{ color: 'red' }}>
            *
          </Typography>
          <Tooltip title='By default, the location will be named based on the place you click on the map. If you want to change it, click "Confirm locations"'>
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        <Button
          disabled={locations.length === 0 || openCollapse}
          variant='outlined'
          onClick={handleConfirmLocationLatLon}
          endIcon={isConfirmLocations ? <CheckIcon /> : null}
        >
          Confirm locations
        </Button>
      </Box>
      <Map
        onMarkersUpdate={handleMarkersUpdate}
        selectMode={isConfirmLocations ? false : true}
        removeMode={isConfirmLocations ? false : true}
        changeMapViewMode={false}
      />
      {openCollapse && (
        <Collapse in={openCollapse} timeout='auto' unmountOnExit>
          {!isLocationNamesPending && locationNamesData && (
            <Paper className='p-4'>
              <Typography
                variant='subtitle2'
                sx={{ fontWeight: 600, color: (theme) => theme.palette.primary.main, marginBottom: '16px' }}
              >
                Here are default location names, you can change these names by changing on the inputs
              </Typography>

              <Stepper orientation='horizontal' activeStep={-1}>
                {locationNamesData.data.data.map((name, index) => (
                  <Step key={index}>
                    <StepLabel
                      sx={{
                        '& .MuiStepIcon-root': { color: (theme) => theme.palette.secondary.main }
                      }}
                    >
                      <TextField
                        id={`outlined-input-${index}`}
                        defaultValue={name}
                        onChange={(e) => handleChangeLocationName(index, e)}
                        sx={{ width: 'fit-content' }}
                        disabled={isSaveUpdatedLocations}
                      />
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box className='mt-4 flex justify-end'>
                <Button
                  disabled={isSaveUpdatedLocations}
                  endIcon={isSaveUpdatedLocations ? <CheckIcon /> : null}
                  size='large'
                  variant='outlined'
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Paper>
          )}
          {isLocationNamesPending && (
            <>
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} width='100%' />
            </>
          )}
        </Collapse>
      )}
      {!!errors.locations?.message && <FormHelperText error>{errors.locations?.message}</FormHelperText>}
      {/* {!isSaveUpdatedLocations && <FormHelperText error>Locations must be confirm first</FormHelperText>} */}
    </Box>
  )
}

export default MapTourForm
