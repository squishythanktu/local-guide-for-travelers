import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import ControlledTextField from 'src/components/ControlledTextField'
import { AppContext } from 'src/contexts/app.context'
import { UserSchema, userSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'fullName' | 'address' | 'phone' | 'dateOfBirth'>
const accountSchema = userSchema.pick(['fullName', 'address', 'phone', 'dateOfBirth'])

export default function Profile() {
  const { profile } = useContext(AppContext)
  const { data: profileData } = useQuery({
    queryKey: [`get me ${profile?.email}`, profile?.email],
    queryFn: () => userApi.getMe()
  })
  const { trigger, control, setValue, handleSubmit } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      address: '',
      dateOfBirth: undefined
    },
    resolver: yupResolver(accountSchema)
  })

  useEffect(() => {
    if (profileData?.data.data) {
      Object.entries(profileData?.data.data).forEach(([key, value]) => {
        if (key === 'dateOfBirth' && value) {
          setValue('dateOfBirth', value.toString().split('T')[0])
          return
        }
        setValue(key as keyof FormData, value)
      })
    }
  }, [profileData?.data.data, setValue])

  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='account-profile-form'>
      <div className='form-details flex flex-col'>
        <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
          Profile Details
        </h2>
        <div className='account-profile__field-group mb-4 flex flex-col gap-6 md:flex-row'>
          <ControlledTextField
            className='min-h-20 w-full  md:w-1/2'
            control={control}
            name={'fullName'}
            label={'Full name'}
          />
          <Controller
            control={control}
            name='dateOfBirth'
            render={({ field }) => {
              return (
                <DatePicker
                  disableFuture
                  label='Date of birth'
                  value={field.value ? dayjs(field.value) : null}
                  className='min-h-20 w-full md:w-1/2'
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
        <div className='account-profile__field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
          <TextField
            disabled
            id='email'
            variant='outlined'
            label='Email'
            value={profileData?.data.data.email || profile?.email}
            className='min-h-20 grow'
            InputLabelProps={{
              shrink: true
            }}
          />
          <ControlledTextField
            className='min-h-20 grow'
            type='number'
            control={control}
            name={'phone'}
            label={'Phone'}
          />
        </div>
        <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
          Address
        </h2>
        <div className='account-profile__field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
          <TextField
            id='address'
            variant='outlined'
            label='Address'
            value={profileData?.data.data.address || profile?.address}
            className='min-h-20 grow'
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>
      <div className='button-container'>
        <Button type='submit' variant='contained' size='large' className='w-full md:w-32'>
          Save
        </Button>
      </div>
    </form>
  )
}
