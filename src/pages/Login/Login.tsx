/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import userApi from 'src/apis/user.api'
import GoogleIcon from 'src/assets/svg/google.svg'
import ControlledTextField from 'src/components/ControlledTextField'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import useQueryParams from 'src/hooks/useQueryParams'
import AuthLayout from 'src/layouts/AuthLayout'
import { AuthSuccessResponse } from 'src/types/auth.type'
import { Schema, schema } from 'src/utils/rules'
import http from 'src/utils/http'
import { setAccessTokenToLocalStorage, setProfileToLocalStorage } from 'src/utils/auth'
import config from 'src/constants/config.constant'

type FormData = Pick<Schema, 'email' | 'password'>
const signInSchema = schema.pick(['email', 'password'])

const Login: React.FC = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [isOauthTokenExists, setOauthTokenExists] = useState<boolean>(false)
  const queryParams: { token?: string; error?: string } = useQueryParams()
  const navigate = useNavigate()
  const { data: profileData } = useQuery({
    queryKey: [`get me`],
    queryFn: () => userApi.getMe(),
    enabled: isOauthTokenExists
  })
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(signInSchema)
  })

  useEffect(() => {
    if (!queryParams) return

    if (queryParams.token) {
      setAccessTokenToLocalStorage(queryParams.token)
      http.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${queryParams.token}`
        return config
      })
      setOauthTokenExists(true)
      return
    }

    if (queryParams.error) toast.error('Access denied.')
  }, [queryParams])

  useEffect(() => {
    if (profileData?.data.data) {
      setIsAuthenticated(true)
      setProfileToLocalStorage(profileData.data.data)
      setProfile(profileData.data.data)
      navigate(path.home)
    }
  }, [navigate, profileData, setIsAuthenticated, setProfile])

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

      <div className='form__oauth flex flex-col items-center gap-4'>
        <div className='flex w-full items-center gap-4'>
          <div className='block h-[0.5px] w-full border-none bg-gray-400' />
          <p className='whitespace-nowrap	'>or continue with</p>
          <div className='block h-[0.5px] w-full border-none bg-gray-400' />
        </div>

        <div className='buttons flex w-full gap-8'>
          <Button
            type='button'
            variant='outlined'
            className='grow'
            onClick={() => {
              window.location.href = `${config.baseUrl}/oauth2/authorization/google?redirect_uri=${config.frontEndUrl}`
            }}
          >
            <SvgIcon component={GoogleIcon} inheritViewBox className='text-3xl' />
          </Button>
          {/* <Button type='button' variant='outlined' className='grow'>
            <SvgIcon component={FacebookIcon} inheritViewBox className='text-3xl' />
          </Button> */}
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
