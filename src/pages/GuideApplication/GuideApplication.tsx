/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import addressApi from 'src/apis/address.api'
import ControlledTextField from 'src/components/ControlledTextField/ControlledTextField'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

const GuideApplication: React.FC = () => {
  const { isAuthenticated } = useContext(AppContext)
  const { trigger, control, register } = useForm<any>({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      transportation: '',
      isLicensedGuide: false,
      dateOfBirth: undefined
    }
    // resolver: yupResolver(accountSchema)
  })
  const { data: provincesData } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => addressApi.getProvinces(),
    staleTime: 5 * 1000
  })

  return (
    <Box className='container relative flex min-h-[550px] w-full items-center justify-center'>
      <Box className='z-10 flex min-h-[400px] w-full flex-col gap-4 rounded-lg p-8'>
        <Typography variant='h4' className='mb-2 font-bold'>
          Join us as a local guide
        </Typography>
        <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
          Profile Details
        </h2>
        <div className='field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
          <ControlledTextField className='min-h-20 w-full' control={control} name={'fullName'} label={'Full name'} />
          <Controller
            control={control}
            name='dateOfBirth'
            render={({ field }) => {
              return (
                <DatePicker
                  disableFuture
                  label='Date of birth'
                  value={field.value ? dayjs(field.value) : null}
                  className='min-h-20 w-full'
                  slotProps={{ textField: { InputLabelProps: { shrink: true } } }}
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
            defaultValue={''} // Provide the default value for the address
            render={({ field }) => (
              <Autocomplete
                {...field}
                disablePortal
                id='address'
                className='w-full flex-grow'
                options={provincesData?.data.data || []}
                sx={{ width: 300 }}
                onChange={() => {}}
                renderOption={(props, option) => (
                  <Box component='li' {...props}>
                    <FmdGoodOutlinedIcon sx={{ mr: 2, flexShrink: 0, color: (theme) => theme.palette.primary.main }} />
                    {option}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<Typography sx={{ fontWeight: 600 }}>Address</Typography>}
                    InputLabelProps={{
                      shrink: true
                    }}
                    // Add error and helperText props if needed
                  />
                )}
              />
            )}
          />
          <ControlledTextField
            className='min-h-20 w-full'
            type='number'
            control={control}
            name={'phone'}
            label={'Phone'}
          />
        </div>
        <div className='field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
          <ControlledTextField className='min-h-20 w-full' control={control} name={'email'} label={'Email'} />
          <ControlledTextField
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
          <FormGroup aria-labelledby='transportation' {...register('transportation', { required: true })}>
            <FormControlLabel
              value='none'
              control={<Checkbox />}
              label='None (e.g., walking tour, public transportation)'
            />
            <FormControlLabel
              value='my-own'
              control={
                <Controller
                  name='transportation'
                  control={control}
                  render={({ field }) => <Checkbox {...field} value='my-own' />}
                />
              }
              label="My own vehicle and I'm the main driver"
            />
            <FormControlLabel
              value='rental'
              control={
                <Controller
                  name='transportation'
                  control={control}
                  render={({ field }) => <Checkbox {...field} value='rental' />}
                />
              }
              label="A rental vehicle and I'm the main driver"
            />
            <FormControlLabel
              value='hired'
              control={
                <Controller
                  name='transportation'
                  control={control}
                  render={({ field }) => <Checkbox {...field} value='hired' />}
                />
              }
              label=' Hired driver in a private vehicle'
            />
          </FormGroup>
        </FormControl>
        <FormControl>
          <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: '600' }} id='isLicensedGuide'>
            Are you a licensed tour guide?
          </Typography>
          <FormGroup aria-labelledby='isLicensedGuide' {...register('isLicensedGuide', { required: true })}>
            <FormControlLabel value='true' control={<Radio />} label="Yes, I'm a licensed tour guide" />
            <FormControlLabel value='false' control={<Radio />} label="No, I'm a passionate local" />
          </FormGroup>
        </FormControl>
        <Alert severity='info'>
          <AlertTitle>Info</AlertTitle>
          You will receive an email once your registration has been accepted.
        </Alert>
        <Box className='guide-applications__actions mt-4 flex items-center justify-between'>
          <Box className='flex'>
            <span className='text-gray-400'>Already have an account?</span>
            <Link className='ml-1 font-bold text-orange-500' to={path.login}>
              Sign in
            </Link>
          </Box>
          <LoadingButton variant='contained' size='large'>
            {isAuthenticated ? 'Submit' : 'Create a guide account'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}

export default GuideApplication
