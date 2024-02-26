import { SearchCategory } from 'src/enums/search-category.enum'
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
  searchName: yup.string().trim().required(),
  searchCategory: yup.string().oneOf(Object.values(SearchCategory)).trim().required()
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

export const tourSchema = yup.object({
  name: yup.string().trim().required().max(100, 'Maximum length is 100 characters'),
  description: yup.string().trim(),
  transportation: yup.string().trim().required(),
  includeService: yup.string().trim(),
  duration: yup.number().positive().required().typeError('Duration must be positive a number'),
  unit: yup.string().trim().required(),
  estimatedLocalCashNeeded: yup.string().required().typeError('Estimated local cash needed is required'),
  pricePerTraveler: yup.number().positive().required().typeError('Price per traveler must be positive a number'),
  limitTraveler: yup.number().positive().required().typeError('Limit traveler must be positive a number'),
  extraPrice: yup.number().positive().required().typeError('Extra price must be positive a number'),
  itinerary: yup.string().trim().required(),
  address: yup.string().trim().required().max(100, 'Maximum length is 100 characters'),
  categories: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string()
    })
  ),
  images: yup.array().of(yup.string())
})

export const bookingFormSchema = yup.object({
  startDate: yup.date().required().min(new Date(), 'Please select a date in the future'),
  numberTravelers: yup.number().positive().required().typeError('Number of travelers must be positive a number')
})

export type Schema = yup.InferType<typeof schema>

export type UserSchema = yup.InferType<typeof userSchema>

export type TourSchema = yup.InferType<typeof tourSchema>

export type BookingFormSchema = yup.InferType<typeof bookingFormSchema>
