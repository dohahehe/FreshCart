import * as zod from "zod"

const registerSchema = zod.object({
    name: zod.string().nonempty('Name is required').min(3, 'Name min 3 characters').max(10, 'Name can not exceed 10 characters'),
    email: zod.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email'),
    password: zod.string().nonempty('Password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 'Invalid password'),
    rePassword: zod.string().nonempty('rePassword is required'),
    phone: zod.string()
    .min(11, "Egyptian phone number must be 11 digits")
    .max(13, "Phone number is too long")
    .regex(
      /^(?:\+20|0)?1[0-2,5]\d{8}$/,
      "Please enter a valid Egyptian phone number (e.g., 01273987640 or +201273987640)"),
}).refine((data) => data.password === data.rePassword, { path: ['rePassword'], message: 'Passwords do not match' })

export default registerSchema