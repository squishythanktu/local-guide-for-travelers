import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { UserSchema, userSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const accountSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    trigger,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(accountSchema)
  })

  const onSubmit = () => {}
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Change Password
      </h2>
      <div className='mb-4 grid grid-cols-1 gap-10 md:grid-cols-2'>
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              variant='outlined'
              label='Password'
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              className='col-span-1'
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => {
                field.onChange(event)
                trigger('password')
              }}
            />
          )}
        />
        <Controller
          control={control}
          name='new_password'
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              variant='outlined'
              label='New password'
              error={!!errors.new_password?.message}
              helperText={errors.new_password?.message}
              className='col-span-1'
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => {
                field.onChange(event)
                trigger('new_password')
              }}
            />
          )}
        />
        <Controller
          control={control}
          name='confirm_password'
          render={({ field }) => (
            <TextField
              {...field}
              type='password'
              variant='outlined'
              label='Confirm password'
              error={!!errors.confirm_password?.message}
              helperText={errors.confirm_password?.message}
              className='col-span-1'
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => {
                field.onChange(event)
                trigger('confirm_password')
              }}
            />
          )}
        />
      </div>
      <div className='button-container'>
        <Button type='submit' variant='contained' size='large' className='w-full md:w-32'>
          Save
        </Button>
      </div>
    </form>
  )
}
