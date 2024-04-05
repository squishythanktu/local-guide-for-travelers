import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { TextField } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path.constant'
import useQueryParams from 'src/hooks/useQueryParams'
import AuthLayout from 'src/layouts/AuthLayout'
import { Schema, schema } from 'src/utils/rules'

export type ChangePasswordByTokenSchema = Pick<Schema, 'confirmPassword' | 'password'>
const changePasswordByTokenSchema = schema.pick(['confirmPassword', 'password'])
export type ChangePasswordFormData = { token: string; password: string }

const ChangePasswordByToken: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useQueryParams()
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordByTokenSchema>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(changePasswordByTokenSchema)
  })

  const changePasswordByMutation = useMutation({
    mutationFn: (formData: ChangePasswordFormData) => authApi.changePasswordByToken(formData)
  })

  const onSubmit = (formData: ChangePasswordByTokenSchema) => {
    changePasswordByMutation.mutate(
      { token: token, password: formData.confirmPassword },
      {
        onSuccess: () => {
          toast.success('Change password successfully.')
          navigate(path.login)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      }
    )
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <div className='flex items-center'>
          <div className='flex flex-col gap-6  bg-white'>
            <h2>CHANGE PASSWORD</h2>
          </div>
        </div>
        <div className='mt-4 flex flex-col gap-6'>
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <TextField
                variant='outlined'
                type='password'
                label='New password'
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
            name='confirmPassword'
            render={({ field }) => (
              <TextField
                variant='outlined'
                type='password'
                label='Confirm password'
                className='min-h-20'
                error={!!errors.confirmPassword?.message}
                helperText={errors.confirmPassword?.message}
                {...field}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  field.onChange(event)
                  trigger('confirmPassword')
                }}
              />
            )}
          />
          <LoadingButton
            loading={changePasswordByMutation.isPending}
            type='submit'
            variant='contained'
            size='large'
            sx={{ fontWeight: 600 }}
          >
            Change password
          </LoadingButton>
        </div>
      </form>
    </AuthLayout>
  )
}
export default ChangePasswordByToken
