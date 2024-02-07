import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { UserSchema, userSchema } from 'src/utils/rules'
import DateSelect from '../components/DateSelect'

type FormData = Pick<UserSchema, 'username' | 'address' | 'phone' | 'date_of_birth'>
const accountSchema = userSchema.pick(['username', 'address', 'phone', 'date_of_birth'])

export default function Profile() {
  const {
    trigger,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1900, 0, 1) // year month day (month start from 0)
    },
    resolver: yupResolver(accountSchema)
  })

  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='account-profile-form'>
      <div className='form-defails flex flex-col'>
        <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
          Profile Details
        </h2>
        <div className='account-profile__field-group mb-4 flex flex-col md:flex-row'>
          <Controller
            control={control}
            name='username'
            render={({ field }) => (
              <TextField
                id='username'
                variant='outlined'
                label='Username'
                className='min-h-20'
                style={{ flexBasis: 'calc(33.33% - 2%)' }}
                error={!!errors.username?.message}
                helperText={errors.username?.message}
                {...field}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('username')
                }}
              />
            )}
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
            value='lethanhtu164@gmail.com'
            className='min-h-20 grow'
            InputLabelProps={{
              shrink: true
            }}
          />
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <TextField
                id='phone'
                type='phone'
                label='Phone'
                variant='outlined'
                className='min-h-20 grow'
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
                {...field}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('phone')
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='address'
            render={({ field }) => (
              <TextField
                id='address'
                type='address'
                label='Address'
                variant='outlined'
                className='min-h-20 grow'
                error={!!errors.address?.message}
                helperText={errors.address?.message}
                {...field}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('address')
                }}
              />
            )}
          />
        </div>
        <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
          Date of birth
        </h2>
        <div className='account-profile__field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
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
