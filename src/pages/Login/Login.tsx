/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import FacebookIcon from 'src/assets/svg/facebook.svg'
import GoogleIcon from 'src/assets/svg/google.svg'
import ControlledTextField from 'src/components/ControlledTextField'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import AuthLayout from 'src/layouts/AuthLayout'
import { AuthSuccessResponse } from 'src/types/auth.type'
import { Schema, schema } from 'src/utils/rules'

type FormData = Pick<Schema, 'email' | 'password'>
const signInSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { control, handleSubmit } = useForm<FormData>({
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
      onSuccess: (data: AxiosResponse<AuthSuccessResponse, any>) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
      },
      onError: (error: any) => {
        toast.error(error.response.data.message)
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
          <ControlledTextField control={control} name='email' label='Email' />
          <ControlledTextField control={control} type='password' name='password' label='Password' />
        </div>
        <div className='form__actions flex flex-col gap-4'>
          <div className='flex justify-end'>
            <Link className='ml-1 font-bold text-orange-500' to='/reset'>
              Forget password?
            </Link>
          </div>
          <LoadingButton
            loading={loginMutation.isPending}
            type='submit'
            variant='contained'
            size='large'
            sx={{ fontWeight: 600 }}
          >
            <span>Sign In</span>
          </LoadingButton>
        </div>
      </form>

      <div className='form__oauth hidden flex-col items-center gap-4'>
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
