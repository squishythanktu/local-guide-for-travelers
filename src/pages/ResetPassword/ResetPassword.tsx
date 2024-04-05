import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path.constant'
import AuthLayout from 'src/layouts/AuthLayout'
import { Schema, schema } from 'src/utils/rules'

export type ResetPasswordFormData = Pick<Schema, 'email'>
const resetPasswordSchema = schema.pick(['email'])

export default function ResetPassword() {
  const navigate = useNavigate()
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(resetPasswordSchema)
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (formData: ResetPasswordFormData) => authApi.reset(formData)
  })

  const onSubmit = (formData: ResetPasswordFormData) => {
    resetPasswordMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('The password reset link has been sent to your email.')
        navigate(path.changePasswordByToken)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <div className='flex items-center'>
          <div className='flex flex-col gap-6  bg-white'>
            <h2>RESET PASSWORD</h2>
            <div className='text-gray-400'>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </div>
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-6'>
          <Controller
            control={control}
            name='email'
            render={({ field }) => (
              <TextField
                variant='outlined'
                label='Email'
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
          <LoadingButton
            loading={resetPasswordMutation.isPending}
            type='submit'
            variant='contained'
            size='large'
            sx={{ fontWeight: 600 }}
          >
            Send reset link
          </LoadingButton>
        </div>
      </form>
    </AuthLayout>
  )
}
