/* eslint-disable react-hooks/rules-of-hooks */
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, FormHelperText, MenuItem, TextField, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import requestApi from 'src/apis/request.api'
import tourApi from 'src/apis/tour.api'
import wishlistApi from 'src/apis/wishlist.api'
import ControlledTextField from 'src/components/ControlledTextField'
import TourCard from 'src/components/TourCard'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { StatusRequest } from 'src/enums/status-request.enum'
import { Transportation } from 'src/enums/transportation.enum'
import { Unit } from 'src/enums/unit.enum'
import { Tour } from 'src/types/tour.type'
import { RequestTourSchema, requestTourSchema } from 'src/utils/rules'
import { isTourInWishlist } from 'src/utils/wishlist'
import NotFound from '../NotFound/NotFound'

export type RequestTourFormData = RequestTourSchema & {
  guideId: string
  travelerRequestStatus?: string
  travelerRequestId?: number
}

const RequestTour: React.FC = () => {
  const { profile, isAuthenticated } = useContext(AppContext)
  const [buttonClicked, setButtonClicked] = useState<StatusRequest.DRAFT | StatusRequest.PENDING>()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    trigger,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<RequestTourSchema>({
    defaultValues: {
      transportation: [],
      duration: 0,
      unit: '',
      maxPricePerPerson: 0,
      numberOfTravelers: 0,
      destination: '',
      message: ''
    },
    resolver: yupResolver(requestTourSchema)
  })
  const { data: wishListData, refetch } = useQuery({
    queryKey: [`wishlist of user with id ${profile?.id}`],
    queryFn: () => wishlistApi.getWishlist(),
    staleTime: 5 * 1000,
    enabled: isAuthenticated
  })

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  }

  const createRequestTourMutation = useMutation({
    mutationFn: (body: RequestTourFormData) => requestApi.createRequest(body)
  })

  if (!location.state || !location.state.guideId) {
    return <NotFound />
  }

  useEffect(() => {
    if (location.state.request) {
      const { transportation, message, duration, unit, maxPricePerPerson, numberOfTravelers, destination } =
        location.state.request
      const request: RequestTourSchema = {
        transportation,
        message,
        duration,
        unit,
        maxPricePerPerson,
        numberOfTravelers,
        destination
      }
      Object.entries(request).forEach(([key, value]) => {
        setValue(key as keyof RequestTourSchema, value)
      })
    }
  }, [location])

  const { data: guideToursData } = useQuery({
    queryKey: [`tours of guide ${location.state.guideId}`],
    queryFn: () => tourApi.getToursOfGuide(location.state.guideId),
    staleTime: 6 * 1000,
    enabled: location.state.guideId !== null
  })

  const onSubmit = (data: RequestTourSchema) => {
    if (profile) {
      const formattedData: RequestTourFormData = {
        ...data,
        guideId: location.state.guideId,
        travelerRequestStatus: buttonClicked?.toUpperCase(),
        travelerRequestId: location.state.request?.id || ''
      }
      createRequestTourMutation.mutate(formattedData, {
        onSuccess: () => {
          if (buttonClicked === StatusRequest.PENDING) {
            toast.success('Your request has been sent.'), navigate(path.tourRequest)
          }
          if (buttonClicked === StatusRequest.DRAFT) {
            toast.success('Your request has been saved as a draft.')
            navigate(path.tourRequest, { state: { statusRequest: StatusRequest.DRAFT } })
          }
        },
        onError: () => {
          toast.error('You have a PENDING request for this guide, consider removing the previous before add.')
        }
      })
    }
  }

  const handleLoading = (status: StatusRequest.DRAFT | StatusRequest.PENDING) => {
    if (buttonClicked === status) return createRequestTourMutation.isPending
  }

  return (
    <div className='container grid grid-cols-1 gap-6 pb-4 md:grid-cols-5'>
      <div className='md:col-span-3'>
        <h2 className='pb-4'>Tour request form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className=''>
            <ControlledTextField
              required
              fullWidth={true}
              multiline={true}
              rows={2}
              control={control}
              name={'destination'}
              label={'Destination'}
            />
          </div>
          <div className=''>
            <Box sx={{ color: (theme) => theme.palette.primary.main }} className='text-xs font-bold'>
              Transportation <span className='text-sm text-red-500'>*</span>
            </Box>
            <div className=''>
              <div className='grid grid-cols-3'>
                {Object.values(Transportation).map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Controller
                        name='transportation'
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            value={item}
                            checked={field.value?.includes(item)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...(field.value ?? []), item])
                              } else {
                                field.onChange(field.value?.filter((value) => value !== item) ?? [])
                              }
                            }}
                          />
                        )}
                      />
                    }
                    label={item}
                  />
                ))}
              </div>
              {errors.transportation?.message && (
                <FormHelperText className='pl-3 text-xs text-red-500'>{errors.transportation.message}</FormHelperText>
              )}
            </div>
          </div>
          <div className='flex gap-3'>
            <ControlledTextField
              required
              className='min-h-[80px] w-1/2 grow'
              type='number'
              control={control}
              name={'duration'}
              label={'Duration'}
            />
            <Controller
              control={control}
              name='unit'
              render={({ field }) => (
                <TextField
                  select
                  label={
                    <Typography sx={{ fontWeight: 600 }}>
                      Unit{' '}
                      <Typography component='span' sx={{ color: 'red' }}>
                        *
                      </Typography>
                    </Typography>
                  }
                  id='unit'
                  variant='outlined'
                  error={!!errors.unit?.message}
                  helperText={errors.unit?.message}
                  className='h-fit w-1/2 grow'
                  {...field}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('unit')
                  }}
                >
                  {Object.values(Unit).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
          <div className='flex gap-3'>
            <ControlledTextField
              required
              className='min-h-[80px] w-1/2 grow'
              type='number'
              control={control}
              name={'maxPricePerPerson'}
              label={'Max price per traveler'}
              prefix='$'
            />
            <ControlledTextField
              required
              className='min-h-[80px] w-1/2 grow'
              type='number'
              control={control}
              name={'numberOfTravelers'}
              label={'Number of travelers'}
            />
          </div>
          <div className=''>
            <ControlledTextField
              fullWidth={true}
              multiline={true}
              rows={3}
              control={control}
              name={'message'}
              label={'Message'}
              className='min-h-32'
            />
          </div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2
            }}
          >
            <Button variant='outlined' className='w-fit' size='large' onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <LoadingButton
              onClick={() => setButtonClicked(StatusRequest.DRAFT)}
              loading={handleLoading(StatusRequest.DRAFT)}
              variant='contained'
              size='large'
              type='submit'
            >
              <span>Save draft</span>
            </LoadingButton>
            <LoadingButton
              onClick={() => setButtonClicked(StatusRequest.PENDING)}
              loading={handleLoading(StatusRequest.PENDING)}
              variant='contained'
              size='large'
              type='submit'
            >
              <span>Submit</span>
            </LoadingButton>
          </Box>
        </form>
      </div>
      <div className='hidden md:col-span-2 md:ml-10 md:block lg:ml-20'>
        <h2 className='pb-4'>You might also like...</h2>
        <div className=''>
          <Slider {...carouselSettings} className=''>
            {guideToursData?.data.data.map((tour: Tour) => (
              <TourCard
                key={tour.id}
                tourData={tour}
                isTourInWishList={wishListData ? !!isTourInWishlist(wishListData?.data.data as Tour[], tour.id) : false}
                refetch={refetch}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
export default RequestTour
