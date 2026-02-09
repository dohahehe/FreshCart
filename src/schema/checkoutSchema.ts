import * as z from "zod"

export const checkoutSchema = z.object({
  city: z.string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),
  streetAddress: z.string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  phone: z.string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be less than 15 digits")
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>