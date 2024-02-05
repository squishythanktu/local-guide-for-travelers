import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Confirm password is required')
    .min(6, 'Confirm password length from 6 - 160 characters')
    .max(160, 'Confirm password length from 6 - 160 characters')
    .oneOf([yup.ref(refString)], 'Confirm password is not match')
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .min(5, 'Email length from 5 - 160 characters')
    .max(160, 'Email length from 5 - 160 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password length from 6 - 160 characters')
    .max(160, 'Password length from 6 - 160 characters'),
  confirm_password: handleConfirmPasswordYup('password'),
  search_name: yup.string().trim().required()
})

export const userSchema = yup.object({
  username: yup.string().trim().max(160, 'Maximum length is 160 characters'),
  phone: yup.string().trim().max(20, 'Maximum length is 20 characters'),
  address: yup.string().trim().max(160, 'Maximum length is 160 characters'),
  date_of_birth: yup.date().max(new Date(), 'Please select a date in the past'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type Schema = yup.InferType<typeof schema>

export type UserSchema = yup.InferType<typeof userSchema>
