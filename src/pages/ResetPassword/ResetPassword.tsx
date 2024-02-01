import AuthLayout from 'src/layouts/AuthLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

type FormData = Pick<Schema, 'email'>
const resetPasswordSchema = schema.pick(['email'])

export default function ResetPassword() {
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(resetPasswordSchema)
  })
  const onSubmit = (data) => {}

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
          <Button type='submit' variant='contained' size='large' sx={{ fontWeight: 600 }}>
            Send reset link
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
