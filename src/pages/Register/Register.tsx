/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import ControlledTextField from 'src/components/ControlledTextField'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import AuthLayout from 'src/layouts/AuthLayout'
import { Schema, schema } from 'src/utils/rules'

type FormData = Pick<Schema, 'email' | 'password' | 'confirmPassword'>
const signUpSchema = schema.pick(['email', 'password', 'confirmPassword'])

const Register: React.FC = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(signUpSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirmPassword'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirmPassword'])

    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data?.user)
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
          <ControlledTextField control={control} name='email' label='Email' />
          <ControlledTextField control={control} type='password' name='password' label='Password' />
          <ControlledTextField control={control} type='password' name='confirmPassword' label='Confirm password' />
        </div>
        <div className='form__actions flex'>
          <LoadingButton
            loading={registerMutation.isPending}
            type='submit'
            variant='contained'
            size='large'
            className='grow'
            sx={{ fontWeight: 600 }}
          >
            Sign Up
          </LoadingButton>
        </div>
      </form>
    </AuthLayout>
  )
}
export default Register
