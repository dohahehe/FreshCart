'use client'
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import registerSchema from "@/schema/registerSchema";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    mode: 'onBlur'
  })

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
      const cleanPhone = data.phone.replace('+20', '0');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          rePassword: data.rePassword,
          phone: cleanPhone, 
        }),
      })
      const responseData = await res.json();
      console.log(responseData);

      if (res.ok) {
        toast.success('Registration successful! Please login.');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        const errorMessage = responseData.message || 'Registration failed';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally{
      setIsLoading(false)
    }
  }

  // Phone Number Formatting
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/[^\d+]/g, '');
    
    if (cleaned.startsWith('+20')) {
      const digits = cleaned.slice(3); // Remove +20
      if (digits.length <= 3) return `+20 ${digits}`;
      if (digits.length <= 6) return `+20 ${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `+20 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
    }
    
    const digits = cleaned.startsWith('0') ? cleaned : `0${cleaned}`;
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    
    const cleanValue = formatted.replace(/[^\d+]/g, '');
    form.setValue("phone", cleanValue);
  };

  return (
    <div className="w-full lg:w-1/2 m-auto flex py-6 justify-center items-center">
    <Card className="w-full sm:max-w-xl xl:max-w-2xl ">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 font-bold">Register Now!</CardTitle> 
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name">
                    Name
                  </FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg 
                        className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width={24} 
                        height={24} 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                      <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      </svg>
                    </div>
                      <Input
                        {...field}
                        id="form-rhf-demo-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Name"
                        className="ps-9"
                      />                  
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    Email
                  </FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                    </div>
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Example@gmail.com"
                        className="ps-9"
                      />                  
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-[.65rem] pointer-events-none">
                      <svg 
                        className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width={24} 
                        height={24} 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          stroke="currentColor" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                        />
                      </svg>                    
                    </div>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      type={showPass? 'text' : 'password' }
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Password"
                      className="ps-9 pe-9"
                    />    
                    <button
                      type="button"
                      className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass? (
                        <svg 
                          className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={24} 
                          height={24} 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke="currentColor" 
                            strokeWidth={2} 
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path 
                            stroke="currentColor" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg 
                          className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={24} 
                          height={24} 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>             
                  </div>
                  
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-rePassword">
                    Re-password
                  </FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-[.65rem] pointer-events-none">
                      <svg 
                        className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width={24} 
                        height={24} 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          stroke="currentColor" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                        />
                      </svg>                     </div>
                      <Input
                        {...field}
                        id="form-rhf-demo-rePassword"
                        type={showRepass? "text" : "password" }
                        aria-invalid={fieldState.invalid}
                        placeholder="Re-enter Your Password"
                        className="ps-9 pe-9"
                      />   
                      <button
                      type="button"
                      className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                      onClick={() => setShowRepass(!showRepass)}
                    >
                      {showRepass? (
                        <svg 
                          className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={24} 
                          height={24} 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke="currentColor" 
                            strokeWidth={2} 
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path 
                            stroke="currentColor" 
                            strokeWidth={2} 
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg 
                          className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                          aria-hidden="true" 
                          xmlns="http://www.w3.org/2000/svg" 
                          width={24} 
                          height={24} 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>               
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phone">
                    Phone
                  </FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                      <svg 
                        className="w-4.5 h-4.5 text-gray-500 dark:text-gray-400" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width={24} 
                        height={24} 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                      <path 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 4H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-3 14h.01"
                      />
                      </svg>
                    </div>
                      <Input
                        {...field}
                        value={phoneValue}
                        onChange={handlePhoneChange}
                        id="form-rhf-demo-phone"
                        aria-invalid={fieldState.invalid}
                         placeholder="010 123 45678"
                        className="ps-9"
                      />          
                             
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Field orientation="horizontal">
          {/* <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button> */}
          <Button disabled={isLoading} className="w-full cursor-pointer" type="submit" form="form-rhf-demo">
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </Field>
        <div className="text-sm font-medium text-gray-800">
          Already registered? <Link href="/login" className="text-fg-brand hover:underline duration-75">Login!</Link>
        </div>
      </CardFooter>
    </Card>
   </div>
  )
}

// Why Fetch is Better for Registration:
// Registration ≠ Authentication: NextAuth's signIn is for authentication (login), not registration
// Different Endpoints: Registration typically goes to /api/auth/register while login goes to /api/auth/login
// No Session Needed: Registration doesn't require an active session
// Clearer Flow: Direct fetch makes the registration flow more explicit

