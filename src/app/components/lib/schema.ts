import { z } from 'zod'
import { isValidPhoneNumber } from "react-phone-number-input";


export const authenticateSchema = z.object({
  
  useSMS: z.string().min(1, "sms is required"),
  useAuthenticator: z.string().min(1, "authenticator is required"),
  
});
export const businessRepresentativeSchema = z.object({
  Type: z.string().min(1, "Type is required"),
  businessAddress: z.string().min(1, "businessAddress is required"),
  brcity: z.string().min(1, "City is required"),
  braddress1: z.string().min(1, "address line 1 is required"),
  braddress2: z.string().min(1, "address line 2 is required"),
  brzip: z.string().min(1, "Zip is required"),
});

export const bankDetailsSchema = z.object({
  currency: z.string().min(1, "currency is required"),
  Iban: z.string().min(1, "Iban is required"),
  confirmIban: z.string().min(1, " confirm Iban is required"),
  country: z.string().min(1, "country is required"),
});


export const businessStructureSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  address1: z.string().min(1, "address line 1 is required"),
  address2: z.string().min(1, "address line 2 is required"),
  zip: z.string().min(1, "Zip is required"),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .or(z.literal("")),
});