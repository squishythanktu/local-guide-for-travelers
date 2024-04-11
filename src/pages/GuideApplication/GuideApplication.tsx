/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import addressApi from 'src/apis/address.api'
import guideApplicationApi from 'src/apis/guide-application.api'
import userApi from 'src/apis/user.api'
import ControlledTextField from 'src/components/ControlledTextField/ControlledTextField'
import ImagesUploader from 'src/components/ImagesUploader/ImagesUploader'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { TypeOfTransport } from 'src/enums/type-of-transport.enum'
import { useToggle } from 'src/hooks/useToggle'
import { GuideApplicationType } from 'src/types/guide-application.type'
import { User } from 'src/types/user.type'
import { convertDateToUTC7 } from 'src/utils/date-time'
import { GuideApplicationSchema, guideApplicationSchema } from 'src/utils/rules'

type FormData = Omit<GuideApplicationSchema, 'newPassword' | 'confirmPassword'>

const applicationSchema = guideApplicationSchema.pick([
  'fullName',
  'address',
  'phone',
  'dateOfBirth',
  'email',
  'password',
  'transportation',
  'isLicensedGuide',
  'yearsOfExperience',
  'licenseImages',
  'biography'
])

const GuideApplication: React.FC = () => {
  const { isAuthenticated, profile } = useContext(AppContext)
  const [openCollapse, toggleCollapse, setOpenCollapse] = useToggle(false)
  const [transportationState, setTransportationState] = useState({
    none: false,
    myOwn: false,
    rental: false,
    hired: false
  })
  const [images, setImages] = useState<string[]>([])
  const { trigger, control, setValue, watch, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      address: '',
      email: '',
      password: '',
      phone: '',
      dateOfBirth: undefined,
      transportation: transportationState,
      isLicensedGuide: false,
      licenseImages: [],
      yearsOfExperience: 0,
      biography: ''
    },
    resolver: yupResolver(applicationSchema)
  })
  const { data: provincesData } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => addressApi.getProvinces()
  })
  const { data: profileData } = useQuery({
    queryKey: [`get me ${profile?.email}`, profile?.email],
    queryFn: () => userApi.getMe()
  })
  const watchIsLicenseGuide: boolean = watch('isLicensedGuide')
  const navigate = useNavigate()

  useEffect(() => {
    if (profileData?.data.data) {
      const user = profileData?.data.data as User

      setValue('email', user.email)
      user?.fullName && setValue('fullName', user.fullName)
      user?.phone && setValue('phone', user.phone)
      user?.address && setValue('address', user.address)
      user?.dateOfBirth && setValue('dateOfBirth', dayjs(user.dateOfBirth.split('T')[0]) as any)
    }
  }, [profileData?.data.data, setValue])

  useEffect(() => {
    setValue('licenseImages', images)
  }, [images, setValue])

  useEffect(() => {
    setValue('transportation', transportationState)
  }, [setValue, transportationState])

  useEffect(() => {
    if (watchIsLicenseGuide === false) {
      setImages([])
      setOpenCollapse(false)
      return
    }
    toggleCollapse()
  }, [watchIsLicenseGuide])

  const createGuideApplicationMutation = useMutation({
    mutationFn: (body: GuideApplicationType) => {
      return guideApplicationApi.createGuideApplication(body)
    }
  })

  const getTransportationString = (transportationTypes: any) => {
    return Object.entries(transportationTypes)
      .filter(([__key, value]) => value)
      .map(([key]) => (TypeOfTransport as any)[key])
      .join(';')
  }

  const onSubmit = (data: FormData) => {
    const formattedData: GuideApplicationType = {
      ...data,
      dateOfBirth: convertDateToUTC7(data.dateOfBirth),
      transportation: getTransportationString(data.transportation),
      licenseImages: data.licenseImages as string[]
    }

    createGuideApplicationMutation.mutate(formattedData, {
      onSuccess: () => {
        toast.success('Create guide application successfully.')
        navigate(path.home)
      },
      onError: (error: any) => {
        toast.error(error.response.data.message)
      }
    })
  }

  const handleTransportationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransportationState({
      ...transportationState,
      [event.target.name]: event.target.checked
    })
  }
  const { none, hired, myOwn, rental } = transportationState

  return (
    <Box className='container relative flex min-h-[550px] w-full items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='min-h-[550px] w-full '>
        <Box className='z-10 flex min-h-[400px] w-full flex-col gap-4 rounded-lg p-8'>
          <Typography variant='h4' className='mb-2 font-bold'>
            Join us as a local guide
          </Typography>
          <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Profile Details
          </h2>
          <div className='field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
            <ControlledTextField
              required
              className='min-h-20 w-full'
              control={control}
              name={'fullName'}
              label={'Full name'}
            />
            <Controller
              control={control}
              name='dateOfBirth'
              render={({ field, fieldState: { error } }) => {
                return (
                  <DatePicker
                    disableFuture
                    label={
                      <Typography sx={{ fontWeight: 600 }}>
                        Date of birth
                        <Typography component='span' sx={{ color: 'red' }}>
                          {' '}
                          *
                        </Typography>
                      </Typography>
                    }
                    value={field.value}
                    className='min-h-20 w-full'
                    slotProps={{
                      textField: { InputLabelProps: { shrink: true }, error: !!error, helperText: error?.message }
                    }}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('dateOfBirth')
                    }}
                  />
                )
              }}
            />
          </div>
          <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Contact Details
          </h2>
          <div className='field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
            <Controller
              name='address'
              control={control}
              render={({ field, fieldState: { error } }) => {
                const { onChange, onBlur, value } = field
                return (
                  <Autocomplete
                    {...field}
                    freeSolo
                    disablePortal
                    id='address'
                    className='w-full flex-grow'
                    onBlur={onBlur}
                    value={value}
                    onChange={(__event, selectedOptions) => {
                      onChange(selectedOptions)
                    }}
                    options={provincesData?.data.data || []}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                      <Box component='li' {...props}>
                        <FmdGoodOutlinedIcon
                          sx={{ mr: 2, flexShrink: 0, color: (theme) => theme.palette.primary.main }}
                        />
                        {option}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          <Typography sx={{ fontWeight: 600 }}>
                            Address{' '}
                            <Typography component='span' sx={{ color: 'red' }}>
                              {' '}
                              *
                            </Typography>
                          </Typography>
                        }
                        InputLabelProps={{
                          shrink: true
                        }}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )
              }}
            />
            <ControlledTextField
              required
              className='min-h-20 w-full'
              control={control}
              name={'phone'}
              label={'Phone'}
            />
          </div>
          <div className='field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
            <ControlledTextField
              required
              disabled={!!profile}
              className='min-h-20 w-full'
              control={control}
              name={'email'}
              label={'Email'}
            />
            <ControlledTextField
              required
              className='min-h-20 w-full'
              type='password'
              control={control}
              name={'password'}
              label={'Password'}
            />
          </div>
          <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Experience
          </h2>
          <FormControl>
            <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '600' }} id='transportation'>
              What type(s) of transportation method will you offer in your tours?
            </Typography>
            <FormGroup aria-labelledby='transportation'>
              <Controller
                control={control}
                name='transportation'
                render={({ field }) => {
                  const { onChange } = field
                  return (
                    <FormGroup aria-labelledby='transportation' onChange={onChange}>
                      <FormControlLabel
                        control={<Checkbox checked={none} onChange={handleTransportationChange} name='none' />}
                        label='None (e.g., walking tour, public transportation)'
                      />
                      <FormControlLabel
                        control={<Checkbox checked={myOwn} onChange={handleTransportationChange} name='myOwn' />}
                        label="My own vehicle and I'm the main driver"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={rental} onChange={handleTransportationChange} name='rental' />}
                        label="A rental vehicle and I'm the main driver"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={hired} onChange={handleTransportationChange} name='hired' />}
                        label='Hired driver in a private vehicle'
                      />
                    </FormGroup>
                  )
                }}
              />
            </FormGroup>
          </FormControl>
          <FormControl>
            <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '600' }} id='isLicensedGuide'>
              Are you a licensed tour guide?
              <Typography component='span' sx={{ color: 'red' }}>
                {' '}
                *
              </Typography>
            </Typography>
            <Controller
              control={control}
              name='isLicensedGuide'
              render={({ field, fieldState: { error } }) => {
                const { value, onChange } = field
                return (
                  <RadioGroup aria-labelledby='isLicensedGuide' value={value} onChange={onChange}>
                    <FormControlLabel value={true} control={<Radio />} label="Yes, I'm a licensed tour guide" />
                    <FormControlLabel value={false} control={<Radio />} label="No, I'm a passionate local" />
                    {error && <FormHelperText error>{error.message}</FormHelperText>}
                  </RadioGroup>
                )
              }}
            />
          </FormControl>
          <Collapse in={openCollapse} timeout='auto' unmountOnExit>
            <Box sx={{ marginY: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '600' }} id='isLicensedGuide'>
                License images
              </Typography>
              <ImagesUploader images={images} setImages={setImages as any} />
            </Box>
          </Collapse>
          <ControlledTextField
            required
            className='min-h-20 w-full md:w-[49%]'
            type='number'
            control={control}
            name={'yearsOfExperience'}
            label={'Years of Experience'}
          />
          <ControlledTextField
            multiline
            rows={3}
            required
            className='min-h-20 w-full md:w-full'
            control={control}
            name={'biography'}
            label={'Biography'}
          />
          <Alert severity='info' className='my-4'>
            <AlertTitle>Info</AlertTitle>
            You will receive an email once your registration is accepted.
          </Alert>
          <Box className='guide-applications__actions mt-4 flex items-center justify-end'>
            <LoadingButton
              loading={createGuideApplicationMutation.isPending}
              type='submit'
              variant='contained'
              size='large'
            >
              {isAuthenticated ? 'Submit' : 'Create a guide account'}
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default GuideApplication
