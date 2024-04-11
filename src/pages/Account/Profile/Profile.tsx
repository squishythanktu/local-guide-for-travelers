import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, FormHelperText, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import ConfirmDialog from 'src/components/ConfirmDialog/ConfirmDialog'
import ControlledTextField from 'src/components/ControlledTextField'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import { clearLocalStorage, setProfileToLocalStorage } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'fullName' | 'address' | 'phone' | 'dateOfBirth'>
const accountSchema = userSchema.pick(['fullName', 'address', 'phone', 'dateOfBirth'])

const Profile: React.FC = () => {
  const { profile, setProfile } = useContext(AppContext)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const navigate = useNavigate()
  const { data: profileData, refetch } = useQuery({
    queryKey: [`get me ${profile?.email}`, profile?.email],
    queryFn: () => userApi.getMe()
  })
  const {
    trigger,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      address: '',
      dateOfBirth: undefined
    },
    resolver: yupResolver(accountSchema)
  })

  useEffect(() => {
    if (profileData?.data.data) {
      Object.entries(profileData?.data.data).forEach(([key, value]) => {
        if (key === 'dateOfBirth' && value) {
          setValue('dateOfBirth', value.toString().split('T')[0])
          return
        }
        setValue(key as keyof FormData, value)
      })
    }
  }, [profileData?.data.data, setValue])

  const updateProfileMutation = useMutation({
    mutationFn: (body: FormData) => userApi.updateMe(body)
  })

  const deleteProfileMutation = useMutation({
    mutationFn: (id: number) => userApi.deleteAccount(id)
  })

  const onSubmit = (body: FormData) => {
    updateProfileMutation.mutate(body, {
      onSuccess: (res) => {
        refetch()
        setProfile(res.data.data)
        setProfileToLocalStorage(res.data.data)
        toast.success('Update profile successfully.')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  const handleConfirmDeleteAccount = () => {
    deleteProfileMutation.mutate(Number((profile as User)?.id), {
      onSuccess: () => {
        window.location.reload()
        setDeleteMode(false)
        clearLocalStorage()
        navigate(path.home)
        toast.success('Delete account successfully.')
      },
      onError: (error) => {
        setDeleteMode(false)
        toast.error(error.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='account-profile-form'>
      <div className='form-details flex flex-col'>
        <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
          Profile Details
        </h2>
        <div className='account-profile__field-group mb-4 flex flex-col gap-6 md:flex-row'>
          <ControlledTextField
            className='min-h-20 w-full  md:w-1/2'
            control={control}
            name={'fullName'}
            label={'Full name'}
            required
          />
          <Controller
            control={control}
            name='dateOfBirth'
            render={({ field }) => {
              return (
                <div className='flex w-full flex-col md:w-1/2'>
                  <DatePicker
                    disableFuture
                    label={
                      <Box sx={{ fontWeight: '600' }}>
                        Date of birth
                        <Typography component='span' sx={{ color: 'red' }}>
                          *
                        </Typography>
                      </Box>
                    }
                    value={field.value ? dayjs(field.value) : null}
                    className='min-h-10'
                    slotProps={{ textField: { InputLabelProps: { shrink: true } } }}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('dateOfBirth')
                    }}
                  />
                  {!!errors.dateOfBirth && <FormHelperText error>{errors.dateOfBirth.message}</FormHelperText>}
                </div>
              )
            }}
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
            value={profileData?.data.data.email || profile?.email}
            className='min-h-20 grow'
            InputLabelProps={{
              shrink: true
            }}
          />
          <ControlledTextField
            required
            className='min-h-20 grow'
            type='number'
            control={control}
            name={'phone'}
            label={'Phone'}
          />
        </div>
        <h2 className='account-profile__header border-b-1 mb-5 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
          Address
        </h2>
        <div className='account-profile__field-group mb-4 flex flex-col gap-6 md:flex-row md:justify-between'>
          <ControlledTextField
            required
            className='min-h-20 grow'
            control={control}
            name={'address'}
            label={'Address'}
          />
        </div>
      </div>
      <div className='button-container flex justify-between gap-4'>
        <LoadingButton
          loading={updateProfileMutation.isPending}
          type='submit'
          variant='contained'
          size='large'
          className='h-fit w-full md:w-32'
        >
          Save
        </LoadingButton>
        <LoadingButton
          loading={deleteProfileMutation.isPending}
          variant='outlined'
          size='large'
          color='error'
          className='h-fit w-full whitespace-nowrap md:w-32'
          onClick={() => setDeleteMode(true)}
        >
          Delete account
        </LoadingButton>
        {deleteMode && (
          <ConfirmDialog
            title='Delete account confirmation'
            content='Are you sure want to delete this account?'
            handleClose={() => setDeleteMode(false)}
            handleConfirm={handleConfirmDeleteAccount}
          />
        )}
      </div>
    </form>
  )
}

export default Profile
