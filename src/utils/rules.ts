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
  confirm_password: handleConfirmPasswordYup('password')
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
  locations: yup
    .array()
    .test('atLeastOne', 'Locations field must have at least 1 confirmed location & be saved', function (value) {
      return value && value.length >= 1
    })
    .required('Locations field must have at least 1 confirmed location & be saved'),
  categories: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string()
    })
  ),
  images: yup.array().of(yup.string()),
  startTimes: yup.array().required()
})

export const searchSchema = yup.object({
  searchValue: yup.string().trim().required(),
  searchType: yup.string().required()
})

export const bookingSchema = yup.object({
  startDate: yup.date().required(),
  numberTravelers: yup.number().positive().required().typeError('Number of travelers must be positive a number'),
  startTime: yup.string().required()
})

export const requestTourSchema = yup.object({
  transportation: yup.array().min(1, 'At least one transportation option must be selected'),
  duration: yup.number().positive().required().typeError('Duration must be positive a number'),
  unit: yup.string().trim().required(),
  maxPrice: yup.number().positive().required().typeError('Max price must be positive a number'),
  destination: yup.string().required(),
  message: yup.string()
 })

export const commentSchema = yup.object({
  comment: yup.string().trim().required(),
  rating: yup.number().required().min(1).max(5)
})

export type Schema = yup.InferType<typeof schema>

export type UserSchema = yup.InferType<typeof userSchema>

export type TourSchema = yup.InferType<typeof tourSchema>

export type SearchSchema = yup.InferType<typeof searchSchema>

export type BookingSchema = yup.InferType<typeof bookingSchema>

export type RequestTourSchema = yup.InferType<typeof requestTourSchema>
                                   
export type CommentSchema = yup.InferType<typeof commentSchema>
