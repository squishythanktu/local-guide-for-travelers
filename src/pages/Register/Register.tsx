import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthLayout from 'src/layouts/AuthLayout'
import path from 'src/constants/path.constant'
import { Schema, schema } from 'src/utils/rules'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const signUpSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Login() {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(signUpSchema)
  })
  const onSubmit = (data) => {}

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='form__header flex items-center'>
          <div className='form flex flex-col gap-2 bg-white'>
            <h2>SIGN UP</h2>
            <div className='flex'>
              <span className='text-gray-400'>Already have an account?</span>
              <Link className='ml-1 font-bold text-orange-500' to={path.login}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className='form__inputs mt-4 flex flex-col gap-4'>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <TextField
                id='email'
                variant='outlined'
                label='Email'
                autoFocus
                className='min-h-20'
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...field}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('email')
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <TextField
                id='password'
                type='password'
                label='Password'
                variant='outlined'
                className='min-h-20'
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                {...field}
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
            name='confirm_password'
            render={({ field }) => (
              <TextField
                id='confirm_password'
                type='confirm_password'
                label='Confirm password'
                variant='outlined'
                className='min-h-20'
                error={!!errors.confirm_password?.message}
                helperText={errors.confirm_password?.message}
                {...field}
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
        <div className='form__actions flex'>
          <Button type='submit' variant='contained' size='large' className='grow' sx={{ fontWeight: 600 }}>
            Sign Up
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
