import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthLayout from 'src/layouts/AuthLayout'
import path from 'src/constants/path.constant'
import GoogleIcon from 'src/assets/svg/google.svg'
import FacebookIcon from 'src/assets/svg/facebook.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { Controller, useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import authApi from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'email' | 'password'>
const signInSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(signInSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })

  const onSubmit = handleSubmit((body) => {
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
      },
      onError: () => {
        toast.error('Login unsuccessful. Please check your login credentials.')
      }
    })
  })

  return (
    <AuthLayout>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div className='form__header flex items-center'>
          <div className='form flex flex-col gap-2 bg-white'>
            <h2>SIGN IN</h2>
            <div className='flex'>
              <span className='text-gray-400'>Don't have an account?</span>
              <Link className='ml-1 font-bold text-orange-500' to={path.register}>
                Sign up
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
        </div>
        <div className='form__actions flex flex-col gap-4'>
          <div className='flex justify-end'>
            <Link className='ml-1 font-bold text-orange-500' to=''>
              Forget password?
            </Link>
          </div>
          <Button type='submit' variant='contained' size='large' sx={{ fontWeight: 600 }}>
            Sign In
          </Button>
        </div>
      </form>

      <div className='form__oauth flex flex-col items-center gap-4'>
        <div className='flex w-full items-center gap-4'>
          <div className='block h-[0.5px] w-full border-none bg-gray-400' />
          <p className='whitespace-nowrap	'>or continue with</p>
          <div className='block h-[0.5px] w-full border-none bg-gray-400' />
        </div>

        <div className='buttons flex w-full gap-8'>
          <Button type='button' variant='outlined' className='grow'>
            <SvgIcon component={GoogleIcon} inheritViewBox className='text-3xl' />
          </Button>
          <Button type='button' variant='outlined' className='grow'>
            <SvgIcon component={FacebookIcon} inheritViewBox className='text-3xl' />
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
