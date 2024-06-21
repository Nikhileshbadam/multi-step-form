import { z } from 'zod'

export const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  currency: z.string().min(1, 'currency is required'),
  Iban: z.string().min(1, 'Iban is required'),
  confirmIban: z.string().min(1, 'Iban is required'),
  useSMS: z.string().min(1, 'sms is required'),
  useAuthenticator: z.string().min(1, 'authenticator is required'),
  phone : z.string()
  .min(1, 'Phone number is required')
  .regex(/^\d+$/, 'Phone number must be a valid number')
})