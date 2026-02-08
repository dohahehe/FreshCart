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
    <div className="min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-green-100 to-emerald-100 rounded-full mb-4">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-medium text-green-600">Create Account</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join FreshCart Today</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Create your account to start shopping and enjoy exclusive benefits
          </p>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-8 items-center mx-auto">
          

          {/* Registration Form */}
          <div className="w-full sm:w-lg mx-auto">
            <Card className="w-full mx-auto border border-gray-200 rounded-2xl pt-0 shadow-sm overflow-hidden">
              <div className="bg-green-600 p-6">
                <CardTitle className="text-2xl text-white font-bold">Create Account</CardTitle>
                <p className="text-green-100 text-sm mt-1">
                  Fill in your details to join our community
                </p>
              </div>
              
              <CardContent className="p-6">
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup className="space-y-1">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-name" className="text-gray-900 font-medium">
                            Full Name
                          </FieldLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg 
                                className="w-5 h-5 text-gray-400" 
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
                              placeholder="Enter your full name"
                              className="ps-10 h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
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
                          <FieldLabel htmlFor="form-rhf-demo-email" className="text-gray-900 font-medium">
                            Email Address
                          </FieldLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                              </svg>
                            </div>
                            <Input
                              {...field}
                              id="form-rhf-demo-email"
                              aria-invalid={fieldState.invalid}
                              placeholder="example@gmail.com"
                              className="ps-10 h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                            />                  
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
                      <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-password" className="text-gray-900 font-medium">
                              Password
                            </FieldLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg 
                                  className="w-5 h-5 text-gray-400" 
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
                                type={showPass ? 'text' : 'password'}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter password"
                                className="ps-10 h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                              />  
                              <button
                                type="button"
                                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer hover:text-gray-700 transition-colors"
                                onClick={() => setShowPass(!showPass)}
                              >
                                {showPass ? (
                                  <svg 
                                    className="w-5 h-5 text-gray-500" 
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
                                    className="w-5 h-5 text-gray-500" 
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
                            <FieldLabel htmlFor="form-rhf-demo-rePassword" className="text-gray-900 font-medium">
                              Confirm Password
                            </FieldLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg 
                                  className="w-5 h-5 text-gray-400" 
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
                                id="form-rhf-demo-rePassword"
                                type={showRepass ? "text" : "password"}
                                aria-invalid={fieldState.invalid}
                                placeholder="Confirm password"
                                className="ps-10 h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                              />   
                              <button
                                type="button"
                                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer hover:text-gray-700 transition-colors"
                                onClick={() => setShowRepass(!showRepass)}
                              >
                                {showRepass ? (
                                  <svg 
                                    className="w-5 h-5 text-gray-500" 
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
                                    className="w-5 h-5 text-gray-500" 
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
                    </div>
                    
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-phone" className="text-gray-900 font-medium">
                            Phone Number
                          </FieldLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg 
                                className="w-5 h-5 text-gray-400" 
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
                              className="ps-10 h-12 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
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
              
              <CardFooter className="flex flex-col gap-4 p-6 pt-0">
                <Button 
                  disabled={isLoading} 
                  className="w-full h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer"
                  type="submit" 
                  form="form-rhf-demo"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      href="/login" 
                      className="font-medium text-green-600 hover:text-green-700 hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Registration Benefits */}
          <div className="w-full sm:w-lg mx-auto block">
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Exclusive Offers</h3>
                    <p className="text-gray-600 text-sm">
                      Get member-only discounts and early access to sales
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Fast Checkout</h3>
                    <p className="text-gray-600 text-sm">
                      Save your details for quicker purchases in the future
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Secure Account</h3>
                    <p className="text-gray-600 text-sm">
                      Your personal information is protected with advanced security
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Rewards Program</h3>
                    <p className="text-gray-600 text-sm">
                      Earn points on every purchase and redeem for discounts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// Why Fetch is Better for Registration:
// Registration ≠ Authentication: NextAuth's signIn is for authentication (login), not registration
// Different Endpoints: Registration typically goes to /api/auth/register while login goes to /api/auth/login
// No Session Needed: Registration doesn't require an active session
// Clearer Flow: Direct fetch makes the registration flow more explicit

